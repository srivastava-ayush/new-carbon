import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";
import CarbonCard from "@/components/ui/CarbonCard";

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
        <Reveal delay={0.1} className="h-full">
          <CarbonCard>
            <span className="text-[48px] font-display leading-none tracking-[-1px] text-[#188f8b] transition-colors duration-300 group-hover:text-white">
              2026
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa] transition-colors duration-300 group-hover:text-white/70">
              Founded
            </span>
          </CarbonCard>
        </Reveal>

        <Reveal delay={0.15} className="h-full">
          <CarbonCard>
            <span className="text-[48px] font-display leading-none tracking-[-1px] text-[#188f8b] transition-colors duration-300 group-hover:text-white">
              100%
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa] transition-colors duration-300 group-hover:text-white/70">
              Scientific Bias
            </span>
          </CarbonCard>
        </Reveal>

        <Reveal delay={0.2} className="h-full">
          <CarbonCard>
            <span className="font-display text-[18px] leading-[1.3] tracking-[-0.3px] text-[#0b1f1e] transition-colors duration-300 group-hover:text-white">
              &ldquo;We believe robust methodologies matter far more than corporate check-boxing.&rdquo;
            </span>
            <p className="text-[13px] leading-[1.5] text-[#848484] transition-colors duration-300 group-hover:text-[#ade5df]/85">
              We build peer-reviewed, open-source models verified by third-party science panels. We do not participate in visual corporate greenwashing.
            </p>
          </CarbonCard>
        </Reveal>
      </div>
    </Section>
  );
}
