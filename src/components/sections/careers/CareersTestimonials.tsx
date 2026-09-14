"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, maskReveal } from "@/lib/animations";
import Reveal from "@/components/shared/Reveal";
import Container from "@/components/ui/Container";

const TESTIMONIALS = [
  {
    quote: "What sets CarbonSynq apart isn't just the scale of our ambition, it's the operational rigor we apply to get there. We are building the foundational infrastructure for global carbon markets, and every decision we make here has a tangible impact.",
    name: "Ayush Chaudhary",
    role: "Chief Operation Officer",
    joined: "1 year ago",
    initials: "AC",
  },
  {
    quote: "Our vision was never to build just another compliance tool. We set out to engineer an absolute source of truth for carbon accountability. The depth of scientific integrity our team brings to the table every single day is what makes this mission possible.",
    name: "Pushkar Singh Raghuvanshi",
    role: "Chief Executive Officer",
    joined: "1 year ago",
    initials: "PR",
  },
  {
    quote: "Translating complex, high-density climate data into intuitive, lightning-fast dashboards is an incredible engineering challenge. The autonomy here is real—you aren't just writing UI code; you are architecting the lens through which enterprises view their impact.",
    name: "Sarwang Agarwal",
    role: "Full Stack Developer",
    joined: "8 months ago",
    initials: "SA",
  },
  {
    quote: "The sheer volume of real-time emissions data we process requires backend architecture that is both relentlessly resilient and highly scalable. It's a rare opportunity to tackle complex distributed systems problems while directly contributing to global climate action.",
    name: "Priyanshu Barai",
    role: "Backend Engineer",
    joined: "8 months ago",
    initials: "PB",
  },
];

export default function CareersTestimonials() {
  const reduced = useReducedMotion();

  const WORD_REVEAL = reduced
    ? { hidden: {}, visible: {} }
    : { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
  const line: typeof maskReveal = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : maskReveal;

  return (
    <section className="relative overflow-hidden bg-white py-[56px] md:py-[80px] lg:py-[104px]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbfcfa_0%,#f2f5f4_50%,#fbfcfa_100%)]" />

      <Container narrow className="relative z-10">
        <Reveal>
          <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
          <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
            Internal Voice
          </span>
          <div className="mb-[56px]">
            <h2 className="font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[64px]">
              {"Built by practitioners".split(" ").map((word, i) => (
                <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em]">
                  <motion.span
                    variants={line}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    className="inline-block"
                  >
                    {word}
                    {i < 2 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.1 + i * 0.08}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-[28px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b]/20 hover:shadow-[0_24px_56px_rgba(11,59,56,0.06)] md:p-[32px]">
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#188f8b] to-[#43b0a9] transition-transform duration-500 group-hover:scale-x-100" />

                <span className="mb-[16px] block font-display text-[48px] leading-none text-[#188f8b]/20">
                  &ldquo;
                </span>

                <p className="flex-1 text-[14px] leading-[1.65] tracking-[-0.14px] text-[#5f706e] md:text-[15px]">
                  {t.quote}
                </p>

                <div className="mt-[24px] border-t border-black/[0.06] pt-[20px]">
                  <div className="flex items-center gap-[14px]">
                    <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#188f8b]/15 to-[#0d4f4b]/10 font-display text-[16px] text-[#188f8b]">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold tracking-[-0.2px] text-[#0b1f1e]">
                        {t.name}
                      </p>
                      <p className="text-[12px] text-[#848484]">
                        {t.role}
                      </p>
                      <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#188f8b]/60">
                        Joined {t.joined}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
