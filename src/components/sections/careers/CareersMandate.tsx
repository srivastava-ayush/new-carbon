import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

export default function CareersMandate() {
  return (
    <Section id="mandate" narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          The Mandate
        </span>
        <h2 className="mb-[24px] max-w-[720px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[64px]">
          We cannot improve what we cannot verifiably measure
        </h2>
        <p className="mb-[40px] max-w-[620px] text-[16px] leading-[1.5] tracking-[-0.14px] text-[#848484] md:text-[18px]">
          Corporations and regulatory jurisdictions must align with rigorous, high-fidelity metrics. CarbonSynq bridges this delta—providing science-grade, programmatic ledger platforms that make absolute accountability standard practice across all corporate supply chains.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
        <Reveal delay={0.1}>
          <div className="group flex flex-col rounded-[24px] border border-black/10 bg-white p-[28px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b]/20 md:p-[32px]">
            <span className="text-[48px] font-display leading-none tracking-[-1px] text-[#188f8b]">2026</span>
            <span className="mt-[8px] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
              Founded
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="group flex flex-col rounded-[24px] border border-[#188f8b]/15 bg-[#f2faf9] p-[28px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b]/25 md:p-[32px]">
            <span className="text-[48px] font-display leading-none tracking-[-1px] text-[#188f8b]">100%</span>
            <span className="mt-[8px] text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
              Scientific Bias
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="group relative flex flex-col overflow-hidden rounded-[24px] border border-black/10 bg-white p-[28px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b]/20 md:p-[32px]">
            <div className="absolute right-0 bottom-0 h-[100px] w-[100px] bg-gradient-to-tl from-[#188f8b]/10 to-transparent" />
            <div className="relative">
              <span className="font-display text-[18px] leading-[1.3] tracking-[-0.3px] text-[#0b1f1e]">
                &ldquo;We believe robust methodologies matter far more than corporate check-boxing.&rdquo;
              </span>
              <p className="mt-[12px] text-[13px] leading-[1.5] text-[#848484]">
                We build peer-reviewed, open-source models verified by third-party science panels. We do not participate in visual corporate greenwashing.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
