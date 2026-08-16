"use client";

import { motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Flame, Lightning, GlobeHemisphereWest, TrendUp, Gauge, ShareNetwork } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Section from "@/components/dashboard/Section";
import CountUp from "@/components/dashboard/CountUp";
import AreaChart from "@/components/dashboard/AreaChart";
import Donut from "@/components/dashboard/Donut";
import BarList from "@/components/dashboard/BarList";
import { EASE } from "@/lib/animations";
import { SCOPE_DETAILS } from "@/lib/demo-data";
import type { ScopeDetail } from "@/lib/demo-data";

const ICONS: Record<ScopeDetail["key"], Icon> = {
  scope1: Flame,
  scope2: Lightning,
  scope3: GlobeHemisphereWest,
};

const METRICS: { key: string; Icon: Icon; label: string }[] = [
  { key: "share", Icon: ShareNetwork, label: "Share of total footprint" },
  { key: "delta", Icon: TrendUp, label: "Change vs last 12 months" },
  { key: "intensity", Icon: Gauge, label: "Intensity · tCO₂e per FTE" },
];

export default function Scope({ scope }: { scope: ScopeDetail["key"] }) {
  const detail = SCOPE_DETAILS.find((d) => d.key === scope)!;
  const ScopeIcon = ICONS[detail.key];

  const metrics = [
    {
      Icon: METRICS[0].Icon,
      label: METRICS[0].label,
      value: detail.share * 100,
      suffix: "%",
      decimals: 0,
      good: true,
      delta: null as number | null,
    },
    {
      Icon: METRICS[1].Icon,
      label: METRICS[1].label,
      value: Math.abs(detail.delta),
      suffix: "%",
      decimals: 1,
      good: detail.delta < 0,
      delta: detail.delta,
    },
    {
      Icon: METRICS[2].Icon,
      label: METRICS[2].label,
      value: detail.intensity,
      suffix: "",
      decimals: 1,
      good: true,
      delta: null as number | null,
    },
  ];

  return (
    <div className="flex flex-col gap-[16px]">
      <Section pad={false} delay={0.05} className="overflow-hidden">
        <div className="flex flex-col gap-[20px] p-[20px] md:flex-row md:items-center md:justify-between md:p-[24px]">
          <div className="flex items-center gap-[16px]">
            <span
              className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[12px] text-white"
              style={{ backgroundColor: detail.color }}
            >
              <ScopeIcon size={24} weight="fill" />
            </span>
            <div>
              <div className="flex items-center gap-[8px]">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#a1a1aa]">Scope {detail.num}</p>
                <span className="rounded-full border border-black/[0.06] bg-[#fafafa] px-[8px] py-[2px] text-[10.5px] font-medium text-[#71717a]">
                  {Math.round(detail.share * 100)}% of total
                </span>
              </div>
              <h2 className="mt-[4px] text-[20px] font-semibold tracking-[-0.4px] text-black">{detail.name}</h2>
              <p className="mt-[2px] text-[12.5px] text-[#71717a]">{detail.headline}</p>
            </div>
          </div>

          <div className="flex items-baseline gap-[10px] md:flex-col md:items-end">
            <p className="text-[38px] font-semibold leading-none tracking-[-1.2px] tabular-nums text-black">
              <CountUp value={detail.total} delay={0.2} />
              <span className="ml-[6px] text-[14px] font-medium text-[#a1a1aa]">tCO₂e</span>
            </p>
            <span
              className={`flex items-center gap-[3px] rounded-full px-[8px] py-[2px] text-[11px] font-semibold tabular-nums ${
                detail.delta < 0 ? "bg-[#f0fdf4] text-[#15803d]" : "bg-[#fef2f2] text-[#dc2626]"
              }`}
            >
              {detail.delta < 0 ? <ArrowDownRight size={12} weight="bold" /> : <ArrowUpRight size={12} weight="bold" />}
              {Math.abs(detail.delta)}%
              <span className="font-medium opacity-70">vs last 12 months</span>
            </span>
          </div>
        </div>
        <p className="border-t border-black/[0.06] px-[20px] py-[12px] text-[12.5px] leading-relaxed text-[#52525b] md:px-[24px]">
          {detail.description}
        </p>
      </Section>

      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-3">
        {metrics.map((m, i) => {
          const MetricIcon = m.Icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-[14px] rounded-[14px] border border-black/[0.06] bg-white p-[16px]"
            >
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[9px] bg-[#f0fdf4] text-[#15803d]">
                <MetricIcon size={17} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11.5px] text-[#71717a]">{m.label}</p>
                <p className="mt-[2px] text-[19px] font-semibold leading-none tracking-[-0.4px] tabular-nums text-black">
                  <CountUp value={m.value} decimals={m.decimals} suffix={m.suffix} delay={0.2 + i * 0.08} />
                </p>
                {m.delta !== null && (
                  <p className={`mt-[3px] text-[10.5px] font-medium ${m.good ? "text-[#16a34a]" : "text-[#dc2626]"}`}>
                    {m.delta < 0 ? "↓" : "↑"} {Math.abs(m.delta)}% year over year
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
        <Section
          title={`Scope ${detail.num} — monthly trend`}
          subtitle="Emissions per month, all scopes for comparison"
          className="lg:col-span-2"
          delay={0.2}
        >
          <AreaChart defaultMode={detail.key} delay={0.2} />
        </Section>

        <Section title="Source mix" subtitle="Where these emissions come from" delay={0.25}>
          <Donut
            segments={detail.sources.map((s) => ({
              key: s.name,
              name: s.name,
              value: s.value,
              share: s.share,
              color: detail.color,
            }))}
            centerValue={detail.total}
            centerLabel="Total"
            centerSuffix="tCO₂e"
            delay={0.2}
          />
        </Section>
      </div>

      <Section
        title={`Scope ${detail.num} sources`}
        subtitle="Individual sources contributing to this scope"
        delay={0.3}
        action={
          <span className="flex items-center gap-[6px] rounded-full border border-black/[0.06] bg-[#fafafa] px-[8px] py-[2px] text-[11px] font-medium text-[#71717a]">
            <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: detail.color }} />
            {detail.sources.length} sources
          </span>
        }
      >
        <div className="mx-auto max-w-[720px]">
          <BarList
            rows={detail.sources.map((s) => ({ label: s.name, value: s.value, sublabel: `${Math.round(s.share * 100)}% of scope` }))}
            delay={0.25}
            color={detail.color}
          />
        </div>
      </Section>
    </div>
  );
}
