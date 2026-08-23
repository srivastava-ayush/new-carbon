"use client";

import * as React from "react";
import { CloudCog, Database, FileUp, Mail, Plug, ShieldCheck } from "lucide-react";

import { Combobox } from "../combobox";
import { ChipMultiSelect } from "../chips";
import { SegmentedControl, SelectableCards } from "../controls";
import { Row, Section } from "../Section";
import { Field, FieldHelper, FieldLabel } from "../fields";
import {
  ACCOUNTING_OPTIONS,
  CENTRALIZATION_OPTIONS,
  DATA_INPUT_METHODS,
  ERP_OPTIONS,
  FLEET_OPTIONS,
  IOT_OPTIONS,
  PROCUREMENT_OPTIONS,
  TRAVEL_OPTIONS,
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

const BILLING_METHODS = [
  {
    value: "upload",
    label: "I'll upload bills",
    description: "Monthly or quarterly PDF / CSV batches",
    icon: FileUp,
  },
  {
    value: "email",
    label: "Forward to a sync address",
    description: "A unique inbox CarbonSynq watches",
    icon: Mail,
  },
  {
    value: "api",
    label: "API / portal access",
    description: "Direct connection to utility providers",
    icon: Plug,
  },
  {
    value: "manual",
    label: "We'll collect manually",
    description: "You prefer to keep it in-house",
    icon: CloudCog,
  },
];

const OPTION_LIST = (list: readonly string[]) =>
  list.map((o) => ({ value: o, label: o }));

export function DataIntegrationsStep({
  data,
  update,
  err,
  touch,
  section,
}: StepProps) {
  const i = data.integrations;

  const sections: { id: string; node: React.ReactNode }[] = [
    {
      id: "systems",
      node: (
        <Section
          step="systems"
          title="Source systems"
          description="Connect the systems that already hold your activity data. Nothing is required."
        >
          <Row>
            <Field>
              <FieldLabel>ERP system</FieldLabel>
              <Combobox
                id="erp"
                value={i.erp}
                onChange={(v) => update("integrations", { erp: v })}
                onBlur={() => touch("erp")}
                options={OPTION_LIST(ERP_OPTIONS)}
                placeholder="Select ERP"
                error={err("erp")}
              />
              <FieldHelper>
                ERP data powers spend-based Scope 3 estimates.
              </FieldHelper>
            </Field>
            <Field>
              <FieldLabel>Accounting software</FieldLabel>
              <Combobox
                id="accounting"
                value={i.accounting}
                onChange={(v) => update("integrations", { accounting: v })}
                onBlur={() => touch("accounting")}
                options={OPTION_LIST(ACCOUNTING_OPTIONS)}
                placeholder="Select software"
                error={err("accounting")}
              />
              <FieldHelper>
                We use it to pull procurement and expense categories.
              </FieldHelper>
            </Field>
          </Row>

          <Row>
            <Field>
              <FieldLabel>Fleet management</FieldLabel>
              <Combobox
                id="fleet"
                value={i.fleet}
                onChange={(v) => update("integrations", { fleet: v })}
                onBlur={() => touch("fleet")}
                options={OPTION_LIST(FLEET_OPTIONS)}
                placeholder="Select platform"
                error={err("fleet")}
              />
              <FieldHelper>
                Telematics data gives accurate fuel and distance.
              </FieldHelper>
            </Field>
            <Field>
              <FieldLabel>Travel platform</FieldLabel>
              <Combobox
                id="travel"
                value={i.travel}
                onChange={(v) => update("integrations", { travel: v })}
                onBlur={() => touch("travel")}
                options={OPTION_LIST(TRAVEL_OPTIONS)}
                placeholder="Select platform"
                error={err("travel")}
              />
              <FieldHelper>
                Booking data makes business travel nearly automatic.
              </FieldHelper>
            </Field>
          </Row>

          <Row>
            <Field>
              <FieldLabel>Procurement system</FieldLabel>
              <Combobox
                id="procurement"
                value={i.procurement}
                onChange={(v) => update("integrations", { procurement: v })}
                onBlur={() => touch("procurement")}
                options={OPTION_LIST(PROCUREMENT_OPTIONS)}
                placeholder="Select system"
                error={err("procurement")}
              />
              <FieldHelper>
                Spend categories from procurement feed Scope 3.
              </FieldHelper>
            </Field>
            <Field>
              <FieldLabel>IoT / Smart meters</FieldLabel>
              <ChipMultiSelect
                id="iot"
                value={i.iot}
                onChange={(v) => update("integrations", { iot: v })}
                options={OPTION_LIST(IOT_OPTIONS)}
              />
              <FieldHelper>
                Live meter feeds give near-real-time energy data.
              </FieldHelper>
            </Field>
          </Row>
        </Section>
      ),
    },
    {
      id: "utility",
      node: (
        <Section
          step="utility"
          title="Utility data"
          description="Access to utility billing is the fastest path to accurate Scope 2."
        >
          <Field>
            <FieldLabel required>Can CarbonSynq access your utility billing?</FieldLabel>
            <SegmentedControl
              id="utilityBilling"
              value={i.utilityBilling || ""}
              onChange={(v) =>
                update("integrations", {
                  utilityBilling: v as "yes" | "no",
                  ...(v === "no" ? { utilityBillingMethod: "" } : {}),
                })
              }
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "Not yet" },
              ]}
              error={err("utilityBilling")}
            />
            <FieldHelper>
              With access we can auto-pull invoices and meter data each month.
            </FieldHelper>
          </Field>

          {i.utilityBilling === "yes" && (
            <Field>
              <FieldLabel required>Preferred way to share utility data</FieldLabel>
              <SelectableCards
                id="utilityBillingMethod"
                value={i.utilityBillingMethod}
                onChange={(v) => update("integrations", { utilityBillingMethod: v })}
                options={BILLING_METHODS}
                error={err("utilityBillingMethod")}
              />
            </Field>
          )}
        </Section>
      ),
    },
    {
      id: "preferences",
      node: (
        <Section
          step="preferences"
          title="Data preferences"
          description="How you want data to flow into the workspace."
        >
          <Field>
            <FieldLabel required>Preferred data input method</FieldLabel>
            <SelectableCards
              id="dataInputMethod"
              value={i.dataInputMethod}
              onChange={(v) => update("integrations", { dataInputMethod: v })}
              options={[
                { ...DATA_INPUT_METHODS[0], icon: Database },
                { ...DATA_INPUT_METHODS[1], icon: FileUp },
                { ...DATA_INPUT_METHODS[2], icon: CloudCog },
                { ...DATA_INPUT_METHODS[3], icon: Plug },
                { ...DATA_INPUT_METHODS[4], icon: ShieldCheck },
              ]}
              error={err("dataInputMethod")}
            />
          </Field>

          <Field>
            <FieldLabel required>How is emissions data managed today?</FieldLabel>
            <SelectableCards
              id="centralization"
              value={i.centralization}
              onChange={(v) => update("integrations", { centralization: v })}
              options={CENTRALIZATION_OPTIONS}
              columns={3}
              error={err("centralization")}
            />
          </Field>
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
