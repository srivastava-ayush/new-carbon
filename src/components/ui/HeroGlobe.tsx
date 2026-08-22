import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLOBE_NODES, GLOBE_ARCS, GlobeNode } from './globeData';
import {
  RotateCcw,
  Compass,
  Zap,
  ZoomIn,
  ZoomOut,
  Globe as GlobeIcon,
  Sparkles,
  Cloud,
  Contrast,
  ChevronRight
} from 'lucide-react';

interface InteractiveGlobeProps {
  onSelectNode: (node: GlobeNode) => void;
  onOpenCinematicModal?: () => void;
}

export type GlobeTextureMode = 'NASA_BLUE_MARBLE' | 'NASA_NIGHT' | 'NASA_TOPOGRAPHY' | 'ECO_MATRIX';

// Convert Lat/Lng to 3D Cartesian coordinates on sphere of radius R
export function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate high-contrast, rich Eco Canvas Earth texture
function createEarthCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // High-contrast deep abyss ocean gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#011512');
  oceanGrad.addColorStop(0.3, '#03231e');
  oceanGrad.addColorStop(0.5, '#063830');
  oceanGrad.addColorStop(0.7, '#042821');
  oceanGrad.addColorStop(1, '#01120f');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // High-contrast wave grid
  ctx.strokeStyle = 'rgba(45, 212, 191, 0.09)';
  ctx.lineWidth = 1.4;
  for (let lat = -80; lat <= 80; lat += 15) {
    const y = ((90 - lat) / 180) * canvas.height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
  for (let lng = -180; lng <= 180; lng += 20) {
    const x = ((lng + 180) / 360) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  const toX = (lng: number) => ((lng + 180) / 360) * canvas.width;
  const toY = (lat: number) => ((90 - lat) / 180) * canvas.height;

  const drawPolygon = (coords: [number, number][], fill: string, stroke = '#34d399', strokeWidth = 2.0) => {
    if (coords.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(toX(coords[0][0]), toY(coords[0][1]));
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(toX(coords[i][0]), toY(coords[i][1]));
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  };

  const landFill = '#0e5f52';
  const highlightFill = '#15806e';

  // Eurasia (Europe + India + Asia)
  const eurasiaCoords: [number, number][] = [
    [-9, 36], [-8, 43], [2, 48], [4, 53], [9, 54], [10, 58], [24, 70], [30, 71],
    [60, 72], [90, 73], [120, 73], [170, 66], [180, 60], [140, 50], [130, 42],
    [121, 31], [110, 20], [105, 10], [98, 12], [88, 22], [80, 13], [77, 8],
    [72, 19], [68, 25], [60, 25], [50, 30], [35, 32], [30, 31], [25, 36],
    [15, 38], [5, 36], [-5, 36], [-9, 36]
  ];
  drawPolygon(eurasiaCoords, landFill, '#2dd4bf', 2.2);

  // Alps
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.beginPath();
  ctx.ellipse(toX(8.5), toY(46.5), 26, 12, 0.2, 0, Math.PI * 2);
  ctx.fill();

  // Himalayas
  ctx.fillStyle = 'rgba(255, 255, 255, 0.48)';
  ctx.beginPath();
  ctx.ellipse(toX(84), toY(29), 60, 14, -0.25, 0, Math.PI * 2);
  ctx.fill();

  // UK
  const ukCoords: [number, number][] = [
    [-5, 50], [-1, 50.8], [1.5, 51.5], [1.7, 52.8], [0.2, 54.2], [-2, 57.2],
    [-4, 58.5], [-5.5, 58.0], [-6, 56.5], [-4.8, 54.8], [-3.2, 53.5], [-5, 50]
  ];
  drawPolygon(ukCoords, '#229e89', '#5eead4', 2.4);

  const irelandCoords: [number, number][] = [
    [-10.2, 51.5], [-6.2, 52], [-5.8, 55], [-9, 55.4], [-10.5, 53], [-10.2, 51.5]
  ];
  drawPolygon(irelandCoords, highlightFill, '#5eead4', 2.0);

  // India
  const indiaCoords: [number, number][] = [
    [68, 24], [72, 32], [77, 36], [82, 30], [88, 27], [92, 25], [89, 21],
    [85, 20], [80, 13], [77.5, 8.2], [76, 10], [73, 16], [70, 21], [68, 24]
  ];
  drawPolygon(indiaCoords, '#1fa088', '#6ee7b7', 2.6);

  // Africa
  const africaCoords: [number, number][] = [
    [-17, 14], [-17, 21], [-5, 36], [10, 37], [32, 31], [43, 12], [51, 11],
    [40, -4], [35, -20], [28, -33], [18, -34], [12, -18], [9, 4], [0, 6],
    [-13, 9], [-17, 14]
  ];
  drawPolygon(africaCoords, landFill, '#2dd4bf', 1.8);

  // Americas & Australia
  const naCoords: [number, number][] = [
    [-168, 65], [-140, 70], [-100, 75], [-60, 65], [-65, 45], [-75, 35], [-80, 25],
    [-97, 26], [-105, 20], [-80, 8], [-95, 15], [-110, 30], [-124, 40], [-125, 50],
    [-140, 60], [-168, 65]
  ];
  drawPolygon(naCoords, '#0c4d42', '#2dd4bf', 1.8);

  const saCoords: [number, number][] = [
    [-80, 8], [-60, 10], [-35, -5], [-38, -15], [-50, -30], [-65, -55], [-75, -50],
    [-70, -20], [-80, -5], [-80, 8]
  ];
  drawPolygon(saCoords, '#0c4d42', '#2dd4bf', 1.8);

  const ozCoords: [number, number][] = [
    [114, -22], [130, -12], [145, -15], [153, -28], [148, -38], [136, -35],
    [115, -34], [113, -25], [114, -22]
  ];
  drawPolygon(ozCoords, '#0c4d42', '#2dd4bf', 1.8);

  const neonHubs: { lng: number; lat: number; color: string; glowRadius: number }[] = [
    { lng: -0.12, lat: 51.5, color: '#00f5ff', glowRadius: 20 },
    { lng: 8.68, lat: 50.1, color: '#f59e0b', glowRadius: 22 },
    { lng: 77.2, lat: 28.6, color: '#fbbf24', glowRadius: 24 },
    { lng: 2.35, lat: 48.8, color: '#00f5d4', glowRadius: 16 },
    { lng: 72.8, lat: 19.0, color: '#10e7b4', glowRadius: 16 },
    { lng: 4.9, lat: 52.3, color: '#06b6d4', glowRadius: 14 },
  ];

  neonHubs.forEach(({ lng, lat, color, glowRadius }) => {
    const hx = toX(lng);
    const hy = toY(lat);
    const haloGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, glowRadius);
    haloGrad.addColorStop(0, color);
    haloGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.9)');
    haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.arc(hx, hy, glowRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(hx, hy, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Clouds texture generator
function createCloudCanvasTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const numClusters = 130;
  for (let i = 0; i < numClusters; i++) {
    const latZone = (i % 3 === 0) ? (Math.random() * 20 - 10)
      : (i % 3 === 1) ? (Math.random() * 32 + 35)
      : (Math.random() * 32 - 55);

    const lng = (i / numClusters) * 360 - 180 + (Math.random() * 25 - 12);
    const x = ((lng + 180) / 360) * canvas.width;
    const y = ((90 - latZone) / 180) * canvas.height;
    const radius = 65 + Math.random() * 120;

    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const alpha = 0.22 + Math.random() * 0.42;
    grad.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
    grad.addColorStop(0.35, `rgba(240, 253, 250, ${alpha * 0.85})`);
    grad.addColorStop(0.7, `rgba(204, 251, 241, ${alpha * 0.35})`);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * 1.8, radius * 0.65, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  for (let j = 0; j < 40; j++) {
    const startX = Math.random() * canvas.width;
    const startY = Math.random() * canvas.height;
    const length = 140 + Math.random() * 260;
    const curve = (Math.random() - 0.5) * 70;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX + length * 0.5, startY + curve, startX + length, startY + curve * 0.5);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  onSelectNode,
  onOpenCinematicModal,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showGeodesic] = useState<boolean>(true);
  const [showArcs, setShowArcs] = useState<boolean>(true);
  const [showAtmosphere] = useState<boolean>(true);
  const [showClouds, setShowClouds] = useState<boolean>(true);
  const [highContrast, setHighContrast] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<GlobeNode | null>(null);
  const [cameraDistance, setCameraDistance] = useState<number>(310);

  // Three.js instances ref
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereHaloRef = useRef<THREE.Mesh | null>(null);
  const innerHazeRef = useRef<THREE.Mesh | null>(null);
  const starsGroupRef = useRef<THREE.Points | null>(null);
  const geodesicMeshRef = useRef<THREE.LineSegments | null>(null);
  const arcGroupRef = useRef<THREE.Group | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const pulsesRef = useRef<{ mesh: THREE.Mesh; progress: number; speed: number; curve: THREE.QuadraticBezierCurve3 }[]>([]);
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.6 });
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0.35, y: -0.6 });
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Loaded textures cache
  const texturesRef = useRef<{
    nasaTopo?: THREE.Texture;
    nasaNormal?: THREE.Texture;
    nasaClouds?: THREE.Texture;
    ecoCanvas?: THREE.CanvasTexture;
  }>({});

  const GLOBE_RADIUS = 100;

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2500);
    camera.position.set(0, 25, cameraDistance);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = highContrast ? 1.65 : 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Deep Space Starfield Background
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 1400;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 600 + Math.random() * 900;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);

      const isCyan = Math.random() > 0.6;
      const isGold = Math.random() > 0.85;
      if (isGold) {
        starColors[i * 3] = 1.0;
        starColors[i * 3 + 1] = 0.8;
        starColors[i * 3 + 2] = 0.2;
      } else if (isCyan) {
        starColors[i * 3] = 0.05;
        starColors[i * 3 + 1] = 0.95;
        starColors[i * 3 + 2] = 1.0;
      } else {
        starColors[i * 3] = 0.95;
        starColors[i * 3 + 1] = 0.98;
        starColors[i * 3 + 2] = 1.0;
      }
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starsMat = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });
    const starsMesh = new THREE.Points(starsGeo, starsMat);
    starsMesh.visible = false;
    starsGroupRef.current = starsMesh;
    scene.add(starsMesh);

    // Main Globe Group - Centered with slight rightward balance
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Pre-create base canvas texture
    const ecoCanvas = createEarthCanvasTexture();
    texturesRef.current.ecoCanvas = ecoCanvas;

    // 1. Earth Core Sphere with Standard Shader Material & High Contrast
    const earthGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: ecoCanvas,
      roughness: 0.28,
      metalness: 0.18,
      color: new THREE.Color('#ffffff'),
      emissive: new THREE.Color('#01221c'),
      emissiveIntensity: 0.35,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    earthMeshRef.current = earthMesh;
    globeGroup.add(earthMesh);

    // Load NASA Satellite Textures via TextureLoader
    const textureLoader = new THREE.TextureLoader();

    // 1. NASA Normal/Bump Topography
    textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
      (normalTex) => {
        texturesRef.current.nasaNormal = normalTex;
        if (earthMeshRef.current && earthMeshRef.current.material instanceof THREE.MeshStandardMaterial) {
          earthMeshRef.current.material.normalMap = normalTex;
          earthMeshRef.current.material.normalScale = new THREE.Vector2(1.25, 1.25);
          earthMeshRef.current.material.needsUpdate = true;
        }
      }
    );

    // 2. NASA Topography / Bathymetry
    textureLoader.load(
      'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/img/earth-topology.png',
      (topoTex) => {
        topoTex.wrapS = THREE.RepeatWrapping;
        topoTex.wrapT = THREE.ClampToEdgeWrapping;
        texturesRef.current.nasaTopo = topoTex;
        if (earthMeshRef.current) {
          earthMeshRef.current.material = new THREE.MeshStandardMaterial({
            map: topoTex,
            normalMap: texturesRef.current.nasaNormal,
            normalScale: new THREE.Vector2(1.2, 1.2),
            roughness: 0.5,
            metalness: 0.2,
          });
        }
      }
    );

    // 6. Cloud Layer with High-Contrast Atmosphere
    const cloudTextureFallback = createCloudCanvasTexture();
    const cloudsGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.018, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudTextureFallback,
      transparent: true,
      opacity: 0.52,
      blending: THREE.NormalBlending,
      depthWrite: false,
      roughness: 0.65,
      metalness: 0.05,
      color: new THREE.Color('#ffffff'),
      emissive: new THREE.Color('#2dd4bf'),
      emissiveIntensity: 0.15,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    cloudsMeshRef.current = cloudsMesh;
    globeGroup.add(cloudsMesh);

    textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
      (nasaCloudTex) => {
        nasaCloudTex.wrapS = THREE.RepeatWrapping;
        texturesRef.current.nasaClouds = nasaCloudTex;
        if (cloudsMeshRef.current) {
          cloudsMeshRef.current.material = new THREE.MeshStandardMaterial({
            map: nasaCloudTex,
            transparent: true,
            opacity: 0.56,
            blending: THREE.NormalBlending,
            depthWrite: false,
            roughness: 0.6,
            metalness: 0.02,
          });
        }
      }
    );

    // 3. Multi-Layer Semi-Transparent Atmosphere Sheen (Rayleigh Scattering)
    const innerHazeGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.026, 64, 64);
    const innerHazeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00f5d4'),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const innerHazeMesh = new THREE.Mesh(innerHazeGeo, innerHazeMat);
    innerHazeRef.current = innerHazeMesh;
    globeGroup.add(innerHazeMesh);

    // 4. Geodesic Triangular Network Shell
    const geodesicGeo = new THREE.IcosahedronGeometry(GLOBE_RADIUS * 1.055, 3);
    const wireframeGeo = new THREE.WireframeGeometry(geodesicGeo);
    const geodesicMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#34d399'),
      transparent: true,
      opacity: 0.32,
      linewidth: 1,
      blending: THREE.AdditiveBlending,
    });
    const geodesicMesh = new THREE.LineSegments(wireframeGeo, geodesicMat);
    geodesicMeshRef.current = geodesicMesh;
    globeGroup.add(geodesicMesh);

    // 5. Outer Atmospheric Halo Rim
    const atmosphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.15, 48, 48);
    const atmosphereMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00e5ff'),
      transparent: true,
      opacity: 0.18,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    atmosphereHaloRef.current = atmosphereMesh;
    globeGroup.add(atmosphereMesh);

    // Dynamic High-Contrast Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xd4fdf4, highContrast ? 0.95 : 1.3);
    scene.add(ambientLight);

    // Direct High-Power Key Sunlight
    const sunLight = new THREE.DirectionalLight(0xfffaed, highContrast ? 3.6 : 2.8);
    sunLight.position.set(220, 160, 260);
    scene.add(sunLight);

    // Punchy Turquoise Cyan Fill Rim Light
    const cyanFillLight = new THREE.DirectionalLight(0x00f5ff, highContrast ? 2.4 : 1.6);
    cyanFillLight.position.set(-220, -120, -200);
    scene.add(cyanFillLight);

    // Warm Gold High-Specularity Light over Euro-India Corridor
    const goldPointLight = new THREE.PointLight(0xfbbf24, highContrast ? 3.4 : 2.2, 700);
    goldPointLight.position.set(120, 160, 200);
    scene.add(goldPointLight);

    // Groups for Interactive Nodes and Arcs
    const nodesGroup = new THREE.Group();
    nodesGroupRef.current = nodesGroup;
    globeGroup.add(nodesGroup);

    const arcGroup = new THREE.Group();
    arcGroupRef.current = arcGroup;
    globeGroup.add(arcGroup);

    // Populate Glowing Futuristic Nodes with High Contrast
    GLOBE_NODES.forEach((node) => {
      const pos = latLngToVector3(node.lat, node.lng, GLOBE_RADIUS * 1.056);
      const isMajorHub = node.id === 'uk-london' || node.id === 'eu-frankfurt' || node.id === 'india-delhi';

      const ringGeo = new THREE.RingGeometry(isMajorHub ? 2.6 : 2.0, isMajorHub ? 4.8 : 3.6, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos);
      ringMesh.lookAt(0, 0, 0);
      ringMesh.userData = { type: 'node', nodeData: node };

      const dotGeo = new THREE.SphereGeometry(isMajorHub ? 2.4 : 1.8, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ffffff'),
      });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(pos);
      dotMesh.userData = { type: 'node', nodeData: node };

      const haloGeo = new THREE.SphereGeometry(isMajorHub ? 5.8 : 3.8, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(pos);

      const nodeSubGroup = new THREE.Group();
      if (isMajorHub) {
        const beaconGeo = new THREE.CylinderGeometry(0.4, 1.4, 14, 16);
        const beaconMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(node.color),
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
        });
        const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
        beaconMesh.position.copy(pos);
        beaconMesh.lookAt(pos.clone().multiplyScalar(1.5));
        beaconMesh.rotateX(Math.PI / 2);
        nodeSubGroup.add(beaconMesh);
      }

      nodeSubGroup.add(ringMesh);
      nodeSubGroup.add(dotMesh);
      nodeSubGroup.add(haloMesh);
      nodeSubGroup.userData = { nodeData: node, ring: ringMesh, isMajorHub };
      nodesGroup.add(nodeSubGroup);
    });

    // Populate Neon Arcs
    pulsesRef.current = [];
    GLOBE_ARCS.forEach((arc) => {
      const fromNode = GLOBE_NODES.find((n) => n.id === arc.fromId);
      const toNode = GLOBE_NODES.find((n) => n.id === arc.toId);
      if (!fromNode || !toNode) return;

      const p1 = latLngToVector3(fromNode.lat, fromNode.lng, GLOBE_RADIUS * 1.056);
      const p2 = latLngToVector3(toNode.lat, toNode.lng, GLOBE_RADIUS * 1.056);

      const distance = p1.distanceTo(p2);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const altitude = GLOBE_RADIUS * (1.14 + (distance / GLOBE_RADIUS) * 0.24);
      mid.normalize().multiplyScalar(altitude);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const points = curve.getPoints(60);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(arc.color),
        transparent: true,
        opacity: 1.0,
        linewidth: 3.0,
        blending: THREE.AdditiveBlending,
      });
      const lineMesh = new THREE.Line(curveGeo, lineMat);
      lineMesh.userData = { type: 'arc', arcData: arc };
      arcGroup.add(lineMesh);

      const wideLineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(arc.color),
        transparent: true,
        opacity: 0.45,
        linewidth: 6,
        blending: THREE.AdditiveBlending,
      });
      const wideLineMesh = new THREE.Line(curveGeo, wideLineMat);
      arcGroup.add(wideLineMesh);

      const pulseGeo = new THREE.SphereGeometry(2.5, 16, 16);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#ffffff'),
        blending: THREE.AdditiveBlending,
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);

      const pulseGlowGeo = new THREE.SphereGeometry(4.8, 16, 16);
      const pulseGlowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(arc.color),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const pulseGlowMesh = new THREE.Mesh(pulseGlowGeo, pulseGlowMat);
      pulseMesh.add(pulseGlowMesh);

      arcGroup.add(pulseMesh);

      pulsesRef.current.push({
        mesh: pulseMesh,
        progress: Math.random(),
        speed: 0.0035 * arc.pulseSpeed,
        curve,
      });
    });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0 && rendererRef.current && cameraRef.current) {
          cameraRef.current.aspect = newW / newH;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && !isDraggingRef.current) {
        targetRotationRef.current.y += 0.0018;
      }

      if (globeGroupRef.current) {
        currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
        currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

        globeGroupRef.current.rotation.x = currentRotationRef.current.x;
        globeGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y = elapsedTime * 0.0028;
        cloudsMeshRef.current.rotation.x = Math.sin(elapsedTime * 0.08) * 0.015;
      }

      if (atmosphereHaloRef.current) {
        const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
        atmosphereHaloRef.current.scale.set(pulse, pulse, pulse);
      }

      if (starsGroupRef.current && starsGroupRef.current.visible) {
        starsGroupRef.current.rotation.y = elapsedTime * 0.005;
      }

      pulsesRef.current.forEach((item) => {
        item.progress += item.speed;
        if (item.progress > 1) item.progress = 0;
        const currentPos = item.curve.getPoint(item.progress);
        item.mesh.position.copy(currentPos);
      });

      if (nodesGroupRef.current) {
        nodesGroupRef.current.children.forEach((group: THREE.Object3D, idx) => {
          const ring = group.userData.ring;
          const isMajorHub = group.userData.isMajorHub;
          if (ring) {
            const speedMultiplier = isMajorHub ? 4.5 : 3.0;
            const scale = 1 + Math.sin(elapsedTime * speedMultiplier + idx) * (isMajorHub ? 0.35 : 0.22);
            ring.scale.set(scale, scale, 1);
            ring.material.opacity = 0.65 + Math.sin(elapsedTime * speedMultiplier + idx) * 0.35;
          }
        });
      }

      if (geodesicMeshRef.current) {
        geodesicMeshRef.current.rotation.y = elapsedTime * 0.02;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [cameraDistance, highContrast]);

  // Apply NASA Topography material (default theme)
  useEffect(() => {
    if (!earthMeshRef.current) return;
    const tex = texturesRef.current.nasaTopo || texturesRef.current.ecoCanvas;
    earthMeshRef.current.material = new THREE.MeshStandardMaterial({
      map: tex,
      normalMap: texturesRef.current.nasaNormal,
      roughness: 0.5,
      metalness: 0.2,
    });
  }, []);

  // Handle Layer Visibility Toggles
  useEffect(() => {
    if (geodesicMeshRef.current) geodesicMeshRef.current.visible = showGeodesic;
    if (arcGroupRef.current) arcGroupRef.current.visible = showArcs;
    if (cloudsMeshRef.current) cloudsMeshRef.current.visible = showClouds;
    if (atmosphereHaloRef.current) atmosphereHaloRef.current.visible = showAtmosphere;
    if (innerHazeRef.current) innerHazeRef.current.visible = showAtmosphere;
  }, [showGeodesic, showArcs, showClouds, showAtmosphere]);

  // Pointer Interaction Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.006;
      targetRotationRef.current.x = Math.max(-1.2, Math.min(1.2, targetRotationRef.current.x + deltaY * 0.006));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    }

    if (mountRef.current && cameraRef.current && nodesGroupRef.current) {
      const rect = mountRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

      const interactableObjects: THREE.Object3D[] = [];
      nodesGroupRef.current.traverse((child) => {
        if (child.userData?.type === 'node') {
          interactableObjects.push(child);
        }
      });

      const intersects = raycaster.intersectObjects(interactableObjects, true);
      if (intersects.length > 0) {
        const topHit = intersects[0].object;
        const nodeData = topHit.userData?.nodeData || topHit.parent?.userData?.nodeData;
        if (nodeData) {
          setHoveredNode(nodeData);
          mountRef.current.style.cursor = 'pointer';
          return;
        }
      }
      setHoveredNode(null);
      mountRef.current.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab';
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;

    if (mountRef.current && cameraRef.current && nodesGroupRef.current) {
      const rect = mountRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

      const interactableObjects: THREE.Object3D[] = [];
      nodesGroupRef.current.traverse((child) => {
        if (child.userData?.type === 'node') {
          interactableObjects.push(child);
        }
      });

      const intersects = raycaster.intersectObjects(interactableObjects, true);
      if (intersects.length > 0) {
        const topHit = intersects[0].object;
        const nodeData = topHit.userData?.nodeData || topHit.parent?.userData?.nodeData;
        if (nodeData) {
          onSelectNode(nodeData);
        }
      }
    }
  };

  const handleZoom = (delta: number) => {
    setCameraDistance((prev) => {
      const next = Math.max(170, Math.min(460, prev + delta));
      if (cameraRef.current) {
        cameraRef.current.position.z = next;
      }
      return next;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    handleZoom(e.deltaY * 0.3);
  };

  const resetView = () => {
    targetRotationRef.current = { x: 0.35, y: -0.6 };
    setAutoRotate(true);
    setCameraDistance(310);
    if (cameraRef.current) cameraRef.current.position.z = 310;
  };

  return (
    <div id="interactive-globe-container" className="relative w-full h-full min-h-[560px] lg:min-h-[700px] flex items-center justify-center select-none">
      {/* 3D WebGL Viewport */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing touch-none z-10"
      />

      {/* Sleek Minimalist Top Glass Bar */}
      <div className="absolute top-3 left-3 sm:left-4 z-20 flex items-center flex-wrap gap-2">
        {/* Main Region Segment Control */}
        <div className="flex items-center gap-1 p-1 bg-white/85 backdrop-blur-xl border border-emerald-100/90 rounded-2xl shadow-sm text-xs font-semibold text-emerald-950">
          <button
            id="btn-focus-all"
            onClick={resetView}
            title="Reset to global view"
            className="px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 bg-[#007f73] text-white shadow-sm font-bold"
          >
            <GlobeIcon className="w-3.5 h-3.5" />
            <span>Global</span>
          </button>
        </div>
      </div>

      {/* Ultra-Clean Floating Controls on Right Rail */}
      <div className="absolute right-3 top-3 z-20 flex flex-col gap-1.5 bg-white/85 backdrop-blur-xl p-1.5 rounded-2xl border border-emerald-100/90 shadow-sm text-emerald-900">
        <button
          id="btn-toggle-contrast"
          title={highContrast ? 'High Contrast Mode (Active)' : 'Standard Contrast'}
          onClick={() => setHighContrast(!highContrast)}
          className={`p-2 rounded-xl transition-all flex items-center justify-center ${
            highContrast ? 'bg-[#007f73] text-white shadow-sm font-bold' : 'hover:bg-emerald-50 text-emerald-700'
          }`}
        >
          <Contrast className="w-4 h-4" />
        </button>

        <button
          id="btn-toggle-autorotate"
          title={autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-xl transition-all flex items-center justify-center ${
            autoRotate ? 'bg-emerald-100/90 text-[#007f73] font-bold' : 'hover:bg-emerald-50 text-emerald-700'
          }`}
        >
          <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin [animation-duration:8s]' : ''}`} />
        </button>

        <button
          id="btn-toggle-clouds"
          title={showClouds ? 'Hide Cloud Layer' : 'Show Cloud Layer'}
          onClick={() => setShowClouds(!showClouds)}
          className={`p-2 rounded-xl transition-all flex items-center justify-center ${
            showClouds ? 'bg-emerald-100/90 text-[#007f73]' : 'hover:bg-emerald-50 text-emerald-700 opacity-60'
          }`}
        >
          <Cloud className="w-4 h-4" />
        </button>

        <button
          id="btn-toggle-arcs"
          title={showArcs ? 'Hide Telemetry Arcs' : 'Show Telemetry Arcs'}
          onClick={() => setShowArcs(!showArcs)}
          className={`p-2 rounded-xl transition-all flex items-center justify-center ${
            showArcs ? 'bg-emerald-100/90 text-[#007f73]' : 'hover:bg-emerald-50 text-emerald-700 opacity-60'
          }`}
        >
          <Zap className="w-4 h-4" />
        </button>

        {onOpenCinematicModal && (
          <button
            id="btn-open-8k-render"
            title="View 8K Photorealistic Render"
            onClick={onOpenCinematicModal}
            className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 transition-colors text-amber-900 font-bold"
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
          </button>
        )}

        <div className="w-full h-px bg-emerald-100 my-0.5"></div>

        <button
          id="btn-zoom-in"
          title="Zoom In"
          onClick={() => handleZoom(-35)}
          className="p-2 rounded-xl hover:bg-emerald-50 transition-colors text-emerald-800"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <button
          id="btn-zoom-out"
          title="Zoom Out"
          onClick={() => handleZoom(35)}
          className="p-2 rounded-xl hover:bg-emerald-50 transition-colors text-emerald-800"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

          <button
            id="btn-reset-view"
            title="Reset Global View"
            onClick={resetView}
          className="p-2 rounded-xl hover:bg-emerald-50 transition-colors text-emerald-800"
        >
          <Compass className="w-4 h-4" />
        </button>
      </div>

      {/* Clean Bottom Status Pill */}
      <div className="absolute bottom-3 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-xs border border-emerald-100/90 shadow-sm text-emerald-950 font-medium">
        <span className="w-2 h-2 rounded-full bg-[#10e7b4] animate-pulse"></span>
        <span>Active Highway:</span>
        <span className="font-bold text-[#007f73]">Europe ↔ UK ↔ India Telemetry Active</span>
      </div>

      {/* Hover Node Tooltip Card */}
      {hoveredNode && (
        <div
          id="globe-hover-tooltip"
          className="absolute bottom-6 left-6 z-30 max-w-xs bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-emerald-200/90 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150 pointer-events-auto"
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: hoveredNode.color }}
              ></span>
              <h4 className="font-bold text-sm text-[#0f2420]">{hoveredNode.name}</h4>
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {hoveredNode.country}
            </span>
          </div>

          <p className="text-xs text-[#2d554e] line-clamp-2 mb-3 leading-relaxed">
            {hoveredNode.keyInitiative}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-100 text-xs">
            <div>
              <span className="text-[10px] text-emerald-700 font-medium block">Emissions Tracked</span>
              <span className="font-bold text-emerald-950">{hoveredNode.emissionsTracked}</span>
            </div>
            <div>
              <span className="text-[10px] text-emerald-700 font-medium block">Reduction Rate</span>
              <span className="font-bold text-[#007f73]">{hoveredNode.reductionRate}</span>
            </div>
          </div>

          <button
            onClick={() => onSelectNode(hoveredNode)}
            className="w-full mt-3 py-1.5 px-3 bg-[#007f73] hover:bg-[#00665c] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-sm"
          >
            <span>Inspect Corridor Telemetry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
