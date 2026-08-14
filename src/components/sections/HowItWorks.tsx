"use client";

import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";
import StepCard from "@/components/ui/StepCard";
import StepVisualPanel from "@/components/ui/StepVisualPanel";
import { UploadVisual, ProcessVisual, CalculateVisual, ReportsVisual } from "@/components/ui/visuals";

interface Step {
  num: string;
  title: string;
  description: string;
  Visual: ComponentType;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Upload Your Data",
    description:
      "Upload invoices, fuel records, and energy bills — or connect systems directly via API.",
    Visual: UploadVisual,
  },
  {
    num: "02",
    title: "Process Your Data",
    description:
      "Our AI agents clean, match, and normalize your records into a structured carbon ledger — no manual prep needed.",
    Visual: ProcessVisual,
  },
  {
    num: "03",
    title: "Calculate Emissions",
    description:
      "Our AI converts your data into certified Scope 1, 2 & 3 emissions using approved factors.",
    Visual: CalculateVisual,
  },
  {
    num: "04",
    title: "Get Reports & Act",
    description:
      "Receive audit-ready reports and actionable AI recommendations to reduce carbon risk.",
    Visual: ReportsVisual,
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index ?? 0);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    blockRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const { Visual } = STEPS[active];

  return (
    <Section id="how-it-works" narrow className="relative pt-[32px]! md:pt-[56px]! lg:pt-[72px]!">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[32px] md:h-[56px] lg:h-[72px]"
        style={{
          background:
            "linear-gradient(to bottom, #e4f3ea 0%, rgba(228,243,234,0.6) 55%, transparent 100%)",
        }}
      />
      <Reveal>
        <div className="mb-[32px]` h-px w-full bg-gradient-to-r from-[#16a34a]/60 via-[#16a34a]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#16a34a]">
          How it works
        </span>
        <h2 className="mb-[48px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[64px] md:text-[64px]">
          How we make it happen
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-[40px] md:grid-cols-12 md:gap-[60px]">
        <div className="md:col-span-5">
          <div className="relative flex flex-col md:sticky md:top-[120px] md:h-[calc(100dvh-240px)] md:justify-center">
            {STEPS.map((step, i) => {
              const isActive = active === i;
              const isComplete = i < active;
              const isLast = i === STEPS.length - 1;
              return (
                <div key={step.num} className="relative pb-[6px] pl-[44px] last:pb-0">
                  {!isLast && (
                    <div
                      className={`absolute top-[26px] left-[13px] w-[2px] rounded-full transition-colors duration-500 ${
                        isComplete ? "bg-[#16a34a]/50" : "bg-[#e4e4e7]"
                      }`}
                      style={{ height: "calc(100% - 20px)" }}
                    />
                  )}
                  {isActive && (
                    <span className="absolute top-[12px] left-[6px] h-[18px] w-[18px] animate-ping rounded-full bg-[#16a34a]/25" />
                  )}
                  <span
                    className={`absolute top-[14px] left-[7px] flex h-[14px] w-[14px] items-center justify-center rounded-full border transition-colors duration-500 ${
                      isActive
                        ? "border-[#16a34a] bg-[#16a34a]"
                        : isComplete
                          ? "border-[#16a34a]/60 bg-[#e4f3ea]"
                          : "border-[#d4d4d8] bg-white"
                    }`}
                  >
                    {(isActive || isComplete) && (
                      <svg viewBox="0 0 12 12" className="h-[8px] w-[8px]" fill="none">
                        <path
                          d="M2.5 6l2.5 2.5L9.5 3.5"
                          stroke={isActive ? "#ffffff" : "#16a34a"}
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <StepCard
                    num={step.num}
                    title={step.title}
                    description={step.description}
                    active={isActive}
                    compact
                    onClick={() => goTo(i)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="mb-[60px] md:sticky md:top-[120px] md:mb-0 md:flex md:h-[calc(100dvh-240px)] md:items-stretch">
            <StepVisualPanel index={active} Visual={Visual} />
          </div>

          <div className="flex flex-col">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                data-index={i}
                className="h-[70vh] md:h-screen"
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}