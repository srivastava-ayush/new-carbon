"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import type { GlobeNode } from "@/components/ui/globeData";
import Container from "@/components/ui/Container";
import { EASE, maskReveal, stagger } from "@/lib/animations";

const GlobeBackground = dynamic(() => import("@/components/ui/GlobeBackground"), {
  ssr: false,
  loading: () => null,
});

const HEADLINE = [
  ["Powering", "a"],
  ["Greener", "Future"],
];

const TRUST_STATS = [
  { value: "4.2M tCO₂e", label: "Emissions tracked" },
  { value: "128k offsets", label: "Verified & retired" },
  { value: "GHG Protocol", label: "Fully aligned" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedNode, setSelectedNode] = useState<GlobeNode | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const globeY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const globeOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = reduced ? { hidden: {}, visible: {} } : stagger(0.1, 0.15);
  const line: typeof maskReveal = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : maskReveal;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_0%,#ffffff_0%,#f4faf9_48%,#e6f3f2_100%)]" />

      {/* Faint engineering grid */}
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

      {/* Interactive globe — full background */}
      <motion.div style={{ y: globeY, opacity: globeOpacity }} className="absolute inset-0">
        <GlobeBackground onSelectNode={setSelectedNode} />
      </motion.div>

      {/* Readability overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,#fbfcfa_6%,rgba(251,252,250,0.86)_30%,rgba(251,252,250,0)_58%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px] bg-[linear-gradient(to_bottom,transparent,#fbfcfa_92%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[120px] bg-[linear-gradient(to_bottom,#fbfcfa,transparent)]" />

      <Container narrow className="relative z-10 pb-[96px] pt-[140px] md:pt-[160px]">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex max-w-[640px] flex-col items-start text-left"
          >
            <motion.span
              variants={
                reduced
                  ? undefined
                  : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }
              }
              className="mb-[28px] inline-flex items-center gap-[10px] rounded-full border border-black/[0.06] bg-white/70 py-[8px] pr-[18px] pl-[14px] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3f5a55] shadow-[0_2px_12px_rgba(16,74,71,0.05)] backdrop-blur-md"
            >
              <span className="relative flex h-[7px] w-[7px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#188f8b] opacity-60" />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[#188f8b]" />
              </span>
              Carbon accounting → offsetting, one platform
            </motion.span>

            <h1 className="font-display text-[52px] leading-[0.95] tracking-[-1.5px] text-[#0b1f1e] sm:text-[68px] md:text-[84px] lg:text-[96px]">
              {HEADLINE.map((words, i) => (
                <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                  <motion.span variants={line} className="block">
                    {words.map((word, j) => (
                      <span key={word} className={`inline-block ${j > 0 ? "ml-[0.22em]" : ""}`}>
                        {i === 1 && j === 0 ? (
                          <em className="not-italic text-[#188f8b]">{word}</em>
                        ) : (
                          word
                        )}
                      </span>
                    ))}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={
                reduced
                  ? undefined
                  : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }
              }
              className="mt-[26px] max-w-[500px] text-[17px] leading-[1.55] tracking-[-0.2px] text-[#5f706e] md:text-[19px]"
            >
              Measure every tonne with audit-grade precision — then cut what
              matters. Built for accuracy, designed to make decarbonization
              measurable.
            </motion.p>

            <motion.div
              variants={
                reduced
                  ? undefined
                  : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }
              }
              className="mt-[36px] flex flex-wrap items-center gap-[14px]"
            >
              <Link
                href="/contact"
                className="group inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full bg-[#0b3b38] px-[32px] text-[15px] font-semibold tracking-[-0.16px] text-white shadow-[0_14px_34px_rgba(11,59,56,0.28)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#0e4a47] hover:shadow-[0_20px_44px_rgba(11,59,56,0.36)]"
              >
                Book a Demo
                <svg viewBox="0 0 24 24" fill="none" className="h-[17px] w-[17px] transition-transform duration-300 group-hover:translate-x-[3px]">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full border border-black/10 bg-white/80 px-[32px] text-[15px] font-semibold tracking-[-0.16px] text-[#0b1f1e] backdrop-blur-md transition-all duration-300 hover:border-[#188f8b]/40 hover:text-[#188f8b]"
              >
                Explore More
              </a>
            </motion.div>

            <motion.div
              variants={
                reduced
                  ? undefined
                  : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.9, delay: 0.5 } } }
              }
              className="mt-[52px] flex flex-wrap items-center gap-x-[32px] gap-y-[16px]"
            >
              {TRUST_STATS.map((stat) => (
                <div key={stat.label} className="flex items-baseline gap-[10px]">
                  <span className="font-display text-[19px] text-[#0b1f1e]">{stat.value}</span>
                  <span className="text-[11px] font-medium uppercase tracking-[0.13em] text-[#92a5a3]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

     
  
      {/* Selected node card */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute right-[6vw] bottom-[110px] z-30 hidden w-[320px] rounded-[22px] border border-white/80 bg-white/90 p-[20px] shadow-[0_24px_64px_rgba(11,59,56,0.16)] backdrop-blur-2xl lg:block"
          >
            <button
              onClick={() => setSelectedNode(null)}
              aria-label="Close details"
              className="absolute top-[14px] right-[14px] rounded-lg p-[4px] text-[#92a5a3] transition-colors hover:bg-black/[0.04] hover:text-[#0b1f1e]"
            >
              <X className="h-[15px] w-[15px]" />
            </button>
            <div className="mb-[10px] flex items-center gap-[10px] pr-[24px]">
              <span className="h-[9px] w-[9px] rounded-full" style={{ backgroundColor: selectedNode.color }} />
              <h4 className="text-[15px] font-bold tracking-[-0.2px] text-[#0b1f1e]">{selectedNode.name}</h4>
              <span className="ml-auto rounded-full border border-[#188f8b]/20 bg-[#188f8b]/[0.07] px-[10px] py-[3px] text-[9px] font-semibold uppercase tracking-[0.12em] text-[#188f8b]">
                {selectedNode.country}
              </span>
            </div>
            <p className="mb-[14px] text-[12px] leading-[1.55] text-[#5f706e]">{selectedNode.keyInitiative}</p>
            <div className="grid grid-cols-2 gap-[10px] border-t border-black/[0.06] pt-[12px]">
              <div>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-[#92a5a3]">Emissions tracked</span>
                <span className="text-[13px] font-bold text-[#0b1f1e]">{selectedNode.emissionsTracked}</span>
              </div>
              <div>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.13em] text-[#92a5a3]">Reduction rate</span>
                <span className="text-[13px] font-bold text-[#188f8b]">{selectedNode.reductionRate}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll cue */}
      <motion.a
        href="#how-it-works"
        aria-label="Scroll to content"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: reduced ? 0 : 1.6 }}
        className="absolute bottom-[34px] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-[8px] text-[#92a5a3] transition-colors hover:text-[#188f8b] md:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">Scroll</span>
        <span className="relative h-[34px] w-[1px] overflow-hidden bg-black/10">
          <motion.span
            animate={reduced ? undefined : { y: [-34, 34] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-0 h-[14px] w-full bg-[#188f8b]"
          />
        </span>
      </motion.a>
    </section>
  );
}
