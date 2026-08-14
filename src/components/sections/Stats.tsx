"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/shared/Reveal";
import Container from "@/components/ui/Container";

const STATS = [
  { value: 1.2, decimals: 1, suffix: "M", label: "tCO₂e tracked" },
  { value: 240, decimals: 0, suffix: "+", label: "Companies on the platform" },
  { value: 12, decimals: 0, suffix: "", label: "Reporting frameworks" },
  { value: 42, decimals: 0, prefix: "−", suffix: "%", label: "Average reduction" },
];

interface CounterProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

function Counter({ value, decimals = 0, prefix = "", suffix = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-[40px] md:py-[56px]">
      <Container narrow>
        <Reveal>
          <div className="rounded-[24px] border border-black/10 bg-gradient-to-br from-[#fafff8] to-white p-[24px] md:rounded-[28px] md:p-[40px]">
            <div className="grid grid-cols-1 divide-y divide-black/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-[12px] px-[24px] py-[28px] lg:py-[8px]">
                  <span className="font-display text-[48px] leading-[0.95] tracking-[-1px] text-black md:text-[60px]">
                    <Counter
                      value={stat.value}
                      decimals={stat.decimals}
                      prefix={stat.prefix ?? ""}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
