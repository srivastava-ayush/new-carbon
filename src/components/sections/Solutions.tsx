import { Bank, Buildings, ChartPieSlice, Factory, Handshake, Heartbeat, Lightning, ShoppingCart, Vault } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const SOLUTIONS = [
  {
    name: "Asset managers",
    blurb: "Fund-level footprints across every portfolio company.",
    Icon: ChartPieSlice,
  },
  {
    name: "Asset owners",
    blurb: "Building and estate emissions, audit-ready.",
    Icon: Buildings,
  },
  {
    name: "Private markets",
    blurb: "ESG-line reporting from diligence to exit.",
    Icon: Vault,
  },
  {
    name: "Banks",
    blurb: "Financed emissions without the spreadsheet sprawl.",
    Icon: Bank,
  },
  {
    name: "Healthcare",
    blurb: "Scope 3 clarity across suppliers and estates.",
    Icon: Heartbeat,
  },
  {
    name: "Services",
    blurb: "Lean teams, enterprise-grade reporting.",
    Icon: Handshake,
  },
  {
    name: "Manufacturing",
    blurb: "Shop floor to Scope 1 in one ledger.",
    Icon: Factory,
  },
  {
    name: "Grocery",
    blurb: "Supply chains traced from farm to shelf.",
    Icon: ShoppingCart,
  },
  {
    name: "Energy, oil and gas",
    blurb: "Methane to market — measured precisely.",
    Icon: Lightning,
  },
];

export default function Solutions() {
  return (
    <Section id="solutions" narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#16a34a]/60 via-[#16a34a]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#16a34a]">
          Solutions
        </span>
        <h2 className="mb-[48px] max-w-[640px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[56px] md:text-[64px]">
          Built for Sustainable Businesses
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
        {SOLUTIONS.map((solution, i) => {
          const { name, blurb, Icon } = solution;
          return (
            <Reveal key={name} delay={(i % 3) * 0.08} className="h-full">
              <a
                href={`/solutions/${name.toLowerCase().replace(/[,\s]+/g, "-")}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-black/[0.07] bg-white p-[26px] transition-all duration-500 hover:-translate-y-[3px] hover:border-[#0b3b2d]/30 hover:shadow-[0_24px_56px_rgba(11,59,45,0.12)] md:p-[30px]"
              >
                {/* dark green top rule */}
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#0b3b2d] via-[#14532d] to-[#16a34a] transition-transform duration-500 group-hover:scale-x-100" />

                {/* hover sheen */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_70%_at_50%_-10%,rgba(11,59,45,0.07),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] border border-[#0b3b2d]/15 bg-[#0b3b2d]/[0.05] text-[#14532d] transition-all duration-500 group-hover:border-[#0b3b2d] group-hover:bg-[#0b3b2d] group-hover:text-white">
                    <Icon size={20} weight="duotone" />
                  </span>
                  <span className="pt-[2px] text-[11px] font-semibold tracking-[0.18em] text-[#0b3b2d]/35 transition-colors duration-500 group-hover:text-[#0b3b2d]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="relative mt-[24px] font-display text-[23px] leading-[1.15] tracking-[-0.35px] text-[#0b1f16] md:text-[25px]">
                  {name}
                </h3>
                <p className="relative mt-[10px] text-[13.5px] leading-[1.55] tracking-[-0.1px] text-[#7d8f85]">
                  {blurb}
                </p>

                <div className="relative mt-auto pt-[26px]">
                  <div className="h-px w-full bg-black/[0.06] transition-colors duration-500 group-hover:bg-[#0b3b2d]/25" />
                  <div className="mt-[16px] flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#93a29a] transition-colors duration-300 group-hover:text-[#14532d]">
                      Explore
                    </span>
                    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-black/[0.08] text-[#0b1f16] transition-all duration-500 group-hover:border-[#0b3b2d] group-hover:bg-[#0b3b2d] group-hover:text-white">
                      <svg viewBox="0 0 16 16" fill="none" className="h-[13px] w-[13px] transition-transform duration-500 group-hover:translate-x-[2px]">
                        <path
                          d="M4 12L12 4M5 4h7v7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
