import type { StepId } from "../_types/onboarding";

export interface OnboardingPage {
  key: string;
  stepId: StepId;
  index: number;
  stageIndex: number;
  substepIndex: number;
  title: string;
  description: string;
  section: string;
}

interface PageSeed {
  key: string;
  stepId: StepId;
  section: string;
  title: string;
  description: string;
}

export const STAGE_LABELS: string[] = [
  "Welcome",
  "Company",
  "Operations",
  "Compliance",
  "Data",
  "Emissions",
  "Value chain",
  "Team",
];

const SEEDS: PageSeed[] = [
  {
    key: "company-identity",
    stepId: "company",
    section: "identity",
    title: "Company identity",
    description:
      "Basic details that anchor every report and disclosure we generate.",
  },
  {
    key: "company-organization",
    stepId: "company",
    section: "structure",
    title: "Organization",
    description:
      "How your company is organized determines how emissions are consolidated.",
  },
  {
    key: "company-financials",
    stepId: "company",
    section: "size",
    title: "Financials",
    description:
      "Size inputs power intensity benchmarks and employee-based estimates.",
  },
  {
    key: "locations-facilities",
    stepId: "locations",
    section: "facilities",
    title: "Facilities",
    description:
      "Your physical footprint is the backbone of Scope 1 and 2 reporting.",
  },
  {
    key: "locations-operations",
    stepId: "locations",
    section: "operations",
    title: "Operations & energy",
    description:
      "Fleet and on-site generation feed into your Scope 1 and Scope 2 totals.",
  },
  {
    key: "reporting-purpose",
    stepId: "reporting",
    section: "purpose",
    title: "Reporting purpose",
    description:
      "Why you're here shapes the report templates and workflow we configure.",
  },
  {
    key: "reporting-frameworks",
    stepId: "reporting",
    section: "frameworks",
    title: "Frameworks & type",
    description: "We map every data point to the standards you disclose against.",
  },
  {
    key: "reporting-history",
    stepId: "reporting",
    section: "history",
    title: "Reporting history",
    description:
      "Let us know where you're starting from so we can import or rebuild sensibly.",
  },
  {
    key: "reporting-audience",
    stepId: "reporting",
    section: "audience",
    title: "Audience",
    description:
      "Who will read your reporting helps us pick the right depth and tone.",
  },
  {
    key: "integrations-systems",
    stepId: "integrations",
    section: "systems",
    title: "Source systems",
    description:
      "Connect the systems that already hold your activity data. Nothing is required.",
  },
  {
    key: "integrations-utility",
    stepId: "integrations",
    section: "utility",
    title: "Utility data",
    description:
      "Access to utility billing is the fastest path to accurate Scope 2.",
  },
  {
    key: "integrations-preferences",
    stepId: "integrations",
    section: "preferences",
    title: "Data preferences",
    description: "How you want data to flow into the workspace.",
  },
  {
    key: "emissions-scope1",
    stepId: "emissions",
    section: "scope1",
    title: "Scope 1",
    description: "Fuel you burn and gases you release on site.",
  },
  {
    key: "emissions-scope2",
    stepId: "emissions",
    section: "scope2",
    title: "Scope 2",
    description: "Electricity and heat you buy from outside your boundary.",
  },
  {
    key: "valuechain-suppliers",
    stepId: "valueChain",
    section: "suppliers",
    title: "Suppliers & spend",
    description: "Scope 3, category 1 — often the largest part of a footprint.",
  },
  {
    key: "valuechain-travel",
    stepId: "valueChain",
    section: "travel",
    title: "Travel & commuting",
    description: "Employee mobility is usually Scope 3, categories 6 and 7.",
  },
  {
    key: "valuechain-logistics",
    stepId: "valueChain",
    section: "logistics",
    title: "Logistics & waste",
    description: "Transportation and end-of-life of what you make and buy.",
  },
  {
    key: "valuechain-digital",
    stepId: "valueChain",
    section: "digital",
    title: "Digital footprint",
    description: "Cloud infrastructure is a fast-growing Scope 3 category.",
  },
  {
    key: "valuechain-products",
    stepId: "valueChain",
    section: "products",
    title: "Products & structures",
    description:
      "Franchise, leasing and investment structures extend your boundary.",
  },
  {
    key: "strategy-targets",
    stepId: "strategy",
    section: "targets",
    title: "Reduction targets",
    description:
      "Your ambition level shapes the dashboards and alerts we set up.",
  },
  {
    key: "strategy-team",
    stepId: "strategy",
    section: "team",
    title: "Team setup",
    description: "Get the right people into the workspace from day one.",
  },
  {
    key: "strategy-contact",
    stepId: "strategy",
    section: "contact",
    title: "Primary contact",
    description:
      "Who should we reach out to for clarifications and account setup?",
  },
];

const STEP_STAGE: Record<StepId, number> = {
  company: 1,
  locations: 2,
  reporting: 3,
  integrations: 4,
  emissions: 5,
  valueChain: 6,
  strategy: 7,
};

function buildPages(): OnboardingPage[] {
  const counters: Record<string, number> = {};
  return SEEDS.map((seed, index) => {
    const stageKey = seed.stepId;
    const substepIndex = counters[stageKey] ?? 0;
    counters[stageKey] = substepIndex + 1;
    return {
      key: seed.key,
      stepId: seed.stepId,
      index,
      stageIndex: STEP_STAGE[seed.stepId],
      substepIndex,
      title: seed.title,
      description: seed.description,
      section: seed.section,
    };
  });
}

export const PAGES: OnboardingPage[] = buildPages();

export const PAGE_INDEX: Record<string, number> = Object.fromEntries(
  PAGES.map((p, i) => [p.key, i])
);

export const PAGE_BY_KEY: Record<string, OnboardingPage> = Object.fromEntries(
  PAGES.map((p) => [p.key, p])
);

export const STEPS_ORDER: StepId[] = [
  "company",
  "locations",
  "reporting",
  "integrations",
  "emissions",
  "valueChain",
  "strategy",
];

export const STEP_PAGE_RANGES: Record<StepId, { start: number; end: number }> =
  STEPS_ORDER.reduce((acc, stepId) => {
    const indexes = PAGES.map((p, i) => ({ p, i }))
      .filter(({ p }) => p.stepId === stepId)
      .map(({ i }) => i);
    acc[stepId] = {
      start: indexes[0],
      end: indexes[indexes.length - 1],
    };
    return acc;
  }, {} as Record<StepId, { start: number; end: number }>);

export const STAGE_FIRST_PAGE: Record<number, number> = PAGES.reduce(
  (acc, p, i) => {
    if (!(p.stageIndex in acc)) acc[p.stageIndex] = i;
    return acc;
  },
  {} as Record<number, number>
);

export function isLastPageOfStep(pageIndex: number): boolean {
  const page = PAGES[pageIndex];
  if (!page) return false;
  return STEP_PAGE_RANGES[page.stepId].end === pageIndex;
}

export function isFirstPageOfStep(pageIndex: number): boolean {
  const page = PAGES[pageIndex];
  if (!page) return false;
  return STEP_PAGE_RANGES[page.stepId].start === pageIndex;
}

export function pageIndexForStep(stepId: StepId): number {
  return STEP_PAGE_RANGES[stepId].start;
}

export const PAGE_FIELDS: Record<string, string[]> = {
  "company-identity": ["legalName", "industry", "subsector"],
  "company-organization": ["orgStructure", "consolidationApproach"],
  "company-financials": ["employeeCount", "annualRevenue", "fiscalYearEnd"],
  "locations-facilities": ["facilityCount", "countries", "facilityTypes", "ownershipStatus"],
  "locations-operations": [],
  "reporting-purpose": ["primaryReason"],
  "reporting-frameworks": ["frameworks", "reportingType", "deadline"],
  "reporting-history": ["previousReporting", "assurance"],
  "reporting-audience": ["audience"],
  "integrations-systems": [],
  "integrations-utility": ["utilityBillingMethod"],
  "integrations-preferences": ["dataInputMethod", "centralization"],
  "emissions-scope1": ["scope1Fuels"],
  "emissions-scope2": ["electricitySource", "recs", "steam"],
  "valuechain-suppliers": ["supplierData"],
  "valuechain-travel": ["commuting", "businessTravel"],
  "valuechain-logistics": ["logisticsOwnership", "waste"],
  "valuechain-digital": [],
  "valuechain-products": ["physicalProducts"],
  "strategy-targets": ["targets", "targetYear", "reduction"],
  "strategy-team": ["role", "teammateEmails"],
  "strategy-contact": ["primaryContact", "contactEmail"],
};
