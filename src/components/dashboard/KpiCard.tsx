"use client";

import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react";
import CountUp from "@/components/dashboard/CountUp";
import Sparkline from "@/components/dashboard/Sparkline";
import { EASE } from "@/lib/animations";
import type { Kpi } from "@/lib/demo-data";

export default function KpiCard({ kpi, delay }: { kpi: Kpi; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      whileHover={{ y: -2 }}
      className="group flex flex-col rounded-[14px] border border-black/[0.06] bg-white p-[18px]"
    >
      <div className="flex items-center justify-between gap-[8px]">
        <p className="text-[12.5px] font-medium text-[#71717a]">{kpi.label}</p>
        <span
          className={`flex shrink-0 items-center gap-[2px] rounded-full px-[6px] py-[2px] text-[10.5px] font-semibold tabular-nums ${
            kpi.good ? "bg-[#f0fdf4] text-[#15803d]" : "bg-[#fef2f2] text-[#dc2626]"
          }`}
        >
          {kpi.delta >= 0 ? <ArrowUpRight size={11} weight="bold" /> : <ArrowDownRight size={11} weight="bold" />}
          {Math.abs(kpi.delta)}%
        </span>
      </div>

      <div className="mt-[12px] flex items-end justify-between gap-[12px]">
        <p className="text-[25px] font-semibold leading-none tracking-[-0.8px] tabular-nums text-black">
          <CountUp value={kpi.value} decimals={kpi.decimals ?? 0} suffix={kpi.suffix} delay={delay + 0.15} />
        </p>
        <Sparkline data={kpi.spark} color={kpi.good ? "#16a34a" : "#dc2626"} />
      </div>

      <p className="mt-[10px] text-[11.5px] text-[#a1a1aa]">{kpi.deltaLabel}</p>
    </motion.div>
  );
}
