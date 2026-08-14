import Link from "next/link";
import Reveal from "@/components/shared/Reveal";
import Container from "@/components/ui/Container";

export default function CTA() {
  return (
    <section className="py-[64px] md:py-[88px]">
      <Container narrow>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-[#0d3b2d] px-[24px] py-[56px] text-center md:rounded-[36px] md:px-[64px] md:py-[88px]">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: "radial-gradient(rgba(167,243,208,0.14) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                  maskImage: "radial-gradient(70% 70% at 50% 0%, black, transparent)",
                  WebkitMaskImage: "radial-gradient(70% 70% at 50% 0%, black, transparent)",
                }}
              />
              <div className="absolute -top-[220px] left-1/2 h-[440px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.55),transparent_70%)] blur-2xl" />
              <div className="absolute -bottom-[200px] left-1/2 h-[400px] w-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(22,163,74,0.35),transparent_70%)] blur-2xl" />
            </div>

            <span className="relative mb-[20px] block text-[14px] font-semibold uppercase tracking-[0.18em] text-[#a7f3d0]">
              Ready when you are
            </span>
            <h2 className="relative mx-auto max-w-[560px] font-display text-[36px] leading-[1] tracking-[-1px] text-white md:text-[56px]">
              Ready to cut your carbon?
            </h2>
            <p className="relative mx-auto mt-[20px] max-w-[440px] text-[16px] leading-[1.5] tracking-[-0.14px] text-[#a7f3d0]/80 md:text-[17px]">
              Get a personalized walkthrough of the platform and see how much
              you could save.
            </p>

            <div className="relative mt-[32px] flex flex-wrap items-center justify-center gap-[16px]">
              <Link
                href="/book-demo"
                className="inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full bg-white px-[30px] text-[16px] font-semibold tracking-[-0.16px] text-[#0d3b2d] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#e4f3ea]"
              >
                Book a Demo
                <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="mailto:sales@Carbonsynqnetworks.com"
                className="inline-flex h-[54px] items-center justify-center gap-[10px] rounded-full border border-[#a7f3d0]/30 px-[30px] text-[16px] font-semibold tracking-[-0.16px] text-white transition-all duration-300 hover:border-[#a7f3d0]/60"
              >
                Talk to sales
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
