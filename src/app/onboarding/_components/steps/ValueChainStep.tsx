"use client";

import * as React from "react";
import {
  Boxes,
  Handshake,
  Package,
  Plane,
  Recycle,
  Truck,
} from "lucide-react";

import { ChipMultiSelect } from "../chips";
import { SegmentedControl, SelectableCards } from "../controls";
import { SelectField } from "../FormSelect";
import { Row, Section } from "../Section";
import { Field, FieldHelper, FieldLabel } from "../fields";
import {
  BUSINESS_TRAVEL_OPTIONS,
  CLOUD_PROVIDERS,
  COMMUTING_OPTIONS,
  LOGISTICS_OPTIONS,
  SPEND_CATEGORIES,
  SUPPLIER_DATA_OPTIONS,
  WASTE_OPTIONS,
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

const FRANCHISE_OPTIONS = [
  { value: "none", label: "No franchises" },
  { value: "franchisor", label: "We operate a franchise model" },
  { value: "franchisee", label: "We operate as a franchisee" },
];

const LEASED_OPTIONS = [
  { value: "none", label: "No leased assets" },
  { value: "operating", label: "Operating leases" },
  { value: "finance", label: "Finance leases" },
  { value: "both", label: "Both operating and finance" },
];

const INVESTMENT_OPTIONS = [
  { value: "none", label: "No investments" },
  { value: "equity", label: "Equity investments" },
  { value: "bonds", label: "Green bonds / other instruments" },
];

export function ValueChainStep({ data, update, err, section }: StepProps) {
  const v = data.valueChain;

  const sections: { id: string; node: React.ReactNode }[] = [
    {
      id: "suppliers",
      node: (
        <Section
          step="suppliers"
          title="Suppliers & spend"
          description="Scope 3, category 1 — often the largest part of a footprint."
        >
          <Field>
            <FieldLabel required>Supplier emissions data availability</FieldLabel>
            <SelectableCards
              id="supplierData"
              value={v.supplierData}
              onChange={(s) => update("valueChain", { supplierData: s })}
              options={[
                { ...SUPPLIER_DATA_OPTIONS[0], icon: Boxes },
                { ...SUPPLIER_DATA_OPTIONS[1], icon: Handshake },
                { ...SUPPLIER_DATA_OPTIONS[2], icon: Package },
              ]}
              error={err("supplierData")}
            />
          </Field>

          <Field>
            <FieldLabel>Spend categories you can map</FieldLabel>
            <ChipMultiSelect
              id="spendCategories"
              value={v.spendCategories}
              onChange={(next) => update("valueChain", { spendCategories: next })}
              options={SPEND_CATEGORIES.map((c) => ({ value: c, label: c }))}
            />
            <FieldHelper>
              Purchasing records in these categories become spend-based estimates.
            </FieldHelper>
          </Field>
        </Section>
      ),
    },
    {
      id: "travel",
      node: (
        <Section
          step="travel"
          title="Travel & commuting"
          description="Employee mobility is usually Scope 3, categories 6 and 7."
        >
          <Row>
            <Field>
              <FieldLabel required>Employee commuting</FieldLabel>
              <SelectableCards
                id="commuting"
                value={v.commuting}
                onChange={(s) => update("valueChain", { commuting: s })}
                options={COMMUTING_OPTIONS}
                error={err("commuting")}
              />
            </Field>
            <Field>
              <FieldLabel required>Business travel</FieldLabel>
              <SelectableCards
                id="businessTravel"
                value={v.businessTravel}
                onChange={(s) => update("valueChain", { businessTravel: s })}
                options={BUSINESS_TRAVEL_OPTIONS.map((o) => ({
                  ...o,
                  icon: Plane,
                }))}
                error={err("businessTravel")}
              />
            </Field>
          </Row>
        </Section>
      ),
    },
    {
      id: "logistics",
      node: (
        <Section
          step="logistics"
          title="Logistics & waste"
          description="Transportation and end-of-life of what you make and buy."
        >
          <Row>
            <Field>
              <FieldLabel required>Logistics ownership</FieldLabel>
              <SelectableCards
                id="logisticsOwnership"
                value={v.logisticsOwnership}
                onChange={(s) => update("valueChain", { logisticsOwnership: s })}
                options={LOGISTICS_OPTIONS.map((o) => ({ ...o, icon: Truck }))}
                error={err("logisticsOwnership")}
              />
            </Field>
            <Field>
              <FieldLabel required>Waste generation</FieldLabel>
              <SelectableCards
                id="waste"
                value={v.waste}
                onChange={(s) => update("valueChain", { waste: s })}
                options={WASTE_OPTIONS.map((o) => ({ ...o, icon: Recycle }))}
                error={err("waste")}
              />
            </Field>
          </Row>
        </Section>
      ),
    },
    {
      id: "digital",
      node: (
        <Section
          step="digital"
          title="Digital footprint"
          description="Cloud infrastructure is a fast-growing Scope 3 category."
        >
          <Field>
            <FieldLabel>Cloud providers</FieldLabel>
            <ChipMultiSelect
              id="cloudProviders"
              value={v.cloudProviders}
              onChange={(next) => update("valueChain", { cloudProviders: next })}
              options={CLOUD_PROVIDERS.map((c) => ({ value: c, label: c }))}
            />
            <FieldHelper>
              Each provider has its own grid mix and reporting data.
            </FieldHelper>
          </Field>
        </Section>
      ),
    },
    {
      id: "products",
      node: (
        <Section
          step="products"
          title="Products & structures"
          description="Franchise, leasing and investment structures extend your boundary."
        >
          <Field>
            <FieldLabel required>Do you produce physical products?</FieldLabel>
            <SegmentedControl
              id="physicalProducts"
              value={v.physicalProducts || ""}
              onChange={(s) =>
                update("valueChain", { physicalProducts: s as "yes" | "no" })
              }
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              error={err("physicalProducts")}
            />
            <FieldHelper>
              Physical goods add downstream transportation and use-phase categories.
            </FieldHelper>
          </Field>

          <Row>
            <SelectField
              id="franchises"
              label="Franchises"
              value={v.franchises}
              onChange={(s) => update("valueChain", { franchises: s })}
              options={FRANCHISE_OPTIONS}
              placeholder="Select…"
              helper="Franchise operations sit within your reporting boundary."
            />
            <SelectField
              id="leasedAssets"
              label="Leased assets"
              value={v.leasedAssets}
              onChange={(s) => update("valueChain", { leasedAssets: s })}
              options={LEASED_OPTIONS}
              placeholder="Select…"
              helper="Operating vs. finance leases change the boundary treatment."
            />
          </Row>
          <Row>
            <SelectField
              id="investments"
              label="Investments"
              value={v.investments}
              onChange={(s) => update("valueChain", { investments: s })}
              options={INVESTMENT_OPTIONS}
              placeholder="Select…"
              helper="Investments contribute under Scope 3, category 15."
            />
            <div className="hidden sm:block" />
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
