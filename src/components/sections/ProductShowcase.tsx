"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";

export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex h-[60vh] items-center justify-center overflow-hidden md:h-[70vh]"
    >
      {/* Video background */}
      <video
        src="/landingVideo.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_50%,transparent_40%,rgba(0,0,0,0.35)_100%)]" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex max-w-[640px] flex-col items-center px-6 text-center"
      >
        <h2 className="font-display text-[36px] leading-[1.05] tracking-[-1px] text-white sm:text-[48px] md:text-[56px]">
          See CarbonSynq <span className="text-[#188f8b]">in action.</span>
        </h2>
        <p className="mt-[18px] max-w-[440px] text-[16px] leading-[1.6] text-white/80 md:text-[18px]">
          Measure, verify, and offset every tonne — all in one platform built for audit-grade precision.
        </p>
        <div className="mt-[32px] flex flex-wrap items-center justify-center gap-[14px]">
          <Link
            href="/contact"
            className="inline-flex h-[52px] items-center justify-center gap-[10px] rounded-full bg-white px-[30px] text-[15px] font-semibold text-[#0b1f1e] shadow-[0_14px_34px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_20px_44px_rgba(0,0,0,0.3)]"
          >
            Book a Demo
            <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px]">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/30 bg-white/10 px-[30px] text-[15px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/20"
          >
            Explore More
          </a>
        </div>
      </motion.div>
    </section>
  );
}
