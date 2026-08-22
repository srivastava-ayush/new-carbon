import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/cr.webp"
      alt="Carbonsynq logo"
      width={105}
      height={113}
      className={className}
      priority
    />
  );
}
