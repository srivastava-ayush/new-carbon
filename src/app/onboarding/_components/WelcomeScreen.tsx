"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  FileCheck2,
  Plug,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStart: () => void;
}

interface StepCard {
  icon: React.ElementType;
  step: string;
  title: string;
  description: string;
}

const STEPS: StepCard[] = [
  {
    icon: Building2,
    step: "01",
    title: "Tell us about your company",
    description: "Legal entity, size and industry. This anchors every report.",
  },
  {
    icon: Plug,
    step: "02",
    title: "Map your operations & data",
    description: "Locations, fleet and the systems where your data already lives.",
  },
  {
    icon: FileCheck2,
    step: "03",
    title: "Configure reporting",
    description: "Frameworks, deadlines and targets for your stakeholders.",
  },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-14 text-foreground">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[600px]"
      >
        {/* Brand */}
        <motion.div variants={item} className="flex justify-center">
          <Image
            src="/cr.webp"
            alt="CarbonSynq logo"
            width={56}
            height={56}
            unoptimized
            className="h-12 w-12 object-contain"
          />
        </motion.div>

        {/* Eyebrow */}
        <motion.div variants={item} className="mt-8 flex items-center justify-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-eco-green opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-eco-green" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-eco-green">
            Workspace setup
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mt-4 text-center text-[2rem] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-[2.5rem]"
        >
          Welcome to CarbonSynq.
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-4 max-w-md text-center text-[0.9375rem] leading-6 text-muted-foreground"
        >
          Answer a few quick questions and we&apos;ll configure your carbon
          accounting workspace in under five minutes.
        </motion.p>

        {/* Steps */}
        <motion.div variants={item} className="mt-10 space-y-2.5">
          {STEPS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.step}
                tabIndex={0}
                className="group flex cursor-default items-center gap-4 rounded-xl border border-border bg-card p-4 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:border-eco-green/50 hover:shadow-[0_10px_32px_rgba(22,163,74,0.08)] focus-visible:ring-2 focus-visible:ring-eco-green/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-eco-green/10 text-eco-green transition-colors duration-200 group-hover:bg-eco-green group-hover:text-white">
                  <Icon className="size-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[0.6875rem] font-semibold tabular-nums tracking-wider text-eco-green/70">
                      {card.step}
                    </span>
                    <h3 className="truncate text-[0.9375rem] font-semibold text-foreground">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-0.5 text-sm leading-5 text-muted-foreground">
                    {card.description}
                  </p>
                </div>
                <ChevronRight className="size-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-eco-green group-hover:opacity-100" />
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="mt-10 flex flex-col items-center gap-3">
          <Button
            size="lg"
            onClick={onStart}
            className="group w-full max-w-[18rem] rounded-full bg-eco-green! text-white shadow-sm hover:bg-eco-hover! hover:shadow-[0_12px_32px_rgba(22,163,74,0.25)] focus-visible:ring-eco-green/40!"
          >
            Start setup
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>

          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-eco-green/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Back to homepage
          </Link>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-6 text-center text-xs text-muted-foreground/80"
        >
          Progress is saved automatically as you go.
        </motion.p>
      </motion.div>
    </div>
  );
}
