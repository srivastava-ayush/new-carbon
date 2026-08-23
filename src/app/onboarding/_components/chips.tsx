"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { FieldError } from "./fields";

interface ChipOption {
  value: string;
  label: string;
}

interface ChipMultiSelectProps {
  value: string[];
  onChange: (next: string[]) => void;
  options: readonly ChipOption[];
  error?: string;
  limit?: number;
  limitMessage?: string;
  id?: string;
}

export function ChipMultiSelect({
  value,
  onChange,
  options,
  error,
  limit,
  limitMessage,
  id,
}: ChipMultiSelectProps) {
  const toggle = (opt: ChipOption) => {
    const isSelected = value.includes(opt.value);
    if (isSelected) {
      onChange(value.filter((v) => v !== opt.value));
    } else if (limit && value.length >= limit) {
      return;
    } else {
      onChange([...value, opt.value]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        id={id}
        role="group"
        aria-label="Multi-select options"
        className="flex flex-wrap gap-2"
      >
        {options.map((opt) => {
          const isSelected = value.includes(opt.value);
          const isDisabled = !isSelected && !!limit && value.length >= limit;
          return (
            <motion.button
              key={opt.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(opt)}
              whileTap={{ scale: 0.97 }}
              disabled={isDisabled}
              className={cn(
                "group inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/30",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-input bg-background text-foreground hover:border-foreground/25 hover:bg-secondary",
                isDisabled && "cursor-not-allowed opacity-45 hover:border-input hover:bg-background"
              )}
            >
              {isSelected && (
                <Check className="size-3.5" strokeWidth={3} />
              )}
              {opt.label}
            </motion.button>
          );
        })}
      </div>
      {error ? (
        <FieldError message={error} />
      ) : limit && limitMessage && value.length >= limit ? (
        <p className="text-[0.8125rem] text-muted-foreground">{limitMessage}</p>
      ) : null}
    </div>
  );
}
