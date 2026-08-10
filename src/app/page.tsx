"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import HeroGlobe from "@/components/HeroGlobe";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif-display" });

/* ------------------------------- reveal hook -------------------------------- */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal-up ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- header --------------------------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "text-black text-[14px] font-semibold tracking-[-0.14px] transition-opacity duration-200 hover:opacity-60";

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[70px] w-full max-w-[1520px] items-center justify-between px-[30px] md:h-[100px] lg:px-[70px] max-[490px]:px-[20px]">
        <Link href="/" className="flex items-center">
          <span className="font-display text-[22px] font-bold tracking-[-0.3px] text-black">Carbonsynq</span>
        </Link>

        <div className="flex items-center gap-[20px]">
          <nav className="hidden items-center gap-[20px] md:flex">
            <a href="/product" className={link}>Product</a>
            <a href="/company" className={link}>Company</a>
            <a href="/resources" className={link}>Resources</a>
            <a href="/news" className={link}>News</a>
          </nav>

          <a
            href="mailto:sales@arianetworks.com"
            className="hidden h-[40px] w-[100px] items-center justify-center rounded-full bg-[#16a34a] text-[14px] font-semibold tracking-[-0.14px] text-white transition-colors duration-200 hover:bg-[#15803d] md:inline-flex"
          >
            Contact
          </a>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center text-black md:hidden"
            aria-label="Open menu"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-[rgba(13,13,13,0.95)] backdrop-blur-[10px]" onClick={() => setOpen(false)} />
          <div className="absolute inset-[20px] flex flex-col rounded-[10px] bg-white">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-[20px] left-[20px] flex h-[24px] w-[24px] items-center justify-center text-black"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <nav className="absolute top-1/2 left-[20px] flex -translate-y-1/2 flex-col gap-[25px]">
              {["Product", "Company", "Resources", "News"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="pl-[20px] font-display text-[40px] leading-[0.95] text-black"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="absolute right-[20px] bottom-[20px] left-[20px]">
              <a
                href="mailto:sales@arianetworks.com"
                onClick={() => setOpen(false)}
                className="flex h-[60px] w-full items-center justify-center rounded-[70px] bg-[#16a34a] text-[16px] font-semibold text-white"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ----------------------------------- hero ---------------------------------- */
function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 80% at 50% 10%, #ffffff 0%, #f2faf5 45%, #e4f3ea 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22,163,74,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1520px] grid-cols-1 items-center gap-[48px] px-[30px] pb-[40px] pt-[110px] lg:grid-cols-2 lg:gap-[80px] lg:px-[70px] max-[490px]:px-[20px]">
       {/* Content */}
        <div className="flex flex-col items-start text-left">
          <span className="mb-[24px] inline-flex items-center gap-[8px] rounded-full border border-[#16a34a]/25 bg-[#16a34a]/5 px-[16px] py-[8px] text-[13px] font-semibold uppercase tracking-[0.14em] text-[#15803d]">
            <span className="h-[6px] w-[6px] rounded-full bg-[#16a34a]" />
            CarbonSynq · Net Zero Platform
          </span>

          <h1 className="font-display text-[48px] leading-[0.92] tracking-[-1.2px] text-black md:text-[72px] lg:text-[88px]">
            Powering a Greener Future
          </h1>

          <p className="mt-[24px] max-w-[520px] text-[18px] leading-[1.35] tracking-[-0.2px] text-[#848484] md:text-[20px]">
            From carbon accounting to offsetting — track, manage, and reduce
            your footprint with AI-powered analytics and supply chain insights,
            all in one platform.
          </p>

          <div className="mt-[36px] flex flex-wrap items-center gap-[16px]">
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
              href="#intelligence"
              className="inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full border border-black/15 bg-white px-[30px] text-[16px] font-semibold tracking-[-0.16px] text-black transition-all duration-300 hover:border-[#16a34a]/50 hover:text-[#15803d]"
            >
              Explore More
            </a>
          </div>
        </div> {/* Globe frame */}
        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-[6px] rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.18),transparent_70%)] blur-xl" />
          <div className="relative aspect-square overflow-hidden rounded-[32px] border border-[#16a34a]/15 bg-white/50 backdrop-blur-sm">
            <div className="absolute inset-[10px] rounded-[24px] border border-[#16a34a]/10" />
            <div className="absolute inset-[20px] rounded-full border border-[#16a34a]/10" />
            <HeroGlobe />

            <div className="absolute right-[18px] bottom-[18px] rounded-full border border-[#16a34a]/15 bg-white/80 px-[14px] py-[8px] backdrop-blur-sm">
              <span className="text-[12px] font-semibold tracking-[0.12em] text-[#15803d] uppercase">
                Net Zero Ready
              </span>
            </div>
          </div>

          <div className="absolute -top-[14px] -left-[10px] rounded-2xl border border-[#16a34a]/15 bg-white/85 px-[16px] py-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#848484]">Emissions cut</p>
            <p className="font-display text-[24px] leading-[1] text-[#16a34a]">−42%</p>
          </div>

          <div className="absolute -right-[10px] bottom-[24px] rounded-2xl border border-[#16a34a]/15 bg-white/85 px-[16px] py-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#848484]">Verified offsets</p>
            <p className="font-display text-[24px] leading-[1] text-[#16a34a]">128k tCO₂e</p>
          </div>
        </div>

        
      </div>
    </section>
  );
}

/* -------------------------------- software --------------------------------- */
function SoftwarePanel() {
  const chrome = "rounded-full bg-black/10";
  return (
    <div className="relative h-auto overflow-hidden rounded-[10px] border border-[rgba(0,0,0,0.1)] bg-white">
      <div className="flex h-[480px] flex-col p-[24px] md:h-[640px]">
        <div className="flex items-center justify-between border-b border-black/10 pb-[16px]">
          <div className="flex items-center gap-[8px]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#16a34a]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#9e9e9e]" />
            <span className="h-[10px] w-[10px] rounded-full bg-[#e2e8f0]" />
          </div>
          <span className="text-[12px] uppercase tracking-[0.1em] text-[#848484]">Aria Cloud</span>
        </div>

        <div className="mt-[24px] grid flex-1 grid-cols-3 gap-[12px]">
          <div className="col-span-1 flex flex-col gap-[10px]">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#848484]">Signals</span>
            <div className={`h-[10px] w-full rounded-full ${chrome}`} />
            <div className={`h-[10px] w-4/5 rounded-full ${chrome}`} />
            <div className={`h-[10px] w-full rounded-full ${chrome}`} />
            <div className={`h-[10px] w-2/3 rounded-full ${chrome}`} />
            <div className={`h-[10px] w-5/6 rounded-full ${chrome}`} />
            <div className={`h-[10px] w-full rounded-full bg-[#16a34a]`} />
            <div className={`h-[10px] w-3/4 rounded-full ${chrome}`} />
          </div>

          <div className="col-span-2 flex flex-col gap-[12px]">
            <span className="text-[11px] uppercase tracking-[0.12em] text-[#848484]">Agents</span>
            <div className="rounded-[8px] border border-black/10 p-[12px]">
              <div className="mb-[10px] h-[10px] w-1/2 rounded-full bg-[#16a34a]" />
              <div className={`h-[10px] w-full rounded-full ${chrome}`} />
              <div className={`mt-[6px] h-[10px] w-5/6 rounded-full ${chrome}`} />
            </div>
            <div className="rounded-[8px] border border-black/10 p-[12px]">
              <div className="mb-[10px] h-[10px] w-1/3 rounded-full bg-[#16a34a]" />
              <div className={`h-[10px] w-full rounded-full ${chrome}`} />
              <div className={`mt-[6px] h-[10px] w-2/3 rounded-full ${chrome}`} />
            </div>
            <div className="rounded-[8px] border border-black/10 p-[12px]">
              <div className="mb-[10px] h-[10px] w-2/3 rounded-full bg-[#16a34a]" />
              <div className={`h-[10px] w-full rounded-full ${chrome}`} />
              <div className={`mt-[6px] h-[10px] w-full rounded-full ${chrome}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- calculator -------------------------------- */
const NETWORK_COST = 6_500_000;
const K = 146.67; // $ per xpu per MFU % per year

function Calculator() {
  const [xpus, setXpus] = useState(10000);
  const [mfu, setMfu] = useState(3.0);

  const revenue = K * xpus * mfu;
  const yearsToRecoup = NETWORK_COST / revenue;
  const tokenEfficiency = (7.0 / 3.0) * mfu;
  const mfuToCover = (NETWORK_COST / 5) / (K * xpus);

  const fmtMoney = (v: number) =>
    v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${Math.round(v / 1000)}K`;

  const fillPct = ((mfu - 0.1) / (10 - 0.1)) * 100;

  return (
    <Reveal>
      <section id="mfu-calculator">
        <h2 className="mb-[40px] font-display text-[32px] leading-[1] text-black md:text-[40px]">
          The network that pays for itself
        </h2>

        <div className="grid grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-[20px]">
          <div className="flex h-[260px] flex-col justify-between gap-[20px] rounded-[10px] border border-[rgba(0,0,0,0.15)] bg-[#f0f0f0] p-[20px] md:h-[300px] md:p-[24px]">
            <div>
              <span className="mb-[20px] block text-[14px] font-medium uppercase tracking-[1.68px] text-[#242424]">
                Xpus
              </span>
              <div className="relative flex overflow-hidden rounded-[10px]">
                <div className="pointer-events-none absolute inset-0 z-20 rounded-[10px] border border-[#3b3b3b]" />
                <div
                  className="pointer-events-none absolute top-0 left-0 z-30 h-full rounded-l-[10px] rounded-r-none bg-[#16a34a] transition-all duration-500 ease-[cubic-bezier(0.6,0.040,0.015,1)]"
                  style={{ width: `${(100 / 3) * ([1000, 10000, 100000].indexOf(xpus) + 1)}%` }}
                />
                {[1000, 10000, 100000].map((size, i) => (
                  <button
                    key={size}
                    onClick={() => setXpus(size)}
                    className={`relative z-40 flex h-[60px] flex-1 cursor-pointer items-center justify-center border-0 text-[16px] leading-[1.1] transition-colors duration-500 md:h-[80px] md:text-[20px] ${
                      xpus === size ? "text-white" : "text-black"
                    }`}
                    style={{ borderLeft: i > 0 ? "1px solid #3b3b3b" : undefined }}
                  >
                    {size.toLocaleString("en-US")}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-[20px] flex items-center justify-between">
                <span className="text-[12px] font-medium uppercase tracking-[1.68px] text-[#242424] md:text-[14px]">
                  MFU Improvement <span>(43% baseline)</span>
                </span>
                <span className="text-[12px] text-black md:text-[14px]">{mfu.toFixed(1)}%</span>
              </div>
              <div className="relative h-[4px] w-full">
                <input
                  type="range"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={mfu}
                  onChange={(e) => setMfu(parseFloat(e.target.value))}
                  aria-label="MFU Improvement percentage"
                  className="absolute top-1/2 left-0 z-10 h-[44px] w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent"
                />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[#e2e8f0]" />
                <div className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-[#16a34a]" style={{ width: `${fillPct}%` }} />
                <div
                  className="pointer-events-none absolute top-1/2 h-[16px] w-[16px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-[#16a34a] bg-white"
                  style={{ left: `${fillPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[20px]">
            <div className="flex h-[260px] flex-col justify-between gap-[20px] rounded-[10px] bg-[#0d3b2d] p-[20px] md:h-[300px] md:p-[24px]">
              <span className="block text-[14px] font-medium uppercase tracking-[1.68px] text-[#a7f3d0]">
                Reclaimed annual revenue
              </span>
              <div className="flex items-baseline gap-[10px] whitespace-nowrap font-display text-[72px] leading-[0.95] tracking-[-1px] text-white md:text-[100px] md:gap-[20px]">
                <span className="font-display">{fmtMoney(revenue)}</span>
              </div>
            </div>

            <div className="flex h-auto flex-col md:h-[300px]">
              {[
                { label: "Years to recoup", value: yearsToRecoup.toFixed(1) },
                { label: "Network Cost", value: fmtMoney(NETWORK_COST) },
                { label: "Token Efficiency", value: `+${tokenEfficiency.toFixed(1)}%` },
                { label: "MFU improvement to cover 5 year cost", value: `${mfuToCover.toFixed(1)}%` },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className="flex h-[75px] items-center justify-between"
                  style={{ borderTop: i > 0 ? "1px solid #000" : undefined }}
                >
                  <span className="text-[18px] leading-[1.32] tracking-[-0.2px] text-black md:text-[20px]">
                    {row.label}
                  </span>
                  <span className="text-[18px] leading-[1.32] tracking-[-0.2px] text-[#848484] md:text-[20px]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* ---------------------------------- footer --------------------------------- */
function Footer() {
  return (
    <footer className="relative z-50 mt-[140px] bg-[#f0f0f0]">
      <div className="mx-auto flex h-[440px] w-full max-w-[1520px] flex-col justify-between px-[30px] py-[30px] md:h-[400px] md:pt-[40px] md:pb-[50px] lg:px-[70px] max-[490px]:px-[20px]">
        <a
          href="mailto:sales@arianetworks.com"
          className="group flex items-center gap-[10px] md:gap-[30px]"
        >
          <span className="font-display text-[44px] leading-[0.95] tracking-[-0.88px] text-black min-[768px]:text-[80px] min-[1000px]:text-[100px] min-[1000px]:tracking-[-1px]">
            Get In Touch
          </span>
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

        <div className="flex flex-col gap-[30px]">
          <div className="h-px w-full bg-black" />

          <div className="flex flex-col items-start justify-between gap-[20px] md:flex-row md:items-end md:gap-0">
            <div className="flex flex-col gap-[15px]">
              <p className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-black">
                © 2026 Aria Networks, Inc.
                <br className="md:hidden" /> All rights reserved.
              </p>
              <div className="flex items-center gap-[20px]">
                <a href="/privacy" className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-black hover:underline">Privacy</a>
                <a href="/terms" className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-black hover:underline">Terms</a>
                <a href="/eula" className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-black hover:underline">EULA</a>
              </div>
            </div>

            <div className="flex items-center gap-[30px]">
              <a href="https://www.linkedin.com/company/aria-networks-inc" target="_blank" rel="noopener noreferrer" className="text-[18px] font-medium tracking-[0.18px] text-black hover:underline">LinkedIn</a>
              <a href="https://x.com/AriaNetworks" target="_blank" rel="noopener noreferrer" className="text-[18px] font-medium tracking-[0.18px] text-black hover:underline">X</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------- page ---------------------------------- */
export default function Landing() {
  return (
    <div className={`${dmSans.variable} ${dmSerif.variable}`}>
      <div className="relative font-dm-sans">
        <Header />

        <main>
          <Hero />

          <div className="bg-white text-black">
                        <div id="intelligence" className="mx-auto w-full max-w-[1520px] px-[30px] py-[100px] lg:px-[70px] max-[490px]:px-[20px] md:py-[240px]">
              <Reveal>
                <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#16a34a]/60 via-[#16a34a]/20 to-transparent" />
                <div className="grid grid-cols-1 items-start gap-[40px] md:grid-cols-12">
                  <div className="md:col-span-6">
                    <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#16a34a]">
                      CarbonSynqEarths
                    </span>
                    <h2 className="font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[64px]">
                      Transforming Sustainability into a Competitive Advantage
                    </h2>
                  </div>

                  <div className="flex flex-col gap-[24px] md:col-span-5 md:col-start-8">
                    <p className="text-[18px] leading-[1.32] tracking-[-0.2px] text-[#848484] md:text-[20px]">
                      At CarbonSynqEarths, sustainability isn&apos;t a burden — it&apos;s an
                      opportunity. Our platform simplifies the complex landscape of
                      carbon accounting, enabling organizations to measure, report,
                      and reduce their environmental footprint with unparalleled
                      precision.
                    </p>
                    <p className="text-[18px] leading-[1.32] tracking-[-0.2px] text-[#848484] md:text-[20px]">
                      Founded on principles of transparency and innovation, we
                      empower businesses to turn ESG compliance into strategic value
                      creation.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="mx-auto w-full max-w-[1520px] px-[30px] py-[100px] lg:px-[70px] max-[490px]:px-[20px]">
              <div className="grid grid-cols-1 items-start gap-[40px] md:grid-cols-12">
                <Reveal className="order-2 md:col-span-4 md:order-1">
                  <div className="flex flex-col gap-[29px]">
                    <h4 className="font-display text-[32px] leading-[1] text-black md:text-[40px]">
                      Designed for Humans.
                      <br />
                      Ready for Agents.
                    </h4>
                    <p className="text-[18px] leading-[1.32] tracking-[-0.2px] text-[#848484] md:text-[20px]">
                      You ask. Agents act. Both work from the same intelligence,
                      the same telemetry, the same reasoning. Investigations run
                      continuously, at scale, without waiting. Aria is built from
                      the ground up for both.
                    </p>
                    <a
                      href="/product#software"
                      className="inline-flex h-[50px] items-center justify-center self-start gap-[8px] rounded-full bg-[#16a34a] px-[25px] text-[16px] font-semibold leading-[1] tracking-[-0.16px] text-white transition-colors duration-200 hover:bg-[#15803d]"
                    >
                      More On Software
                    </a>
                  </div>
                </Reveal>

                <Reveal className="order-1 md:col-span-7 md:col-start-6 md:order-2">
                  <SoftwarePanel />
                </Reveal>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[1520px] px-[30px] pb-[100px] pt-[60px] lg:px-[70px] max-[490px]:px-[20px] md:pt-[140px]">
              <Calculator />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
