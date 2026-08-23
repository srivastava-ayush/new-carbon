"use client";

import * as React from "react";
import { Award, Leaf, Target, TreePine } from "lucide-react";

import { ChipMultiSelect } from "../chips";
import { SelectableCards } from "../controls";
import { SelectField } from "../FormSelect";
import { Row, Section } from "../Section";
import { Field, FieldError, FieldHelper, FieldLabel } from "../fields";
import { Input } from "@/components/ui/input";
import {
  CARBON_CREDIT_OPTIONS,
  COMMITMENTS,
  TARGET_OPTIONS,
  USER_ROLES,
  WORKFLOWS,
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

export function StrategyTeamStep({
  data,
  update,
  err,
  touch,
  section,
}: StepProps) {
  const s = data.strategy;
  const hasTarget = s.targets !== "" && s.targets !== "none";

  const sections: { id: string; node: React.ReactNode }[] = [
    {
      id: "targets",
      node: (
        <Section
          step="targets"
          title="Reduction targets"
          description="Your ambition level shapes the dashboards and alerts we set up."
        >
          <Field>
            <FieldLabel required>Emissions reduction targets</FieldLabel>
            <SelectableCards
              id="targets"
              value={s.targets}
              onChange={(v) =>
                update("strategy", {
                  targets: v,
                  ...(v === "none" ? { targetYear: "", reduction: "" } : {}),
                })
              }
              options={[
                { ...TARGET_OPTIONS[0], icon: TreePine },
                { ...TARGET_OPTIONS[1], icon: Target },
                { ...TARGET_OPTIONS[2], icon: Award },
              ]}
              error={err("targets")}
            />
          </Field>

          {hasTarget && (
            <Row>
              <Field>
                <FieldLabel htmlFor="targetYear" required>
                  Target year
                </FieldLabel>
                <Input
                  id="targetYear"
                  inputMode="numeric"
                  placeholder="e.g. 2030"
                  value={s.targetYear}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
                    update("strategy", { targetYear: v });
                  }}
                  onBlur={() => touch("targetYear")}
                  aria-invalid={!!err("targetYear")}
                />
                {err("targetYear") ? (
                  <FieldError message={err("targetYear")} />
                ) : (
                  <FieldHelper>
                    The year you commit to reaching this target.
                  </FieldHelper>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="reduction" required>
                  Reduction vs. baseline
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="reduction"
                    inputMode="numeric"
                    placeholder="e.g. 42"
                    value={s.reduction}
                    onChange={(e) =>
                      update("strategy", {
                        reduction: e.target.value.replace(/[^\d.]/g, "").slice(0, 3),
                      })
                    }
                    onBlur={() => touch("reduction")}
                    aria-invalid={!!err("reduction")}
                    className="pr-8"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
                {err("reduction") ? (
                  <FieldError message={err("reduction")} />
                ) : (
                  <FieldHelper>Percent reduction from your baseline year.</FieldHelper>
                )}
              </Field>
            </Row>
          )}

          <Field>
            <FieldLabel>Climate commitments</FieldLabel>
            <ChipMultiSelect
              id="commitments"
              value={s.commitments}
              onChange={(v) => update("strategy", { commitments: v })}
              options={COMMITMENTS.map((c) => ({ value: c, label: c }))}
            />
            <FieldHelper>
              We align reporting and targets with the pledges you&apos;ve made.
            </FieldHelper>
          </Field>

          <Field>
            <FieldLabel required>Carbon credits & offsets</FieldLabel>
            <SelectableCards
              id="carbonCredits"
              value={s.carbonCredits}
              onChange={(v) => update("strategy", { carbonCredits: v })}
              options={CARBON_CREDIT_OPTIONS.map((o) => ({ ...o, icon: Leaf }))}
              columns={3}
              error={err("carbonCredits")}
            />
          </Field>
        </Section>
      ),
    },
    {
      id: "team",
      node: (
        <Section
          step="team"
          title="Team setup"
          description="Get the right people into the workspace from day one."
        >
          <SelectField
            id="role"
            label="Your role"
            required
            value={s.role}
            onChange={(v) => update("strategy", { role: v })}
            options={USER_ROLES.map((r) => ({ value: r, label: r }))}
            placeholder="Select your role"
            helper="We tailor defaults and permissions to your function."
            error={err("role")}
          />

          <Field>
            <FieldLabel htmlFor="teammateEmails">
              Invite teammates
              <span className="font-normal text-muted-foreground">
                {" "}
                — optional, add more later
              </span>
            </FieldLabel>
            <textarea
              id="teammateEmails"
              value={s.teammateEmails}
              onChange={(e) => update("strategy", { teammateEmails: e.target.value })}
              onBlur={() => touch("teammateEmails")}
              placeholder="name@company.com, colleague@company.com"
              aria-invalid={!!err("teammateEmails")}
              rows={2}
              className="min-h-[3.5rem] w-full resize-none rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm text-foreground shadow-sm transition-[border-color,box-shadow] placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20 aria-[invalid=true]:border-destructive"
            />
            {err("teammateEmails") ? (
              <FieldError message={err("teammateEmails")} />
            ) : (
              <FieldHelper>
                Separate emails with commas. We&apos;ll send invites after setup.
              </FieldHelper>
            )}
          </Field>

          <Field>
            <FieldLabel>Department workflows</FieldLabel>
            <ChipMultiSelect
              id="workflows"
              value={s.workflows}
              onChange={(v) => update("strategy", { workflows: v })}
              options={WORKFLOWS.map((w) => ({ value: w, label: w }))}
            />
            <FieldHelper>
              We pre-build these workflows so your team can start immediately.
            </FieldHelper>
          </Field>
        </Section>
      ),
    },
    {
      id: "contact",
      node: (
        <Section
          step="contact"
          title="Primary contact"
          description="Who should we reach out to for clarifications and account setup?"
        >
          <Row>
            <Field>
              <FieldLabel htmlFor="primaryContact" required>
                Contact name
              </FieldLabel>
              <Input
                id="primaryContact"
                value={s.primaryContact}
                onChange={(e) => update("strategy", { primaryContact: e.target.value })}
                onBlur={() => touch("primaryContact")}
                placeholder="Jane Smith"
                aria-invalid={!!err("primaryContact")}
                autoComplete="name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="contactEmail" required>
                Contact email
              </FieldLabel>
              <Input
                id="contactEmail"
                type="email"
                value={s.contactEmail}
                onChange={(e) => update("strategy", { contactEmail: e.target.value })}
                onBlur={() => touch("contactEmail")}
                placeholder="jane@company.com"
                aria-invalid={!!err("contactEmail")}
                autoComplete="email"
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
