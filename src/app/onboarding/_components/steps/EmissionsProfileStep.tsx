"use client";

import * as React from "react";
import { Flame, Leaf, Thermometer, Zap } from "lucide-react";

import { ChipMultiSelect } from "../chips";
import { SelectableCards } from "../controls";
import { Section } from "../Section";
import { Field, FieldHelper, FieldLabel } from "../fields";
import {
  ELECTRICITY_SOURCES,
  REC_OPTIONS,
  REFRIGERANTS,
  SCOPE1_FUELS,
  STEAM_OPTIONS,
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

export function EmissionsProfileStep({
  data,
  update,
  err,
  section,
}: StepProps) {
  const e = data.emissions;

  const sections: { id: string; node: React.ReactNode }[] = [
    {
      id: "scope1",
      node: (
        <Section
          step="scope1"
          title="Direct emissions (Scope 1)"
          description="Fuel you burn and gases you release on site."
        >
          <Field>
            <FieldLabel required>Fuel types used</FieldLabel>
            <ChipMultiSelect
              id="scope1Fuels"
              value={e.scope1Fuels}
              onChange={(v) => update("emissions", { scope1Fuels: v })}
              options={SCOPE1_FUELS.map((f) => ({ value: f, label: f }))}
              error={err("scope1Fuels")}
            />
            <FieldHelper>
              Combustion of each fuel is converted with its own emission factor.
            </FieldHelper>
          </Field>

          <Field>
            <FieldLabel>Refrigerant equipment</FieldLabel>
            <ChipMultiSelect
              id="refrigerants"
              value={e.refrigerants}
              onChange={(v) => update("emissions", { refrigerants: v })}
              options={REFRIGERANTS.map((f) => ({ value: f, label: f }))}
            />
            <FieldHelper>
              Leaks from cooling systems are a common Scope 1 fugitive source.
            </FieldHelper>
          </Field>
        </Section>
      ),
    },
    {
      id: "scope2",
      node: (
        <Section
          step="scope2"
          title="Purchased energy (Scope 2)"
          description="Electricity and heat you buy from outside your boundary."
        >
          <Field>
            <FieldLabel required>Electricity source</FieldLabel>
            <SelectableCards
              id="electricitySource"
              value={e.electricitySource}
              onChange={(v) =>
                update("emissions", {
                  electricitySource: v,
                  ...(v === "onsite-renewable" ? { recs: "" } : {}),
                })
              }
              options={[
                { ...ELECTRICITY_SOURCES[0], icon: Zap },
                { ...ELECTRICITY_SOURCES[1], icon: Leaf },
                { ...ELECTRICITY_SOURCES[2], icon: Flame },
                { ...ELECTRICITY_SOURCES[3], icon: Zap },
              ]}
              error={err("electricitySource")}
            />
          </Field>

          {e.electricitySource !== "onsite-renewable" && e.electricitySource && (
            <Field>
              <FieldLabel required>Renewable energy certificates (RECs / EACs)</FieldLabel>
              <SelectableCards
                id="recs"
                value={e.recs}
                onChange={(v) => update("emissions", { recs: v })}
                options={REC_OPTIONS}
                columns={3}
                error={err("recs")}
              />
              <FieldHelper>
                Certificates allow location-based and market-based reporting.
              </FieldHelper>
            </Field>
          )}

          <Field>
            <FieldLabel required>Steam / District heating</FieldLabel>
            <SelectableCards
              id="steam"
              value={e.steam}
              onChange={(v) => update("emissions", { steam: v })}
              options={STEAM_OPTIONS.map((o) => ({ ...o, icon: Thermometer }))}
              error={err("steam")}
            />
            <FieldHelper>
              Purchased heat is reported under Scope 2 using supplier factors.
            </FieldHelper>
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
