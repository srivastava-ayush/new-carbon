export interface CompanyIdentity {
  legalName: string;
  brandName: string;
  registrationNumber: string;
  industry: string;
  subsector: string;
  website: string;
  orgStructure: "single" | "multi" | "";
  consolidationApproach: string;
  employeeCount: string;
  annualRevenue: string;
  fiscalYearEnd: string;
}

export interface LocationsOperations {
  facilityCount: string;
  countries: string[];
  facilityTypes: string[];
  ownershipStatus: string;
  floorArea: string;
  vehicles: string;
  onSiteEnergy: string[];
}

export interface ReportingCompliance {
  primaryReason: string;
  frameworks: string[];
  reportingType: string;
  deadline: string;
  previousReporting: string;
  assurance: string;
  audience: string[];
}

export interface DataIntegrations {
  erp: string;
  accounting: string;
  utilityBilling: "yes" | "no" | "";
  utilityBillingMethod: string;
  fleet: string;
  travel: string;
  procurement: string;
  iot: string[];
  dataInputMethod: string;
  centralization: string;
}

export interface EmissionsProfile {
  scope1Fuels: string[];
  refrigerants: string[];
  electricitySource: string;
  recs: string;
  steam: string;
}

export interface ValueChain {
  supplierData: string;
  spendCategories: string[];
  commuting: string;
  businessTravel: string;
  logisticsOwnership: string;
  waste: string;
  cloudProviders: string[];
  physicalProducts: "yes" | "no" | "";
  franchises: string;
  leasedAssets: string;
  investments: string;
}

export interface StrategyTeam {
  targets: string;
  targetYear: string;
  reduction: string;
  commitments: string[];
  carbonCredits: string;
  role: string;
  teammateEmails: string;
  workflows: string[];
  primaryContact: string;
  contactEmail: string;
}

export interface OnboardingData {
  company: CompanyIdentity;
  locations: LocationsOperations;
  reporting: ReportingCompliance;
  integrations: DataIntegrations;
  emissions: EmissionsProfile;
  valueChain: ValueChain;
  strategy: StrategyTeam;
}

export type OnboardingKey = keyof OnboardingData;

export type StepId =
  | "company"
  | "locations"
  | "reporting"
  | "integrations"
  | "emissions"
  | "valueChain"
  | "strategy";

export interface StepMeta {
  id: StepId;
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
}
