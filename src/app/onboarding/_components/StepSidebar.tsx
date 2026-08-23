"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  CloudUpload,
  Lock,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { PAGES, STAGE_LABELS, type OnboardingPage } from "../_lib/onboardingPages";

type SavedState = "idle" | "saving" | "saved";

interface StepSidebarProps {
  currentIndex: number;
  completedPages: string[];
  furthest: number;
  onPageClick: (index: number) => void;
  savedState: SavedState;
}

interface StageGroup {
  stageIndex: number;
  label: string;
  pages: OnboardingPage[];
}

const STAGE_GROUPS: StageGroup[] = STAGE_LABELS.map((label, stageIndex) => ({
  stageIndex,
  label,
  pages: PAGES.filter((p) => p.stageIndex === stageIndex),
})).filter((g) => g.pages.length > 0);

const REVIEW_INDEX = PAGES.length;

function SavedBadge({ state }: { state: SavedState }) {
  if (state === "idle") return null;
  return (
    <motion.span
      key={state}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-2.5 py-1 text-xs font-medium text-muted-foreground"
    >
      {state === "saving" ? (
        <CloudUpload className="size-3.5 animate-pulse" />
      ) : (
        <Check className="size-3.5 text-primary" strokeWidth={3} />
      )}
      {state === "saving" ? "Saving…" : "Saved"}
    </motion.span>
  );
}

function ProgressHeader({
  done,
  total,
}: {
  done: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="px-4 pt-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          Workspace setup
        </h2>
        <span className="text-xs font-semibold tabular-nums text-foreground">
          {pct}%
        </span>
      </div>
      <p className="mt-0.5 text-xs text-muted-foreground">
        {total} pages · {done} of {total} complete
      </p>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

interface SubstepRowProps {
  page: OnboardingPage;
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  onSelect: () => void;
}

function SubstepRow({
  page,
  isCompleted,
  isCurrent,
  isLocked,
  onSelect,
}: SubstepRowProps) {
  return (
    <li>
      <button
        type="button"
        disabled={isLocked}
        onClick={onSelect}
        aria-current={isCurrent ? "step" : undefined}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
          isCurrent && "bg-accent-muted/70",
          isLocked && "cursor-default",
          !isLocked && !isCurrent && "hover:bg-muted/60"
        )}
      >
        <span
          className={cn(
            "flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors",
            isCompleted && "border-primary bg-primary text-primary-foreground",
            isCurrent && !isCompleted && "border-primary bg-primary text-primary-foreground",
            !isCurrent && !isCompleted && "border-border bg-background",
            isLocked && "border-border bg-background opacity-50"
          )}
        >
          {isCompleted ? (
            <Check className="size-3" strokeWidth={3} />
          ) : (
            <span
              className={cn(
                "size-1 rounded-full",
                isCurrent ? "bg-white" : "bg-muted-foreground/60"
              )}
            />
          )}
        </span>
        <span
          className={cn(
            "truncate text-[0.8125rem]",
            isCurrent
              ? "font-semibold text-primary"
              : isCompleted
                ? "font-medium text-foreground"
                : "text-muted-foreground"
          )}
        >
          {page.title}
        </span>
        {isLocked && (
          <Lock className="ml-auto size-3 shrink-0 text-muted-foreground/40" />
        )}
      </button>
    </li>
  );
}

interface StageRowProps {
  stage: StageGroup;
  currentIndex: number;
  completedPages: string[];
  furthest: number;
  onPageClick: (index: number) => void;
}

function StageRow({
  stage,
  currentIndex,
  completedPages,
  furthest,
  onPageClick,
}: StageRowProps) {
  const pagesComplete = stage.pages.every((p) => completedPages.includes(p.key));
  const isStageCurrent =
    currentIndex >= stage.pages[0].index &&
    currentIndex <= stage.pages[stage.pages.length - 1].index;
  const isStageLocked = stage.pages[0].index > furthest;
  const isExpanded = isStageCurrent;

  return (
    <li>
      <div className="flex gap-3">
        <div className="flex w-6 shrink-0 flex-col items-center">
          <span
            className={cn(
              "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300",
              pagesComplete && "border-primary bg-primary text-white",
              isStageCurrent &&
                "border-primary bg-primary text-white shadow-[0_0_0_4px_rgba(22,163,74,0.14)]",
              isStageLocked && "border-border text-muted-foreground/50",
              !isStageCurrent &&
                !pagesComplete &&
                !isStageLocked &&
                "border-border text-muted-foreground"
            )}
          >
            {pagesComplete ? (
              <Check className="size-3.5" strokeWidth={3} />
            ) : (
              <span className="text-[0.6875rem] font-semibold leading-none">
                {stage.stageIndex}
              </span>
            )}
            {isStageCurrent && (
              <span
                aria-hidden
                className="absolute inset-0 animate-ping rounded-full bg-primary/20"
              />
            )}
          </span>
          <span
            className={cn(
              "mt-2 w-px flex-1 bg-border transition-colors duration-300",
              pagesComplete && "bg-primary/40"
            )}
          />
        </div>

        <div className="min-w-0 flex-1 pb-3">
          <div className="flex items-center justify-between gap-2 px-2 py-1.5">
            <span
              className={cn(
                "truncate text-[0.8125rem] font-semibold",
                isStageCurrent
                  ? "text-primary"
                  : isStageLocked
                    ? "text-muted-foreground/50"
                    : "text-foreground"
              )}
            >
              {stage.label}
            </span>
            {stage.pages.length > 0 && (
              <span className="text-[0.6875rem] font-medium tabular-nums text-muted-foreground/70">
                {stage.pages.length}
              </span>
            )}
          </div>

          <AnimatePresence initial={false}>
            {isExpanded ? (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-1 space-y-0.5 border-l-2 border-primary/15 pl-2">
                  {stage.pages.map((page) => (
                    <SubstepRow
                      key={page.key}
                      page={page}
                      isCompleted={completedPages.includes(page.key)}
                      isCurrent={currentIndex === page.index}
                      isLocked={page.index > furthest}
                      onSelect={() => onPageClick(page.index)}
                    />
                  ))}
                </div>
              </motion.ul>
            ) : (
              <button
                type="button"
                disabled={isStageLocked}
                onClick={() => onPageClick(stage.pages[0].index)}
                className={cn(
                  "mt-1 flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
                  !isStageLocked && "hover:bg-muted/60"
                )}
              >
                <span
                  className={cn(
                    "flex size-4.5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    pagesComplete
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background"
                  )}
                >
                  {pagesComplete && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className="truncate text-[0.8125rem] text-muted-foreground">
                  {stage.pages.length} step{stage.pages.length > 1 ? "s" : ""}
                </span>
                {isStageLocked && (
                  <Lock className="ml-auto size-3 shrink-0 text-muted-foreground/40" />
                )}
                {!isStageLocked && !pagesComplete && (
                  <ChevronDown className="ml-auto size-3.5 shrink-0 text-muted-foreground/50" />
                )}
              </button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </li>
  );
}

interface TimelineProps {
  currentIndex: number;
  completedPages: string[];
  furthest: number;
  onPageClick: (index: number) => void;
}

function StageTimeline({
  currentIndex,
  completedPages,
  furthest,
  onPageClick,
}: TimelineProps) {
  return (
    <ol className="flex flex-col">
      {STAGE_GROUPS.map((stage) => (
        <StageRow
          key={stage.label}
          stage={stage}
          currentIndex={currentIndex}
          completedPages={completedPages}
          furthest={furthest}
          onPageClick={onPageClick}
        />
      ))}
      <li className="flex gap-3">
        <div className="flex w-6 shrink-0 flex-col items-center">
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded-full border-2 bg-background",
              currentIndex >= REVIEW_INDEX
                ? "border-primary bg-primary text-white shadow-[0_0_0_4px_rgba(22,163,74,0.14)]"
                : "border-border text-muted-foreground"
            )}
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
        </div>
        <div className="min-w-0 flex-1 pb-1">
          <button
            type="button"
            onClick={() => onPageClick(REVIEW_INDEX)}
            className={cn(
              "flex w-full items-center rounded-lg px-2 py-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
              currentIndex === REVIEW_INDEX
                ? "bg-accent-muted/70"
                : "hover:bg-muted/60"
            )}
          >
            <span
              className={cn(
                "text-[0.8125rem] font-semibold",
                currentIndex === REVIEW_INDEX
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              Review & finish
            </span>
          </button>
        </div>
      </li>
    </ol>
  );
}

function BrandLink({ compact }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
        compact && "gap-2"
      )}
      aria-label="CarbonSynq home"
    >
      <Image
        src="/cr.webp"
        alt="CarbonSynq logo"
        width={64}
        height={64}
        unoptimized
        className="h-8 w-8 object-contain transition-transform group-hover:scale-105"
      />
      <span className="text-[0.9375rem] font-bold tracking-tight text-foreground">
        CarbonSynq
      </span>
      <span className="hidden rounded-full border border-border bg-muted px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground sm:inline">
        Setup
      </span>
    </Link>
  );
}

function DesktopSidebar(props: StepSidebarProps) {
  const progress = {
    done: props.completedPages.length,
    total: PAGES.length,
  };
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[300px] flex-col border-r border-border bg-background lg:flex">
      <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
        <BrandLink />
      </div>

      <div className="shrink-0 border-b border-border">
        <ProgressHeader done={progress.done} total={progress.total} />
      </div>

      <nav className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-4 pt-5">
        <StageTimeline {...props} />
      </nav>

      <div className="flex shrink-0 items-center justify-between border-t border-border px-5 py-3.5">
        <span className="text-xs text-muted-foreground">
          Autosaved to browser
        </span>
        <SavedBadge state={props.savedState} />
      </div>
    </aside>
  );
}

function MobileExperience(props: StepSidebarProps) {
  const [open, setOpen] = React.useState(false);
  const progress = {
    done: props.completedPages.length,
    total: PAGES.length,
  };
  const isWelcome = props.currentIndex < 0;
  const isReview = props.currentIndex >= REVIEW_INDEX;
  const currentPage = !isWelcome && !isReview ? PAGES[props.currentIndex] : null;
  const stepLine = isWelcome
    ? "Welcome"
    : isReview
      ? "Review & finish"
      : `${STAGE_LABELS[currentPage!.stageIndex]} · ${currentPage!.title}`;
  const stepSub = isReview
    ? "Review your answers"
    : `${props.currentIndex + 1} of ${PAGES.length} pages`;

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <BrandLink compact />
          <SavedBadge state={props.savedState} />
        </div>
        <div className="px-4 pb-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-secondary/70 px-3.5 py-2.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
          >
            <span className="flex flex-col">
              <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                {stepLine}
              </span>
              <span className="text-[0.8125rem] font-semibold text-foreground">
                {stepSub}
              </span>
            </span>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
          </button>
          <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={false}
              animate={{ width: `${(progress.done / progress.total) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl border-t border-border bg-background shadow-2xl lg:hidden"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Workspace setup
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {progress.done} of {progress.total} pages complete
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close progress"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="custom-scrollbar flex-1 overflow-y-auto px-3 py-4">
                <StageTimeline
                  {...props}
                  onPageClick={(i) => {
                    props.onPageClick(i);
                    setOpen(false);
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function StepSidebar(props: StepSidebarProps) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileExperience {...props} />
    </>
  );
}
