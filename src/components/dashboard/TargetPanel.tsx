"use client";

import { motion } from "motion/react";
import CountUp from "@/components/dashboard/CountUp";
import { EASE } from "@/lib/animations";
import { useDashboardContext } from "@/hooks/useDashboardContext";
import { useAuth } from "@/context/AuthContext";
import { PencilSimple, Target as TargetIcon } from "@phosphor-icons/react";

export default function TargetPanel({ delay = 0 }: { delay?: number }) {
  const { data: { TARGETS, TOTAL_12M } } = useDashboardContext();
  const { user } = useAuth();
  const isAdmin = user?.role === "SUPER_ADMIN" || user?.role === "UNIVERSITY_ADMIN";

  if (!TARGETS || TARGETS.length < 2) {
    return (
      <div className="flex h-full flex-col items-center justify-center border border-dashed border-black/10 rounded-[12px] bg-[#fafafa] p-6 text-center">
        <TargetIcon size={24} className="mb-3 text-[#a1a1aa]" />
        <p className="text-[13.5px] font-semibold text-black mb-1">No Targets Set</p>
        <p className="text-[12px] text-[#71717a] mb-4">Establish a baseline and set targets to track progress here.</p>
        <a href="/targets" className="rounded-full bg-black px-[12px] py-[6px] text-[12px] font-medium text-white hover:bg-black/80 transition-colors">
          Set Target
        </a>
      </div>
    );
  }

  const baseline = TARGETS[0];
  const target = TARGETS[TARGETS.length - 1];

  const baselineVal = baseline.value;
  const targetVal = target.value;

  const reductionRequired = baselineVal - targetVal;
  const reductionAchieved = baselineVal - TOTAL_12M;

  const reductionProgress = reductionRequired > 0
    ? Math.max(0, Math.min(100, (reductionAchieved / reductionRequired) * 100))
    : 0;

  const reductionPct = Math.round(((baselineVal - targetVal) / baselineVal) * 100);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13.5px] font-semibold tracking-[-0.1px] text-black">{target.label.split(" ")[0]} reduction target</p>
          <p className="mt-[2px] text-[12px] text-[#71717a]">Science-based aligned to 1.5°C</p>
        </div>
        <div className="flex items-center gap-[8px]">
          {isAdmin && (
            <a
              href="/targets"
              className="flex items-center gap-[4px] rounded-full border border-black/10 px-[10px] py-[3px] text-[11px] font-medium text-black transition-colors hover:bg-black/5"
            >
              <PencilSimple size={12} />
              Edit target
            </a>
          )}
          <span className={`rounded-full px-[8px] py-[2px] text-[11px] font-semibold ${reductionProgress >= 100 ? "bg-green-100 text-green-700" : "bg-[#f0fdf4] text-[#15803d]"}`}>
            {reductionProgress >= 100 ? "Target Achieved" : "On track"}
          </span>
        </div>
      </div>

      <div className="mt-[22px] flex items-baseline gap-[8px]">
        <p className="text-[32px] font-semibold leading-none tracking-[-1px] tabular-nums text-black">
          <CountUp value={reductionProgress} decimals={0} suffix="%" delay={delay + 0.2} />
        </p>
        <p className="text-[12.5px] text-[#71717a]">of ↓{reductionPct}% target met</p>
      </div>

      <div className="mt-[26px]">
        <div className="h-[8px] w-full overflow-hidden rounded-full bg-black/[0.045]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${reductionProgress}%` }}
            transition={{ duration: 1.4, ease: EASE, delay: delay + 0.3 }}
            className="h-full rounded-full bg-gradient-to-r from-[#16a34a] to-[#4ade80]"
          />
        </div>

        <div className="mt-[12px] flex items-start justify-between gap-[8px]">
          {TARGETS.map((tgt: any, i: number) => {
            const isComplete = TOTAL_12M <= tgt.value;
            return (
              <div key={tgt.label} className="flex flex-col items-start">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22, delay: delay + 0.4 + i * 0.15 }}
                  className={`h-[10px] w-[10px] rounded-full ${isComplete ? "bg-[#16a34a]" : "bg-[#d4d4d8]"}`}
                />
                <p className="mt-[8px] text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[#a1a1aa]">{tgt.label}</p>
                <p className="text-[12.5px] font-medium tabular-nums text-black">
                  <CountUp value={tgt.value} delay={delay + 0.5 + i * 0.1} />
                  <span className="text-[10.5px] text-[#a1a1aa]"> {tgt.unit}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: delay + 0.5 }}
        className="mt-auto flex items-center gap-[8px] rounded-[10px] border border-[#16a34a]/15 bg-[#f6fbf8] px-[12px] py-[10px]"
      >
        <span className="h-[8px] w-[8px] shrink-0 rounded-full bg-[#16a34a]" />
        <p className="text-[12px] leading-snug text-[#15803d]">
          Current pace puts you <span className="font-semibold">{reductionProgress >= 100 ? "beyond" : reductionProgress > 0 ? "ahead of" : "behind"}</span> the baseline.
        </p>
      </motion.div>
    </div>
  );
}
