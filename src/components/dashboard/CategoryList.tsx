"use client";

import { useState } from "react";
import { motion } from "motion/react";
import CountUp from "@/components/dashboard/CountUp";
import { EASE } from "@/lib/animations";
import { useDashboardContext } from "@/hooks/useDashboardContext";

export default function CategoryList({ delay = 0 }: { delay?: number }) {
  const { data: { CATEGORIES } } = useDashboardContext();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-[18px] flex items-center justify-between">
        <div>
          <p className="text-[13.5px] font-semibold tracking-[-0.1px] text-black">Biggest sources</p>
          <p className="mt-[2px] text-[12px] text-[#71717a]">Emissions by category</p>
        </div>
        <span className="text-[11.5px] font-medium text-[#a1a1aa]">tCO₂e</span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-[14px]">
        {CATEGORIES.map((c: any, i: number) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.05 * i + delay }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="group cursor-default"
          >
            <div className="mb-[6px] flex items-baseline justify-between gap-[12px] text-[12.5px]">
              <span className={`flex min-w-0 items-baseline gap-[8px] font-medium transition-colors duration-200 ${hover === i ? "text-black" : "text-[#52525b]"}`}>
                <span className="truncate">{c.name}</span>
                <span className="shrink-0 text-[10.5px] font-semibold text-[#a1a1aa]">{c.scope}</span>
              </span>
              <span className="flex shrink-0 items-baseline gap-[8px]">
                <span className={`text-[10.5px] tabular-nums transition-colors duration-200 ${c.trend < 0 ? "text-[#16a34a]" : "text-[#a1a1aa]"}`}>
                  {c.trend > 0 ? "+" : ""}
                  {c.trend}%
                </span>
                <span className={`font-semibold tabular-nums transition-colors duration-200 ${hover === i ? "text-[#15803d]" : "text-black"}`}>
                  <CountUp value={c.value} delay={delay + 0.1 * i} />
                </span>
              </span>
            </div>
            <div className="h-[6px] w-full overflow-hidden rounded-full bg-black/[0.045]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(c.value / CATEGORIES[0].value) * 100}%` }}
                transition={{ duration: 1, ease: EASE, delay: 0.1 * i + delay }}
                className={`h-full rounded-full transition-colors duration-300 ${
                  hover === i ? "bg-[#15803d]" : "bg-gradient-to-r from-[#16a34a] to-[#4ade80]"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
