"use client";

import { useState } from "react";
import { motion } from "motion/react";
import CountUp from "@/components/dashboard/CountUp";
import { EASE } from "@/lib/animations";

export interface DonutSegment {
  key: string;
  name: string;
  value: number;
  share: number;
  color: string;
}

interface DonutProps {
  segments: DonutSegment[];
  centerValue?: number;
  centerLabel?: string;
  centerSuffix?: string;
  delay?: number;
  decimals?: number;
}

const R = 62;
const C = 2 * Math.PI * R;

export default function Donut({ segments, centerValue, centerLabel = "Total", centerSuffix = "", delay = 0, decimals = 0 }: DonutProps) {
  const [active, setActive] = useState<number | null>(null);

  const mapped = segments.reduce<(DonutSegment & { len: number; start: number; index: number })[]>((acc, s, i) => {
    const start = acc.length > 0 ? acc[acc.length - 1].start + acc[acc.length - 1].len : 0;
    acc.push({ ...s, len: s.share * C, start, index: i });
    return acc;
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center gap-[24px] md:gap-[28px]">
        <div className="relative shrink-0">
          <svg width="148" height="148" viewBox="0 0 150 150">
            <g transform="rotate(-90 75 75)">
              <circle cx="75" cy="75" r={R} fill="none" stroke="#f4f4f5" strokeWidth="14" />
              {mapped.map((s) => (
                <motion.circle
                  key={s.key}
                  cx="75"
                  cy="75"
                  r={R}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={active === s.index ? 18 : 14}
                  strokeLinecap="butt"
                  strokeDasharray={`${s.len} ${C}`}
                  initial={{ strokeDashoffset: C, opacity: 0 }}
                  whileInView={{ strokeDashoffset: -s.start, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.15 + s.index * 0.15 + delay }}
                  onMouseEnter={() => setActive(s.index)}
                  onMouseLeave={() => setActive(null)}
                  className="cursor-pointer transition-all duration-200"
                />
              ))}
            </g>
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">{active !== null ? mapped[active].name.split(" — ")[0] : centerLabel}</p>
            <p className="mt-[2px] text-[20px] font-semibold tracking-[-0.4px] tabular-nums text-black">
              {active !== null ? (
                <CountUp value={mapped[active].value} delay={delay + 0.1} />
              ) : (
                <CountUp value={centerValue ?? 0} decimals={decimals} delay={delay + 0.3} />
              )}
            </p>
            <p className="text-[10.5px] text-[#a1a1aa]">{centerSuffix}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-[10px]">
          {mapped.map((s) => (
            <div
              key={s.key}
              onMouseEnter={() => setActive(s.index)}
              onMouseLeave={() => setActive(null)}
              className={`flex cursor-default items-center gap-[10px] rounded-[8px] px-[8px] py-[5px] transition-colors duration-200 ${active === s.index ? "bg-black/[0.03]" : ""}`}
            >
              <span className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-medium text-black">{s.name}</p>
                <p className="text-[11px] tabular-nums text-[#a1a1aa]">
                  {s.value.toLocaleString()} tCO₂e · {Math.round(s.share * 100)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
