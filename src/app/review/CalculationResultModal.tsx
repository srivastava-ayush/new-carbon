"use client";

import { motion } from "motion/react";
import { X, CheckCircle, Leaf, Tag } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";

interface CalculationResultModalProps {
  result: any;
  onClose: () => void;
}

export default function CalculationResultModal({ result, onClose }: CalculationResultModalProps) {
  // `result` here is assumed to be the calculation record returned from backend
  const co2e = result.co2eKg ? Math.round(result.co2eKg) : 0;
  const emissionFactor = result.emissionFactor || 0;
  const factorUnit = result.factorUnit || "kgCO2e/unit";
  const source = result.factorSource || "Unknown Source";
  const version = result.factorVersion || "Latest";
  const factorName = result.factorName || "System Factor";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative z-10 w-full max-w-md rounded-[16px] bg-white p-[24px] shadow-xl mx-[20px]"
      >
        <div className="mb-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-green-100 text-[#16a34a]">
              <CheckCircle size={20} weight="fill" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-black">Calculation Complete</h2>
              <p className="text-[13px] text-[#71717a]">Emissions successfully calculated.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#a1a1aa] hover:text-black transition-colors self-start">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-[16px]">
          {/* Main Emission Result */}
          <div className="flex flex-col items-center justify-center rounded-[12px] border border-[#16a34a]/20 bg-[#f0fdf4] py-[24px]">
            <p className="text-[13px] font-medium text-[#15803d]">Total Emissions</p>
            <div className="mt-[4px] flex items-baseline gap-[6px]">
              <span className="text-[32px] font-bold tracking-tight text-[#0d3b2d]">
                {co2e.toLocaleString()}
              </span>
              <span className="text-[14px] font-semibold text-[#16a34a]">kgCO₂e</span>
            </div>
          </div>

          {/* Factor Details */}
          <div className="rounded-[12px] border border-black/[0.08] bg-[#fafafa] p-[16px]">
            <p className="mb-[12px] text-[12px] font-semibold uppercase tracking-widest text-[#a1a1aa]">
              Applied Factor Details
            </p>
            
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px] text-[13px] text-[#52525b]">
                  <Leaf size={16} /> Emission Factor
                </div>
                <p className="text-[13px] font-semibold text-black">
                  {emissionFactor.toFixed(4)} <span className="text-[#71717a] font-normal">{factorUnit}</span>
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px] text-[13px] text-[#52525b]">
                  <Tag size={16} /> Factor Name
                </div>
                <p className="text-[13px] font-medium text-black max-w-[200px] truncate text-right" title={factorName}>
                  {factorName}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px] text-[13px] text-[#52525b]">
                  <div className="w-[16px] h-[16px] rounded-full bg-black/10 flex items-center justify-center text-[10px] font-bold text-black/60">S</div>
                  Source
                </div>
                <p className="text-[13px] font-medium text-black">
                  {source} <span className="text-[#a1a1aa] ml-[4px]">({version})</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[24px] flex justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-[8px] bg-[#16a34a] px-[16px] py-[10px] text-[13px] font-semibold text-white hover:bg-[#15803d] transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
