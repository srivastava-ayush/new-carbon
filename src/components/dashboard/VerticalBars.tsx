"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/animations";

export interface BarDatum {
  label: string;
  value: number;
  color?: string;
}

interface VerticalBarsProps {
  data: BarDatum[];
  height?: number;
  delay?: number;
  suffix?: string;
  gridLines?: number;
}

export default function VerticalBars({ data, height = 220, delay = 0, suffix = "", gridLines = 4 }: VerticalBarsProps) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value));
  const niceMax = Math.ceil(max / 100) * 100;

  return (
    <div>
      <div className="relative" style={{ height }}>
        {Array.from({ length: gridLines }).map((_, i) => {
          const t = i / (gridLines - 1);
          const val = Math.round(niceMax * (1 - t));
          return (
            <div
              key={i}
              className="absolute inset-x-0 flex items-center gap-[8px]"
              style={{ top: `${t * 100}%` }}
            >
              <span className="w-[44px] shrink-0 text-right text-[10px] tabular-nums text-[#a1a1aa]">{val}</span>
              <div className="h-px flex-1 border-t border-dashed border-black/[0.08]" />
            </div>
          );
        })}

        <div className="absolute inset-0 flex items-end gap-[8px] md:gap-[14px]">
          {data.map((d, i) => {
            const pct = (d.value / niceMax) * 100;
            const active = hover === i;
            return (
              <div
                key={d.label}
                className="group flex h-full min-w-0 flex-1 cursor-default flex-col justify-end"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="relative flex h-full flex-col justify-end">
                  <div
                    className={`pointer-events-none absolute -top-[2px] left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[7px] border border-black/[0.06] bg-white px-[8px] py-[4px] text-[11px] font-semibold tabular-nums text-black shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-150 ${
                      active ? "translate-y-[-100%] opacity-100" : "translate-y-[calc(-100%-6px)] opacity-0"
                    }`}
                  >
                    {d.value.toLocaleString()}
                    {suffix}
                  </div>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.08 }}
                    className="relative w-full overflow-hidden rounded-t-[6px]"
                    style={{
                      background: active
                        ? d.color ?? "#15803d"
                        : `linear-gradient(180deg, ${d.color ?? "#22c55e"}, ${d.color ?? "#16a34a"}90)`,
                      opacity: active ? 1 : 0.85,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-white/30" />
                  </motion.div>
                </div>

                <p
                  className={`mt-[8px] truncate text-center text-[10.5px] font-medium transition-colors duration-200 ${
                    active ? "text-[#15803d]" : "text-[#a1a1aa]"
                  }`}
                >
                  {d.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
