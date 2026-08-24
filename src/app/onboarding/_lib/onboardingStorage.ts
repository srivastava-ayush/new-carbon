import type { OnboardingData, StepId } from "../_types/onboarding";
import { getStorageItem, setStorageItem } from "@/lib/storage";

export const ONBOARDING_STORAGE_KEY = "carbonsynq_onboarding_v1";

export const EMPTY_ONBOARDING: OnboardingData = {
  company: {
    legalName: "",
    brandName: "",
    registrationNumber: "",
    industry: "",
    subsector: "",
    website: "",
    orgStructure: "",
    consolidationApproach: "",
    employeeCount: "",
    annualRevenue: "",
    fiscalYearEnd: "",
  },
  locations: {
    facilityCount: "",
    countries: [],
    facilityTypes: [],
    ownershipStatus: "",
    floorArea: "",
    vehicles: "",
    onSiteEnergy: [],
  },
  reporting: {
    primaryReason: "",
    frameworks: [],
    reportingType: "",
    deadline: "",
    previousReporting: "",
    assurance: "",
    audience: [],
  },
  integrations: {
    erp: "",
    accounting: "",
    utilityBilling: "",
    utilityBillingMethod: "",
    fleet: "",
    travel: "",
    procurement: "",
    iot: [],
    dataInputMethod: "",
    centralization: "",
  },
  emissions: {
    scope1Fuels: [],
    refrigerants: [],
    electricitySource: "",
    recs: "",
    steam: "",
  },
  valueChain: {
    supplierData: "",
    spendCategories: [],
    commuting: "",
    businessTravel: "",
    logisticsOwnership: "",
    waste: "",
    cloudProviders: [],
    physicalProducts: "",
    franchises: "",
    leasedAssets: "",
    investments: "",
  },
  strategy: {
    targets: "",
    targetYear: "",
    reduction: "",
    commitments: [],
    carbonCredits: "",
    role: "",
    teammateEmails: "",
    workflows: [],
    primaryContact: "",
    contactEmail: "",
  },
};

export interface OnboardingPersistence {
  data: OnboardingData;
  currentPageKey?: string;
  completedPages?: string[];
  finished?: boolean;
  currentStep?: StepId;
  completedSteps?: StepId[];
}

export function loadOnboarding(): OnboardingPersistence | null {
  return getStorageItem<OnboardingPersistence>(ONBOARDING_STORAGE_KEY);
}

export function saveOnboarding(persistence: OnboardingPersistence): void {
  setStorageItem(ONBOARDING_STORAGE_KEY, persistence);
}

export function clearOnboarding(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ONBOARDING_STORAGE_KEY);
}
