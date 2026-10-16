"use client";

import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import { EASE } from "@/lib/animations";
import Reveal from "@/components/shared/Reveal";
import CarbonCard from "@/components/ui/CarbonCard";

export default function CareersMission() {
  const reduced = useReducedMotion();

  return (
    <section id="mission" className="relative overflow-hidden bg-white py-[56px] md:py-[80px] lg:py-[104px]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbfcfa_0%,#ffffff_40%,#fbfcfa_100%)]" />

      <Container narrow className="relative z-10">
        <div className="grid grid-cols-1 gap-[48px] lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
              <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
                Join Our Mission
              </span>
              <h2 className="mb-[24px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[64px]">
                Building a{" "}
                <span className="text-[#188f8b]">Sustainable Future</span>
              </h2>
              <p className="max-w-[480px] text-[17px] leading-[1.55] tracking-[-0.2px] text-[#5f706e] md:text-[19px]">
                Apply Now. Your Career in Climate Innovation.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <CarbonCard
              badge={
                <svg viewBox="0 0 24 24" fill="none" className="h-[13px] w-[13px]">
                  <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="Featured on Republic Bharat"
              description="Education Conclave Keynote"
            >
              <p className="text-[16px] leading-[1.5] tracking-[-0.14px] text-[#3f5a55] transition-colors duration-300 group-hover:text-[#ade5df]/85">
                <span className="font-semibold text-[#0b1f1e] transition-colors duration-300 group-hover:text-white">
                  Pioneering the Carbon Space on National Television.
                </span>{" "}
                CarbonSynq was recognized at the prestigious <strong className="transition-colors duration-300 group-hover:text-white">R. Education Conclave</strong> hosted by Republic Bharat — validation of our mission to drive enterprise-wide net-zero intelligence.
              </p>

              <div className="mt-[16px] rounded-[14px] border border-black/[0.06] bg-white p-[20px]">
                <div className="flex items-center gap-[10px]">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#188f8b]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#188f8b]">
                    Republic Bharat Conclave
                  </span>
                </div>
                <p className="mt-[10px] text-[13px] leading-[1.5] text-[#5f706e]">
                  Education Conclave Keynote — CarbonSynq&apos;s vision for climate tech and enterprise sustainability.
                </p>
              </div>
            </CarbonCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
