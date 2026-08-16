import { Bank, Buildings, ChartPieSlice, Factory, Handshake, Heartbeat, Lightning, ShoppingCart, Vault } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const SOLUTIONS = [
  { name: "Asset managers", Icon: ChartPieSlice },
  { name: "Asset owners", Icon: Buildings },
  { name: "Private markets", Icon: Vault },
  { name: "Banks", Icon: Bank },
  { name: "Healthcare", Icon: Heartbeat },
  { name: "Services", Icon: Handshake },
  { name: "Manufacturing", Icon: Factory },
  { name: "Grocery", Icon: ShoppingCart },
  { name: "Energy, oil and gas", Icon: Lightning },
];

export default function Solutions() {
  return (
    <Section id="solutions" narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#16a34a]/60 via-[#16a34a]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#16a34a]">
          Solutions
        </span>
        <h2 className="mb-[48px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[64px] md:text-[64px]">
          Built for Sustainable Businesses
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((solution, i) => {
          const { name, Icon } = solution;
          return (
            <Reveal key={name} delay={(i % 3) * 0.08} className="h-full">
            <a
              href={`/solutions/${name.toLowerCase().replace(/[,\s]+/g, "-")}`}
              className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-black/10 bg-white transition-all duration-300 hover:border-[#16a34a]/30"
            >
              <div className="flex flex-1 items-start justify-between p-[24px] md:p-[28px]">
                <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] bg-[#16a34a]/8 text-[#16a34a] transition-colors duration-300 group-hover:bg-[#16a34a] group-hover:text-white">
                  <Icon size={22} weight="bold" />
                </span>
                <div className="flex items-center gap-[8px]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="h-[14px] w-[14px] text-black/30 transition-all duration-300 group-hover:translate-x-[4px] group-hover:-translate-y-[2px] group-hover:text-[#16a34a]"
                  >
                    <path
                      d="M4 12L12 4M5 4h7v7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex flex-1 items-center rounded-b-[15px] bg-[#0d3b2d] p-[24px] transition-colors duration-300 group-hover:bg-[#114a39] md:p-[28px]">
                <h3 className="font-display text-[22px] leading-[1.1] tracking-[-0.4px] text-white md:text-[24px]">
                  {name}
                </h3>
              </div>
            </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}