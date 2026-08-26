"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import { useDashboardContext } from "@/hooks/useDashboardContext";

const SCOPE_COLORS: Record<string, string> = {
  scope1: "#188f8b",
  scope2: "#43b0a9",
  scope3: "#a7dcd6",
};

const LEGEND = [
  { key: "scope1", label: "Scope 1" },
  { key: "scope2", label: "Scope 2" },
  { key: "scope3", label: "Scope 3" },
];

export default function StackedScopeBars({ delay = 0 }: { delay?: number }) {
  const { data: { MONTHLY } } = useDashboardContext();
  const [hover, setHover] = useState<number | null>(null);

  const totals = MONTHLY.map((m: any) => m.total);
  const max = MONTHLY.length ? Math.max(...totals) : 0;
  const niceMax = Math.max(Math.ceil(max / 100) * 100, 100);

  const hv = hover !== null ? MONTHLY[hover] : null;

  return (
    <div className="relative">
      <div className="flex items-center justify-end gap-[14px]">
        {LEGEND.map((l) => (
          <span key={l.key} className="flex items-center gap-[5px] text-[11px] font-medium text-[#71717a]">
            <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: SCOPE_COLORS[l.key] }} />
            {l.label}
          </span>
        ))}
      </div>

      <div className="relative mt-[14px] h-[260px] w-full">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => {
          const val = Math.round(niceMax * (1 - t));
          return (
            <div key={t} className="absolute inset-x-0 flex items-center gap-[8px]" style={{ top: `${t * 100}%` }}>
              <span className="w-[36px] shrink-0 text-right text-[10px] tabular-nums text-[#a1a1aa]">{val}</span>
              <div className="h-px flex-1 border-t border-dashed border-black/[0.08]" />
            </div>
          );
        })}

        <div className="absolute inset-0 flex items-end gap-[6px] pl-[44px] md:gap-[10px]">
          {MONTHLY.map((m: any, i: number) => {
            const pct = (m.total / niceMax) * 100;
            const active = hover === i;
            const segments = [
              { key: "scope1", value: m.scope1 },
              { key: "scope2", value: m.scope2 },
              { key: "scope3", value: m.scope3 },
            ];
            return (
              <div
                key={m.month}
                className="flex h-full min-w-0 flex-1 cursor-default flex-col"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="relative flex h-full flex-col justify-end">
                  <div
                    className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-[10px] border border-black/[0.06] bg-white px-[12px] py-[8px] shadow-[0_12px_30px_rgba(0,0,0,0.1)] transition-opacity duration-150 ${
                      active ? "opacity-100" : "opacity-0"
                    } ${
                      i === 0
                        ? "left-0"
                        : i === MONTHLY.length - 1
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                    }`}
                    style={{ bottom: `calc(${pct}% + 10px)` }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">{hv?.month ?? m.month}</p>
                    <p className="mt-[2px] text-[14px] font-semibold tabular-nums text-black">{m.total} tCO₂e</p>
                    <div className="mt-[5px] space-y-[2px]">
                      {segments.map((s) => (
                        <p key={s.key} className="flex items-center gap-[6px] text-[11px] text-[#71717a]">
                          <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: SCOPE_COLORS[s.key] }} />
                          {s.key === "scope1" ? "S1" : s.key === "scope2" ? "S2" : "S3"} · {s.value}
                        </p>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${pct}%` }}
                    transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.05 }}
                    className="flex w-full flex-col-reverse overflow-hidden rounded-t-[6px]"
                    style={{ opacity: active ? 1 : 0.9, transition: "opacity 0.2s" }}
                  >
                    {segments.map((s) => (
                      <div
                        key={s.key}
                        style={{
                          height: m.total > 0 ? `${(s.value / m.total) * 100}%` : "0%",
                          backgroundColor: SCOPE_COLORS[s.key],
                        }}
                      />
                    ))}
                  </motion.div>
                </div>

                <p
                  className={`mt-[8px] truncate text-center text-[10.5px] font-medium transition-colors duration-200 ${
                    active ? "text-[#188f8b]" : "text-[#a1a1aa]"
                  }`}
                >
                  {m.month}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
