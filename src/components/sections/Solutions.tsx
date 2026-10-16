import { Bank, Factory, Heartbeat, Lightning, ShoppingCart, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";
import CarbonCard from "@/components/ui/CarbonCard";

const SOLUTIONS = [
  {
    name: "Manufacturing",
    blurb: "Shop floor to Scope 1 in one ledger.",
    Icon: Factory,
  },
  {
    name: "Universities",
    blurb: "Campus-wide carbon accounting and reporting for Scope 1, 2 & 3.",
    Icon: GraduationCap,
  },
  {
    name: "Financial services",
    blurb: "Fund-level footprints, financed emissions, and ESG reporting from diligence to exit.",
    Icon: Bank,
  },
  {
    name: "Healthcare & services",
    blurb: "Scope 3 clarity across suppliers and estates — lean teams, enterprise-grade reporting.",
    Icon: Heartbeat,
  }
];

export default function Solutions() {
  return (
    <Section id="solutions" narrow>
      <Reveal>
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          Solutions
        </span>
        <h2 className="mb-[48px] max-w-[640px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[56px] md:text-[64px]">
          Built for Sustainable Businesses
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 md:gap-[20px] lg:grid-cols-2">
        {SOLUTIONS.map((solution, i) => {
          const { name, blurb, Icon } = solution;
          const num = String(i + 1).padStart(2, "0");
          return (
            <Reveal key={name} delay={0.1 + i * 0.1} className="h-full">
              <CarbonCard
                href="/contact"
                className="min-h-[280px]"
                num={num}
                badge={<Icon size={13} weight="duotone" />}
                title={name}
                description={blurb}
                footer={
                  <div className="flex items-center gap-[10px]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#188f8b] transition-colors duration-300 group-hover:text-[#ade5df]">
                      Explore
                    </span>

                    <span className="flex h-[26px] w-[26px] items-center justify-center rounded-full border border-black/[0.08] text-[#0b1f1e] transition-all duration-300 group-hover:border-white/40 group-hover:bg-white group-hover:text-[#188f8b]">
                      <svg viewBox="0 0 16 16" fill="none" className="h-[12px] w-[12px] transition-transform duration-300 group-hover:rotate-45">
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
                }
              />
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
