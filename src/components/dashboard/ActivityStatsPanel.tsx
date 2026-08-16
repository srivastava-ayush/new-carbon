"use client";

import { useDashboardContext } from "@/hooks/useDashboardContext";
import { CheckCircle, ClockCounterClockwise, WarningCircle, FileText, PauseCircle, Calculator, Prohibit } from "@phosphor-icons/react";

export default function ActivityStatsPanel({ delay = 0 }: { delay?: number }) {
  const { data: { ACTIVITY_STATS } } = useDashboardContext();

  const stats = [
    { label: "Total", value: ACTIVITY_STATS.total, icon: <FileText size={18} />, color: "text-[#71717a]", bg: "bg-[#f4f4f5]" },
    { label: "Draft", value: ACTIVITY_STATS.draft, icon: <PauseCircle size={18} />, color: "text-[#a1a1aa]", bg: "bg-black/[0.04]" },
    { label: "Submitted", value: ACTIVITY_STATS.submitted, icon: <ClockCounterClockwise size={18} />, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Under Review", value: ACTIVITY_STATS.underReview, icon: <WarningCircle size={18} />, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Verified", value: ACTIVITY_STATS.verified, icon: <CheckCircle size={18} />, color: "text-green-600", bg: "bg-green-100" },
    { label: "Calculated", value: ACTIVITY_STATS.calculated, icon: <Calculator size={18} />, color: "text-[#0d3b2d]", bg: "bg-[#16a34a]/20" },
    { label: "Rejected", value: ACTIVITY_STATS.rejected, icon: <Prohibit size={18} />, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-[12px] rounded-[12px] border border-black/[0.06] bg-white p-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className={`flex h-[36px] w-[36px] items-center justify-center rounded-[8px] ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-medium text-[#71717a]">{stat.label}</span>
              <span className="text-[16px] font-semibold text-black">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
