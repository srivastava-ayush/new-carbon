import { Bank, Factory, Heartbeat, Lightning, ShoppingCart, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";
import Link from "next/link";

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
              <Link
                href="/contact"
                className="group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[24px] border border-[#188f8b]/15 bg-white p-[24px] transition-all duration-300 hover:-translate-y-[4px] hover:border-[#188f8b] hover:bg-[#188f8b] hover:shadow-[0_32px_80px_rgba(11,59,56,0.28)] md:p-[28px]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-[26px] right-[14px] font-display text-[128px] leading-none text-[#188f8b]/[0.07] transition-colors duration-500 group-hover:text-white/[0.14]"
                >
                  {num}
                </span>

                <span className="absolute top-0 left-0 h-[3px] w-[34px] rounded-full bg-gradient-to-r from-[#188f8b] to-[#3faea7]/40 transition-all duration-500 ease-out group-hover:w-[calc(100%-0px)] group-hover:from-white/60 group-hover:to-white/20" />

                <div className="relative flex items-center gap-[14px]">
                  <span className="inline-flex shrink-0 items-center rounded-full border border-[#188f8b]/25 bg-[#188f8b]/[0.06] px-[11px] py-[5px] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#188f8b] transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/10 group-hover:text-white">
                    <Icon size={13} weight="duotone" />
                  </span>

                  <h3 className="font-display text-[22px] leading-[1.1] tracking-[-0.4px] text-black transition-colors duration-300 group-hover:text-white md:text-[24px]">
                    {name}
                  </h3>
                </div>

                <p className="relative mt-[14px] flex-1 text-[14px] leading-[1.55] tracking-[-0.14px] text-[#848484] transition-colors duration-300 group-hover:text-[#ade5df]/85">
                  {blurb}
                </p>

                <div className="relative mt-auto flex items-center gap-[10px] pt-[26px]">
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
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
