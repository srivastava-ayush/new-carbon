"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { EASE } from "@/lib/animations";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  delay?: number;
}

export default function CountUp({ value, decimals = 0, suffix = "", prefix = "", className = "", delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => `${v.toFixed(decimals)}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.3, ease: EASE, delay });
    return () => controls.stop();
  }, [inView, value, mv, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
