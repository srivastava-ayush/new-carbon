import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

const INTERNS = [
  {
    name: "Abhijeet Rao",
    role: "Backend Engineer",
    linkedin: "https://www.linkedin.com/in/iabhiijeet",
    initials: "AR",
  },
  {
    name: "Prateek Kushwaha",
    role: "Backend Engineer",
    linkedin: "https://www.linkedin.com/in/itsprateek4510",
    initials: "PK",
  },
  {
    name: "Ata Waris",
    role: "Creative Head & Frontend Sys Eng.",
    linkedin: "https://www.linkedin.com/in/atawaris",
    initials: "AW",
  },
  {
    name: "Divi Tyagi",
    role: "Brand Designer Head",
    linkedin: "https://www.linkedin.com/in/divi-tyagi-86449b205",
    initials: "DT",
  },
];

export default function CareersInterns() {
  return (
    <Section narrow>
      <Reveal>
        <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
        <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
          Future Climate Leaders
        </span>
        <h2 className="mb-[20px] font-display text-[40px] leading-[0.95] tracking-[-1.28px] text-black md:text-[64px]">
          Meet Our Current Interns
        </h2>
        <p className="mb-[56px] max-w-[620px] text-[16px] leading-[1.5] tracking-[-0.14px] text-[#848484] md:mb-[72px] md:text-[18px]">
          At CarbonSynq, we are proud to empower the next generation of innovators. Our current cohort of exceptional interns is actively working alongside our engineering and climate science teams, tackling real-world challenges and driving our mission of global carbon accountability forward.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {INTERNS.map((intern, i) => (
          <Reveal key={intern.name} delay={0.1 + i * 0.08}>
            <div className="group relative flex flex-col items-center overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-[32px] text-center transition-all duration-300 hover:-translate-y-[2px] hover:border-[#188f8b]/20 hover:shadow-[0_24px_56px_rgba(11,59,56,0.08)]">
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#188f8b] to-[#43b0a9] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gradient-to-br from-[#188f8b]/15 to-[#0d4f4b]/10 text-[24px] font-display text-[#188f8b]">
                {intern.initials}
              </div>

              <h3 className="mt-[20px] text-[16px] font-semibold tracking-[-0.2px] text-[#0b1f1e]">
                {intern.name}
              </h3>
              <p className="mt-[4px] text-[13px] leading-[1.4] text-[#848484]">
                {intern.role}
              </p>

              <a
                href={intern.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[18px] flex items-center gap-[6px] rounded-full border border-black/[0.06] bg-[#f8fafa] px-[14px] py-[6px] text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f706e] transition-all duration-300 hover:border-[#188f8b]/30 hover:bg-[#188f8b]/[0.06] hover:text-[#188f8b]"
              >
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-[12px] w-[12px]">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
