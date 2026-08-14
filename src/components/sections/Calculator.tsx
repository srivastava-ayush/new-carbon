"use client";

import { useState } from "react";
import Reveal from "@/components/shared/Reveal";

const NETWORK_COST = 6_500_000;
const K = 146.67; // $ per xpu per MFU % per year

const XPU_OPTIONS = [1000, 10000, 100000];

const fmtMoney = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${Math.round(v / 1000)}K`;

export default function Calculator() {
  const [xpus, setXpus] = useState(10000);
  const [mfu, setMfu] = useState(3.0);

  const revenue = K * xpus * mfu;
  const yearsToRecoup = NETWORK_COST / revenue;
  const tokenEfficiency = (7.0 / 3.0) * mfu;
  const mfuToCover = (NETWORK_COST / 5) / (K * xpus);

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
                  style={{ width: `${(100 / 3) * (XPU_OPTIONS.indexOf(xpus) + 1)}%` }}
                />
                {XPU_OPTIONS.map((size, i) => (
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