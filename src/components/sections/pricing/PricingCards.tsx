"use client";

import Reveal from "@/components/shared/Reveal";
import Container from "@/components/ui/Container";
import CarbonCard from "@/components/ui/CarbonCard";

interface Plan {
  name: string;
  tagline: string;
  features: string[];
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For smaller companies getting their first structured carbon program in place.",
    features: [
      "Up to 5 users",
      "Scope 1 & 2 tracking",
      "PDF report exports",
      "Manual data entry & CSV upload",
      "Calculation methodology documentation",
      "Email support (48h response)",
    ],
  },
  {
    name: "Growth",
    tagline: "For companies with active CSRD obligations or multi-scope tracking needs.",
    features: [
      "Up to 25 users",
      "Full Scope 1, 2 & 3",
      "CSRD, GRI, TCFD, CDP reports",
      "API access & integrations",
      "Immutable audit trail",
      "Team workflows & permissions",
      "Priority email & chat support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    tagline: "For large enterprises with complex group structures, multiple legal entities, or on-premises requirements.",
    features: [
      "Unlimited users",
      "Custom data connectors",
      "Multi-entity group consolidation",
      "Dedicated Customer Success Manager",
      "SLA (99.9% uptime guarantee)",
      "On-premises deployment option",
      "Custom reporting templates",
      "Phone support",
    ],
  },
];

export default function PricingCards() {
  return (
    <section className="relative bg-white py-[48px] md:py-[64px]">
      <div className="absolute inset-x-0 top-0 h-px bg-black/[0.03]" />
      <Container narrow className="relative z-10">
        <div className="grid grid-cols-1 gap-[16px] lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={0.1 + i * 0.08} className="h-full">
              <CarbonCard
                className={plan.popular ? "lg:-my-[16px] lg:py-[48px]" : ""}
                badge={plan.name}
                description={plan.tagline}
                footer={
                  <a
                    href="/contact"
                    className="inline-flex h-[50px] items-center justify-center rounded-full border border-[#188f8b]/20 bg-white px-[28px] text-[14px] font-semibold tracking-[-0.14px] text-[#188f8b] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b] hover:bg-[#0b3b38] hover:text-white"
                  >
                    Contact Us
                  </a>
                }
              >
                {plan.popular && (
                  <div className="absolute inset-x-0 top-0 flex justify-center">
                    <span className="rounded-b-full bg-[#0b3b38] px-[20px] py-[6px] text-[10px] font-bold uppercase tracking-[0.16em] text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mt-[16px] h-px w-full bg-black/[0.06] transition-colors duration-300 group-hover:bg-white/15" />

                <ul className="flex flex-col gap-[12px]">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-[10px] text-[13.5px] leading-[1.4] tracking-[-0.1px] text-[#52525b] transition-colors duration-300 group-hover:text-white"
                    >
                      <svg viewBox="0 0 16 16" fill="none" className="h-[15px] w-[15px] shrink-0">
                        <path
                          d="M3 8.5L6.5 12L13 4.5"
                          className="stroke-[#188f8b] transition-colors duration-300 group-hover:stroke-white"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CarbonCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-[32px] text-center text-[13px] tracking-[-0.1px] text-[#a1a1aa]">
            All plans are customised to your organisation&apos;s size, reporting
            obligations, and data sources. Contact us for a tailored quote.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
