import type { OnboardingData, StepId } from "../_types/onboarding";

export interface SummaryItem {
  label: string;
  value: string;
  skip?: boolean;
}

export function stepSummary(
  step: StepId,
  data: OnboardingData
): SummaryItem[] {  switch (step) {
    case "company": {
      const c = data.company;
      const out: SummaryItem[] = [
        { label: "Legal name", value: c.legalName },
        { label: "Brand name", value: c.brandName },
        { label: "Registration / Tax ID", value: c.registrationNumber },
        {
          label: "Industry",
          value: c.industry
            ? (c.industry === "other" ? "Other" : c.industry.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" "))
            : "",
        },
        { label: "Subsector", value: c.subsector },
        { label: "Website", value: c.website },
        {
          label: "Structure",
          value: c.orgStructure === "multi" ? "Multiple entities / group" : c.orgStructure === "single" ? "Single legal entity" : "",
        },
        {
          label: "Consolidation",
          value: c.orgStructure === "multi" ? c.consolidationApproach : "",
          skip: c.orgStructure !== "multi",
        },
        { label: "Employees", value: c.employeeCount },
        { label: "Revenue", value: c.annualRevenue },
        { label: "Fiscal year end", value: c.fiscalYearEnd },
      ];
      return out.filter((i) => !i.skip);
    }
    case "locations": {
      const l = data.locations;
      return [
        { label: "Facilities", value: l.facilityCount },
        { label: "Countries", value: l.countries.join(" · ") },
        { label: "Facility types", value: l.facilityTypes.join(" · ") },
        { label: "Ownership", value: l.ownershipStatus },
        { label: "Floor area", value: l.floorArea },
        { label: "Company vehicles", value: l.vehicles },
        { label: "On-site generation", value: l.onSiteEnergy.join(" · ") },
      ];
    }
    case "reporting": {
      const r = data.reporting;
      return [
        { label: "Primary reason", value: r.primaryReason },
        { label: "Frameworks", value: r.frameworks.join(" · ") },
        { label: "Reporting type", value: r.reportingType },
        { label: "Deadline", value: r.deadline },
        { label: "Previous reporting", value: r.previousReporting },
        { label: "Assurance", value: r.assurance },
        { label: "Audience", value: r.audience.join(" · ") },
      ];
    }
    case "integrations": {
      const i = data.integrations;
      return [
        { label: "ERP", value: i.erp },
        { label: "Accounting", value: i.accounting },
        { label: "Utility billing access", value: i.utilityBilling === "yes" ? "Yes" : i.utilityBilling === "no" ? "Not yet" : "" },
        {
          label: "Billing method",
          value: i.utilityBillingMethod,
          skip: i.utilityBilling !== "yes",
        },
        { label: "Fleet", value: i.fleet },
        { label: "Travel", value: i.travel },
        { label: "Procurement", value: i.procurement },
        { label: "IoT / Smart meters", value: i.iot.join(" · ") },
        { label: "Input method", value: i.dataInputMethod },
        { label: "Data management", value: i.centralization },
      ].filter((x) => !x.skip);
    }
    case "emissions": {
      const e = data.emissions;
      return [
        { label: "Scope 1 fuels", value: e.scope1Fuels.join(" · ") },
        { label: "Refrigerants", value: e.refrigerants.join(" · ") },
        { label: "Electricity source", value: e.electricitySource },
        { label: "RECs / EACs", value: e.recs, skip: e.electricitySource === "onsite-renewable" },
        { label: "Steam / heating", value: e.steam },
      ].filter((x) => !x.skip);
    }
    case "valueChain": {
      const v = data.valueChain;
      return [
        { label: "Supplier data", value: v.supplierData },
        { label: "Spend categories", value: v.spendCategories.join(" · ") },
        { label: "Commuting", value: v.commuting },
        { label: "Business travel", value: v.businessTravel },
        { label: "Logistics", value: v.logisticsOwnership },
        { label: "Waste", value: v.waste },
        { label: "Cloud providers", value: v.cloudProviders.join(" · ") },
        { label: "Physical products", value: v.physicalProducts === "yes" ? "Yes" : v.physicalProducts === "no" ? "No" : "" },
        { label: "Franchises", value: v.franchises },
        { label: "Leased assets", value: v.leasedAssets },
        { label: "Investments", value: v.investments },
      ];
    }
    case "strategy": {
      const s = data.strategy;
      const out: SummaryItem[] = [
        { label: "Reduction targets", value: s.targets },
        {
          label: "Target year",
          value: s.targets === "none" ? "" : s.targetYear,
          skip: s.targets === "none",
        },
        {
          label: "Reduction",
          value: s.targets === "none" ? "" : s.reduction ? `${s.reduction}%` : "",
          skip: s.targets === "none",
        },
        { label: "Commitments", value: s.commitments.join(" · ") },
        { label: "Carbon credits", value: s.carbonCredits },
        { label: "Your role", value: s.role },
        {
          label: "Teammates",
          value: s.teammateEmails
            .split(/[\s,;]+/)
            .filter(Boolean)
            .join(" · "),
        },
        { label: "Workflows", value: s.workflows.join(" · ") },
        { label: "Contact", value: s.primaryContact || s.contactEmail },
        { label: "Contact email", value: s.contactEmail },
      ];
      return out.filter((i) => !i.skip);
    }
  }
}

export function pageSummary(
  pageKey: string,
  data: OnboardingData
): SummaryItem[] {
  const c = data.company;
  const l = data.locations;
  const r = data.reporting;
  const i = data.integrations;
  const e = data.emissions;
  const v = data.valueChain;
  const s = data.strategy;

  switch (pageKey) {
    case "company-identity":
      return [
        { label: "Legal name", value: c.legalName },
        { label: "Brand name", value: c.brandName },
        { label: "Registration / Tax ID", value: c.registrationNumber },
        {
          label: "Industry",
          value: c.industry
            ? c.industry === "other"
              ? "Other"
              : c.industry
                  .split("-")
                  .map((w) => w[0]?.toUpperCase() + w.slice(1))
                  .join(" ")
            : "",
        },
        { label: "Subsector", value: c.subsector },
        { label: "Website", value: c.website },
      ];
    case "company-organization":
      return [
        {
          label: "Structure",
          value:
            c.orgStructure === "multi"
              ? "Multiple entities / group"
              : c.orgStructure === "single"
                ? "Single legal entity"
                : "",
        },
        {
          label: "Consolidation",
          value: c.orgStructure === "multi" ? c.consolidationApproach : "",
          skip: c.orgStructure !== "multi",
        },
      ].filter((x) => !x.skip);
    case "company-financials":
      return [
        { label: "Employees", value: c.employeeCount },
        { label: "Revenue", value: c.annualRevenue },
        { label: "Fiscal year end", value: c.fiscalYearEnd },
      ];
    case "locations-facilities":
      return [
        { label: "Facilities", value: l.facilityCount },
        { label: "Countries", value: l.countries.join(" · ") },
        { label: "Facility types", value: l.facilityTypes.join(" · ") },
        { label: "Ownership", value: l.ownershipStatus },
        { label: "Floor area", value: l.floorArea },
      ];
    case "locations-operations":
      return [
        { label: "Company vehicles", value: l.vehicles },
        { label: "On-site generation", value: l.onSiteEnergy.join(" · ") },
      ];
    case "reporting-purpose":
      return [{ label: "Primary reason", value: r.primaryReason }];
    case "reporting-frameworks":
      return [
        { label: "Frameworks", value: r.frameworks.join(" · ") },
        { label: "Reporting type", value: r.reportingType },
        { label: "Deadline", value: r.deadline },
      ];
    case "reporting-history":
      return [
        { label: "Previous reporting", value: r.previousReporting },
        { label: "Assurance", value: r.assurance },
      ];
    case "reporting-audience":
      return [{ label: "Audience", value: r.audience.join(" · ") }];
    case "integrations-systems":
      return [
        { label: "ERP", value: i.erp },
        { label: "Accounting", value: i.accounting },
        { label: "Fleet", value: i.fleet },
        { label: "Travel", value: i.travel },
        { label: "Procurement", value: i.procurement },
        { label: "IoT / Smart meters", value: i.iot.join(" · ") },
      ];
    case "integrations-utility":
      return [
        {
          label: "Utility billing access",
          value:
            i.utilityBilling === "yes"
              ? "Yes"
              : i.utilityBilling === "no"
                ? "Not yet"
                : "",
        },
        {
          label: "Billing method",
          value: i.utilityBillingMethod,
          skip: i.utilityBilling !== "yes",
        },
      ].filter((x) => !x.skip);
    case "integrations-preferences":
      return [
        { label: "Input method", value: i.dataInputMethod },
        { label: "Data management", value: i.centralization },
      ];
    case "emissions-scope1":
      return [
        { label: "Scope 1 fuels", value: e.scope1Fuels.join(" · ") },
        { label: "Refrigerants", value: e.refrigerants.join(" · ") },
      ];
    case "emissions-scope2":
      return [
        { label: "Electricity source", value: e.electricitySource },
        {
          label: "RECs / EACs",
          value: e.recs,
          skip: e.electricitySource === "onsite-renewable",
        },
        { label: "Steam / heating", value: e.steam },
      ].filter((x) => !x.skip);
    case "valuechain-suppliers":
      return [
        { label: "Supplier data", value: v.supplierData },
        { label: "Spend categories", value: v.spendCategories.join(" · ") },
      ];
    case "valuechain-travel":
      return [
        { label: "Commuting", value: v.commuting },
        { label: "Business travel", value: v.businessTravel },
      ];
    case "valuechain-logistics":
      return [
        { label: "Logistics", value: v.logisticsOwnership },
        { label: "Waste", value: v.waste },
      ];
    case "valuechain-digital":
      return [{ label: "Cloud providers", value: v.cloudProviders.join(" · ") }];
    case "valuechain-products":
      return [
        {
          label: "Physical products",
          value:
            v.physicalProducts === "yes"
              ? "Yes"
              : v.physicalProducts === "no"
                ? "No"
                : "",
        },
        { label: "Franchises", value: v.franchises },
        { label: "Leased assets", value: v.leasedAssets },
        { label: "Investments", value: v.investments },
      ];
    case "strategy-targets": {
      const out: SummaryItem[] = [
        { label: "Reduction targets", value: s.targets },
        {
          label: "Target year",
          value: s.targets === "none" ? "" : s.targetYear,
          skip: s.targets === "none",
        },
        {
          label: "Reduction",
          value:
            s.targets === "none"
              ? ""
              : s.reduction
                ? `${s.reduction}%`
                : "",
          skip: s.targets === "none",
        },
        { label: "Commitments", value: s.commitments.join(" · ") },
        { label: "Carbon credits", value: s.carbonCredits },
      ];
      return out.filter((x) => !x.skip);
    }
    case "strategy-team":
      return [
        { label: "Your role", value: s.role },
        {
          label: "Teammates",
          value: s.teammateEmails
            .split(/[\s,;]+/)
            .filter(Boolean)
            .join(" · "),
        },
        { label: "Workflows", value: s.workflows.join(" · ") },
      ];
    case "strategy-contact":
      return [
        { label: "Contact", value: s.primaryContact },
        { label: "Contact email", value: s.contactEmail },
      ];
    default:
      return [];
  }
}
