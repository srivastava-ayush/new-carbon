"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import { MONTHLY } from "@/lib/demo-data";

const SCOPE_COLORS: Record<string, string> = {
  scope1: "#15803d",
  scope2: "#22c55e",
  scope3: "#86efac",
};

type Pt = [number, number];

function smoothSegments(pts: Pt[]) {
  const segs: { c1: Pt; c2: Pt; p: Pt }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    segs.push({ c1, c2, p: p2 });
  }
  return segs;
}

function layerPath(top: Pt[], bottom: Pt[]) {
  const tSegs = smoothSegments(top);
  const bSegs = smoothSegments(bottom);
  let d = `M ${top[0][0].toFixed(1)},${top[0][1].toFixed(1)}`;
  for (const s of tSegs) d += ` C ${s.c1[0].toFixed(1)},${s.c1[1].toFixed(1)} ${s.c2[0].toFixed(1)},${s.c2[1].toFixed(1)} ${s.p[0].toFixed(1)},${s.p[1].toFixed(1)}`;
  d += ` L ${bottom[bottom.length - 1][0].toFixed(1)},${bottom[bottom.length - 1][1].toFixed(1)}`;
  for (let i = bSegs.length - 1; i >= 0; i--) {
    const s = bSegs[i];
    const end: Pt = i > 0 ? bottom[i] : bottom[0];
    d += ` C ${s.c2[0].toFixed(1)},${s.c2[1].toFixed(1)} ${s.c1[0].toFixed(1)},${s.c1[1].toFixed(1)} ${end[0].toFixed(1)},${end[1].toFixed(1)}`;
  }
  return d + " Z";
}

function linePath(pts: Pt[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (const s of smoothSegments(pts)) d += ` C ${s.c1[0].toFixed(1)},${s.c1[1].toFixed(1)} ${s.c2[0].toFixed(1)},${s.c2[1].toFixed(1)} ${s.p[0].toFixed(1)},${s.p[1].toFixed(1)}`;
  return d;
}

const MODES = [
  { key: "stacked", label: "All scopes" },
  { key: "scope1", label: "Scope 1" },
  { key: "scope2", label: "Scope 2" },
  { key: "scope3", label: "Scope 3" },
];

export default function AreaChart({ delay = 0, defaultMode = "stacked" }: { delay?: number; defaultMode?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => setW(entries[0].contentRect.width));
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const h = 260;
  const padL = 44;
  const padR = 12;
  const padT = 18;
  const padB = 28;

  const totals = MONTHLY.map((m) => m.total);
  const niceMax = Math.ceil(Math.max(...totals) / 100) * 100;
  const innerW = Math.max(w - padL - padR, 0);
  const innerH = h - padT - padB;

  const x = (i: number) => padL + (i / (MONTHLY.length - 1)) * innerW;
  const y = (v: number) => padT + (1 - v / niceMax) * innerH;
  const baseY = padT + innerH;

  const cum1 = MONTHLY.map((m) => m.scope1);
  const cum2 = MONTHLY.map((m) => m.scope1 + m.scope2);
  const cum3 = MONTHLY.map((m) => m.total);

  const pts = (vals: number[]) => vals.map((v, i) => [x(i), y(v)] as Pt);
  const base = MONTHLY.map((_, i) => [x(i), baseY] as Pt);

  const stackedLayers = [
    { key: "scope3", color: SCOPE_COLORS.scope3, top: pts(cum1), bottom: base, fill: "url(#grad-s3)" },
    { key: "scope2", color: SCOPE_COLORS.scope2, top: pts(cum2), bottom: pts(cum1), fill: "url(#grad-s2)" },
    { key: "scope1", color: SCOPE_COLORS.scope1, top: pts(cum3), bottom: pts(cum2), fill: "url(#grad-s1)" },
  ];

  const single = mode === "stacked" ? null : MONTHLY.map((m) => (mode as "scope1" | "scope2" | "scope3") === "scope1" ? m.scope1 : (mode as "scope1" | "scope2" | "scope3") === "scope2" ? m.scope2 : m.scope3);
  const singleColor = SCOPE_COLORS[mode];
  const singlePts = single ? pts(single) : [];
  const singleArea = single ? layerPath(singlePts, base) : "";
  const totalPath = linePath(pts(cum3));

  const handleMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left - padL) / (rect.width - padL - padR);
    const idx = Math.round(ratio * (MONTHLY.length - 1));
    setHover(Math.max(0, Math.min(MONTHLY.length - 1, idx)));
  };

  const hv = hover !== null ? MONTHLY[hover] : null;

  return (
    <div className="relative">
      <div className="flex flex-wrap items-start justify-between gap-[12px]">
        <div>
          <p className="text-[13.5px] font-semibold tracking-[-0.1px] text-black">Emissions over time</p>
          <p className="mt-[2px] text-[12px] text-[#71717a]">Total CO₂e per month, broken down by scope</p>
        </div>

        <div className="flex items-center gap-[2px] rounded-[8px] border border-black/[0.06] bg-[#fafafa] p-[2px]">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`relative rounded-[6px] px-[10px] py-[4px] text-[11.5px] font-medium transition-colors duration-200 ${
                mode === m.key ? "text-black" : "text-[#71717a] hover:text-black"
              }`}
            >
              {mode === m.key && (
                <motion.span
                  layoutId="area-mode"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  className="absolute inset-0 rounded-[6px] border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
                />
              )}
              <span className="relative z-10">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div ref={containerRef} className="relative mt-[18px] h-[260px] w-full">
        {w > 0 && (
          <svg
            width={w}
            height={h}
            onMouseMove={handleMove}
            onMouseLeave={() => setHover(null)}
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="grad-s1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#15803d" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#15803d" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="grad-s2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="grad-s3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#86efac" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#86efac" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="grad-single" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={singleColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={singleColor} stopOpacity="0" />
              </linearGradient>
            </defs>

            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const gy = padT + t * innerH;
              return (
                <g key={t}>
                  <line x1={padL} x2={w - padR} y1={gy} y2={gy} stroke="#000000" strokeOpacity={0.05} />
                  <text x={padL - 8} y={gy + 3} textAnchor="end" fontSize="10" fill="#a1a1aa" fontFamily="inherit">
                    {Math.round(niceMax * (1 - t))}
                  </text>
                </g>
              );
            })}

            {mode === "stacked" &&
              stackedLayers.map((layer, i) => (
                <motion.g
                  key={layer.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: delay + 0.2 + i * 0.25 }}
                >
                  <path d={layerPath(layer.top, layer.bottom)} fill={layer.fill} stroke="none" />
                  <path d={linePath(layer.top)} fill="none" stroke={layer.color} strokeWidth="1.5" strokeOpacity="0.9" strokeLinecap="round" />
                </motion.g>
              ))}

            {mode !== "stacked" && single && (
              <>
                <motion.path
                  d={singleArea}
                  fill="url(#grad-single)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: EASE, delay: delay + 0.2 }}
                />
                <motion.path
                  d={linePath(singlePts)}
                  fill="none"
                  stroke={singleColor}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: EASE, delay }}
                />
              </>
            )}

            {mode === "stacked" && (
              <motion.path
                d={totalPath}
                fill="none"
                stroke="#15803d"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, ease: EASE, delay }}
              />
            )}

            {MONTHLY.map((m, i) => (
              <text
                key={m.month}
                x={x(i)}
                y={h - 8}
                textAnchor="middle"
                fontSize="10.5"
                fill={hover === i ? "#15803d" : "#a1a1aa"}
                fontWeight={hover === i ? 600 : 400}
                fontFamily="inherit"
              >
                {m.month}
              </text>
            ))}

            {hover !== null && (
              <g>
                <line
                  x1={x(hover)}
                  x2={x(hover)}
                  y1={padT}
                  y2={baseY}
                  stroke="#000000"
                  strokeOpacity={0.12}
                  strokeDasharray="3 3"
                />
                <circle
                  cx={x(hover)}
                  cy={mode === "stacked" ? y(cum3[hover]) : y(single![hover])}
                  r="4.5"
                  fill="#fff"
                  stroke="#15803d"
                  strokeWidth="2"
                />
              </g>
            )}
          </svg>
        )}

        {hv && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none absolute z-10 rounded-[10px] border border-black/[0.06] bg-white px-[14px] py-[10px] shadow-[0_12px_30px_rgba(0,0,0,0.1)]"
            style={{
              left: Math.min(Math.max((x(hover!) / w) * 100, 24), 76),
              top: padT - 6,
              transform: "translateX(-50%)",
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">Jul {hv.month} 26</p>
            <p className="mt-[3px] text-[15px] font-semibold tabular-nums text-black">{hv.total} tCO₂e</p>
            <div className="mt-[6px] space-y-[2px]">
              <p className="flex items-center gap-[6px] text-[11px] text-[#71717a]">
                <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: SCOPE_COLORS.scope1 }} /> S1 · {hv.scope1}
              </p>
              <p className="flex items-center gap-[6px] text-[11px] text-[#71717a]">
                <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: SCOPE_COLORS.scope2 }} /> S2 · {hv.scope2}
              </p>
              <p className="flex items-center gap-[6px] text-[11px] text-[#71717a]">
                <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: SCOPE_COLORS.scope3 }} /> S3 · {hv.scope3}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
