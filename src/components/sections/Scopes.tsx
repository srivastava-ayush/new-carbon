import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const SCOPES = [
  {
    num: "01",
    title: "Direct",
    description:
      "Emissions you own or control directly — fuel you burn, vehicles you run, and leaks from your sites.",
    examples: ["Company vehicles", "On-site fuel use", "Refrigerant leaks"],
  },
  {
    num: "02",
    title: "Energy",
    description:
      "Emissions from the electricity, heat, and cooling you buy and consume.",
    examples: ["Purchased electricity", "District heating", "Steam"],
  },
  {
    num: "03",
    title: "Value chain",
    description:
      "Every other indirect emission across your supply chain, partners, and customers.",
    examples: ["Suppliers & logistics", "Business travel", "Product end-of-life"],
  },
];

export default function Scopes() {
  return (
    <Section id="scopes" narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#16a34a]/60 via-[#16a34a]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#16a34a]">
          Carbon scopes
        </span>
        <h2 className="mb-[20px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[24px] md:text-[64px]">
          Know where your emissions live
        </h2>
        <p className="mb-[56px] max-w-[560px] text-[16px] leading-[1.5] tracking-[-0.14px] text-[#848484] md:mb-[80px] md:text-[18px]">
          The GHG Protocol splits emissions into three scopes. Knowing which is
          which is the first step to reducing them.
        </p>
      </Reveal>

        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
          {SCOPES.map((scope, i) => (
            <Reveal key={scope.num} delay={0.1 + i * 0.1} className="h-full">
            <div
              className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[#16a34a]/20 bg-[#0d3b2d] px-[24px] pt-[24px] shadow-[0_18px_50px_rgba(13,59,45,0.25)] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#4ade80]/40 hover:bg-[#114a39] hover:shadow-[0_24px_60px_rgba(13,59,45,0.35)] md:px-[28px] md:pt-[28px]"
            >
              <div className="flex items-baseline gap-[12px]">
                <span className="font-display text-[18px] leading-none text-[#4ade80]">
                  {scope.num}
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#a7f3d0]/60">
                  Scope
                </span>
              </div>

              <h3 className="mt-[16px] font-display text-[24px] leading-[1.1] tracking-[-0.4px] text-white md:text-[26px]">
                {scope.title}
              </h3>

              <p className="mt-[12px] mb-[16px] flex-1 text-[14px] leading-[1.5] tracking-[-0.14px] text-[#a7f3d0]/80">
                {scope.description}
              </p>

              <div className="relative mx-[-24px] mt-[24px] bg-white px-[24px] pt-[28px] pb-[24px] md:mx-[-28px] md:px-[28px] md:pt-[28px] md:pb-[28px]">
                <svg
                  viewBox="0 0 400 28"
                  preserveAspectRatio="none"
                  aria-hidden
                  className="pointer-events-none absolute -top-[28px] right-0 left-0 h-[28px] w-full"
                >
                  <path d="M0 28 L0 20 C 100 8 300 8 400 20 L400 28 Z" fill="#ffffff" />
                </svg>
                <span className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-[#16a34a]">
                  Examples
                </span>
                <ul className="mt-[4px]">
                  {scope.examples.map((example) => (
                    <li
                      key={example}
                      className="flex items-center gap-[10px] border-t border-black/5 py-[10px] text-[14px] tracking-[-0.14px] text-[#52525b]"
                    >
                      <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-[#22c55e] transition-colors duration-300 group-hover:bg-[#16a34a]" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

      <Reveal delay={0.2}>
        <div className="mt-[12px] flex items-center gap-[14px] rounded-[16px] border border-black/10 bg-white px-[24px] py-[18px]">
          <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#16a34a]" />
          <p className="text-[14px] leading-[1.4] tracking-[-0.14px] text-[#52525b] md:text-[15px]">
            For most businesses, <span className="font-semibold text-black">Scope 3</span> is
            the biggest share — typically <span className="font-semibold text-black">80–90%</span> of the footprint.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
