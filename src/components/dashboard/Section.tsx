"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { EASE } from "@/lib/animations";

interface SectionProps {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
  pad?: boolean;
}

export default function Section({ title, subtitle, action, children, className = "", delay = 0, pad = true }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={`rounded-[14px] border border-black/[0.06] bg-white ${pad ? "p-[18px] md:p-[22px]" : ""} ${className}`}
    >
      {(title || action) && (
        <div className="mb-[16px] flex items-start justify-between gap-[12px]">
          <div className="min-w-0">
            {title && <h2 className="text-[13.5px] font-semibold tracking-[-0.1px] text-black">{title}</h2>}
            {subtitle && <p className="mt-[2px] text-[12px] text-[#71717a]">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </motion.section>
  );
}
