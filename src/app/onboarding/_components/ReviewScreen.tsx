"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, PencilLine, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PAGES, STAGE_LABELS } from "../_lib/onboardingPages";
import { pageSummary } from "../_lib/onboardingSummaries";
import type { OnboardingData } from "../_types/onboarding";

interface ReviewScreenProps {
  data: OnboardingData;
  completedPages: string[];
  onEdit: (pageKey: string) => void;
  onBack: () => void;
  onComplete: () => void;
  submitting: boolean;
}

interface StageGroup {
  stageIndex: number;
  label: string;
  pages: typeof PAGES;
}

const GROUPS: StageGroup[] = STAGE_LABELS.map((label, stageIndex) => ({
  stageIndex,
  label,
  pages: PAGES.filter((p) => p.stageIndex === stageIndex),
})).filter((g) => g.pages.length > 0);

export function ReviewScreen({
  data,
  completedPages,
  onEdit,
  onBack,
  onComplete,
  submitting,
}: ReviewScreenProps) {
  const completedCount = completedPages.length;

  return (
    <div className="mx-auto w-full max-w-[760px] px-4 pb-40 pt-10 sm:px-6 sm:pt-14">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Review
        </p>
        <h1 className="mt-2.5 text-3xl font-bold tracking-tight text-foreground sm:text-[2rem]">
          Looks good so far
        </h1>
        <p className="mt-3 max-w-xl text-[0.9375rem] leading-6 text-muted-foreground">
          You&apos;ve completed {completedCount} of {PAGES.length} pages. Review each
          section and jump back to any page to refine your answers.
        </p>
      </header>

      <div className="space-y-10">
        {GROUPS.map((group, gi) => {
          const groupDone = group.pages.filter((p) =>
            completedPages.includes(p.key)
          ).length;
          return (
            <section key={group.label}>
              <div className="mb-3 flex items-center justify-between border-b border-border pb-2.5">
                <h2 className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-foreground">
                  <span
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full text-[0.6875rem] font-bold",
                      groupDone === group.pages.length
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-muted text-muted-foreground"
                    )}
                  >
                    {group.stageIndex}
                  </span>
                  {group.label}
                </h2>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">
                  {groupDone}/{group.pages.length} complete
                </span>
              </div>

              <div className="space-y-3">
                {group.pages.map((page, pi) => {
                  const summary = pageSummary(page.key, data);
                  const filled = summary.some((s) => s.value.trim() !== "");
                  const isComplete = completedPages.includes(page.key);
                  return (
                    <motion.div
                      key={page.key}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: gi * 0.03 + pi * 0.03, duration: 0.3 }}
                      className="rounded-xl border border-border bg-background shadow-sm"
                    >
                      <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                              isComplete
                                ? "bg-primary text-primary-foreground"
                                : "border border-border bg-muted text-muted-foreground"
                            )}
                          >
                            {isComplete ? (
                              <Check className="size-4" strokeWidth={3} />
                            ) : (
                              page.substepIndex + 1
                            )}
                          </span>
                          <div>
                            <h3 className="text-[0.9375rem] font-semibold text-foreground">
                              {page.title}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {filled
                                ? "Details captured"
                                : "Some details missing"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(page.key)}
                        >
                          <PencilLine className="size-3.5" />
                          Edit
                        </Button>
                      </div>

                      {summary.length > 0 && (
                        <dl className="grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-border px-5 py-4 sm:grid-cols-2 sm:px-6">
                          {summary.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-baseline justify-between gap-3 sm:block"
                            >
                              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground/80">
                                {item.label}
                              </dt>
                              <dd
                                className={cn(
                                  "text-sm text-foreground sm:mt-0.5",
                                  !item.value && "italic text-muted-foreground/60"
                                )}
                              >
                                {item.value || "Not provided"}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-between gap-3">
        <Button variant="ghost" size="lg" onClick={onBack}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <motion.div whileTap={{ scale: 0.98 }}>
          <Button size="lg" onClick={onComplete} disabled={submitting} className="min-w-[12rem]">
            {submitting ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                Setting up…
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Create workspace
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
