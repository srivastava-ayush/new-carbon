"use client";

import { motion } from "motion/react";
import { X, Calculator, Tag, Leaf, WarningCircle, Eye } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";

interface CalculationDetailsModalProps {
  activity: any;
  onClose: () => void;
  onViewActivity?: () => void;
}

export default function CalculationDetailsModal({ activity, onClose, onViewActivity }: CalculationDetailsModalProps) {
  if (!activity) return null;

  const calculation = activity.calculations?.[0];
  const hasError = !calculation || calculation.co2eKg === null || calculation.co2eKg === undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative z-10 w-full max-w-lg rounded-[16px] bg-white p-[24px] shadow-xl mx-[20px]"
      >
        <div className="mb-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className={`flex h-[40px] w-[40px] items-center justify-center rounded-[8px] ${hasError ? 'bg-red-100 text-red-600' : 'bg-[#f4f4f5] text-[#52525b]'}`}>
              {hasError ? <WarningCircle size={24} weight="bold" /> : <Calculator size={24} weight="bold" />}
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-black">Calculation Details</h2>
              <p className="text-[13px] text-[#71717a]">{activity.category.replace(/_/g, " ")}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#a1a1aa] hover:text-black transition-colors self-start mt-[-8px]">
            <X size={20} />
          </button>
        </div>

        {hasError ? (
          <div className="flex flex-col gap-[16px] items-center py-[32px]">
            <WarningCircle size={48} className="text-orange-500 mb-[8px]" />
            <div className="text-center">
              <h3 className="text-[16px] font-bold text-black mb-[4px]">Emission Factor Not Available</h3>
              <p className="text-[13px] text-[#71717a] max-w-[300px]">
                No matching emission factor was found for this activity's category and date. 
              </p>
            </div>
            <div className="mt-[8px] inline-flex rounded-full bg-orange-100 px-[12px] py-[4px] text-[12px] font-semibold text-orange-700">
              Status: PENDING
            </div>
            {onViewActivity && (
              <button 
                onClick={onViewActivity}
                className="mt-[16px] flex items-center gap-[6px] rounded-[8px] bg-white border border-black/[0.08] px-[16px] py-[8px] text-[13px] font-semibold text-black hover:bg-black/5"
              >
                <Eye size={16} /> View Activity
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            
            {/* Calculation Formula Section */}
            <div className="flex flex-col items-center justify-center rounded-[12px] border border-[#16a34a]/20 bg-[#f0fdf4] py-[24px] px-[16px]">
              <div className="flex flex-col items-center gap-[8px] w-full font-mono text-[14px] text-[#15803d]">
                <div className="flex justify-between w-full max-w-[280px]">
                  <span>{activity.quantity}</span>
                  <span className="text-[#16a34a]">{activity.unit}</span>
                </div>
                <div className="flex justify-between w-full max-w-[280px] border-b border-[#16a34a]/20 pb-[8px]">
                  <span className="flex items-center gap-[8px]">× {calculation.emissionFactor?.factorValue || "0.7117"}</span>
                  <span className="text-[#16a34a]">kgCO₂e/{activity.unit}</span>
                </div>
                <div className="flex justify-between w-full max-w-[280px] pt-[4px] text-[18px] font-bold">
                  <span>{calculation.co2eKg?.toFixed(2) || "0.00"}</span>
                  <span>kgCO₂e</span>
                </div>
              </div>
            </div>

            {/* Factor Details List */}
            <div className="grid grid-cols-2 gap-[16px]">
              <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Quantity</span>
                <span className="text-[14px] font-medium text-black">{activity.quantity} {activity.unit}</span>
              </div>
              <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Emission Factor</span>
                <span className="text-[14px] font-medium text-black">
                  {calculation.emissionFactor?.factorValue || "0.7117"} kgCO₂e/{activity.unit}
                </span>
              </div>
              <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Source</span>
                <span className="text-[14px] font-medium text-black">{calculation.emissionFactor?.source || calculation.factorSource || "CEA"}</span>
              </div>
              <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Version</span>
                <span className="text-[14px] font-medium text-black">{calculation.emissionFactor?.version || calculation.factorVersion || "V21.0"}</span>
              </div>
              <div className="flex flex-col gap-[4px] col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Scope</span>
                <span className="text-[14px] font-medium text-black">{activity.scope.replace("_", " ")}</span>
              </div>
            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}
