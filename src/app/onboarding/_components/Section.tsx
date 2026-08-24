"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  description?: string;
  step: string;
  children: React.ReactNode;
}

export function Section({ title, description, step, children }: SectionProps) {
  return (
    <section aria-labelledby={step} className="space-y-5">
      <div>
        <h2
          id={step}
          className="flex items-center gap-2.5 text-[0.9375rem] font-semibold text-foreground"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

export function Row({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2", className)}>
      {children}
    </div>
  );
}
