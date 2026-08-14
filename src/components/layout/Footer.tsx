const CONTACT_EMAIL = "sales@Carbonsynqnetworks.com";

import Container from "@/components/ui/Container";

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "EULA", href: "/eula" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/Carbonsynq-networks-inc" },
  { label: "X", href: "https://x.com/CarbonsynqNetworks" },
];

export default function Footer() {
  return (
    <footer className="relative z-50 mt-[80px] bg-[#f0f0f0] md:mt-[120px]">
      <Container className="flex h-[440px] flex-col justify-between py-[30px] md:h-[400px] md:pt-[40px] md:pb-[50px]">
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="group flex items-center gap-[10px] md:gap-[30px]"
        >
          <span className="font-display text-[44px] leading-[0.95] tracking-[-0.88px] text-black min-[768px]:text-[80px] min-[1000px]:text-[100px] min-[1000px]:tracking-[-1px]">
            Get In Touch
          </span>
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[32px] w-[32px] shrink-0 text-black transition-transform duration-300 group-hover:translate-x-[10px] md:hidden"
          >
            <path d="M7 16h18M17 8l8 8-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="hidden transition-transform duration-300 group-hover:translate-x-[10px] md:block">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[40px] w-[40px] text-black">
              <path d="M8 20h24M20 10l10 10-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </a>

        <div className="flex flex-col gap-[30px]">
          <div className="h-px w-full bg-black" />

          <div className="flex flex-col items-start justify-between gap-[20px] md:flex-row md:items-end md:gap-0">
            <div className="flex flex-col gap-[15px]">
              <p className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-black">
                © 2026 Carbonsynq.
                <br className="md:hidden" /> All rights reserved.
              </p>
              <div className="flex items-center gap-[20px]">
                {LEGAL_LINKS.map((item) => (
                  <a key={item.href} href={item.href} className="text-[12px] font-medium uppercase leading-[1.2] tracking-[1.44px] text-black hover:underline">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-[30px]">
              {SOCIAL_LINKS.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="text-[18px] font-medium tracking-[0.18px] text-black hover:underline">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}