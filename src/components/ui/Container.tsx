import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export default function Container({ children, className = "", narrow = false }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${narrow ? "max-w-6xl" : "max-w-[1520px]"} px-[12px] sm:px-[16px] lg:px-[20px] ${className}`}
    >
      {children}
    </div>
  );
}