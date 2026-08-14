"use client";

import type { ComponentType } from "react";
import { AnimatePresence, motion } from "motion/react";

interface StepVisualPanelProps {
  index: number;
  Visual: ComponentType;
}

export default function StepVisualPanel({ index, Visual }: StepVisualPanelProps) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute -inset-[6px] rounded-[24px] bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.18),transparent_70%)] blur-xl" />
      <div className="relative aspect-[4/3] min-h-[260px] overflow-hidden rounded-[24px] border border-[#16a34a]/15 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:aspect-auto md:h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ y: 64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -64, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Visual />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}