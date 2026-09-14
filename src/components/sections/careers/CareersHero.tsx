"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import { EASE, maskReveal } from "@/lib/animations";

export default function CareersHero() {
  const reduced = useReducedMotion();

  const WORD_REVEAL = reduced
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
  const line: typeof maskReveal = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : maskReveal;

  return (
    <section className="relative overflow-hidden bg-[#fbfcfa]">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_0%,#ffffff_0%,#f4faf9_48%,#e6f3f2_100%)]" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(24,143,139,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(24,143,139,0.05) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(75% 65% at 50% 38%, black, transparent)",
          WebkitMaskImage: "radial-gradient(75% 65% at 50% 38%, black, transparent)",
        }}
      />

      <Container narrow className="relative z-10 pt-[160px] pb-[100px] md:pt-[180px] md:pb-[120px]">
        <div className="grid grid-cols-1 gap-[48px] lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="mb-[20px] inline-flex items-center gap-[10px] rounded-full border border-black/[0.06] bg-white/70 py-[8px] pr-[18px] pl-[14px] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3f5a55] shadow-[0_2px_12px_rgba(16,74,71,0.05)] backdrop-blur-md">
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#188f8b] opacity-60" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#188f8b]" />
              </span>
              Careers at CarbonSynq Earth
            </span>

            <h1 className="font-display text-[52px] leading-[0.95] tracking-[-1.5px] text-[#0b1f1e] sm:text-[64px] md:text-[78px]">
              {"Decisive work".split(" ").map((word, i) => (
                <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                  <motion.span variants={line} className="block">
                    {word}
                  </motion.span>
                </span>
              ))}
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <motion.span variants={line} className="block">
                  At{" "}
                  <em className="not-italic text-[#188f8b]">global scale</em>
                </motion.span>
              </span>
            </h1>

            <p className="mt-[28px] max-w-[520px] text-[17px] leading-[1.55] tracking-[-0.2px] text-[#5f706e] md:text-[19px]">
              We are defining the standard for global carbon accountability—engineering the verified infrastructure that will support every major climate decision this decade.
            </p>

            <div className="mt-[40px] flex flex-wrap items-center gap-[14px]">
              <a
                href="#open-roles"
                className="group inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full bg-[#0b3b38] px-[32px] text-[15px] font-semibold tracking-[-0.16px] text-white shadow-[0_14px_34px_rgba(11,59,56,0.28)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#0e4a47] hover:shadow-[0_20px_44px_rgba(11,59,56,0.36)]"
              >
                Explore Open Positions
                <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-[3px]">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#mission"
                className="inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full border border-black/10 bg-white/80 px-[32px] text-[15px] font-semibold tracking-[-0.16px] text-[#0b1f1e] backdrop-blur-md transition-all duration-300 hover:border-[#188f8b]/40 hover:text-[#188f8b]"
              >
                Our Mandate
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/80 bg-white/60 p-[3px] shadow-[0_32px_80px_rgba(11,59,56,0.1)] backdrop-blur-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#188f8b]/10 via-transparent to-[#0b3b38]/10" />
              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#e8f5f4] to-[#d1ece9] p-[48px]">
                <div className="flex items-center gap-[12px] mb-[32px]">
                  <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#188f8b]/15">
                    <svg viewBox="0 0 24 24" fill="none" className="h-[22px] w-[22px] text-[#188f8b]">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0b1f1e]">CarbonSynq Earth</p>
                    <p className="text-[11px] text-[#5f706e]">Building the future of carbon accountability</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-[16px]">
                  {[
                    { label: "Founded", value: "2026" },
                    { label: "Team", value: "Growing" },
                    { label: "Focus", value: "Net-Zero" },
                    { label: "Mission", value: "Global" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-[14px] border border-[#188f8b]/10 bg-white/70 p-[18px] backdrop-blur-sm">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#188f8b]">
                        {stat.label}
                      </span>
                      <span className="mt-[4px] block font-display text-[24px] leading-none tracking-[-0.4px] text-[#0b1f1e]">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
