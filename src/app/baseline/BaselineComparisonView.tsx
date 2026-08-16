"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import { TrendDown, TrendUp } from "@phosphor-icons/react";

interface BaselineComparisonViewProps {
  comparisonData: any;
}

export default function BaselineComparisonView({ comparisonData }: BaselineComparisonViewProps) {
  if (!comparisonData) return null;

  const { baseline, current, reduction, reductionPercent, scopeData, categoryData } = comparisonData;

  const isReduction = reduction > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col gap-[24px]"
    >
      {/* Top Level Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px]">
        <div className="rounded-[12px] border border-black/[0.08] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <p className="text-[13px] font-medium text-[#71717a] mb-[4px]">Baseline Emissions</p>
          <p className="text-[24px] font-semibold text-black">{Math.round(baseline).toLocaleString()} <span className="text-[14px] text-[#a1a1aa] font-medium">tCO₂e</span></p>
        </div>
        <div className="rounded-[12px] border border-black/[0.08] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <p className="text-[13px] font-medium text-[#71717a] mb-[4px]">Current Emissions</p>
          <p className="text-[24px] font-semibold text-black">{Math.round(current).toLocaleString()} <span className="text-[14px] text-[#a1a1aa] font-medium">tCO₂e</span></p>
        </div>
        <div className="rounded-[12px] border border-black/[0.08] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <p className="text-[13px] font-medium text-[#71717a] mb-[4px]">{isReduction ? 'Reduction' : 'Increase'}</p>
          <p className={`text-[24px] font-semibold ${isReduction ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(Math.round(reduction)).toLocaleString()} <span className="text-[14px] opacity-70 font-medium">tCO₂e</span>
          </p>
        </div>
        <div className="rounded-[12px] border border-black/[0.08] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <p className="text-[13px] font-medium text-[#71717a] mb-[4px]">Change %</p>
          <div className={`flex items-center gap-[8px] text-[24px] font-semibold ${isReduction ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(reductionPercent)}% 
            {isReduction ? <TrendDown size={24} weight="bold" /> : <TrendUp size={24} weight="bold" />}
          </div>
        </div>
      </div>

      {/* Scope Comparison */}
      <div className="rounded-[12px] border border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-[20px] py-[16px] border-b border-black/[0.06] bg-[#fafafa]">
          <h3 className="text-[14px] font-semibold text-black">Scope-wise Comparison</h3>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f8f8f8] text-[#71717a]">
            <tr>
              <th className="px-[20px] py-[12px] font-medium w-[25%]">Scope</th>
              <th className="px-[20px] py-[12px] font-medium">Baseline (tCO₂e)</th>
              <th className="px-[20px] py-[12px] font-medium">Current (tCO₂e)</th>
              <th className="px-[20px] py-[12px] font-medium text-right">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            {scopeData?.map((s: any, i: number) => (
              <tr key={i} className="hover:bg-[#fafafa]/50">
                <td className="px-[20px] py-[14px] font-medium text-black">
                  {s.scope === "SCOPE_1" ? "Scope 1" : s.scope === "SCOPE_2" ? "Scope 2" : "Scope 3"}
                </td>
                <td className="px-[20px] py-[14px] text-[#52525b]">{Math.round(s.baseline).toLocaleString()}</td>
                <td className="px-[20px] py-[14px] text-[#52525b]">{Math.round(s.current).toLocaleString()}</td>
                <td className={`px-[20px] py-[14px] text-right font-semibold ${s.change > 0 ? 'text-green-600' : s.change < 0 ? 'text-red-600' : 'text-[#71717a]'}`}>
                  {s.change > 0 ? '-' : s.change < 0 ? '+' : ''}{Math.abs(s.changePercent).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Category Comparison */}
      <div className="rounded-[12px] border border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="px-[20px] py-[16px] border-b border-black/[0.06] bg-[#fafafa]">
          <h3 className="text-[14px] font-semibold text-black">Category Comparison</h3>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f8f8f8] text-[#71717a]">
            <tr>
              <th className="px-[20px] py-[12px] font-medium w-[25%]">Category</th>
              <th className="px-[20px] py-[12px] font-medium">Baseline (tCO₂e)</th>
              <th className="px-[20px] py-[12px] font-medium">Current (tCO₂e)</th>
              <th className="px-[20px] py-[12px] font-medium text-right">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04]">
            {categoryData?.map((c: any, i: number) => (
              <tr key={i} className="hover:bg-[#fafafa]/50">
                <td className="px-[20px] py-[14px] font-medium text-black capitalize">
                  {c.category.replace(/_/g, ' ').toLowerCase()}
                </td>
                <td className="px-[20px] py-[14px] text-[#52525b]">{Math.round(c.baseline).toLocaleString()}</td>
                <td className="px-[20px] py-[14px] text-[#52525b]">{Math.round(c.current).toLocaleString()}</td>
                <td className={`px-[20px] py-[14px] text-right font-semibold ${c.change > 0 ? 'text-green-600' : c.change < 0 ? 'text-red-600' : 'text-[#71717a]'}`}>
                  {c.change > 0 ? '-' : c.change < 0 ? '+' : ''}{Math.abs(c.changePercent).toFixed(1)}%
                </td>
              </tr>
            ))}
            {categoryData?.length === 0 && (
              <tr>
                <td colSpan={4} className="px-[20px] py-[32px] text-center text-[#a1a1aa] font-medium">
                  No category data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
