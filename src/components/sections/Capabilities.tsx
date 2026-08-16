import { Calculator, ChartPieSlice, Database, FileText, Robot, ShieldCheck, StackSimple, Target } from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

interface Capability {
  num: string;
  title: string;
  Icon: ComponentType<IconProps>;
  span: string;
  points: string[];
  tint?: boolean;
  trace?: string[];
  report?: boolean;
}

const CAPABILITIES: Capability[] = [
  {
    num: "01",
    title: "Collect carbon data",
    Icon: Database,
    span: "md:col-span-2 lg:col-span-4",
    points: [
      "Electricity and fuel bills",
      "Travel and commuting",
      "Procurement, waste & refrigerants",
      "Supplier and other operational data",
    ],
  },
  {
    num: "02",
    title: "Automate data extraction",
    Icon: Robot,
    span: "md:col-span-2 lg:col-span-4",
    tint: true,
    points: [
      "Upload invoices, bills & spreadsheets",
      "Extract relevant activity data",
      "Reduce manual data entry",
    ],
  },
  {
    num: "03",
    title: "Centralize carbon data",
    Icon: StackSimple,
    span: "md:col-span-2 lg:col-span-4",
    points: [
      "One place for all facilities & periods",
      "Replace spreadsheets and scattered documents",
    ],
  },
  {
    num: "04",
    title: "Calculate Scope 1, 2 & 3",
    Icon: Calculator,
    span: "md:col-span-1 lg:col-span-3",
    points: [
      "Convert activity data into CO₂e",
      "Apply appropriate emission factors",
      "Location & market-based Scope 2",
    ],
  },
  {
    num: "05",
    title: "Make emissions auditable",
    Icon: ShieldCheck,
    span: "md:col-span-1 lg:col-span-3",
    tint: true,
    points: ["Every number traces back to a source"],
    trace: ["Report", "Emission", "Factor", "Activity", "Source"],
  },
  {
    num: "06",
    title: "Generate sustainability reports",
    Icon: FileText,
    span: "md:col-span-2 lg:col-span-6",
    points: [
      "Full Scope 1/2/3 inventory",
      "By facility, category & year-over-year",
      "Exportable PDF/Excel",
    ],
    report: true,
  },
];

const BIGGEST_SOURCES = [
  { name: "Purchased goods", value: "32%" },
  { name: "Electricity", value: "21%" },
  { name: "Business travel", value: "9%" },
  { name: "Transport", value: "8%" },
];

function CapCard({ item, delay }: { item: Capability; delay: number }) {
  const { num, title, Icon, points, tint, trace, report } = item;

  const card = tint
    ? "border-[#16a34a]/15 bg-[#f6fbf8] hover:border-[#16a34a]/25"
    : "border-black/10 bg-white hover:border-[#16a34a]/20";

  return (
    <Reveal delay={delay} className={`${item.span} h-full`}>
      <div
        className={`group relative flex h-full flex-col rounded-[24px] border p-[28px] transition-all duration-300 hover:-translate-y-[1px] ${card} md:p-[32px]`}
      >
        <div className="flex items-center justify-between">
          <Icon size={20} weight="regular" className="text-[#16a34a]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9c9cf]">
            {num}
          </span>
        </div>

        <h3 className={`mt-[20px] font-display text-[22px] leading-[1.15] tracking-[-0.3px] md:text-[24px] ${tint ? "text-[#15803d]" : "text-black"}`}>
          {title}
        </h3>

        <ul className={`mt-[14px] flex flex-col gap-[8px] ${report ? "mb-[130px]" : ""}`}>
          {points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-[10px] text-[13px] leading-[1.5] tracking-[-0.12px] text-[#848484]"
            >
              <span className={`mt-[6px] h-[4px] w-[4px] shrink-0 rounded-full ${tint ? "bg-[#16a34a]/50" : "bg-[#16a34a]/40"}`} />
              {point}
            </li>
          ))}
        </ul>

        {trace && (
          <div className="mt-[16px] flex flex-wrap items-center gap-[6px]">
            {trace.map((step, i) => (
              <span key={step} className="flex items-center gap-[6px]">
                <span className="rounded-full border border-black/10 px-[10px] py-[5px] text-[11px] font-medium tracking-[-0.1px] text-[#52525b]">
                  {step}
                </span>
                {i < trace.length - 1 && <span className="text-[10px] text-[#a1a1aa]">→</span>}
              </span>
            ))}
          </div>
        )}

        {report && (
          <div className="pointer-events-none absolute right-[28px] bottom-[28px] left-[28px] md:right-[32px] md:bottom-[32px] md:left-[32px]">
            <div className="rounded-[14px] border border-black/8 bg-white p-[16px]">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#a1a1aa]">
                  Scope 1 · 2 · 3
                </span>
                <span className="flex gap-[4px]">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#16a34a]/70" />
                  <span className="h-[6px] w-[6px] rounded-full bg-[#16a34a]/30" />
                  <span className="h-[6px] w-[6px] rounded-full bg-[#16a34a]/15" />
                </span>
              </div>
              <div className="mt-[12px] flex gap-[8px]">
                <div className="h-[32px] flex-1 rounded-[6px] bg-[#16a34a]/10" />
                <div className="h-[32px] flex-1 rounded-[6px] bg-[#16a34a]/25" />
                <div className="h-[32px] flex-1 rounded-[6px] bg-[#16a34a]/60" />
                <div className="h-[32px] flex-1 rounded-[6px] bg-[#15803d]" />
              </div>
              <div className="mt-[8px] flex items-center justify-between">
                <span className="text-[9px] font-medium tracking-[-0.1px] text-[#a1a1aa]">2023 → 2025</span>
                <span className="text-[10px] font-semibold text-[#16a34a]">−42%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function Capabilities() {
  return (
    <Section id="capabilities" narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#16a34a]/60 via-[#16a34a]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#16a34a]">
          What we help companies with
        </span>
        <h2 className="mb-[20px] max-w-[720px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[24px] md:text-[64px]">
          We automate carbon accounting.
        </h2>
        <p className="mb-[48px] max-w-[560px] text-[16px] leading-[1.5] tracking-[-0.14px] text-[#848484] md:mb-[64px] md:text-[18px]">
          From raw business data to audit-ready emissions reports — collected,
          validated, calculated, and reported automatically.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-12">
        {CAPABILITIES.map((item, i) => (
          <CapCard key={item.num} item={item} delay={0.1 + (i % 3) * 0.08} />
        ))}

        <Reveal delay={0.1} className="md:col-span-2 lg:col-span-7">
          <div className="group flex h-full flex-col rounded-[24px] border border-black/10 bg-white p-[28px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#16a34a]/20 md:p-[32px]">
            <div className="flex items-center justify-between">
              <ChartPieSlice size={20} weight="regular" className="text-[#16a34a]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9c9cf]">07</span>
            </div>

            <h3 className="mt-[20px] max-w-[420px] font-display text-[22px] leading-[1.15] tracking-[-0.3px] text-black md:text-[24px]">
              Identify where emissions are coming from
            </h3>
            <p className="mt-[10px] max-w-[420px] text-[13px] leading-[1.5] tracking-[-0.12px] text-[#848484]">
              Instead of just “Your company emitted 8,420 tCO₂e.”
            </p>

            <div className="mt-[28px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">
              <div>
                <div className="flex h-[24px] w-full overflow-hidden rounded-full bg-[#f0f0f0]">
                  <div className="bg-[#15803d]" style={{ width: "12%" }} />
                  <div className="bg-[#16a34a]" style={{ width: "28%" }} />
                  <div className="bg-[#a7e3b8]" style={{ width: "60%" }} />
                </div>
                <div className="mt-[12px] flex flex-wrap gap-x-[16px] gap-y-[6px] text-[12px] font-medium tracking-[-0.12px] text-[#4b5563]">
                  <span className="flex items-center gap-[6px]">
                    <span className="h-[8px] w-[8px] rounded-full bg-[#15803d]" /> Scope 1 · 12%
                  </span>
                  <span className="flex items-center gap-[6px]">
                    <span className="h-[8px] w-[8px] rounded-full bg-[#16a34a]" /> Scope 2 · 28%
                  </span>
                  <span className="flex items-center gap-[6px]">
                    <span className="h-[8px] w-[8px] rounded-full bg-[#a7e3b8]" /> Scope 3 · 60%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
                  Biggest sources
                </p>
                <div className="mt-[12px] flex flex-col gap-[10px]">
                  {BIGGEST_SOURCES.map((source) => (
                    <div key={source.name} className="flex items-center gap-[12px]">
                      <span className="w-[140px] shrink-0 text-[13px] tracking-[-0.12px] text-[#4b5563]">
                        {source.name}
                      </span>
                      <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#f0f0f0]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#16a34a] to-[#22c55e]"
                          style={{ width: source.value }}
                        />
                      </div>
                      <span className="w-[38px] shrink-0 text-right text-[13px] font-semibold tracking-[-0.12px] text-black">
                        {source.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.18} className="md:col-span-2 lg:col-span-5">
          <div className="group flex h-full flex-col rounded-[24px] border border-[#16a34a]/15 bg-[#f6fbf8] p-[28px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#16a34a]/25 md:p-[32px]">
            <div className="flex items-center justify-between">
              <Target size={20} weight="regular" className="text-[#16a34a]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#c9c9cf]">08</span>
            </div>

            <h3 className="mt-[20px] max-w-[320px] font-display text-[22px] leading-[1.15] tracking-[-0.3px] text-black md:text-[24px]">
              Track progress toward targets
            </h3>
            <p className="mt-[10px] max-w-[320px] text-[13px] leading-[1.5] tracking-[-0.12px] text-[#848484]">
              Set a baseline, define reduction targets, and watch intensity fall
              year over year.
            </p>

            <div className="mt-[28px]">
              <div className="mb-[8px] flex items-center justify-between text-[12px] font-medium tracking-[-0.12px]">
                <span className="text-[#848484]">Progress to 2030 target</span>
                <span className="text-[#16a34a]">−42%</span>
              </div>
              <div className="h-[8px] w-full overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#16a34a] to-[#22c55e]"
                  style={{ width: "42%" }}
                />
              </div>
            </div>

            <div className="mt-[24px] flex flex-col gap-[12px]">
              {[
                { label: "Baseline 2023", value: "8,420 tCO₂e" },
                { label: "Current 2025", value: "4,880 tCO₂e" },
                { label: "Target 2030", value: "−50%" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-black/5 pb-[12px] last:border-0 last:pb-0"
                >
                  <span className="text-[13px] tracking-[-0.12px] text-[#848484]">{row.label}</span>
                  <span className="text-[13px] font-semibold tracking-[-0.12px] text-black">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
