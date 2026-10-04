"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Calculator,
  ChartPieSlice,
  Database,
  FileText,
  ShieldCheck,
  StackSimple,
  Target,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType, CSSProperties } from "react";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

// Types
interface Capability {
  num: string;
  title: string;
  Icon: ComponentType<IconProps>;
  points?: string[];
  trace?: string[];
  report?: boolean;
  chart?: "sources" | "target";
}

// Data — 7 uniform cards (content density matched to Card 1)
const CAPABILITIES: Capability[] = [
  {
    num: "01",
    title: "Collect & automate data",
    Icon: Database,
    points: [
      "Electricity and fuel bills",
      "Travel and commuting",
      "Procurement, waste & refrigerants",
      "Supplier and other operational data",
      "Upload invoices, bills & spreadsheets",
      "Extract relevant activity data",
      "Reduce manual data entry",
    ],
  },
  {
    num: "02",
    title: "Centralize carbon data",
    Icon: StackSimple,
    points: [
      "One place for all facilities & periods",
      "Replace spreadsheets and scattered documents",
      "Track data quality and completeness",
      "Automate data collection workflows",
      "Integrate with existing systems",
      "Ensure data security and compliance",
    ],
  },
  {
    num: "03",
    title: "Calculate Scope 1, 2 & 3",
    Icon: Calculator,
    points: [
      "Convert activity data into CO₂e",
      "Apply appropriate emission factors",
      "Location & market-based Scope 2",
      "Support multiple emission factors",
      "Handle complex calculations",
      "Provide audit trail for all calculations",
    ],
  },
  {
    num: "04",
    title: "Make emissions auditable",
    Icon: ShieldCheck,
    points: [
      "Every number traces back to a source",
      "Maintain data lineage",
      "Support third-party audits",
      "Ensure data integrity",
      "Provide transparent methodology",
    ],
    trace: ["Report", "Emission", "Factor", "Activity", "Source"],
  },
  {
    num: "05",
    title: "Generate sustainability reports",
    Icon: FileText,
    points: [
      "Full Scope 1/2/3 inventory",
      "By facility, category & year-over-year",
      "Exportable PDF/Excel",
      "Customizable report templates",
    ],
    report: true,
  },
  {
    num: "06",
    title: "Biggest emission sources",
    Icon: ChartPieSlice,
    points: [
      "Identify top emission sources",
      "Compare across facilities and periods",
      "Track changes over time",
      "Prioritize reduction efforts",
    ],
    chart: "sources",
  },
  {
    num: "07",
    title: "Track progress to target",
    Icon: Target,
    points: [
      "Set science-based targets",
      "Monitor reduction progress",
      "Forecast future emissions",
      "Adjust strategies as needed",
    ],
    chart: "target",
  },
];

const BIGGEST_SOURCES = [
  { name: "Purchased goods", value: "32%" },
  { name: "Electricity", value: "21%" },
  { name: "Business travel", value: "9%" },
  { name: "Transport", value: "8%" },
];

// ─── Uniform Card ────────────────────────────────────────────────────────────

function CapCard({ item }: { item: Capability }) {
  const { num, title, Icon, points, trace, report, chart } = item;

  return (
    <div className="flex h-full min-h-full flex-col items-center rounded-[24px] border border-[#188f8b]/15 bg-[#188f8b] p-[20px] text-center">
      {/* Header */}
      <div className="flex w-full items-center justify-center gap-[10px]">
        <Icon size={18} weight="regular" className="text-[#f2faf9]" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f2faf9]">
          {num}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-[12px] font-display text-[18px] leading-[1.15] tracking-[-0.3px] text-[#f2faf9]">
        {title}
      </h3>

      {/* Content */}
      <div className="mt-[12px] flex w-full flex-1 flex-col items-center">
        {points && (
          <ul className="flex flex-col gap-[6px]">
            {points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-[6px] text-[12px] leading-[1.4] text-[#f2faf9]"
              >
                <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#f2faf9]/50" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {trace && (
          <div className="mt-[10px] flex flex-wrap items-center justify-center gap-[4px]">
            {trace.map((step, i) => (
              <span key={step} className="flex items-center gap-[4px]">
                <span className="rounded-full border border-black/10 px-[8px] py-[4px] text-[10px] font-medium text-[#f2faf9]">
                  {step}
                </span>
                {i < trace.length - 1 && (
                  <span className="text-[9px] text-[#f2faf9]">→</span>
                )}
              </span>
            ))}
          </div>
        )}

        {report && (
          <div className="mt-[10px] w-full max-w-[180px] rounded-[12px] border border-black/8 bg-white p-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#f2faf9]">
                Scope 1 · 2 · 3
              </span>
            </div>
            <div className="mt-[6px] flex gap-[4px]">
              <div className="h-[20px] flex-1 rounded-[4px] bg-[#188f8b]/10" />
              <div className="h-[20px] flex-1 rounded-[4px] bg-[#188f8b]/25" />
              <div className="h-[20px] flex-1 rounded-[4px] bg-[#188f8b]/60" />
              <div className="h-[20px] flex-1 rounded-[4px] bg-[#188f8b]" />
            </div>
            <div className="mt-[4px] flex items-center justify-between">
              <span className="text-[8px] font-medium text-[#a1a1aa]">2023 → 2025</span>
              <span className="text-[9px] font-semibold text-[#188f8b]">−42%</span>
            </div>
          </div>
        )}

        {chart === "sources" && (
          <div className="mt-[10px] w-full max-w-[200px]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#f2faf9]/40">
              Biggest sources
            </p>
            <div className="mt-[8px] flex flex-col gap-[6px]">
              {BIGGEST_SOURCES.map((source) => (
                <div key={source.name} className="flex items-center gap-[6px]">
                  <span className="w-[80px] shrink-0 text-left text-[10px] text-[#f2faf9]">
                    {source.name}
                  </span>
                  <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#f0f0f0]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#188f8b] to-[#43b0a9]"
                      style={{ width: source.value }}
                    />
                  </div>
                  <span className="w-[24px] shrink-0 text-right text-[10px] font-semibold text-[#f2faf9]/50">
                    {source.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {chart === "target" && (
          <div className="mt-[10px] w-full max-w-[200px]">
            <div className="mb-[4px] flex items-center justify-between text-[10px] font-medium">
              <span className="text-[#f2faf9]">Progress to 2030 target</span>
              <span className="text-[#f2faf9]/50">−42%</span>
            </div>
            <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#f0f0f0]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#188f8b] to-[#43b0a9]"
                style={{ width: "42%" }}
              />
            </div>
            <div className="mt-[10px] flex flex-col gap-[6px]">
              {[
                { label: "Baseline 2023", value: "8,420 tCO₂e" },
                { label: "Current 2025", value: "4,880 tCO₂e" },
                { label: "Target 2030", value: "−50%" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-black/5 pb-[6px] last:border-0 last:pb-0"
                >
                  <span className="text-[10px] text-[#f2faf9]">{row.label}</span>
                  <span className="text-[10px] font-semibold text-[#f2faf9]/50">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────

export default function Capabilities() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const totalCards = CAPABILITIES.length;

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
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, isDragging, totalCards]);

  // Navigation
  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

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

  // Determine card position relative to current index
  const getCardPosition = (index: number): "left" | "center" | "right" | "hidden" => {
    let diff = index - currentIndex;
    if (diff > totalCards / 2) diff -= totalCards;
    if (diff < -totalCards / 2) diff += totalCards;

    if (diff === -1) return "left";
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "hidden";
  };

  // Positioning styles per card role — center 40%, sides 30%
  const getCardStyles = (position: string): CSSProperties => {
    const base: CSSProperties = {
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      minHeight: isMobile ? "240px" : "300px",
    };

    if (isMobile) {
      return position === "center"
        ? { ...base, width: "85%", left: "7.5%", top: "0%", zIndex: 10, opacity: 1, transform: "scale(1)" }
        : { ...base, width: "85%", left: "7.5%", top: "0%", zIndex: 0, opacity: 0, transform: "scale(0.95)" };
    }

    switch (position) {
      case "center":
        return { ...base, width: "40%", left: "30%", top: "0%", zIndex: 10, opacity: 1, transform: "scale(1)" };
      case "left":
        return { ...base, width: "30%", left: "0%", top: "18%", zIndex: 5, opacity: 0.5, transform: "scale(0.8)" };
      case "right":
        return { ...base, width: "30%", left: "70%", top: "18%", zIndex: 5, opacity: 0.5, transform: "scale(0.8)" };
      default:
        return { ...base, width: "30%", left: "-100%", top: "18%", zIndex: 0, opacity: 0, transform: "scale(0.8)" };
    }
  };

  return (
    <Section id="capabilities" narrow>
      <Reveal>
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          What we help companies with
        </span>
        <h2 className="mb-[20px] max-w-[720px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[24px] md:text-[64px]">
          We automate carbon accounting
        </h2>
        <p className="mb-[48px] max-w-[560px] text-[16px] leading-[1.5] tracking-[-0.14px] text-[#848484] md:mb-[64px] md:text-[18px]">
          From raw business data to audit-ready emissions reports - collected,
          validated, calculated, and reported automatically.
        </p>
      </Reveal>

      {/* Carousel window */}
      <div
        className="relative"
        style={{ minHeight: isMobile ? "300px" : "380px" }}
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
        {CAPABILITIES.map((item, i) => (
          <div key={item.num} className="absolute" style={getCardStyles(getCardPosition(i))}>
            <CapCard item={item} />
          </div>
        ))}

        {/* Desktop prev / next buttons */}
        {!isMobile && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-[2%] top-[35%] z-20 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/60 backdrop-blur-sm transition-all hover:border-[#188f8b]/30 hover:text-[#188f8b]"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-[2%] top-[35%] z-20 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/60 backdrop-blur-sm transition-all hover:border-[#188f8b]/30 hover:text-[#188f8b]"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      <div className="mt-[20px] flex items-center justify-center gap-[6px]">
        {CAPABILITIES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-[20px] bg-[#188f8b]"
                : "w-[6px] bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </Section>
  );
}
