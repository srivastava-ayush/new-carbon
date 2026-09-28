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
    <section id={id} className={`${flush ? "" : "py-[24px] md:py-[32px]"} ${className}`}>
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}