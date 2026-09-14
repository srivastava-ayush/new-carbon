"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import { EASE, maskReveal } from "@/lib/animations";

export default function ContactHero() {
  const reduced = useReducedMotion();

  const line: typeof maskReveal = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : maskReveal;

  return (
    <section className="relative overflow-hidden bg-[#fbfcfa] pt-[160px] pb-[80px] md:pt-[180px] md:pb-[100px]">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#ffffff_0%,#f4faf9_48%,#e6f3f2_100%)]" />
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

      <Container narrow className="relative z-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <span className="mb-[20px] inline-flex items-center gap-[10px] rounded-full border border-black/[0.06] bg-white/70 py-[8px] pr-[18px] pl-[14px] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3f5a55] shadow-[0_2px_12px_rgba(16,74,71,0.05)] backdrop-blur-md">
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#188f8b] opacity-60" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#188f8b]" />
            </span>
            Contact Us
          </span>

          <h1 className="font-display text-[52px] leading-[0.95] tracking-[-1.5px] text-[#0b1f1e] sm:text-[64px] md:text-[78px]">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <motion.span variants={line} className="block">
                Let&apos;s Build a
              </motion.span>
            </span>
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <motion.span variants={line} className="block">
                <em className="not-italic text-[#188f8b]">Net Zero</em> Future
              </motion.span>
            </span>
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <motion.span variants={line} className="block">
                Together
              </motion.span>
            </span>
          </h1>

          <p className="mx-auto mt-[28px] max-w-[520px] text-[17px] leading-[1.55] tracking-[-0.2px] text-[#5f706e] md:text-[19px]">
            We help businesses measure, reduce, and offset their carbon footprint
            with data-driven solutions for a sustainable tomorrow.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
