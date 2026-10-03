"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { WarningCircle, Info } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

export function Field({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-1.5", className)}>{children}</div>;
}

export function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[0.8125rem] font-semibold text-foreground"
    >
      {children}
      {required && (
        <span className="ml-0.5 text-primary" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function FieldHelper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-1.5 text-[0.8125rem] leading-5 text-muted-foreground",
        className
      )}
    >
      <Info size={14} className="mt-0.5 shrink-0 text-muted-foreground/70" />
      <span>{children}</span>
    </p>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -3 }}
      transition={{ duration: 0.15 }}
      role="alert"
      className="flex items-start gap-1.5 text-[0.8125rem] font-medium leading-5 text-destructive"
    >
      <WarningCircle size={14} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </motion.p>
  );
}
