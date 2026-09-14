import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px]">
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Deep Work Friendly",
    description: "Quiet workspaces, asynchronous updates, and minimum required meetings.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-[20px] w-[20px]">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "Ergonomic Priority",
    description: "Fully motorized sit-to-stand desks, premium ergonomic chairs, and 4K displays.",
  },
];

const SPACES = [
  {
    name: "Focus Lab",
    description: "Ergonomic Developer Hub",
    color: "from-[#0d4f4b] to-[#114a47]",
  },
  {
    name: "Synergy Hub",
    description: "Quiet Workspace Areas",
    color: "from-[#188f8b]/10 to-[#188f8b]/5",
  },
  {
    name: "Team Culture",
    description: "Asynchronous Engineering",
    color: "from-[#e8f5f4] to-[#d1ece9]",
  },
];

export default function CareersWorkspace() {
  return (
    <Section narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          Workspace Culture
        </span>
        <h2 className="mb-[20px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[64px]">
          Day in the life
        </h2>
        <p className="mb-[56px] max-w-[600px] text-[16px] leading-[1.5] tracking-[-0.14px] text-[#848484] md:mb-[72px] md:text-[18px]">
          We design our environments for uninterrupted, high-bandwidth building. Our research and development offices feature modern height-adjustable desks, dual premium 4K screens, top-tier developer machinery, and custom quiet zones designed to respect your deep-focus hours.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[14px] md:grid-cols-3">
        {SPACES.map((space, i) => (
          <Reveal key={space.name} delay={0.1 + i * 0.08}>
            <div className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/10 bg-white transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b]/20 hover:shadow-[0_24px_56px_rgba(11,59,56,0.08)]">
              <div className={`flex h-[200px] items-center justify-center bg-gradient-to-br ${space.color}`}>
                <div className="flex flex-col items-center gap-[10px] text-center">
                  <span className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <svg viewBox="0 0 24 24" fill="none" className="h-[26px] w-[26px] text-[#0b1f1e]/60">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0b1f1e]/40">
                    {space.description}
                  </span>
                </div>
              </div>
              <div className="p-[28px]">
                <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.3px] text-[#0b1f1e] md:text-[24px]">
                  {space.name}
                </h3>
                <p className="mt-[8px] text-[13px] leading-[1.5] text-[#848484]">
                  {space.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-[14px] grid grid-cols-1 gap-[14px] md:grid-cols-2">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.label} delay={0.2 + i * 0.08}>
            <div className="flex items-start gap-[16px] rounded-[20px] border border-black/[0.06] bg-white p-[24px] md:p-[28px]">
              <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] bg-[#188f8b]/10 text-[#188f8b]">
                {feature.icon}
              </span>
              <div>
                <h4 className="text-[15px] font-semibold tracking-[-0.2px] text-[#0b1f1e]">
                  {feature.label}
                </h4>
                <p className="mt-[4px] text-[13px] leading-[1.5] text-[#848484]">
                  {feature.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
