"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/animations";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const FAQS = [
  {
    question: "Can I switch plans later?",
    answer:
      "Yes. You can upgrade, downgrade, or switch between monthly and annual billing at any time. Changes are prorated automatically, so you only ever pay for what you use.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No. All plans include full platform access during setup with no hidden setup or onboarding fees. You pay for the plan and that's it.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "You keep ownership of your data at all times. Upon cancellation, you can export everything as PDF or CSV. We retain a copy for 90 days after the end of your billing period should you wish to return.",
  },
  {
    question: "Where is data stored? Is it GDPR-compliant?",
    answer:
      "Data is stored in secure, region-aware infrastructure with encryption at rest and in transit. We are GDPR-compliant and can provide a Data Processing Agreement (DPA) on request.",
  },
  {
    question: "Do you offer annual billing discounts?",
    answer:
      "Yes. Annual billing saves you 20% compared to monthly billing. Large enterprise contracts are priced individually through our sales team.",
  },
];

export default function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <Section narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          Frequently Asked Questions
        </span>
        <h2 className="mb-[48px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[56px] md:text-[64px]">
          Pricing FAQ
        </h2>
      </Reveal>

      <div className="mx-auto flex max-w-[820px] flex-col gap-[10px]">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.question} delay={0.05 + i * 0.04}>
              <div className="overflow-hidden rounded-[18px] border border-black/[0.06] bg-white transition-colors duration-300 hover:border-[#188f8b]/20">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-[16px] px-[24px] py-[20px] text-left md:px-[28px]"
                  aria-expanded={isOpen}
                >
                  <span className={`text-[15px] font-semibold tracking-[-0.2px] ${isOpen ? "text-[#188f8b]" : "text-[#0b1f1e]"}`}>
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? "border-[#188f8b] bg-[#188f8b] text-white" : "border-black/10 text-[#52525b]"
                    }`}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-[13px] w-[13px]">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={reduced ? { height: 0 } : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={reduced ? { height: 0 } : { opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="px-[24px] pb-[24px] text-[14px] leading-[1.6] tracking-[-0.12px] text-[#848484] md:px-[28px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}

        <Reveal delay={0.2}>
          <div className="mt-[24px] flex flex-col items-center justify-center gap-[16px] rounded-[18px] border border-[#188f8b]/15 bg-[#f2faf9] px-[24px] py-[28px] text-center">
            <h3 className="text-[18px] font-semibold tracking-[-0.3px] text-[#0b1f1e]">
              Not sure which plan fits?
            </h3>
            <p className="max-w-[420px] text-[14px] leading-[1.55] text-[#5f706e]">
              We&apos;ll look at your reporting obligations, team size, and data
              sources and tell you exactly which plan makes sense — and which one
              doesn&apos;t.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-[12px]">
              <a
                href="/contact"
                className="inline-flex h-[44px] items-center justify-center rounded-full bg-[#0b3b38] px-[26px] text-[14px] font-semibold text-white shadow-[0_10px_24px_rgba(11,59,56,0.22)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#0e4a47]"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
