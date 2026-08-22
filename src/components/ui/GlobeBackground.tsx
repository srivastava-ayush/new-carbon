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
  "#fbbf24": "#d97706",
  "#f59e0b": "#c2710c",
  "#10e7b4": "#10b981",
  "#34d399": "#059669",
};

const tint = (hex: string) => PALETTE[hex] ?? hex;

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/* Procedural light "porcelain" earth texture — replaces remote NASA fetches. */
function createEarthTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const ocean = ctx.createLinearGradient(0, 0, 0, h);
  ocean.addColorStop(0, "#e7f2ea");
  ocean.addColorStop(0.5, "#dcf0e3");
  ocean.addColorStop(1, "#e7f2ea");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(20, 120, 80, 0.07)";
  ctx.lineWidth = 1;
  for (let lat = -75; lat <= 75; lat += 15) {
    const y = ((90 - lat) / 180) * h;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let lng = -180; lng < 180; lng += 20) {
    const x = ((lng + 180) / 360) * w;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  const toX = (lng: number) => ((lng + 180) / 360) * w;
  const toY = (lat: number) => ((90 - lat) / 180) * h;

  const land = (coords: [number, number][], fill: string, stroke: string, lw = 2) => {
    if (!coords.length) return;
    ctx.beginPath();
    ctx.moveTo(toX(coords[0][0]), toY(coords[0][1]));
    for (let i = 1; i < coords.length; i++) {
      ctx.lineTo(toX(coords[i][0]), toY(coords[i][1]));
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const baseFill = "#c3e2cf";
  const deepFill = "#aad8bd";
  const edge = "rgba(22, 163, 74, 0.4)";

  land(
    [
      [-9, 36], [-8, 43], [2, 48], [4, 53], [9, 54], [10, 58], [24, 70], [30, 71],
      [60, 72], [90, 73], [120, 73], [170, 66], [180, 60], [140, 50], [130, 42],
      [121, 31], [110, 20], [105, 10], [98, 12], [88, 22], [80, 13], [77, 8],
      [72, 19], [68, 25], [60, 25], [50, 30], [35, 32], [30, 31], [25, 36],
      [15, 38], [5, 36], [-5, 36],
    ],
    baseFill, edge,
  );

  land(
    [
      [-5, 50], [-1, 50.8], [1.5, 51.5], [1.7, 52.8], [0.2, 54.2], [-2, 57.2],
      [-4, 58.5], [-5.5, 58], [-6, 56.5], [-4.8, 54.8], [-3.2, 53.5],
    ],
    deepFill, edge, 2.2,
  );

  land([[-10.2, 51.5], [-6.2, 52], [-5.8, 55], [-9, 55.4], [-10.5, 53]], deepFill, edge, 1.8);

  land(
    [
      [68, 24], [72, 32], [77, 36], [82, 30], [88, 27], [92, 25], [89, 21],
      [85, 20], [80, 13], [77.5, 8.2], [76, 10], [73, 16], [70, 21],
    ],
    deepFill, edge, 2.4,
  );

  land(
    [
      [-17, 14], [-17, 21], [-5, 36], [10, 37], [32, 31], [43, 12], [51, 11],
      [40, -4], [35, -20], [28, -33], [18, -34], [12, -18], [9, 4], [0, 6], [-13, 9],
    ],
    baseFill, edge,
  );

  land(
    [
      [-168, 65], [-140, 70], [-100, 75], [-60, 65], [-65, 45], [-75, 35],
      [-80, 25], [-97, 26], [-105, 20], [-80, 8], [-95, 15], [-110, 30],
      [-124, 40], [-125, 50], [-140, 60],
    ],
    baseFill, edge,
  );

  land(
    [
      [-80, 8], [-60, 10], [-35, -5], [-38, -15], [-50, -30], [-65, -55],
      [-75, -50], [-70, -20], [-80, -5],
    ],
    baseFill, edge,
  );

  land(
    [
      [114, -22], [130, -12], [145, -15], [153, -28], [148, -38], [136, -35],
      [115, -34], [113, -25],
    ],
    baseFill, edge,
  );

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function createCloudTexture(): THREE.CanvasTexture {
  const w = 640;
  const h = 320;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  for (let i = 0; i < 70; i++) {
    const latZone =
      i % 3 === 0
        ? Math.random() * 24 - 12
        : i % 3 === 1
          ? Math.random() * 30 + 38
          : Math.random() * 30 - 52;
    const lng = (i / 70) * 360 - 180 + (Math.random() * 28 - 14);
    const x = ((lng + 180) / 360) * w;
    const y = ((90 - latZone) / 180) * h;
    const r = 26 + Math.random() * 44;
    const a = 0.1 + Math.random() * 0.16;

    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(x, y, r * 1.9, r * 0.6, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

// __PART2__
