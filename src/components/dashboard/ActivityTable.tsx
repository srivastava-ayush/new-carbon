"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle, Clock, DotsThree, WarningCircle } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";
import { useDashboardContext } from "@/hooks/useDashboardContext";

const STATUS = {
  Synced: { icon: CheckCircle, cls: "text-[#16a34a] bg-[#f0fdf4] border-[#16a34a]/20" },
  Processed: { icon: Clock, cls: "text-[#0891b2] bg-[#ecfeff] border-[#06b6d4]/20" },
  "Needs review": { icon: WarningCircle, cls: "text-[#d97706] bg-[#fffbeb] border-[#f59e0b]/20" },
} as const;

export default function ActivityTable({ delay = 0 }: { delay?: number }) {
  const { data: { ACTIVITY } } = useDashboardContext();
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13.5px] font-semibold tracking-[-0.1px] text-black">Recent activity</p>
          <p className="mt-[2px] text-[12px] text-[#71717a]">Latest data processed from your sources</p>
        </div>
        <button className="flex items-center gap-[4px] text-[12px] font-semibold text-[#15803d] transition-colors hover:text-[#0d3b2d]">
          View all <ArrowRight size={12} weight="bold" />
        </button>
      </div>

      <div className="mt-[14px] flex-1 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="text-left text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">
              <th className="pb-[8px] pr-[16px] font-semibold">Source</th>
              <th className="pb-[8px] pr-[16px] font-semibold">Category</th>
              <th className="pb-[8px] pr-[16px] font-semibold">Scope</th>
              <th className="pb-[8px] pr-[16px] text-right font-semibold">CO₂e</th>
              <th className="pb-[8px] font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {(ACTIVITY || []).map((row: any, i: number) => {
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
                  className="group border-t border-black/[0.05] cursor-default"
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
                  <td className="py-[11px] pl-[8px]">
                    <DotsThree size={16} className="text-[#d4d4d8] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-[12px] flex items-center justify-between border-t border-black/[0.05] pt-[10px]">
        <p className="text-[11.5px] text-[#a1a1aa]">Showing 6 of 128 records</p>
        <div className="flex items-center gap-[2px]">
          <button className="flex h-[26px] items-center justify-center rounded-[6px] border border-black/[0.08] bg-white px-[8px] text-[11.5px] font-medium text-[#a1a1aa]">Prev</button>
          <button className="flex h-[26px] items-center justify-center rounded-[6px] bg-[#16a34a] px-[9px] text-[11.5px] font-semibold text-white">1</button>
          <button className="flex h-[26px] items-center justify-center rounded-[6px] border border-black/[0.08] bg-white px-[8px] text-[11.5px] font-medium text-[#71717a]">2</button>
          <button className="flex h-[26px] items-center justify-center rounded-[6px] border border-black/[0.08] bg-white px-[8px] text-[11.5px] font-medium text-[#71717a]">Next</button>
        </div>
      </div>
    </div>
  );
}
