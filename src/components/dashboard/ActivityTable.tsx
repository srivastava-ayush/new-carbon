"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Clock, DotsThree, WarningCircle } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";
import { useDashboardContext } from "@/hooks/useDashboardContext";
import { useAuth } from "@/context/AuthContext";
import { Plus } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useState } from "react";

const STATUS = {
  Synced: { icon: CheckCircle, cls: "text-[#16a34a] bg-[#f0fdf4] border-[#16a34a]/20" },
  Processed: { icon: Clock, cls: "text-[#0891b2] bg-[#ecfeff] border-[#06b6d4]/20" },
  "Needs review": { icon: WarningCircle, cls: "text-[#d97706] bg-[#fffbeb] border-[#f59e0b]/20" },
} as const;

export default function ActivityTable({ delay = 0 }: { delay?: number }) {
  const { data: { ACTIVITY } } = useDashboardContext();
  const { user } = useAuth();
  const canAddData = ["SUPER_ADMIN", "UNIVERSITY_ADMIN", "DATA_ENTRY"].includes(user?.role || "");
  const canReview = ["SUPER_ADMIN", "UNIVERSITY_ADMIN", "REVIEWER", "AUDITOR"].includes(user?.role || "");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const hasData = ACTIVITY && ACTIVITY.length > 0;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13.5px] font-semibold tracking-[-0.1px] text-black">Recent activity</p>
          <p className="mt-[2px] text-[12px] text-[#71717a]">Latest data processed from your sources</p>
        </div>
        <div className="flex items-center gap-[12px]">
          {canAddData && (
            <button 
              onClick={() => toast.success("Data entry form will be opened")}
              className="flex items-center gap-[4px] rounded-full bg-[#16a34a] px-[12px] py-[4px] text-[11px] font-semibold text-white transition-colors hover:bg-[#15803d]"
            >
              <Plus size={12} weight="bold" />
              Add data
            </button>
          )}
          <button className="flex items-center gap-[4px] text-[12px] font-semibold text-[#15803d] transition-colors hover:text-[#0d3b2d]">
            View all <ArrowRight size={12} weight="bold" />
          </button>
        </div>
      </div>

      <div className="mt-[14px] flex-1 overflow-x-auto min-h-[250px]">
        {hasData ? (
          <table className="w-full min-w-[560px] border-collapse relative">
            <thead>
              <tr className="text-left text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">
                <th className="pb-[8px] pr-[16px] font-semibold">Source</th>
                <th className="pb-[8px] pr-[16px] font-semibold">Category</th>
                <th className="pb-[8px] pr-[16px] font-semibold">Scope</th>
                <th className="pb-[8px] pr-[16px] text-right font-semibold">CO₂e</th>
                <th className="pb-[8px] font-semibold">Status</th>
                <th className="pb-[8px] font-semibold w-[40px]"></th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY.map((row: any, i: number) => {
                const st = STATUS[row.status as keyof typeof STATUS] || STATUS.Synced;
                const Icon = st.icon;
                return (
                  <motion.tr
                    key={row.source}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.06 * i + delay }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.025)" }}
                    className="group border-t border-black/[0.05] cursor-default relative"
                  >
                    <td className="py-[11px] pr-[16px]">
                      <p className="text-[13px] font-medium text-black">{row.source}</p>
                      <p className="text-[11px] text-[#a1a1aa]">Auto-synced 2h ago</p>
                    </td>
                    <td className="py-[11px] pr-[16px] text-[12.5px] text-[#52525b]">{row.type}</td>
                    <td className="py-[11px] pr-[16px]">
                      <span className="rounded-[6px] border border-black/[0.08] bg-[#fafafa] px-[6px] py-[2px] text-[10.5px] font-semibold text-[#71717a]">
                        {row.scope}
                      </span>
                    </td>
                    <td className="py-[11px] pr-[16px] text-right text-[13px] font-semibold text-black tabular-nums">
                      {row.value}
                    </td>
                    <td className="py-[11px]">
                      <span className={`inline-flex items-center gap-[5px] rounded-full border px-[8px] py-[2px] text-[11px] font-medium ${st.cls}`}>
                        <Icon size={12} weight="fill" />
                        {row.status}
                      </span>
                    </td>
                    <td className="py-[11px] pl-[8px] relative text-right">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveMenu(activeMenu === row.source ? null : row.source);
                        }}
                        className="text-[#d4d4d8] transition-colors duration-200 hover:text-black focus:outline-none"
                      >
                        <DotsThree size={16} className={activeMenu === row.source ? "text-black opacity-100" : "opacity-0 group-hover:opacity-100"} />
                      </button>
                      
                      {activeMenu === row.source && (
                        <div className="absolute right-0 top-[30px] z-10 w-[120px] rounded-[8px] border border-black/[0.06] bg-white p-[6px] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                          {canReview && row.status === "Needs review" && (
                            <>
                              <button 
                                onClick={() => { setActiveMenu(null); toast.success("Activity approved"); }}
                                className="w-full rounded-[6px] px-[8px] py-[6px] text-left text-[12px] font-medium text-[#16a34a] hover:bg-black/[0.04]"
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => { setActiveMenu(null); toast.error("Activity rejected"); }}
                                className="w-full rounded-[6px] px-[8px] py-[6px] text-left text-[12px] font-medium text-red-600 hover:bg-black/[0.04]"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {canAddData && (
                            <button 
                              onClick={() => { setActiveMenu(null); toast.info("Edit mode active"); }}
                              className="w-full rounded-[6px] px-[8px] py-[6px] text-left text-[12px] font-medium text-[#52525b] hover:bg-black/[0.04]"
                            >
                              Edit log
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex h-[200px] flex-col items-center justify-center rounded-[12px] border border-dashed border-black/[0.1] bg-[#fafafa]">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#f4f4f5]">
              <Clock size={20} className="text-[#a1a1aa]" />
            </div>
            <p className="mt-[12px] text-[13px] font-medium text-black">No recent activity</p>
            <p className="mt-[4px] text-[12px] text-[#71717a]">
              {canAddData ? "Click 'Add data' to log your first emission." : "Waiting for new data logs to be processed."}
            </p>
          </div>
        )}
      </div>

      {hasData && (
        <div className="mt-[12px] flex items-center justify-between border-t border-black/[0.05] pt-[10px]">
          <p className="text-[11.5px] text-[#a1a1aa]">Showing {ACTIVITY.length} records</p>
          <div className="flex items-center gap-[2px]">
            <button className="flex h-[26px] items-center justify-center rounded-[6px] border border-black/[0.08] bg-white px-[8px] text-[11.5px] font-medium text-[#a1a1aa]">Prev</button>
            <button className="flex h-[26px] items-center justify-center rounded-[6px] bg-[#16a34a] px-[9px] text-[11.5px] font-semibold text-white">1</button>
            <button className="flex h-[26px] items-center justify-center rounded-[6px] border border-black/[0.08] bg-white px-[8px] text-[11.5px] font-medium text-[#71717a]">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
