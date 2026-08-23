"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, SkipForward } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StepShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  showBack?: boolean;
  skipLabel?: string;
  onSkip?: () => void;
  pips?: {
    total: number;
    current: number;
    onSelect?: (index: number) => void;
  };
}

export function StepShell({
  eyebrow,
  title,
  description,
  children,
  onBack,
  onContinue,
  continueLabel = "Continue",
  continueDisabled,
  showBack = true,
  skipLabel,
  onSkip,
  pips,
}: StepShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-[760px] flex-1 px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-2.5 text-3xl font-bold tracking-tight text-foreground sm:text-[2rem] sm:leading-tight">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-6 text-muted-foreground">
            {description}
          </p>

          {pips && pips.total > 1 && (
            <div className="mt-6 flex items-center gap-3">
              <div className="flex flex-1 gap-1.5">
                {Array.from({ length: pips.total }).map((_, i) => {
                  const isDone = i < pips.current;
                  const isCurrent = i === pips.current;
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Part ${i + 1} of ${pips.total}`}
                      aria-current={isCurrent ? "step" : undefined}
                      disabled={!pips.onSelect}
                      onClick={() => pips.onSelect?.(i)}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
                        isCurrent
                          ? "bg-primary"
                          : isDone
                            ? "bg-primary/30 hover:bg-primary/50"
                            : "bg-border hover:bg-muted-foreground/30",
                        pips.onSelect && "cursor-pointer"
                      )}
                    />
                  );
                })}
              </div>
              <span className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground">
                {pips.current + 1} / {pips.total}
              </span>
            </div>
          )}
        </header>

        <div className="space-y-8">{children}</div>
      </div>

      <div className="sticky bottom-0 z-30 border-t border-border bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[760px] items-center justify-between gap-3 px-4 sm:px-6">
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={onBack}
            className={!showBack ? "invisible" : undefined}
            aria-label="Go back"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>

          <div className="flex items-center gap-2">
            {skipLabel && onSkip && (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={onSkip}
                className="text-muted-foreground"
              >
                <SkipForward className="size-4" />
                {skipLabel}
              </Button>
            )}
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                size="lg"
                onClick={onContinue}
                disabled={continueDisabled}
                className="min-w-[7.5rem]"
              >
                {continueLabel}
                <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
