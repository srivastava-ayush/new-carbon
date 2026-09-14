import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const VALUES = [
  {
    title: "Science Above All",
    description: "Every product decision is grounded in peer-reviewed scientific methodology. We do not compromise integrity for commercial ease.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px]">
        <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Radical Transparency",
    description: "Open source datasets, public models, and published salary bands. We invite critique to elevate standards across the industry.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px]">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Generational Vision",
    description: "Climate change is a multi-decade challenge. We optimize our plans for generational impact, rewarding mastery and patience.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px]">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Equitably Structured",
    description: "Solutions must champion vulnerable populations. We consciously design with global climate equity at the center.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px]">
        <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Urgency Without Chaos",
    description: "We move with intense purpose but complete poise, preserving sustainable work cultures that allow builders to flourish.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px]">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Owner Mindsets",
    description: "We hire leaders, not managers. Every team member has absolute autonomy, responsibility, and substantial equity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px]">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function CareersValues() {
  return (
    <Section narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          Operating Values
        </span>
        <h2 className="mb-[20px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[64px]">
          Highly opinionated culture
        </h2>
        <p className="mb-[56px] max-w-[620px] text-[16px] leading-[1.5] tracking-[-0.14px] text-[#848484] md:mb-[72px] md:text-[18px]">
          We select candidates for high intellectual curiosity and ownership. These principles guide our day-to-day work, engineering roadmap, and commercial choices.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map((value, i) => (
          <Reveal key={value.title} delay={0.1 + (i % 3) * 0.08}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-[28px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b]/20 md:p-[32px]">
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#188f8b] to-[#43b0a9] transition-transform duration-500 group-hover:scale-x-100" />

              <span className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] border border-[#188f8b]/15 bg-[#188f8b]/[0.05] text-[#188f8b] transition-all duration-500 group-hover:border-[#188f8b] group-hover:bg-[#188f8b] group-hover:text-white">
                {value.icon}
              </span>

              <h3 className="mt-[20px] font-display text-[20px] leading-[1.15] tracking-[-0.3px] text-[#0b1f1e] md:text-[22px]">
                {value.title}
              </h3>
              <p className="mt-[10px] flex-1 text-[13.5px] leading-[1.55] tracking-[-0.1px] text-[#7c8f8d]">
                {value.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
