"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { StepSidebar } from "./StepSidebar";
import { StepShell } from "./StepShell";
import { ReviewScreen } from "./ReviewScreen";
import { WelcomeScreen } from "./WelcomeScreen";
import { WorkspaceReady } from "./WorkspaceReady";
import { CompanyIdentityStep } from "./steps/CompanyIdentityStep";
import { LocationsOperationsStep } from "./steps/LocationsOperationsStep";
import { ReportingComplianceStep } from "./steps/ReportingComplianceStep";
import { DataIntegrationsStep } from "./steps/DataIntegrationsStep";
import { EmissionsProfileStep } from "./steps/EmissionsProfileStep";
import { ValueChainStep } from "./steps/ValueChainStep";
import { StrategyTeamStep } from "./steps/StrategyTeamStep";
import {
  EMPTY_ONBOARDING,
  clearOnboarding,
  loadOnboarding,
  saveOnboarding,
} from "../_lib/onboardingStorage";
import {
  PAGE_INDEX,
  PAGES,
  STAGE_LABELS,
  isLastPageOfStep,
  pageIndexForStep,
} from "../_lib/onboardingPages";
import { STEP_INDEX, validatePage } from "../_lib/onboardingValidation";
import type { OnboardingData, OnboardingKey } from "../_types/onboarding";

const WELCOME_INDEX = -1;
const REVIEW_INDEX = PAGES.length;
const DONE_INDEX = PAGES.length + 1;

type SavedState = "idle" | "saving" | "saved";

export function OnboardingWizard() {
  const router = useRouter();

  const [data, setData] = React.useState<OnboardingData>(() => {
    const saved = loadOnboarding();
    return saved?.data ?? EMPTY_ONBOARDING;
  });
  const [index, setIndex] = React.useState<number>(() => {
    const saved = loadOnboarding();
    if (saved?.finished) return DONE_INDEX;
    if (saved?.currentPageKey && PAGE_INDEX[saved.currentPageKey] != null)
      return PAGE_INDEX[saved.currentPageKey];
    if (saved?.currentStep && STEP_INDEX[saved.currentStep] != null)
      return pageIndexForStep(saved.currentStep);
    return WELCOME_INDEX;
  });
  const [direction, setDirection] = React.useState(1);
  const [completedPages, setCompletedPages] = React.useState<string[]>(() => {
    const saved = loadOnboarding();
    if (!saved) return [];
    if (saved.finished) return PAGES.map((p) => p.key);
    if (saved.completedPages) return saved.completedPages;
    return (saved.completedSteps ?? []).flatMap((step) =>
      PAGES.filter((p) => p.stepId === step).map((p) => p.key)
    );
  });
  const [furthest, setFurthest] = React.useState<number>(() => {
    const saved = loadOnboarding();
    if (saved?.finished) return DONE_INDEX;
    let idx: number | null = null;
    if (saved?.currentPageKey && PAGE_INDEX[saved.currentPageKey] != null)
      idx = PAGE_INDEX[saved.currentPageKey];
    else if (saved?.currentStep && STEP_INDEX[saved.currentStep] != null)
      idx = pageIndexForStep(saved.currentStep);
    return idx != null ? idx : WELCOME_INDEX;
  });
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [savedState, setSavedState] = React.useState<SavedState>("idle");
  const [submitting, setSubmitting] = React.useState(false);

  const currentPage =
    index >= 0 && index < PAGES.length ? PAGES[index] : null;
  const currentStepId = currentPage?.stepId ?? null;
  const isWelcome = index === WELCOME_INDEX;
  const isReview = index === REVIEW_INDEX;
  const isDone = index === DONE_INDEX;

  const markDirty = React.useCallback(() => setSavedState("saving"), []);

  React.useEffect(() => {
    const t = window.setTimeout(() => {
      saveOnboarding({
        data,
        currentPageKey: currentPage?.key ?? PAGES[0].key,
        completedPages,                                                                                                                                                               
        ...(isDone ? { finished: true as const } : {}),
      });
      setSavedState("saved");
      const reset = window.setTimeout(() => setSavedState("idle"), 1800);
      return () => window.clearTimeout(reset);
    }, 450);
    return () => window.clearTimeout(t);
  }, [data, completedPages, index, currentPage?.key, isDone]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  const update = React.useCallback(
    <K extends OnboardingKey>(
      group: K,
      patch: Partial<OnboardingData[K]>
    ) => {
      markDirty();
      setData((prev) => ({ ...prev, [group]: { ...prev[group], ...patch } }));
    },
    [markDirty]
  );

  const errors = React.useMemo(
    () => (currentPage ? validatePage(currentPage.key, data) : {}),
    [currentPage, data]
  );

  const err = React.useCallback(
    (field: string) =>
      errors[field] && touched[field] ? errors[field] : undefined,
    [errors, touched]
  );

  const touch = React.useCallback((field: string) => {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }, []);

  const goTo = (next: number, dir: number) => {
    const clamped = Math.max(WELCOME_INDEX, Math.min(next, DONE_INDEX));
    markDirty();
    setDirection(dir);
    setIndex(clamped);
    setFurthest((f) => Math.max(f, clamped));
    setTouched({});
  };

  const handleContinue = () => {
    if (currentPage) {
      const pageErrors = validatePage(currentPage.key, data);
      if (Object.keys(pageErrors).length > 0) {
        setTouched(
          Object.fromEntries(Object.keys(pageErrors).map((k) => [k, true]))
        );
        return;
      }
      setCompletedPages((prev) =>
        prev.includes(currentPage.key) ? prev : [...prev, currentPage.key]
      );
    }
    goTo(index + 1, 1);
  };

  const handleBack = () => {
    if (index <= WELCOME_INDEX) return;
    goTo(index - 1, -1);
  };

  const handleEdit = (pageKey: string) => {
    const target = PAGE_INDEX[pageKey];
    if (target == null) return;
    goTo(target, -1);
  };

  const handleComplete = () => {
    markDirty();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      const allKeys = PAGES.map((p) => p.key);
      setCompletedPages(allKeys);
      saveOnboarding({
        data,
        currentPageKey: PAGES[PAGES.length - 1].key,
        completedPages: allKeys,
        finished: true,
      });
      setIndex(DONE_INDEX);
    }, 900);
  };

  const enterDashboard = () => {
    clearOnboarding();
    router.push("/dashboard");
  };

  if (isDone) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <WorkspaceReady
          brandName={data.company.brandName || data.company.legalName}
          onEnterDashboard={enterDashboard}
          onInvite={enterDashboard}
        />
      </div>
    );
  }

  if (isWelcome) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <StepSidebar
          currentIndex={index}
          completedPages={completedPages}
          furthest={furthest}
          onPageClick={(i) => goTo(i, i > index ? 1 : -1)}
          savedState={savedState}
        />
        <main className="lg:pl-[300px]">
          <WelcomeScreen
            onStart={() =>
              goTo(Math.max(0, Math.min(furthest, PAGES.length - 1)), 1)
            }
          />
        </main>
      </div>
    );
  }

  if (isReview) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <StepSidebar
          currentIndex={index}
          completedPages={completedPages}
          furthest={furthest}
          onPageClick={(i) => goTo(i, -1)}
          savedState={savedState}
        />
        <main className="lg:pl-[300px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <ReviewScreen
                data={data}
                completedPages={completedPages}
                onEdit={handleEdit}
                onBack={handleBack}
                onComplete={handleComplete}
                submitting={submitting}
              />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    );
  }

  const page = currentPage!;
  const stageLabel = STAGE_LABELS[page.stageIndex] ?? page.stepId;
  const stepPageCount = PAGES.filter((p) => p.stepId === page.stepId).length;
  const stageFirstIndex = page.index - page.substepIndex;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StepSidebar
        currentIndex={index}
        completedPages={completedPages}
        furthest={furthest}
        onPageClick={(i) => goTo(i, i > index ? 1 : -1)}
        savedState={savedState}
      />

      <main className="lg:pl-[300px]">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepShell
              eyebrow={`${stageLabel} · ${index + 1} of ${PAGES.length}`}
              title={page.title}
              description={page.description}
              showBack={index > WELCOME_INDEX}
              onBack={handleBack}
              onContinue={handleContinue}
              continueLabel={
                isLastPageOfStep(index) ? "Review setup" : "Continue"
              }
              pips={{
                total: stepPageCount,
                current: page.substepIndex,
                onSelect: (i) =>
                  goTo(
                    stageFirstIndex + i,
                    i > page.substepIndex ? 1 : -1
                  ),
              }}
            >
              {currentStepId === "company" && (
                <CompanyIdentityStep
                  data={data}
                  update={update}
                  err={err}
                  touch={touch}
                  section={page.section}
                />
              )}
              {currentStepId === "locations" && (
                <LocationsOperationsStep
                  data={data}
                  update={update}
                  err={err}
                  touch={touch}
                  section={page.section}
                />
              )}
              {currentStepId === "reporting" && (
                <ReportingComplianceStep
                  data={data}
                  update={update}
                  err={err}
                  touch={touch}
                  section={page.section}
                />
              )}
              {currentStepId === "integrations" && (
                <DataIntegrationsStep
                  data={data}
                  update={update}
                  err={err}
                  touch={touch}
                  section={page.section}
                />
              )}
              {currentStepId === "emissions" && (
                <EmissionsProfileStep
                  data={data}
                  update={update}
                  err={err}
                  touch={touch}
                  section={page.section}
                />
              )}
              {currentStepId === "valueChain" && (
                <ValueChainStep
                  data={data}
                  update={update}
                  err={err}
                  touch={touch}
                  section={page.section}
                />
              )}
              {currentStepId === "strategy" && (
                <StrategyTeamStep
                  data={data}
                  update={update}
                  err={err}
                  touch={touch}
                  section={page.section}
                />
              )}
            </StepShell>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
