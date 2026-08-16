"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { EASE, maskReveal } from "@/lib/animations";

const CONTACT_EMAIL = "sales@Carbonsynqnetworks.com";

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "EULA", href: "/eula" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/Carbonsynq-networks-inc" },
  { label: "X", href: "https://x.com/CarbonsynqNetworks" },
];

const WORD_REVEAL = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };

export default function Footer() {
  const reduced = useReducedMotion();
  const line: typeof maskReveal = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : maskReveal;

  return (
    <footer className="relative z-50 mt-[80px] bg-[#f0f0f0] md:mt-[120px]">
      <Container className="flex h-[440px] flex-col justify-between py-[30px] md:h-[400px] md:pt-[40px] md:pb-[50px]">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group flex items-center gap-[10px] md:gap-[30px]"
        >
          <motion.span
            variants={WORD_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="font-display text-[44px] leading-[0.95] tracking-[-0.88px] text-black min-[768px]:text-[80px] min-[1000px]:text-[100px] min-[1000px]:tracking-[-1px]"
          >
            {"Get In Touch".split(" ").map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em]">
                <motion.span variants={line} className="inline-block">
                  {word}
                  {i < 2 ? "\u00A0" : ""}
                </motion.span>
              </span>
            ))}
          </motion.span>
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[32px] w-[32px] shrink-0 text-black transition-transform duration-300 group-hover:translate-x-[10px] md:hidden"
          >
            <path d="M7 16h18M17 8l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="hidden transition-transform duration-300 group-hover:translate-x-[10px] md:block">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[40px] w-[40px] text-black">
              <path d="M8 20h24M20 10l10 10-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-[30px]"
        >
          <motion.div
            className="h-px w-full bg-black"
            initial={reduced ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformOrigin: "left" }}
          />

          <div className="flex flex-col items-start justify-between gap-[20px] md:flex-row md:items-end md:gap-0">
            <div className="flex flex-col gap-[15px]">
              <div className="flex items-center gap-[12px]">
                <Logo className="h-[22px] w-auto" />
                <p className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-black">
                  © 2026 Carbonsynq.
                  <br className="md:hidden" /> All rights reserved.
                </p>
              </div>
              <div className="flex items-center gap-[20px]">
                {LEGAL_LINKS.map((item) => (
                  <a key={item.href} href={item.href} className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-black hover:underline">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-[30px]">
              {SOCIAL_LINKS.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="text-[18px] font-medium tracking-[0.18px] text-black hover:underline">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
