"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Airplane, ArrowDownRight, ArrowUpRight, Building, Factory, Truck, Users } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import Section from "@/components/dashboard/Section";
import CountUp from "@/components/dashboard/CountUp";
import BarList from "@/components/dashboard/BarList";
import VerticalBars from "@/components/dashboard/VerticalBars";
import Donut from "@/components/dashboard/Donut";
import { EASE } from "@/lib/animations";
import { useDashboardContext } from "@/hooks/useDashboardContext";

const ICONS: Record<string, Icon> = {
  airplane: Airplane,
  users: Users,
  building: Building,
  truck: Truck,
  factory: Factory,
};

const SCOPE_TINT: Record<string, string> = {
  S1: "#15803d",
  S2: "#22c55e",
  S3: "#86efac",
};

export default function Footprint() {
  const { data: { FOOTPRINT_GROUPS, TOTAL_12M } } = useDashboardContext();
  const [selected, setSelected] = useState(0);
  const group = FOOTPRINT_GROUPS[selected] || FOOTPRINT_GROUPS[0];

  if (!group) return null;

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 xl:grid-cols-5">
        {FOOTPRINT_GROUPS.map((g: any, i: number) => {
          const Icon = ICONS[g.icon as keyof typeof ICONS];
          const active = selected === i;
          return (
            <motion.button
              key={g.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 + i * 0.07 }}
              whileHover={{ y: -2 }}
              onClick={() => setSelected(i)}
              className={`relative flex flex-col rounded-[14px] border p-[16px] text-left transition-colors duration-200 ${
                active ? "border-[#16a34a]/40 bg-[#f6fbf8]" : "border-black/[0.06] bg-white hover:border-black/[0.12]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-[28px] w-[28px] items-center justify-center rounded-[8px] transition-colors duration-200 ${
                    active ? "bg-[#16a34a] text-white" : "bg-[#f0fdf4] text-[#15803d]"
                  }`}
                >
                  {Icon && <Icon size={15} weight={active ? "fill" : "regular"} />}
                </span>
                <span
                  className={`flex items-center gap-[2px] rounded-full px-[6px] py-[2px] text-[10.5px] font-semibold tabular-nums ${
                    g.delta < 0 ? "bg-[#f0fdf4] text-[#15803d]" : "bg-[#fef2f2] text-[#dc2626]"
                  }`}
                >
                  {g.delta < 0 ? <ArrowDownRight size={11} weight="bold" /> : <ArrowUpRight size={11} weight="bold" />}
                  {Math.abs(g.delta)}%
                </span>
              </div>
              <p className="mt-[12px] text-[12.5px] font-medium text-[#71717a]">{g.name}</p>
              <p className="mt-[4px] text-[22px] font-semibold leading-none tracking-[-0.6px] tabular-nums text-black">
                <CountUp value={g.value} delay={0.1 + i * 0.07} />
              </p>
              <p className="mt-[6px] text-[11px] text-[#a1a1aa]">
                {Math.round(g.share * 100)}% of footprint
              </p>
            </motion.button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
        <Section
          title="Footprint by group"
          subtitle="Total CO₂e per group over the reporting period"
          className="lg:col-span-2"
          delay={0.15}
          action={
            <span className="rounded-full bg-[#f0fdf4] px-[8px] py-[2px] text-[11px] font-semibold text-[#15803d]">
              <CountUp value={TOTAL_12M} suffix=" tCO₂e total" delay={0.3} />
            </span>
          }
        >
          <VerticalBars
            data={FOOTPRINT_GROUPS.map((g: any, i: number) => ({
              label: g.name.split(" ")[0],
              value: g.value,
              color: i === selected ? "#15803d" : i % 2 === 0 ? "#22c55e" : "#4ade80",
            }))}
            delay={0.2}
            suffix=""
            height={230}
          />
        </Section>

        <Section title="Group share" subtitle="Share of total footprint" delay={0.2}>
          <Donut
            segments={FOOTPRINT_GROUPS.map((g: any, i: number) => ({
              key: g.key,
              name: g.name,
              value: g.value,
              share: g.share,
              color: i === 0 ? "#15803d" : i === 1 ? "#22c55e" : i === 2 ? "#4ade80" : i === 3 ? "#86efac" : "#bbf7d0",
            }))}
            centerValue={TOTAL_12M}
            centerLabel="Total"
            centerSuffix="tCO₂e"
            delay={0.2}
          />
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
        <Section
          title={group.name}
          subtitle={group.description}
          className="lg:col-span-2"
          delay={0.25}
          action={
            <span className="flex items-center gap-[6px] rounded-full border border-black/[0.06] bg-[#fafafa] px-[8px] py-[2px] text-[11px] font-medium text-[#71717a]">
              <span className="h-[7px] w-[7px] rounded-full" style={{ backgroundColor: group.items?.[0] ? SCOPE_TINT[group.items[0].scope] : "#ccc" }} />
              {Math.round(group.share * 100)}% of footprint
            </span>
          }
        >
          <BarList
            rows={(group.items || []).map((it: any) => ({ label: it.name, value: it.value, badge: it.scope }))}
            delay={0.25}
          />
        </Section>

        <Section title="Insights" subtitle="Top-line observations" delay={0.3}>
          <div className="flex flex-col gap-[12px]">
            {[
              { label: "Largest contributor", value: "Supply chain", sub: "55% of total footprint", icon: "factory" },
              { label: "Fastest growing", value: "Employees", sub: "+4.1% vs last year", icon: "users" },
              { label: "Reduced the most", value: "Offices", sub: "−9.3% vs last year", icon: "building" },
            ].map((ins: any, i: number) => {
              const Icon = ICONS[ins.icon];
              return (
                <motion.div
                  key={ins.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.35 + i * 0.08 }}
                  className="flex items-center gap-[12px] rounded-[10px] border border-black/[0.05] bg-[#fafafa] p-[12px]"
                >
                  <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-[#f0fdf4] text-[#15803d]">
                    {Icon && <Icon size={15} />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#a1a1aa]">{ins.label}</p>
                    <p className="truncate text-[13px] font-medium text-black">{ins.value}</p>
                    <p className="text-[11px] text-[#71717a]">{ins.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
}
