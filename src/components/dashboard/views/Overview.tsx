"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { motion } from "motion/react";
import KpiCard from "@/components/dashboard/KpiCard";
import AreaChart from "@/components/dashboard/AreaChart";
import Donut from "@/components/dashboard/Donut";
import CategoryList from "@/components/dashboard/CategoryList";
import TargetPanel from "@/components/dashboard/TargetPanel";
import ActivityTable from "@/components/dashboard/ActivityTable";
import Section from "@/components/dashboard/Section";
import CountUp from "@/components/dashboard/CountUp";
import { EASE } from "@/lib/animations";
import type { TabId } from "@/components/dashboard/Sidebar";
import { useDashboardContext } from "@/hooks/useDashboardContext";

const GROUP_ICONS = {
  airplane: "✈",
  users: "👤",
  building: "🏢",
  truck: "🚚",
  factory: "🏭",
} as const;

export default function Overview({ onNavigate }: { onNavigate: (tab: TabId) => void }) {
  const { data: { KPIS, SCOPES, FOOTPRINT_GROUPS, TOTAL_12M } } = useDashboardContext();

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((kpi: any, i: number) => (
          <KpiCard key={kpi.label} kpi={kpi} delay={0.05 + i * 0.08} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
        <Section title="Emissions over time" subtitle="Total CO₂e per month, broken down by scope" className="lg:col-span-2" delay={0.2}>
          <AreaChart delay={0.15} />
        </Section>
        <Section title="Scope breakdown" subtitle="Share of total footprint" delay={0.25}>
          <Donut segments={SCOPES} centerValue={TOTAL_12M} centerLabel="Total" centerSuffix="tCO₂e" delay={0.2} />
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-2">
        <Section title="Biggest sources" subtitle="Emissions by category" delay={0.3}>
          <CategoryList delay={0.15} />
        </Section>
        <Section title="2030 reduction target" subtitle="Science-based · aligned to 1.5 °C" delay={0.35}>
          <TargetPanel delay={0.2} />
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
        <Section
          title="Recent activity"
          subtitle="Latest data processed from your sources"
          className="lg:col-span-2"
          delay={0.4}
          action={
            <button
              onClick={() => onNavigate("reports")}
              className="flex items-center gap-[4px] text-[12px] font-semibold text-[#15803d] transition-colors hover:text-[#0d3b2d]"
            >
              View all <ArrowRight size={12} weight="bold" />
            </button>
          }
        >
          <ActivityTable delay={0.1} />
        </Section>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.45 }}
          className="flex flex-col rounded-[14px] border border-[#16a34a]/15 bg-[#f6fbf8] p-[20px]"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13.5px] font-semibold tracking-[-0.1px] text-[#0d3b2d]">Footprint by group</p>
              <p className="mt-[2px] text-[12px] text-[#4b6b5a]">Where emissions actually come from</p>
            </div>
            <button
              onClick={() => onNavigate("footprint")}
              className="flex items-center gap-[4px] text-[12px] font-semibold text-[#15803d] transition-colors hover:text-[#0d3b2d]"
            >
              Details <ArrowRight size={12} weight="bold" />
            </button>
          </div>

          <div className="mt-[18px] flex flex-1 flex-col justify-center gap-[13px]">
            {FOOTPRINT_GROUPS.map((g: any, i: number) => (
              <motion.button
                key={g.key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.5 + i * 0.07 }}
                onClick={() => onNavigate("footprint")}
                className="group flex items-center gap-[10px] text-left"
              >
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-white text-[13px] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                  {GROUP_ICONS[g.icon as keyof typeof GROUP_ICONS]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-[4px] flex items-baseline justify-between gap-[8px]">
                    <span className="truncate text-[12px] font-medium text-[#2c4a3a] transition-colors group-hover:text-black">
                      {g.name}
                    </span>
                    <span className="text-[11.5px] font-semibold tabular-nums text-[#0d3b2d]">
                      <CountUp value={g.value} delay={0.55 + i * 0.07} />
                    </span>
                  </div>
                  <div className="h-[5px] w-full overflow-hidden rounded-full bg-white">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${FOOTPRINT_GROUPS[0] ? (g.value / FOOTPRINT_GROUPS[0].value) * 100 : 0}%` }}
                      transition={{ duration: 1, ease: EASE, delay: 0.55 + i * 0.07 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#16a34a] to-[#4ade80]"
                    />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-[16px] flex items-center justify-between border-t border-[#16a34a]/15 pt-[12px]">
            <p className="text-[11.5px] text-[#4b6b5a]">Total across groups</p>
            <p className="text-[13px] font-semibold tabular-nums text-[#0d3b2d]">
              <CountUp value={TOTAL_12M} suffix=" tCO₂e" delay={0.8} />
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
