"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLOBE_NODES, GLOBE_ARCS, type GlobeNode } from "./globeData";

interface GlobeBackgroundProps {
  onSelectNode?: (node: GlobeNode) => void;
}

/** Muted premium palette mapped from the vivid source colors. */
const PALETTE: Record<string, string> = {
  "#00f5ff": "#14b8a6",
  "#fbbf24": "#f5ebbc",
  "#f59e0b": "#eadd94",
  "#10e7b4": "#10b981",
  "#34d399": "#059669",
};

const tint = (hex: string) => PALETTE[hex] ?? hex;

/* Real coastline data, bundled locally (no runtime network fetches). */
const TEX = {
  water: "/textures/earth-water.png",
};

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

/** Inverted water mask → land = opaque, ocean = fully cut out (hollow globe). */
function processLandAlpha(waterImg: HTMLImageElement): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = waterImg.naturalWidth;
  canvas.height = waterImg.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);
  ctx.drawImage(waterImg, 0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "difference";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

const RADIUS = 100;

const GlobeBackground: React.FC<GlobeBackgroundProps> = ({ onSelectNode }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(onSelectNode);

  useEffect(() => {
    onSelectRef.current = onSelectNode;
  }, [onSelectNode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let cancelled = false;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 2000);
    camera.position.set(0, 14, 310);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    /* Globe */
    const globe = new THREE.Group();
    scene.add(globe);

    /* Hollow earth: land-only shells in matte off-white. Back shell renders the
       far side dimly through ocean cut-outs; front shell writes depth so near
       land occludes correctly while arcs/nodes stay visible through the holes. */
    const earthGeo = track(new THREE.SphereGeometry(RADIUS, 64, 64));

    const earthMatFront = track(
      new THREE.MeshLambertMaterial({
        color: 0xf1eee6,
        transparent: true,
        opacity: 1,
        depthWrite: true,
        side: THREE.FrontSide,
      }),
    );
    const earthMatBack = track(
      new THREE.MeshLambertMaterial({
        color: 0xb9b6aa,
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        side: THREE.BackSide,
      }),
    );

    const earthBack = new THREE.Mesh(earthGeo, earthMatBack);
    earthBack.renderOrder = 0;
    const earthFront = new THREE.Mesh(earthGeo, earthMatFront);
    earthFront.renderOrder = 1;
    globe.add(earthBack, earthFront);

    /* Geodesic skeleton shell — slowly counter-drifts for depth */
    const skelSource = track(new THREE.IcosahedronGeometry(RADIUS * 1.045, 3));
    const skelWire = track(new THREE.WireframeGeometry(skelSource));
    const skelMat = track(
      new THREE.LineBasicMaterial({
        color: 0x16a34a,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const skeleton = new THREE.LineSegments(skelWire, skelMat);
    skeleton.renderOrder = 2;
    globe.add(skeleton);

    /* Atmosphere: inner haze + soft outer halo */
    const hazeGeo = track(new THREE.SphereGeometry(RADIUS * 1.04, 32, 32));
    const hazeMat = track(
      new THREE.MeshBasicMaterial({
        color: 0x86efac,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    globe.add(new THREE.Mesh(hazeGeo, hazeMat));

    const haloGeo = track(new THREE.SphereGeometry(RADIUS * 1.13, 32, 32));
    const haloMat = track(
      new THREE.MeshBasicMaterial({
        color: 0xa7f3d0,
        transparent: true,
        opacity: 0.22,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const halo = new THREE.Mesh(haloGeo, haloMat);
    globe.add(halo);

    /* Bright studio lighting */
    scene.add(new THREE.AmbientLight(0xf6fffa, 1.25));
    const key = new THREE.DirectionalLight(0xffffff, 1.75);
    key.position.set(240, 180, 260);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xd9f7e5, 0.8);
    fill.position.set(-220, -80, -160);
    scene.add(fill);

    /* Swap in the real coastline cut-outs once decoded (renders immediately with fallback). */
    (async () => {
      try {
        const waterImg = await loadImage(TEX.water);
        if (cancelled) return;

        const alphaTex = track(processLandAlpha(waterImg));
        alphaTex.anisotropy = maxAniso;

        for (const mat of [earthMatFront, earthMatBack]) {
          mat.alphaMap = alphaTex;
          mat.needsUpdate = true;
        }
      } catch {
        /* keep translucent fallback globe if the mask fails */
      }
    })();

    /* Nodes */
    const nodesGroup = new THREE.Group();
    globe.add(nodesGroup);
    const pickables: THREE.Object3D[] = [];

    GLOBE_NODES.forEach((node) => {
      const pos = latLngToVector3(node.lat, node.lng, RADIUS * 1.03);
      const major =
        node.id === "uk-london" || node.id === "eu-frankfurt" || node.id === "india-delhi";

      const dotGeo = track(new THREE.SphereGeometry(major ? 1.9 : 1.3, 12, 12));
      const dotMat = track(
        new THREE.MeshBasicMaterial({ color: new THREE.Color(tint(node.color)) }),
      );
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.copy(pos);
      dot.renderOrder = 2;
      dot.userData = { type: "node", nodeData: node };
      nodesGroup.add(dot);
      pickables.push(dot);

      const ringGeo = track(new THREE.RingGeometry(major ? 3.2 : 2.3, major ? 4.4 : 3.1, 24));
      const ringMat = track(
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(tint(node.color)),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.55,
          depthWrite: false,
        }),
      );
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(0, 0, 0);
      ring.renderOrder = 2;
      ring.userData = { type: "ring" };
      nodesGroup.add(ring);
    });

    /* Arcs + traveling pulses */
    interface Pulse {
      mesh: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      progress: number;
      speed: number;
    }
    const pulses: Pulse[] = [];
    const arcGroup = new THREE.Group();
    globe.add(arcGroup);

    GLOBE_ARCS.forEach((arc) => {
      const from = GLOBE_NODES.find((n) => n.id === arc.fromId);
      const to = GLOBE_NODES.find((n) => n.id === arc.toId);
      if (!from || !to) return;

      const p1 = latLngToVector3(from.lat, from.lng, RADIUS * 1.03);
      const p2 = latLngToVector3(to.lat, to.lng, RADIUS * 1.03);

      const mid = p1.clone().add(p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      mid.normalize().multiplyScalar(RADIUS * (1.1 + (distance / RADIUS) * 0.22));

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const arcGeo = track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)));
      const arcColor = new THREE.Color(tint(arc.color));

      const arcMat = track(
        new THREE.LineBasicMaterial({
          color: arcColor,
          transparent: true,
          opacity: 0.28,
          depthWrite: false,
        }),
      );
      const line = new THREE.Line(arcGeo, arcMat);
      line.renderOrder = 2;
      arcGroup.add(line);

      const glowGeo = track(new THREE.SphereGeometry(1.6, 8, 8));
      const pulseMesh = new THREE.Mesh(
        glowGeo,
        track(new THREE.MeshBasicMaterial({ color: arcColor, transparent: true, opacity: 0.9 })),
      );
      pulseMesh.renderOrder = 2;
      arcGroup.add(pulseMesh);

      pulses.push({
        mesh: pulseMesh,
        curve,
        progress: Math.random(),
        speed: 0.06 + Math.random() * 0.05,
      });
    });

    /* Position the globe right-of-center on wide screens */
    const applyLayout = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      const worldWidth =
        2 * Math.tan(((camera.fov / 2) * Math.PI) / 180) * camera.position.z * camera.aspect;
      globe.position.x = w >= 1024 ? worldWidth * 0.19 : 0;
      globe.position.y = w >= 1024 ? -6 : -14;
    };
    applyLayout();

    const resizeObserver = new ResizeObserver(applyLayout);
    resizeObserver.observe(container);

    /* Interaction state */
    const targetRotation = { x: 0.28, y: -0.9 };
    const currentRotation = { x: 0.28, y: -0.9 };
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastY = 0;
    const raycaster = new THREE.Raycaster();
    const pointerNdc = new THREE.Vector2();
    let hovered: GlobeNode | null = null;

    const setCursor = (value: string) => {
      container.style.cursor = value;
    };

    const pickNode = (clientX: number, clientY: number): GlobeNode | null => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      pointerNdc.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObjects(pickables, false);
      return hits.length > 0 ? ((hits[0].object.userData.nodeData as GlobeNode) ?? null) : null;
    };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      lastX = e.clientX;
      lastY = e.clientY;
      setCursor("grabbing");
    };

    const onPointerMove = (e: PointerEvent) => {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
        targetRotation.y += dx * 0.005;
        targetRotation.x = Math.max(-0.9, Math.min(0.9, targetRotation.x + dy * 0.005));
        lastX = e.clientX;
        lastY = e.clientY;
      } else {
        const node = pickNode(e.clientX, e.clientY);
        if (node !== hovered) {
          hovered = node;
          setCursor(node ? "pointer" : "grab");
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (dragging && !moved) {
        const node = pickNode(e.clientX, e.clientY);
        if (node) onSelectRef.current?.(node);
      }
      dragging = false;
      setCursor("grab");
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    setCursor(reducedMotion ? "default" : "grab");

    /* Render loop — paused when offscreen or tab hidden */
    let frameId = 0;
    let running = false;
    let inView = true;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      if (!dragging && !reducedMotion) targetRotation.y += dt * 0.055;

      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.075;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.075;
      globe.rotation.x = currentRotation.x;
      globe.rotation.y = currentRotation.y;

      skeleton.rotation.y = -elapsed * 0.012;
      if (!reducedMotion) {
        const breathe = 1 + Math.sin(elapsed * 0.9) * 0.02;
        halo.scale.setScalar(breathe);
      }

      for (const pulse of pulses) {
        if (!reducedMotion) {
          pulse.progress += dt * pulse.speed;
          if (pulse.progress > 1) pulse.progress -= 1;
        }
        pulse.curve.getPoint(pulse.progress, pulse.mesh.position);
      }

      nodesGroup.children.forEach((child, i) => {
        if (child.userData.type !== "ring") return;
        const s = 1 + Math.sin(elapsed * 2 + i) * 0.18;
        child.scale.set(s, s, 1);
      });

      renderer.render(scene, camera);
    };

    const loop = () => {
      frameId = requestAnimationFrame(loop);
      renderFrame();
    };

    const start = () => {
      if (!running && inView && !document.hidden) {
        running = true;
        clock.getDelta();
        frameId = requestAnimationFrame(loop);
      }
    };

    const stop = () => {
      if (running) {
        running = false;
        cancelAnimationFrame(frameId);
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    start();

    return () => {
      cancelled = true;
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 touch-pan-y select-none"
    />
  );
};

export default GlobeBackground;
