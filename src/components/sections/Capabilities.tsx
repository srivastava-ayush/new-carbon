import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const ITEMS = [
  {
    num: "01",
    title: "Collect carbon data",
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
    points: [
      "Upload invoices, bills & spreadsheets",
      "Extract relevant activity data",
      "Reduce manual data entry",
    ],
  },
  {
    num: "03",
    title: "Centralize carbon data",
    points: [
      "One place for all facilities & periods",
      "Replace spreadsheets and scattered documents",
    ],
  },
  {
    num: "04",
    title: "Calculate Scope 1, 2 & 3",
    points: [
      "Convert activity data into CO₂e",
      "Apply appropriate emission factors",
      "Location & market-based Scope 2",
    ],
  },
  {
    num: "05",
    title: "Make emissions auditable",
    points: [
      "Every number traces back to a source",
      "Report → Emission → Factor → Activity → Source",
    ],
  },
  {
    num: "06",
    title: "Generate sustainability reports",
    points: [
      "Full Scope 1/2/3 inventory",
      "By facility, category & year-over-year",
      "Exportable PDF/Excel",
    ],
  },
];

const BIGGEST_SOURCES = [
  { name: "Purchased goods", value: "32%" },
  { name: "Electricity", value: "21%" },
  { name: "Business travel", value: "9%" },
  { name: "Transport", value: "8%" },
];

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

      <Reveal delay={0.1}>
        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <div
              key={item.num}
              className="flex flex-col rounded-[16px] border border-black/10 bg-white p-[24px] transition-all duration-300 hover:border-[#16a34a]/30 hover:bg-[#fafff8] md:p-[28px]"
            >
              <span className="font-display text-[18px] leading-none text-[#16a34a]">
                {item.num}
              </span>
              <h3 className="mt-[16px] font-display text-[24px] leading-[1.1] tracking-[-0.4px] text-black md:text-[26px]">
                {item.title}
              </h3>
              <ul className="mt-[16px] flex flex-col gap-[10px]">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-[10px] text-[14px] leading-[1.45] tracking-[-0.14px] text-[#848484]"
                  >
                    <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#16a34a]/60" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-[12px] grid grid-cols-1 gap-[12px] md:grid-cols-2">
          <div className="rounded-[16px] border border-[#16a34a]/15 bg-[#fafff8] p-[24px] md:p-[28px]">
            <span className="font-display text-[18px] leading-none text-[#16a34a]">
              07
            </span>
            <h3 className="mt-[16px] font-display text-[24px] leading-[1.1] tracking-[-0.4px] text-black md:text-[26px]">
              Identify where emissions are coming from
            </h3>
            <p className="mt-[12px] text-[14px] leading-[1.45] tracking-[-0.14px] text-[#848484]">
              Instead of just “Your company emitted 8,420 tCO₂e.”
            </p>

            <div className="mt-[20px] flex h-[28px] w-full overflow-hidden rounded-full bg-white">
              <div className="bg-[#15803d]" style={{ width: "12%" }} />
              <div className="bg-[#16a34a]" style={{ width: "28%" }} />
              <div className="bg-[#a7e3b8]" style={{ width: "60%" }} />
            </div>
            <div className="mt-[12px] flex flex-wrap gap-x-[16px] gap-y-[6px] text-[12px] font-semibold tracking-[-0.12px] text-[#4b5563]">
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

            <div className="mt-[20px] flex flex-col gap-[12px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
                Biggest sources
              </p>
              {BIGGEST_SOURCES.map((source) => (
                <div key={source.name} className="flex items-center gap-[12px]">
                  <span className="w-[140px] shrink-0 text-[13px] tracking-[-0.12px] text-[#4b5563]">
                    {source.name}
                  </span>
                  <div className="h-[6px] flex-1 overflow-hidden rounded-full bg-white">
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

          <div className="rounded-[16px] border border-black/10 bg-white p-[24px] md:p-[28px]">
            <span className="font-display text-[18px] leading-none text-[#16a34a]">
              08
            </span>
            <h3 className="mt-[16px] font-display text-[24px] leading-[1.1] tracking-[-0.4px] text-black md:text-[26px]">
              Track progress toward targets
            </h3>
            <p className="mt-[12px] text-[14px] leading-[1.45] tracking-[-0.14px] text-[#848484]">
              Set a baseline, define reduction targets, and watch intensity fall
              year over year.
            </p>

            <div className="mt-[24px] flex flex-wrap gap-[8px]">
              {["Baseline year", "Reduction targets", "Yearly emissions", "Carbon intensity"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[#16a34a]/20 bg-[#f0fdf4] px-[12px] py-[6px] text-[12px] font-semibold tracking-[-0.12px] text-[#15803d]"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-[28px]">
              <div className="mb-[8px] flex items-center justify-between text-[12px] font-semibold tracking-[-0.12px]">
                <span className="text-[#848484]">Progress to 2030 target</span>
                <span className="text-[#16a34a]">−42%</span>
              </div>
              <div className="h-[10px] w-full overflow-hidden rounded-full bg-[#e4e4e7]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#16a34a] to-[#22c55e]"
                  style={{ width: "42%" }}
                />
              </div>
            </div>

            <div className="mt-[20px] flex flex-col gap-[12px]">
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
        </div>
      </Reveal>
    </Section>
  );
}
