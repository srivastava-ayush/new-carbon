"use client";

import { useCallback, useEffect, useState } from "react";
import type { ComponentType, CSSProperties } from "react";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";
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
      "Receive audit-ready reports and AI based decarbonization strategies to reduce carbon risk.",
    Visual: ReportsVisual,
  },
];

export default function HowItWorks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalSteps = STEPS.length;

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-advance every 5 seconds (pauses on hover / drag)
  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSteps);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, totalSteps]);

  // Navigation
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSteps) % totalSteps);
  }, [totalSteps]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSteps);
  }, [totalSteps]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (dragOffset > 50) {
      goToPrev();
    } else if (dragOffset < -50) {
      goToNext();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Mouse drag handlers (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (dragOffset > 50) {
      goToPrev();
    } else if (dragOffset < -50) {
      goToNext();
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Determine frame position relative to current index
  const getFramePosition = (index: number): "left" | "center" | "right" | "hidden" => {
    let diff = index - currentIndex;
    if (diff > totalSteps / 2) diff -= totalSteps;
    if (diff < -totalSteps / 2) diff += totalSteps;

    if (diff === -1) return "left";
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "hidden";
  };

  // Positioning styles per frame role
  const getFrameStyles = (position: string): CSSProperties => {
    const base: CSSProperties = {
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
    };

    switch (position) {
      case "center":
        return {
          ...base,
          opacity: 1,
          transform: "translateX(0)",
          zIndex: 10,
          pointerEvents: "auto",
        };
      case "left":
        return {
          ...base,
          opacity: 0,
          transform: "translateX(-100%)",
          zIndex: 0,
          pointerEvents: "none",
        };
      case "right":
        return {
          ...base,
          opacity: 0,
          transform: "translateX(100%)",
          zIndex: 0,
          pointerEvents: "none",
        };
      default:
        return {
          ...base,
          opacity: 0,
          transform: "translateX(0)",
          zIndex: 0,
          pointerEvents: "none",
        };
    }
  };

  return (
    <Section id="how-it-works" narrow className="relative pt-[32px]! md:pt-[56px]! lg:pt-[72px]!">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[32px] md:h-[56px] lg:h-[72px]"
        style={{
          background:
            "linear-gradient(to bottom, #fbfcfa 0%, rgba(251,252,250,0.6) 55%, transparent 100%)",
        }}
      />
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          How it works
        </span>
        <h2 className="mb-[64px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[80px] md:text-[64px]">
          How we make it happen
        </h2>
      </Reveal>

      {/* Carousel window */}
      <div
        className="relative overflow-hidden"
        style={{ minHeight: isMobile ? "480px" : "420px" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsDragging(false);
          setDragOffset(0);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {STEPS.map((step, i) => {
          const position = getFramePosition(i);
          const { Visual } = step;
          return (
            <div
              key={step.num}
              className="absolute inset-0 flex flex-col gap-[16px] md:flex-row md:gap-[24px]"
              style={getFrameStyles(position)}
            >
              {/* Text card */}
              <div className="flex flex-col justify-center rounded-[24px] border border-[#188f8b]/15 bg-white p-[24px] md:w-[40%] md:p-[32px]">
                <span className="font-display text-[32px] leading-none text-[#188f8b] md:text-[40px]">
                  {step.num}
                </span>
                <h3 className="mt-[12px] font-display text-[22px] leading-[1.1] tracking-[-0.4px] text-black md:text-[26px]">
                  {step.title}
                </h3>
                <p className="mt-[12px] text-[14px] leading-[1.5] tracking-[-0.14px] text-[#848484] md:text-[16px]">
                  {step.description}
                </p>
              </div>

              {/* SVG card */}
              <div className="flex flex-1 items-center justify-center rounded-[24px] border border-[#188f8b]/15 bg-white p-[16px] md:w-[60%] md:p-[24px]">
                <div className="h-[280px] w-full max-w-[520px] md:h-[380px]">
                  <Visual />
                </div>
              </div>
            </div>
          );
        })}


      </div>

      {/* Dot indicators */}
      <div className="mt-[20px] flex items-center justify-center gap-[6px]">
        {STEPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-[20px] bg-[#188f8b]"
                : "w-[6px] bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </Section>
  );
}
