"use client";

import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, ChartBar, ChartPieSlice, Database, Stack } from "@phosphor-icons/react";
import Section from "@/components/dashboard/Section";
import CountUp from "@/components/dashboard/CountUp";
import BarList from "@/components/dashboard/BarList";
import VerticalBars from "@/components/dashboard/VerticalBars";
import Donut from "@/components/dashboard/Donut";
import { EASE } from "@/lib/animations";
import { CATEGORIES, TOTAL_12M } from "@/lib/demo-data";

const SCOPE_FROM_CATEGORIES = (() => {
  const s1 = CATEGORIES.filter((c) => c.scope === "S1").reduce((a, c) => a + c.value, 0);
  const s2 = CATEGORIES.filter((c) => c.scope === "S2").reduce((a, c) => a + c.value, 0);
  const s3 = CATEGORIES.filter((c) => c.scope === "S3").reduce((a, c) => a + c.value, 0);
  const total = s1 + s2 + s3;
  return [
    { key: "scope1", name: "Scope 1 — Direct", value: s1, share: s1 / total, color: "#15803d" },
    { key: "scope2", name: "Scope 2 — Energy", value: s2, share: s2 / total, color: "#22c55e" },
    { key: "scope3", name: "Scope 3 — Value chain", value: s3, share: s3 / total, color: "#86efac" },
  ];
})();

const STATS = [
  {
    label: "Total footprint",
    value: TOTAL_12M,
    suffix: " tCO₂e",
    delta: -12.4,
    good: true,
    Icon: Stack,
  },
  {
    label: "Scope 3 share",
    value: Math.round(SCOPE_FROM_CATEGORIES[2].share * 100),
    suffix: "%",
    delta: 0.6,
    good: false,
    Icon: ChartPieSlice,
  },
  {
    label: "Largest category",
    value: CATEGORIES[0].value,
    suffix: " tCO₂e",
    delta: CATEGORIES[0].trend,
    good: CATEGORIES[0].trend < 0,
    Icon: ChartBar,
    caption: CATEGORIES[0].name,
  },
  {
    label: "Data sources",
    value: 512,
    suffix: "",
    delta: 8.2,
    good: true,
    Icon: Database,
    caption: "synced automatically",
  },
];

export default function Category() {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => {
          const Icon = s.Icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.08 }}
              whileHover={{ y: -2 }}
              className="flex flex-col rounded-[14px] border border-black/[0.06] bg-white p-[18px]"
            >
              <div className="flex items-center justify-between gap-[8px]">
                <p className="text-[12.5px] font-medium text-[#71717a]">{s.label}</p>
                <span className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] bg-[#f0fdf4] text-[#15803d]">
                  <Icon size={14} />
                </span>
              </div>
              <p className="mt-[12px] text-[24px] font-semibold leading-none tracking-[-0.7px] tabular-nums text-black">
                <CountUp value={s.value} suffix={s.suffix} delay={0.1 + i * 0.08} />
              </p>
              <div className="mt-[8px] flex items-center gap-[6px]">
                <span
                  className={`flex items-center gap-[2px] rounded-full px-[6px] py-[2px] text-[10.5px] font-semibold tabular-nums ${
                    s.good ? "bg-[#f0fdf4] text-[#15803d]" : "bg-[#fef2f2] text-[#dc2626]"
                  }`}
                >
                  {s.delta < 0 ? <ArrowDownRight size={11} weight="bold" /> : <ArrowUpRight size={11} weight="bold" />}
                  {Math.abs(s.delta)}%
                </span>
                <span className="truncate text-[11px] text-[#a1a1aa]">{s.caption ?? "vs last 12 months"}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
        <Section
          title="All categories"
          subtitle="Ranked by emissions, with 12-month change"
          className="lg:col-span-2"
          delay={0.15}
          action={
            <span className="rounded-full border border-black/[0.06] bg-[#fafafa] px-[8px] py-[2px] text-[11px] font-medium text-[#71717a]">
              {CATEGORIES.length} categories
            </span>
          }
        >
          <BarList
            rows={CATEGORIES.map((c) => ({
              label: c.name,
              value: c.value,
              badge: c.scope,
              sublabel: `${c.sources} sources · ${c.trend > 0 ? "+" : ""}${c.trend}%`,
            }))}
            delay={0.15}
          />
        </Section>

        <Section title="Scope mix" subtitle="Emissions split across scopes" delay={0.2}>
          <Donut segments={SCOPE_FROM_CATEGORIES} centerValue={TOTAL_12M} centerLabel="Total" centerSuffix="tCO₂e" delay={0.2} />
        </Section>
      </div>

      <Section
        title="Category comparison"
        subtitle="Relative size of each category"
        delay={0.25}
        action={
          <div className="flex items-center gap-[10px] text-[11px] font-medium text-[#a1a1aa]">
            {["S1", "S2", "S3"].map((s, i) => (
              <span key={s} className="flex items-center gap-[5px]">
                <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: ["#15803d", "#22c55e", "#86efac"][i] }} />
                {s}
              </span>
            ))}
          </div>
        }
      >
        <VerticalBars
          data={CATEGORIES.map((c, i) => ({
            label: ["Goods & services", "Electricity", "Other S3", "Business travel", "Transport", "On-site fuel", "Heating"][i],
            value: c.value,
            color: c.scope === "S1" ? "#15803d" : c.scope === "S2" ? "#22c55e" : "#86efac",
          }))}
          delay={0.2}
          height={240}
        />
      </Section>
    </div>
  );
}
