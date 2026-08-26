"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import { useDashboardContext } from "@/hooks/useDashboardContext";

export default function ActivityStatsPanel({ delay = 0 }: { delay?: number }) {
  const { data: { ACTIVITY_STATS } } = useDashboardContext();

  const stats = [
    { label: "Total", value: ACTIVITY_STATS.total, dot: "#a1a1aa" },
    { label: "Draft", value: ACTIVITY_STATS.draft, dot: "#d4d4d8" },
    { label: "Submitted", value: ACTIVITY_STATS.submitted, dot: "#3b82f6" },
    { label: "Under Review", value: ACTIVITY_STATS.underReview, dot: "#f97316" },
    { label: "Verified", value: ACTIVITY_STATS.verified, dot: "#16a34a" },
    { label: "Calculated", value: ACTIVITY_STATS.calculated, dot: "#188f8b" },
    { label: "Rejected", value: ACTIVITY_STATS.rejected, dot: "#ef4444" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="flex flex-wrap items-center gap-x-[22px] gap-y-[8px] rounded-[12px] border border-black/[0.06] bg-white px-[18px] py-[11px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-[7px]">
          <span className="h-[6px] w-[6px] rounded-full" style={{ backgroundColor: stat.dot }} />
          <span className="text-[11.5px] font-medium text-[#71717a]">{stat.label}</span>
          <span className="text-[12.5px] font-semibold tabular-nums text-black">{stat.value}</span>
        </div>
      ))}
    </motion.div>
  );
}
