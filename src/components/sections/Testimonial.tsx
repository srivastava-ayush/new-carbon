import Reveal from "@/components/shared/Reveal";
import Section from "@/components/ui/Section";

export default function Testimonial() {
  return (
    <Section id="testimonial" narrow className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-1/2 left-1/2 h-[560px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.06),transparent_70%)]" />
      </div>
      <Reveal>
        <figure className="mx-auto max-w-[760px] text-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mx-auto h-[36px] w-[36px] text-[#16a34a]/30"
            aria-hidden="true"
          >
            <path d="M10 7H6a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h1.5c.83 0 1.5-.67 1.5-1.5V13a1 1 0 0 0-1-1H6v-1c0-1.66.34-3 2-4V7Zm11 0h-4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h1.5c.83 0 1.5-.67 1.5-1.5V13a1 1 0 0 0-1-1h-2v-1c0-1.66.34-3 2-4V7Z" />
          </svg>
          <blockquote className="mt-[24px] font-display text-[26px] leading-[1.3] tracking-[-0.5px] text-black md:text-[38px]">
            &ldquo;CarbonSynq turned years of spreadsheets into one source of
            truth. We cut reporting time by 70% and finally see exactly where
            our emissions come from.&rdquo;
          </blockquote>
          <figcaption className="mt-[32px] flex items-center justify-center gap-[14px]">
            <span className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#16a34a]/10 font-display text-[18px] text-[#15803d]">
              M
            </span>
            <span className="text-left">
              <span className="block text-[15px] font-semibold tracking-[-0.14px] text-black">
                Maya Lindqvist
              </span>
              <span className="block text-[13px] tracking-[-0.14px] text-[#848484]">
                Head of Sustainability, Northwind
              </span>
            </span>
          </figcaption>
        </figure>
      </Reveal>
    </Section>
  );
}
