"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { InteractiveGlobe } from "@/components/ui/HeroGlobe";
import type { GlobeNode } from "@/components/ui/globeData";
import Container from "@/components/ui/Container";
import { EASE, maskReveal, stagger } from "@/lib/animations";

const HEADLINE = [
  ["Powering", "a"],
  ["Greener", "Future"],
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedNode, setSelectedNode] = useState<GlobeNode | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = reduced ? { hidden: {}, visible: {} } : stagger(0.12, 0.2);
  const line: typeof maskReveal = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : maskReveal;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(120% 80% at 50% 10%, #ffffff 0%, #f2faf5 45%, #e4f3ea 100%)",
          y: bgY,
        }}
      />
      <motion.div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22,163,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
          y: gridY,
        }}
      />

      <Container narrow className="relative pb-[32px] pt-[110px]">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="grid grid-cols-1 items-center gap-[48px] lg:grid-cols-2 lg:gap-[80px]"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left"
          >
            <motion.span
              variants={reduced ? undefined : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="mb-[24px] inline-flex items-center gap-[8px] rounded-full border border-[#16a34a]/25 bg-[#16a34a]/5 px-[16px] py-[8px] text-[13px] font-semibold uppercase tracking-[0.14em] text-[#15803d]"
            >
              <span className="h-[6px] w-[6px] rounded-full bg-[#16a34a]" />
              FROM CARBON ACCOUNTING TO OFFSETTING — ALL AT ONE PLATFORM
            </motion.span>

            <h1 className="font-display text-[48px] leading-[0.92] tracking-[-1.2px] text-black md:text-[72px] lg:text-[88px]">
              {HEADLINE.map((words, i) => (
                <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                  <motion.span variants={line} className="block">
                    {words.map((word, j) => (
                      <span key={word} className={`inline-block ${j > 0 ? "ml-[0.18em]" : ""}`}>
                        {word}
                      </span>
                    ))}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={reduced ? undefined : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="mt-[24px] max-w-[520px] text-[18px] leading-[1.35] tracking-[-0.2px] text-[#848484] md:text-[20px]"
            >
             built for accuracy, and designed to make decarbonization measurable.
            </motion.p>

            <motion.div
              variants={reduced ? undefined : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
              className="mt-[36px] flex flex-wrap items-center gap-[16px]"
            >
              <Link
                href="/book-demo"
                className="inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full bg-[#16a34a] px-[30px] text-[16px] font-semibold tracking-[-0.16px] text-white shadow-[0_10px_30px_rgba(22,163,74,0.3)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#15803d] hover:shadow-[0_14px_40px_rgba(22,163,74,0.4)]"
              >
                Book a Demo
                <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full border border-black/15 bg-white px-[30px] text-[16px] font-semibold tracking-[-0.16px] text-black transition-all duration-300 hover:border-[#16a34a]/50 hover:text-[#15803d]"
              >
                Explore More
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 48, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 24, mass: 1, delay: reduced ? 0 : 0.6 }}
            className="relative mx-auto w-full max-w-[520px]"
          >
            <motion.div
              className="absolute -inset-[6px] rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.18),transparent_70%)] blur-xl"
              animate={{ scale: [1, 1.04, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={reduced ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[560px] overflow-hidden rounded-[32px] border border-[#16a34a]/15 bg-white/50 shadow-inner backdrop-blur-sm lg:h-[700px]"
            >
              <InteractiveGlobe onSelectNode={setSelectedNode} />

              <AnimatePresence>
                {selectedNode && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="absolute inset-x-3 bottom-3 z-30 rounded-2xl border border-emerald-200/90 bg-white/95 p-4 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full shadow-sm" style={{ backgroundColor: selectedNode.color }} />
                        <h4 className="text-sm font-bold text-[#0f2420]">{selectedNode.name}</h4>
                      </div>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                        {selectedNode.country}
                      </span>
                    </div>
                    <p className="mb-3 text-xs leading-relaxed text-[#2d554e]">{selectedNode.keyInitiative}</p>
                    <div className="grid grid-cols-2 gap-2 border-t border-emerald-100 pt-2 text-xs">
                      <div>
                        <span className="block text-[10px] font-medium text-emerald-700">Emissions Tracked</span>
                        <span className="font-bold text-emerald-950">{selectedNode.emissionsTracked}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-medium text-emerald-700">Reduction Rate</span>
                        <span className="font-bold text-[#007f73]">{selectedNode.reductionRate}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNode(null)}
                      aria-label="Close details"
                      className="absolute right-2 top-2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : 1.1 }}
              className="pointer-events-none absolute -left-[10px] top-[84px] rounded-2xl border border-[#16a34a]/15 bg-white/85 px-[16px] py-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm"
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#848484]">Emissions cut</p>
                <p className="font-display text-[24px] leading-[1] text-[#16a34a]">−42%</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: reduced ? 0 : 1.25 }}
              className="pointer-events-none absolute -right-[10px] bottom-[24px] rounded-2xl border border-[#16a34a]/15 bg-white/85 px-[16px] py-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm"
            >
              <motion.div
                animate={reduced ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              >
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#848484]">Verified offsets</p>
                <p className="font-display text-[24px] leading-[1] text-[#16a34a]">128k tCO₂e</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
