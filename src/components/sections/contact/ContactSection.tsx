"use client";

import Reveal from "@/components/shared/Reveal";
import Container from "@/components/ui/Container";
import BookDemo from "@/components/sections/CalCom/page";

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-white py-[56px] md:py-[80px] lg:py-[104px]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbfcfa_0%,#ffffff_40%,#fbfcfa_100%)]" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-[48px] xl:grid-cols-[minmax(260px,0.6fr)_minmax(0,1.9fr)] xl:gap-[48px]">
          {/* Left — Info */}
          <Reveal className="min-w-0">
            <div className="flex flex-col gap-[40px]">
              <div>
                <div className="mb-[32px] h-px w-full bg-gradient-to-r from-[#188f8b]/60 via-[#188f8b]/20 to-transparent" />
                <span className="mb-[20px] block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#188f8b]">
                  Get in touch
                </span>
                <h2 className="mb-[20px] font-display text-[30px] leading-[1.05] tracking-[-1px] text-black md:text-[40px]">
                  Start Your{" "}
                  <span className="text-[#188f8b]">Net Zero Journey</span>{" "}
                  with CarbonSynq
                </h2>
                <p className="max-w-[400px] text-[12px] leading-[1.55] tracking-[-0.14px] text-[#848484]">
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
            </div>
          </Reveal>

          {/* Right — CALCOM */}
          <Reveal delay={0.1} className="min-w-0">
            <div className="relative overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_24px_64px_rgba(11,59,56,0.06)]">
              <div className="absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r from-[#188f8b] to-[#43b0a9]" />

              <div className="p-[16px] md:p-[20px]">
                <div className="overflow-hidden rounded-[16px] border border-black/[0.06] bg-[#fbfcfa]">
                  <BookDemo />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}