"use client";

import * as React from "react";
import { Building, Car, Factory, Leaf, MapPin, PlugZap } from "lucide-react";

import { ChipMultiSelect } from "../chips";
import { SelectableCards } from "../controls";
import { SelectField } from "../FormSelect";
import { Section } from "../Section";
import { Field, FieldHelper, FieldLabel } from "../fields";
import {
  COUNTRIES,
  FACILITY_COUNT_OPTIONS,
  FACILITY_TYPES,
  FLOOR_AREA_OPTIONS,
  ON_SITE_ENERGY,
  OWNERSHIP_STATUSES,
  VEHICLE_OPTIONS,
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

const hasFacilities = (data: OnboardingData) =>
  data.locations.facilityCount !== "0 — no facilities" &&
  data.locations.facilityCount !== "";

export function LocationsOperationsStep({
  data,
  update,
  err,
  section,
}: StepProps) {
  const l = data.locations;
  const showSites = hasFacilities(data);

  const sections: { id: string; node: React.ReactNode }[] = [
    {
      id: "facilities",
      node: (
        <Section
          step="facilities"
          title="Facilities"
          description="Your physical footprint is the backbone of Scope 1 and 2 reporting."
        >
          <SelectField
            id="facilityCount"
            label="Number of facilities"
            required
            value={l.facilityCount}
            onChange={(v) => update("locations", { facilityCount: v })}
            options={FACILITY_COUNT_OPTIONS.map((o) => ({ value: o, label: o }))}
            placeholder="Select range"
            helper="Determines the structure of your asset inventory."
            error={err("facilityCount")}
          />

          {showSites && (
            <>
              <Field>
                <FieldLabel required>Countries of operation</FieldLabel>
                <ChipMultiSelect
                  id="countries"
                  value={l.countries}
                  onChange={(v) => update("locations", { countries: v })}
                  options={COUNTRIES.map((c) => ({ value: c, label: c }))}
                  error={err("countries")}
                />
                <FieldHelper>
                  We apply country-specific grid, fuel and transport factors.
                </FieldHelper>
              </Field>

              <Field>
                <FieldLabel required>Facility types</FieldLabel>
                <ChipMultiSelect
                  id="facilityTypes"
                  value={l.facilityTypes}
                  onChange={(v) => update("locations", { facilityTypes: v })}
                  options={FACILITY_TYPES.map((c) => ({ value: c, label: c }))}
                  error={err("facilityTypes")}
                />
                <FieldHelper>
                  Different site types carry very different energy profiles.
                </FieldHelper>
              </Field>

              <Field>
                <FieldLabel required>Ownership status</FieldLabel>
                <SelectableCards
                  id="ownershipStatus"
                  value={l.ownershipStatus}
                  onChange={(v) => update("locations", { ownershipStatus: v })}
                  options={[
                    { ...OWNERSHIP_STATUSES[0], icon: Building },
                    { ...OWNERSHIP_STATUSES[1], icon: Factory },
                    { ...OWNERSHIP_STATUSES[2], icon: MapPin },
                  ]}
                  error={err("ownershipStatus")}
                />
                <FieldHelper>
                  Whether you own or lease sites changes what you can measure directly.
                </FieldHelper>
              </Field>

              <SelectField
                id="floorArea"
                label="Total floor area"
                value={l.floorArea}
                onChange={(v) => update("locations", { floorArea: v })}
                options={FLOOR_AREA_OPTIONS.map((o) => ({ value: o, label: o }))}
                placeholder="Select range"
                helper="Used to estimate heating, cooling and lighting loads."
                error={err("floorArea")}
              />
            </>
          )}

          {!showSites && (
            <p className="flex items-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              <Building className="size-4 shrink-0" />
              No facility-related questions — we&apos;ll skip straight to fleet and energy.
            </p>
          )}
        </Section>
      ),
    },
    {
      id: "operations",
      node: (
        <Section
          step="operations"
          title="Operations & energy"
          description="Fleet and on-site generation feed into your Scope 1 and Scope 2 totals."
        >
          <SelectField
            id="vehicles"
            label="Company vehicles"
            value={l.vehicles}
            onChange={(v) => update("locations", { vehicles: v })}
            options={VEHICLE_OPTIONS.map((o) => ({ value: o, label: o }))}
            placeholder="Select range"
            helper="Fleet size estimates combustion and fuel-card emissions."
            error={err("vehicles")}
          />

          <Field>
            <FieldLabel>On-site energy generation</FieldLabel>
            <ChipMultiSelect
              id="onSiteEnergy"
              value={l.onSiteEnergy}
              onChange={(v) => update("locations", { onSiteEnergy: v })}
              options={ON_SITE_ENERGY.map((c) => ({ value: c, label: c }))}
            />
            <FieldHelper>
              Generation on site affects how we account for Scope 2 and green power.
            </FieldHelper>
          </Field>

          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-muted px-3 py-1.5 text-xs font-medium text-primary">
              <Car className="size-3.5" /> Fleet
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-muted px-3 py-1.5 text-xs font-medium text-primary">
              <Leaf className="size-3.5" /> On-site generation
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-muted px-3 py-1.5 text-xs font-medium text-primary">
              <PlugZap className="size-3.5" /> Purchased energy
            </span>
          </div>
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
