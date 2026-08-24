"use client";

import * as React from "react";
import {
  Award,
  CalendarClock,
  CircleCheck,
  FileSearch,
  Scale,
  Target,
} from "lucide-react";

import { ChipMultiSelect } from "../chips";
import { SelectableCards } from "../controls";
import { SelectField } from "../FormSelect";
import { Row, Section } from "../Section";
import { Field, FieldHelper, FieldLabel } from "../fields";
import {
  ASSURANCE_OPTIONS,
  PREVIOUS_REPORTING_OPTIONS,
  PRIMARY_REASONS,
  REPORTING_AUDIENCES,
  REPORTING_FRAMEWORKS,
  REPORTING_TYPES,
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

const REASON_ICONS = [Target, Award, CircleCheck, Scale, FileSearch, CalendarClock];

const DEADLINES = [
  { value: "3-months", label: "Within 3 months" },
  { value: "6-months", label: "Within 6 months" },
  { value: "this-year", label: "This calendar year" },
  { value: "next-year", label: "Next year or later" },
  { value: "undecided", label: "Not sure yet" },
];

export function ReportingComplianceStep({
  data,
  update,
  err,
  section,
}: StepProps) {
  const r = data.reporting;

  const sections: { id: string; node: React.ReactNode }[] = [
    {
      id: "purpose",
      node: (
        <Section
          step="purpose"
          title="Your reporting purpose"
          description="Why you're here shapes the report templates and workflow we configure."
        >
          <Field>
            <FieldLabel required>Primary reason for using CarbonSynq</FieldLabel>
            <SelectableCards
              id="primaryReason"
              value={r.primaryReason}
              onChange={(v) => update("reporting", { primaryReason: v })}
              options={PRIMARY_REASONS.map((o, i) => ({
                ...o,
                icon: REASON_ICONS[i] ?? Target,
              }))}
              error={err("primaryReason")}
            />
          </Field>
        </Section>
      ),
    },
    {
      id: "frameworks",
      node: (
        <Section
          step="frameworks"
          title="Frameworks & type"
          description="We map every data point to the standards you disclose against."
        >
          <Field>
            <FieldLabel required>Reporting frameworks</FieldLabel>
            <ChipMultiSelect
              id="frameworks"
              value={r.frameworks}
              onChange={(v) => update("reporting", { frameworks: v })}
              options={REPORTING_FRAMEWORKS.map((f) => ({ value: f, label: f }))}
              error={err("frameworks")}
            />
            <FieldHelper>
              Select all that apply — including any you&apos;re preparing for.
            </FieldHelper>
          </Field>

          <Field>
            <FieldLabel required>Reporting type</FieldLabel>
            <SelectableCards
              id="reportingType"
              value={r.reportingType}
              onChange={(v) => update("reporting", { reportingType: v })}
              options={REPORTING_TYPES}
              columns={2}
              error={err("reportingType")}
            />
          </Field>

          <SelectField
            id="deadline"
            label="When do you need your first report?"
            required
            value={r.deadline}
            onChange={(v) => update("reporting", { deadline: v })}
            options={DEADLINES}
            placeholder="Select a timeframe"
            helper="We sequence your onboarding so you hit the date comfortably."
            error={err("deadline")}
          />
        </Section>
      ),
    },
    {
      id: "history",
      node: (
        <Section
          step="history"
          title="Reporting history"
          description="Let us know where you're starting from so we can import or rebuild sensibly."
        >
          <Field>
            <FieldLabel required>Previous emissions reporting</FieldLabel>
            <SelectableCards
              id="previousReporting"
              value={r.previousReporting}
              onChange={(v) => update("reporting", { previousReporting: v })}
              options={PREVIOUS_REPORTING_OPTIONS}
              error={err("previousReporting")}
            />
          </Field>

          <Field>
            <FieldLabel required>External assurance</FieldLabel>
            <SelectableCards
              id="assurance"
              value={r.assurance}
              onChange={(v) => update("reporting", { assurance: v })}
              options={ASSURANCE_OPTIONS}
              columns={3}
              error={err("assurance")}
            />
            <FieldHelper>
              If you plan a reasonable-assurance audit, we build the evidence trail
              from day one.
            </FieldHelper>
          </Field>
        </Section>
      ),
    },
    {
      id: "audience",
      node: (
        <Section
          step="audience"
          title="Audience"
          description="Who will read your reporting helps us pick the right depth and tone."
        >
          <Row>
            <Field>
              <FieldLabel required>Reporting audience</FieldLabel>
              <ChipMultiSelect
                id="audience"
                value={r.audience}
                onChange={(v) => update("reporting", { audience: v })}
                options={REPORTING_AUDIENCES.map((a) => ({ value: a, label: a }))}
                error={err("audience")}
              />
            </Field>
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
