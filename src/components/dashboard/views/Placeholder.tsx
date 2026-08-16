"use client";

import { motion } from "motion/react";
import { FileText, GearSix } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";

export default function Placeholder({ tab }: { tab: "reports" | "settings" }) {
  const Icon = tab === "reports" ? FileText : GearSix;
  return (
    <motion.div
      key={tab}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex min-h-[50dvh] flex-col items-center justify-center rounded-[14px] border border-black/[0.06] bg-white p-[32px] text-center"
    >
      <span className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] bg-[#f0fdf4] text-[#15803d]">
        <Icon size={22} />
      </span>
      <h2 className="mt-[16px] text-[17px] font-semibold tracking-[-0.3px] text-black">
        {tab === "reports" ? "Reports" : "Settings"}
      </h2>
      <p className="mt-[6px] max-w-[360px] text-[13px] leading-relaxed text-[#71717a]">
        {tab === "reports"
          ? "Sustainability reports, audit exports and disclosure-ready statements will live here."
          : "Workspace preferences, data integrations and team access controls will live here."}
      </p>
    </motion.div>
  );
}
