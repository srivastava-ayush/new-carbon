import type { OnboardingData, StepId } from "../_types/onboarding";
import { PAGE_BY_KEY, PAGE_FIELDS } from "./onboardingPages";

export type StepErrors = Partial<Record<string, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const STEPS: {
  id: StepId;
  label: string;
}[] = [
  { id: "company", label: "Company" },
  { id: "locations", label: "Operations" },
  { id: "reporting", label: "Compliance" },
  { id: "integrations", label: "Data" },
  { id: "emissions", label: "Emissions" },
  { id: "valueChain", label: "Value chain" },
  { id: "strategy", label: "Team" },
];

export const STEP_INDEX: Record<StepId, number> = {
  company: 0,
  locations: 1,
  reporting: 2,
  integrations: 3,
  emissions: 4,
  valueChain: 5,
  strategy: 6,
};

export function validateStep(
  step: StepId,
  data: OnboardingData
): StepErrors {
  switch (step) {
    case "company": {
      const errors: StepErrors = {};
      const c = data.company;
      if (!c.legalName.trim()) errors.legalName = "Enter your legal company name.";
      if (!c.industry) errors.industry = "Select an industry.";
      if (c.industry && c.industry !== "other") {
        const hasSubsectors =
          c.subsector || data.company.subsector;
        if (!hasSubsectors) errors.subsector = "Choose a subsector.";
      }
      if (!c.orgStructure) errors.orgStructure = "Select an organizational structure.";
      if (c.orgStructure === "multi" && !c.consolidationApproach)
        errors.consolidationApproach = "Select a consolidation approach.";
      if (!c.employeeCount) errors.employeeCount = "Select a range.";
      if (!c.annualRevenue) errors.annualRevenue = "Select a range.";
      if (!c.fiscalYearEnd) errors.fiscalYearEnd = "Select a month.";
      return errors;
    }
    case "locations": {
      const errors: StepErrors = {};
      const l = data.locations;
      if (!l.facilityCount) errors.facilityCount = "Select a range.";
      if (l.facilityCount !== "0 — no facilities" && l.countries.length === 0)
        errors.countries = "Select at least one country of operation.";
      if (l.facilityCount !== "0 — no facilities" && l.facilityTypes.length === 0)
        errors.facilityTypes = "Select at least one facility type.";
      if (l.facilityCount !== "0 — no facilities" && !l.ownershipStatus)
        errors.ownershipStatus = "Select an ownership status.";
      return errors;
    }
    case "reporting": {
      const errors: StepErrors = {};
      const r = data.reporting;
      if (!r.primaryReason) errors.primaryReason = "Select a primary reason.";
      if (r.frameworks.length === 0)
        errors.frameworks = "Select at least one framework.";
      if (!r.reportingType) errors.reportingType = "Select a reporting type.";
      if (!r.deadline) errors.deadline = "Select a deadline.";
      if (!r.previousReporting) errors.previousReporting = "Select an option.";
      if (!r.assurance) errors.assurance = "Select an assurance level.";
      if (r.audience.length === 0) errors.audience = "Select at least one audience.";
      return errors;
    }
    case "integrations": {
      const errors: StepErrors = {};
      const i = data.integrations;
      if (i.utilityBilling === "yes" && !i.utilityBillingMethod)
        errors.utilityBillingMethod = "Select how you'd like to share bills.";
      if (!i.dataInputMethod) errors.dataInputMethod = "Select a data input method.";
      if (!i.centralization) errors.centralization = "Select how data is managed.";
      return errors;
    }
    case "emissions": {
      const errors: StepErrors = {};
      const e = data.emissions;
      if (e.scope1Fuels.length === 0)
        errors.scope1Fuels = "Select at least one fuel or source.";
      if (!e.electricitySource) errors.electricitySource = "Select a source.";
      if (e.electricitySource !== "onsite-renewable" && !e.recs)
        errors.recs = "Select an option.";
      if (!e.steam) errors.steam = "Select an option.";
      return errors;
    }
    case "valueChain": {
      const errors: StepErrors = {};
      const v = data.valueChain;
      if (!v.supplierData) errors.supplierData = "Select an option.";
      if (!v.commuting) errors.commuting = "Select an option.";
      if (!v.businessTravel) errors.businessTravel = "Select an option.";
      if (!v.logisticsOwnership) errors.logisticsOwnership = "Select an option.";
      if (!v.waste) errors.waste = "Select an option.";
      if (!v.physicalProducts) errors.physicalProducts = "Select an option.";
      return errors;
    }
    case "strategy": {
      const errors: StepErrors = {};
      const s = data.strategy;
      if (!s.targets) errors.targets = "Select an option.";
      if (s.targets !== "none") {
        if (!s.targetYear) errors.targetYear = "Enter a target year.";
        if (s.targetYear && (isNaN(Number(s.targetYear)) || Number(s.targetYear) < 2026 || Number(s.targetYear) > 2100))
          errors.targetYear = "Enter a year between 2026 and 2100.";
        if (!s.reduction) errors.reduction = "Enter a target percentage.";
        if (s.reduction && (isNaN(Number(s.reduction)) || Number(s.reduction) <= 0 || Number(s.reduction) > 100))
          errors.reduction = "Enter a percentage between 1 and 100.";
      }
      if (!s.role) errors.role = "Select your role.";
      if (s.teammateEmails.trim()) {
        const emails = s.teammateEmails
          .split(/[\s,;]+/)
          .map((e) => e.trim())
          .filter(Boolean);
        const invalid = emails.filter((e) => !EMAIL_RE.test(e));
        if (invalid.length > 0)
          errors.teammateEmails = `Check these emails: ${invalid.join(", ")}`;
      }
      if (!s.primaryContact.trim()) errors.primaryContact = "Enter a primary contact name.";
      if (!s.contactEmail.trim()) errors.contactEmail = "Enter a contact email.";
      else if (!EMAIL_RE.test(s.contactEmail.trim()))
        errors.contactEmail = "Enter a valid email address.";
      return errors;
    }
    default:
      return {};
  }
}

export function hasFilledValues(data: OnboardingData, step: StepId): boolean {
  const group = data[step];
  return Object.values(group).some((v) =>
    Array.isArray(v) ? v.length > 0 : Boolean(v)
  );
}

export function validatePage(
  pageKey: string,
  data: OnboardingData
): StepErrors {
  const page = PAGE_BY_KEY[pageKey];
  if (!page) return {};
  const fields = PAGE_FIELDS[pageKey] ?? [];
  const all = validateStep(page.stepId, data);
  const errors: StepErrors = {};
  for (const f of fields) {
    if (all[f]) errors[f] = all[f];
  }
  return errors;
}
