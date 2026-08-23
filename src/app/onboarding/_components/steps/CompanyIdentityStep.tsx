"use client";

import * as React from "react";
import { Building2, GitMerge, Landmark, Network } from "lucide-react";

import { Combobox } from "../combobox";
import { SelectableCards } from "../controls";
import { SelectField } from "../FormSelect";
import { Row, Section } from "../Section";
import { Field, FieldHelper, FieldLabel } from "../fields";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  EMPLOYEE_OPTIONS,
  INDUSTRIES,
  MONTHS,
  REVENUE_OPTIONS,
} from "../../_data/onboarding";
import type { OnboardingData, OnboardingKey } from "../../_types/onboarding";

interface StepProps {
  data: OnboardingData;
  update: <K extends OnboardingKey>(
    group: K,
    patch: Partial<OnboardingData[K]>
  ) => void;
  err: (field: string) => string | undefined;
  touch: (field: string) => void;
  section?: string;
}

const ORG_STRUCTURES = [
  {
    value: "single",
    label: "Single legal entity",
    description: "One company accounts for the entire footprint",
    icon: Building2,
  },
  {
    value: "multi",
    label: "Multiple entities / group",
    description: "Subsidiaries consolidated under a parent company",
    icon: Network,
  },
];

const CONSOLIDATION = [
  {
    value: "operational",
    label: "Operational control",
    description: "All operations where you have full control",
    icon: Landmark,
  },
  {
    value: "financial",
    label: "Financial control",
    description: "Entities you can direct financially",
    icon: GitMerge,
  },
  {
    value: "equity",
    label: "Equity share",
    description: "Ownership percentage across the group",
    icon: Building2,
  },
];

export function CompanyIdentityStep({
  data,
  update,
  err,
  touch,
  section,
}: StepProps) {
  const c = data.company;
  const industry = INDUSTRIES.find((i) => i.value === c.industry);
  const subsectors = industry?.subsectors ?? [];

  const sections: { id: string; node: React.ReactNode }[] = [
    {
      id: "identity",
      node: (
        <Section
          step="identity"
          title="Company identity"
          description="Basic details that anchor every report and disclosure we generate."
        >
          <Row>
            <Field>
              <FieldLabel htmlFor="legalName" required>
                Legal company name
              </FieldLabel>
              <Input
                id="legalName"
                value={c.legalName}
                onChange={(e) => update("company", { legalName: e.target.value })}
                onBlur={() => touch("legalName")}
                placeholder="e.g. Acme Corporation Ltd"
                aria-invalid={!!err("legalName")}
                autoComplete="organization"
              />
              <FieldHelper>
                Used on official filings, invoices and reporting documents.
              </FieldHelper>
            </Field>
            <Field>
              <FieldLabel htmlFor="brandName">Brand name</FieldLabel>
              <Input
                id="brandName"
                value={c.brandName}
                onChange={(e) => update("company", { brandName: e.target.value })}
                onBlur={() => touch("brandName")}
                placeholder="e.g. Acme"
                autoComplete="organization"
              />
              <FieldHelper>
                What your teams and customers call the company day to day.
              </FieldHelper>
            </Field>
          </Row>

          <Row>
            <Field>
              <FieldLabel htmlFor="registrationNumber">
                Registration number / Tax ID
              </FieldLabel>
              <Input
                id="registrationNumber"
                value={c.registrationNumber}
                onChange={(e) =>
                  update("company", { registrationNumber: e.target.value })
                }
                onBlur={() => touch("registrationNumber")}
                placeholder="e.g. 041 234 567"
                autoComplete="organization"
              />
              <FieldHelper>
                Helps us match your data to official registers where relevant.
              </FieldHelper>
            </Field>
            <Field>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <Input
                id="website"
                type="url"
                value={c.website}
                onChange={(e) => update("company", { website: e.target.value })}
                onBlur={() => touch("website")}
                placeholder="https://example.com"
                autoComplete="url"
              />
              <FieldHelper>
                We verify your public profile for benchmarks and disclosures.
              </FieldHelper>
            </Field>
          </Row>

          <Row>
            <Field>
              <FieldLabel required>Industry</FieldLabel>
              <Combobox
                id="industry"
                value={c.industry}
                onChange={(v) =>
                  update("company", { industry: v, subsector: "" })
                }
                onBlur={() => touch("industry")}
                options={INDUSTRIES.map((i) => ({
                  value: i.value,
                  label: i.label,
                }))}
                placeholder="Select industry"
                searchPlaceholder="Search industries…"
                error={err("industry")}
              />
              <FieldHelper>
                We tailor activity factors and benchmarks to your sector.
              </FieldHelper>
            </Field>
            {c.industry && c.industry !== "other" && subsectors.length > 0 && (
              <Field>
                <FieldLabel required>Subsector</FieldLabel>
                <Combobox
                  id="subsector"
                  value={c.subsector}
                  onChange={(v) => update("company", { subsector: v })}
                  onBlur={() => touch("subsector")}
                  options={subsectors.map((s) => ({
                    value: s.value,
                    label: s.label,
                  }))}
                  placeholder="Select subsector"
                  searchPlaceholder="Search subsectors…"
                  error={err("subsector")}
                />
                <FieldHelper>Refines the emission factors we apply.</FieldHelper>
              </Field>
            )}
            {c.industry === "other" && (
              <Field>
                <FieldLabel htmlFor="subsector-other">
                  What does your company do?
                </FieldLabel>
                <Input
                  id="subsector-other"
                  value={c.subsector}
                  onChange={(e) => update("company", { subsector: e.target.value })}
                  onBlur={() => touch("subsector")}
                  placeholder="e.g. Industrial cleaning services"
                />
                <FieldHelper>
                  This helps our team prepare the right emission factors.
                </FieldHelper>
              </Field>
            )}
          </Row>
        </Section>
      ),
    },
    {
      id: "structure",
      node: (
        <Section
          step="structure"
          title="Organizational structure"
          description="How your company is organized determines how emissions are consolidated."
        >
          <Field>
            <FieldLabel required>Organizational structure</FieldLabel>
            <SelectableCards
              id="orgStructure"
              value={c.orgStructure}
              onChange={(v) =>
                update("company", {
                  orgStructure: v as "single" | "multi",
                  ...(v !== "multi" ? { consolidationApproach: "" } : {}),
                })
              }
              options={ORG_STRUCTURES}
              error={err("orgStructure")}
            />
          </Field>

          {c.orgStructure === "multi" && (
            <Field>
              <FieldLabel required>Consolidation approach</FieldLabel>
              <SelectableCards
                id="consolidation"
                value={c.consolidationApproach}
                onChange={(v) => update("company", { consolidationApproach: v })}
                options={CONSOLIDATION}
                columns={3}
                error={err("consolidationApproach")}
              />
              <FieldHelper>
                The GHG Protocol offers these three approaches for group accounts.
              </FieldHelper>
            </Field>
          )}
        </Section>
      ),
    },
    {
      id: "size",
      node: (
        <Section
          step="size"
          title="Company size"
          description="Size inputs power intensity benchmarks and employee-based estimates."
        >
          <Row>
            <SelectField
              id="employeeCount"
              label="Employee count"
              required
              value={c.employeeCount}
              onChange={(v) => update("company", { employeeCount: v })}
              options={EMPLOYEE_OPTIONS.map((o) => ({ value: o, label: o }))}
              placeholder="Select range"
              helper="Used to estimate commuting and benchmark intensity."
              error={err("employeeCount")}
            />
            <SelectField
              id="annualRevenue"
              label="Annual revenue"
              required
              value={c.annualRevenue}
              onChange={(v) => update("company", { annualRevenue: v })}
              options={REVENUE_OPTIONS.map((o) => ({ value: o, label: o }))}
              placeholder="Select range"
              helper="Normalizes emissions intensity for peer comparison."
              error={err("annualRevenue")}
            />
          </Row>
          <Row>
            <SelectField
              id="fiscalYearEnd"
              label="Fiscal year end"
              required
              value={c.fiscalYearEnd}
              onChange={(v) => update("company", { fiscalYearEnd: v })}
              options={MONTHS.map((m) => ({ value: m, label: m }))}
              placeholder="Select month"
              helper="Aligns reporting periods with your financial calendar."
              error={err("fiscalYearEnd")}
            />
            <div className="flex items-end">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Label className="sr-only">Fiscal year</Label>
                <span className="rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-[0.8125rem]">
                  We&apos;ll apply the calendar year by default.
                </span>
              </p>
            </div>
          </Row>
        </Section>
      ),
    },
  ];

  return (
    <>
      {sections
        .filter((s) => !section || s.id === section)
        .map((s) => (
          <React.Fragment key={s.id}>{s.node}</React.Fragment>
        ))}
    </>
  );
}
