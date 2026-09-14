import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const Check = () => (
  <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#188f8b]/10">
    <svg viewBox="0 0 16 16" fill="none" className="h-[11px] w-[11px]">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="#188f8b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const Dash = () => (
  <span className="flex h-[22px] w-[22px] items-center justify-center">
    <span className="h-[2px] w-[12px] rounded-full bg-black/15" />
  </span>
);

export default function PricingFeatureComparison() {
  return (
    <Section narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          Feature Comparison
        </span>
        <h2 className="mb-[48px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:mb-[56px] md:text-[64px]">
          Compare plans
        </h2>
      </Reveal>

      <Reveal>
        <div className="overflow-hidden rounded-[24px] border border-black/[0.07] bg-white shadow-[0_16px_48px_rgba(11,59,56,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse">
              <thead>
                <tr className="border-b border-black/[0.07] bg-[#f8fafa]">
                  <th className="px-[28px] py-[20px] text-left text-[12px] font-bold uppercase tracking-[0.14em] text-[#a1a1aa]">
                    Feature
                  </th>
                  {[
                    { name: "Starter", highlight: false },
                    { name: "Growth", highlight: true },
                    { name: "Enterprise", highlight: false },
                  ].map((plan) => (
                    <th
                      key={plan.name}
                      className={`px-[24px] py-[20px] text-center text-[13px] font-bold uppercase tracking-[0.14em] ${
                        plan.highlight ? "text-[#188f8b]" : "text-[#52525b]"
                      }`}
                    >
                      {plan.name}
                      {plan.highlight && (
                        <span className="mt-[6px] block text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d97706]">
                          Most Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Scope 1 & 2 tracking", starter: true, growth: true, enterprise: true },
                  { feature: "Full Scope 3 (15 categories)", starter: false, growth: true, enterprise: true },
                  { feature: "CSRD, GRI, TCFD, CDP reports", starter: false, growth: true, enterprise: true },
                  { feature: "PDF report exports", starter: true, growth: true, enterprise: true },
                  { feature: "API access & integrations", starter: false, growth: true, enterprise: true },
                  { feature: "Immutable audit trail", starter: false, growth: true, enterprise: true },
                  { feature: "Custom data connectors", starter: false, growth: false, enterprise: true },
                  { feature: "Multi-entity consolidation", starter: false, growth: false, enterprise: true },
                  { feature: "On-premises deployment", starter: false, growth: false, enterprise: true },
                  { feature: "Dedicated CSM / SLA", starter: false, growth: false, enterprise: true },
                ].map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-black/[0.04] last:border-0 ${
                      i % 2 === 1 ? "bg-[#fbfcfa]/60" : "bg-white"
                    }`}
                  >
                    <td className="px-[28px] py-[16px] text-[14px] font-medium tracking-[-0.12px] text-[#0b1f1e]">
                      {row.feature}
                    </td>
                    <td className="px-[24px] py-[16px] text-center">
                      {row.starter ? <Check /> : <Dash />}
                    </td>
                    <td className="px-[24px] py-[16px] text-center">
                      {row.growth ? <Check /> : <Dash />}
                    </td>
                    <td className="px-[24px] py-[16px] text-center">
                      {row.enterprise ? <Check /> : <Dash />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
