"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
    >
      {/* Gradient bridge from hero (light) into teal showcase */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbfcfa] via-[#188f8b]/[0.12] to-[#0d4f4b]" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(24,143,139,0.15),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pt-[80px] pb-[100px] md:pt-[120px] md:pb-[140px]">
        {/* Heading — above the video, not overlaid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-[40px] max-w-[640px] text-center md:mb-[56px]"
        >
          <h2 className="font-display text-[32px] leading-[1.05] tracking-[-1px] text-[#188f8b] sm:text-[40px] md:text-[48px]">
            See CarbonSynq in action.
          </h2>
          <p className="mt-[16px] text-[15px] leading-[1.6] text-[#0b1f1e] md:text-[17px]">
            Your entire carbon ledger, live and audit-ready.
          </p>
        </motion.div>

        {/* Browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-[1100px]"
        >
          <div className="overflow-hidden rounded-[16px] border border-white/[0.08] bg-[#0a3a37] shadow-[0_40px_120px_rgba(13,79,75,0.4)] md:rounded-[20px]">
            {/* Browser chrome */}
            <div className="flex items-center gap-[16px] border-b border-white/[0.06] bg-[#0f2a28] px-[16px] py-[12px] md:px-[20px] md:py-[14px]">
              {/* Traffic lights */}
              <div className="flex items-center gap-[6px]">
                <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
              </div>
              {/* URL bar */}
              <div className="flex flex-1 items-center justify-center">
                <div className="flex items-center gap-[8px] rounded-[8px] bg-white/[0.04] px-[16px] py-[6px] md:px-[24px]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-[12px] w-[12px] text-white/30">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span className="text-[11px] font-medium tracking-[0.02em] text-white/40 md:text-[12px]">
                    carbonsynqearth.com
                  </span>
                </div>
              </div>
              {/* Spacer for symmetry */}
              <div className="w-[52px]" />
            </div>

            {/* Video — full aspect ratio, no cropping */}
            <div className="relative">
              <video
                src="/landingVideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="block h-auto w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
