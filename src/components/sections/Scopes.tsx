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

      <Reveal delay={0.1}>
        <div className="grid grid-cols-1 gap-[12px] md:grid-cols-3">
          {SCOPES.map((scope) => (
            <div
              key={scope.num}
              className="group flex flex-col rounded-[16px] border border-black/10 bg-white p-[24px] transition-all duration-300 hover:border-[#16a34a]/30 hover:bg-[#fafff8] md:p-[28px]"
            >
              <div className="flex items-baseline gap-[12px]">
                <span className="font-display text-[18px] leading-none text-[#16a34a]">
                  {scope.num}
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#a1a1aa]">
                  Scope
                </span>
              </div>

              <h3 className="mt-[16px] font-display text-[24px] leading-[1.1] tracking-[-0.4px] text-black md:text-[26px]">
                {scope.title}
              </h3>

              <p className="mt-[12px] flex-1 text-[14px] leading-[1.5] tracking-[-0.14px] text-[#848484]">
                {scope.description}
              </p>

              <div className="mt-[24px] border-t border-black/10 pt-[20px]">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a1a1aa]">
                  Examples
                </span>
                <ul className="mt-[4px]">
                  {scope.examples.map((example) => (
                    <li
                      key={example}
                      className="flex items-center gap-[10px] border-t border-black/5 py-[10px] text-[14px] tracking-[-0.14px] text-[#52525b]"
                    >
                      <span className="h-[4px] w-[4px] shrink-0 rounded-full bg-[#16a34a]/60 transition-colors duration-300 group-hover:bg-[#16a34a]" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

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
