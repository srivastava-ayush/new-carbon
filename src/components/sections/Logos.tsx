import Reveal from "@/components/shared/Reveal";
import Container from "@/components/ui/Container";

const LOGOS = [
  { name: "Verdant", className: "font-display text-[20px] tracking-[-0.4px]" },
  { name: "Northwind", className: "text-[15px] font-bold uppercase tracking-[0.22em]" },
  { name: "Helios", className: "text-[17px] font-light uppercase tracking-[0.3em]" },
  { name: "cyan", className: "text-[20px] font-extrabold lowercase tracking-[0.02em]" },
  { name: "Aster & Co", className: "text-[16px] font-semibold tracking-[-0.2px]" },
  { name: "Kepler", className: "font-display text-[20px] italic tracking-[-0.4px]" },
];

export default function Logos() {
  return (
    <section className="py-[40px] md:py-[56px]">
      <Container narrow>
        <Reveal>
          <p className="mb-[28px] text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a1a1aa]">
            Trusted by teams measuring for climate action
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-[40px] gap-y-[24px] md:gap-x-[64px]">
            {LOGOS.map((logo) => (
              <span
                key={logo.name}
                className={`${logo.className} whitespace-nowrap text-[#b4b4bc] transition-colors duration-300 hover:text-black`}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
