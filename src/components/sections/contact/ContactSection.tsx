import Reveal from "@/components/shared/Reveal";
import Container from "@/components/ui/Container";

const CALENDLY_URL =
  "https://calendly.com/pushkarsingh-carbonsync/30min?hide_event_type_details=1&primary_color=059669&text_color=0f172a";

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-white py-[56px] md:py-[80px] lg:py-[104px]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbfcfa_0%,#ffffff_40%,#fbfcfa_100%)]" />

      <Container narrow className="relative z-10">
        <div className="grid grid-cols-1 gap-[48px] lg:grid-cols-[1fr_1.3fr] lg:gap-[64px]">
          {/* Left — Info */}
          <Reveal>
            <div className="flex flex-col gap-[40px]">
              <div>
                <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
                <span className="mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
                  Get in touch
                </span>
                <h2 className="mb-[20px] font-display text-[36px] leading-[1.05] tracking-[-1px] text-black md:text-[48px]">
                  Start Your{" "}
                  <span className="text-[#188f8b]">Net Zero Journey</span>{" "}
                  with CarbonSynq
                </h2>
                <p className="max-w-[400px] text-[15px] leading-[1.55] tracking-[-0.14px] text-[#848484]">
                  Book a call with our team and let&apos;s discuss how we can
                  help you measure, reduce, and offset your carbon footprint.
                </p>
              </div>

              <div className="flex flex-col gap-[16px]">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    label: "Email",
                    value: "contact@carbonsynqearth.com",
                    href: "mailto:contact@carbonsynqearth.com",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ),
                    label: "Phone",
                    value: "+91 99118 75613",
                    href: "tel:+919911875613",
                  },
                ].map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="group flex items-center gap-[16px] rounded-[16px] border border-black/[0.06] bg-white p-[20px] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#188f8b]/20 hover:shadow-[0_16px_40px_rgba(11,59,56,0.06)]"
                  >
                    <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] border border-[#188f8b]/15 bg-[#188f8b]/[0.05] text-[#188f8b] transition-all duration-300 group-hover:border-[#188f8b] group-hover:bg-[#188f8b] group-hover:text-white">
                      {info.icon}
                    </span>
                    <div>
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#a1a1aa]">
                        {info.label}
                      </span>
                      <span className="mt-[2px] block text-[14px] font-medium tracking-[-0.14px] text-[#0b1f1e]">
                        {info.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="rounded-[16px] border border-[#188f8b]/15 bg-[#f2faf9] p-[24px]">
                <h4 className="text-[14px] font-semibold tracking-[-0.2px] text-[#0b1f1e]">
                  Head Office
                </h4>
                <p className="mt-[6px] text-[13px] leading-[1.5] text-[#5f706e]">
                  India
                </p>
                <div className="mt-[14px] flex items-center gap-[20px]">
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/company/carbonsync-india/", icon: "M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.002 8.004h4.996V24H.002V8.004zm7.998 0h4.796v2.172h.068C13.438 8.796 14.888 8 16.562 8 19.578 8 20.14 9.952 20.14 12.886v5.934h-4.996v-6.46c0-1.612-.03-3.572-2.02-3.572-2.02 0-2.33 1.668-2.33 3.458v6.574h-4.996V8.004z" },
                    { label: "X", href: "https://x.com/CarbonSynq11", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#188f8b] hover:underline"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — Calendly */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_24px_64px_rgba(11,59,56,0.06)]">
              <div className="absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r from-[#188f8b] to-[#43b0a9]" />

              <div className="p-[16px] md:p-[20px]">
                <h3 className="px-[8px] pt-[8px] pb-[16px] text-[20px] font-semibold tracking-[-0.3px] text-[#0b1f1e]">
                  Book a Call
                </h3>
                <p className="px-[8px] pb-[20px] text-[13px] leading-[1.5] text-[#848484]">
                  Schedule a 30-minute meeting and our team will reach out to
                  discuss your carbon journey.
                </p>
                <div className="overflow-hidden rounded-[16px] border border-black/[0.06] bg-[#fbfcfa]">
                  <iframe
                    src={CALENDLY_URL}
                    title="Book a call with CarbonSynq"
                    width="100%"
                    height="720"
                    loading="lazy"
                    className="block w-full"
                    style={{ border: 0 }}
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}