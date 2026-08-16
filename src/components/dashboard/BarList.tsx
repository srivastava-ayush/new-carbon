"use client";

import { useState } from "react";
import { motion } from "motion/react";
import CountUp from "@/components/dashboard/CountUp";
import { EASE } from "@/lib/animations";

interface BarRow {
  label: string;
  value: number;
  sublabel?: string;
  badge?: string;
}

interface BarListProps {
  rows: BarRow[];
  valueLabel?: string;
  delay?: number;
  color?: string;
}

export default function BarList({ rows, valueLabel = "tCO₂e", delay = 0, color = "#16a34a" }: BarListProps) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...rows.map((r) => r.value));

  return (
    <div className="flex flex-col gap-[14px]">
      <div className="flex items-center justify-between text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">
        <span>Source</span>
        <span>{valueLabel}</span>
      </div>

      {rows.map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: EASE, delay: delay + i * 0.07 }}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          className="group cursor-default"
        >
          <div className="mb-[6px] flex items-baseline justify-between gap-[12px]">
            <div className="flex min-w-0 items-baseline gap-[8px]">
              <span
                className={`truncate text-[12.5px] font-medium transition-colors duration-200 ${
                  hover === i ? "text-black" : "text-[#52525b]"
                }`}
              >
                {row.label}
              </span>
              {row.badge && (
                <span className="shrink-0 rounded-[5px] border border-black/[0.08] bg-[#fafafa] px-[5px] py-[1px] text-[10px] font-semibold text-[#71717a]">
                  {row.badge}
                </span>
              )}
              {row.sublabel && <span className="hidden truncate text-[11px] text-[#a1a1aa] sm:inline">{row.sublabel}</span>}
            </div>
            <span className={`shrink-0 text-[12.5px] font-semibold tabular-nums transition-colors duration-200 ${hover === i ? "text-[#15803d]" : "text-black"}`}>
              <CountUp value={row.value} delay={delay + i * 0.07} /> <span className="text-[10.5px] font-medium text-[#a1a1aa]">{valueLabel}</span>
            </span>
          </div>
          <div className="h-[7px] w-full overflow-hidden rounded-full bg-black/[0.045]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(row.value / max) * 100}%` }}
              transition={{ duration: 1.1, ease: EASE, delay: delay + 0.1 + i * 0.07 }}
              className={`h-full rounded-full transition-colors duration-300 ${hover === i ? "" : ""}`}
              style={{
                background: hover === i ? "#15803d" : `linear-gradient(90deg, ${color}, #4ade80)`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
