import type { ReactNode } from "react";
import Container from "@/components/ui/Container";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  flush?: boolean;
}

export default function Section({ id, children, className = "", narrow = false, flush = false }: SectionProps) {
  return (
    <section id={id} className={`${flush ? "" : "py-[80px] md:py-[120px] lg:py-[160px]"} ${className}`}>
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}