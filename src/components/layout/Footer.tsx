"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { EASE, maskReveal } from "@/lib/animations";
import { XLogoIcon, ArrowUpRightIcon, LinkedinLogoIcon } from "@/components/ui/icons";

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "EULA", href: "/eula" },
];

const SOCIAL_LINKS = [
  { label: "", href: "https://www.linkedin.com/company/carbonsynq-networks-inc", Icon: LinkedinLogoIcon },
  { label: "X", href: "https://x.com/CarbonsynqNetworks", Icon: XLogoIcon },
];

const WORD_REVEAL = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };

export default function Footer() {
  const reduced = useReducedMotion();
  const line: typeof maskReveal = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }
    : maskReveal;

  return (
    <footer className="relative z-50 mt-[48px] border-t border-black/[0.06] bg-[#f2f5f4] md:mt-[64px]">
      <Container className="flex flex-col pt-[48px] pb-[32px] md:pt-[64px] md:pb-[40px]">
        {/* CTA */}
        <a
          href="/contact"
          className="group mb-[48px] flex items-center gap-[16px] md:mb-[64px] md:gap-[24px]"
        >
          <motion.span
            variants={WORD_REVEAL}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            className="font-display text-[40px] leading-[0.95] tracking-[-0.88px] text-[#0b1f1e] sm:text-[56px] md:text-[72px] lg:text-[88px]"
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
          <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#0b1f1e] text-white transition-all duration-300 group-hover:translate-x-[4px] group-hover:bg-[#0d4f4b] md:h-[56px] md:w-[56px]">
            <ArrowUpRightIcon size={22} weight="bold" className="transition-transform duration-300 group-hover:rotate-45" />
          </span>
        </a>

        {/* Divider */}
        <motion.div
          className="mb-[32px] h-px w-full bg-black/[0.08] md:mb-[40px]"
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ transformOrigin: "left" }}
        />

        {/* Bottom row */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-[28px] md:flex-row md:items-end md:justify-between md:gap-0"
        >
          {/* Brand + legal */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex items-center gap-[12px]">
              <Logo className="h-[22px] w-auto" />
              <p className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-[#0b1f1e]">
                &copy; 2026 Carbonsynq.
              </p>
            </div>
            <div className="flex items-center gap-[24px]">
              {LEGAL_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-[#5f706e] transition-colors duration-200 hover:text-[#188f8b]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex items-center gap-[12px]">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-[40px] items-center gap-[10px] rounded-full border border-black/[0.08] bg-white px-[16px] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#188f8b]/30 hover:shadow-[0_8px_24px_rgba(11,59,56,0.1)]"
              >
                <item.Icon size={16} weight="fill" className="text-[#5f706e] transition-colors duration-300 group-hover:text-[#188f8b]" />
              </a>
            ))}
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
