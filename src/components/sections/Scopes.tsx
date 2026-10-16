import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";
import CarbonCard from "@/components/ui/CarbonCard";

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
        <div className="flex flex-col gap-[24px] lg:flex-row lg:items-end lg:justify-between lg:gap-[64px]">
          <div className="lg:max-w-[560px]">
            <span className="mb-[18px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
              Carbon scopes
            </span>
            <h2 className="font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[56px] lg:text-[64px]">
              Know where your emissions live
            </h2>
          </div>

          <p className="max-w-[380px] text-[16px] leading-[1.55] tracking-[-0.14px] text-[#848484] md:text-[18px] lg:pb-[8px]">
            The GHG Protocol splits emissions into three scopes. Knowing which
            is which is the first step to reducing them.
          </p>
        </div>
      </Reveal>

      <div className="mt-[44px] grid grid-cols-1 gap-[18px] md:mt-[68px] md:grid-cols-3 md:gap-[20px]">
        {SCOPES.map((scope, i) => (
          <Reveal key={scope.num} delay={0.1 + i * 0.1} className="h-full">
            <CarbonCard
              num={scope.num}
              badge={<>Scope {scope.num}</>}
              title={scope.title}
              description={scope.description}
              footer={
                <>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#188f8b] transition-colors duration-300 group-hover:text-[#ade5df]">
                    Examples
                  </span>

                  <div className="mt-[12px] flex flex-wrap gap-[8px]">
                    {scope.examples.map((example) => (
                      <span
                        key={example}
                        className="rounded-full bg-[#188f8b]/[0.07] px-[12px] py-[6px] text-[12.5px] leading-none tracking-[-0.14px] text-[#0f5c58] transition-colors duration-300 group-hover:bg-white/15 group-hover:text-white"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </>
              }
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-[20px] rounded-[24px] border border-[#188f8b]/15 bg-gradient-to-br from-white to-[#188f8b]/[0.04] p-[20px] md:p-[24px]">
          <div className="flex flex-col gap-[22px] lg:flex-row lg:items-center lg:justify-between lg:gap-[56px]">
            <div className="flex items-start gap-[14px] lg:items-center">
              <span className="mt-[6px] h-[7px] w-[7px] shrink-0 rounded-full bg-[#188f8b] lg:mt-0" />
              <p className="text-[14px] leading-[1.45] tracking-[-0.14px] text-[#52525b] md:text-[15px]">
                For most businesses,{" "}
                <span className="font-semibold text-black">Scope 3</span> is
                the biggest share — typically{" "}
                <span className="font-semibold text-black">80–90%</span> of the
                footprint.
              </p>
            </div>

            <div className="w-full shrink-0 lg:w-[260px]">
              <div className="flex h-[6px] w-full overflow-hidden rounded-full bg-[#188f8b]/10">
                <div className="h-full w-[15%] bg-[#188f8b]/25" />
                <div className="h-full flex-1 bg-gradient-to-r from-[#3faea7] to-[#188f8b]" />
              </div>
              <div className="mt-[8px] flex justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
                <span>Scopes 1–2</span>
                <span className="text-[#188f8b]">Scope 3</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}