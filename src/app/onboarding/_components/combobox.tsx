"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { FieldError } from "./fields";

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  error?: string;
  id?: string;
  disabled?: boolean;
  onBlur?: () => void;
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No matches found.",
  error,
  id,
  disabled,
  onBlur,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const selected = options.find((o) => o.value === value);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
    );
  }, [options, query]);

  const handleOpenChange = (o: boolean) => {
    setOpen(o);
    if (o) {
      setQuery("");
      setActiveIndex(-1);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  const choose = (option: ComboboxOption) => {
    onChange(option.value);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) =>
        filtered.length === 0 ? -1 : (i + 1) % filtered.length
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        filtered.length === 0 ? -1 : (i - 1 + filtered.length) % filtered.length
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      choose(filtered[activeIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <div className="flex flex-col gap-1.5">
        <PopoverPrimitive.Trigger asChild disabled={disabled}>
          <button
            ref={triggerRef}
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${id}-listbox`}
            aria-invalid={!!error}
            onBlur={() => {
              if (!open) onBlur?.();
            }}
            className="flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-input bg-background px-3.5 text-sm text-foreground shadow-sm transition-[border-color,box-shadow] outline-none hover:border-foreground/20 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive"
          >
            <span
              className={cn(
                "truncate text-left",
                !selected && "text-muted-foreground/70"
              )}
            >
              {selected?.label ?? placeholder}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground/70" />
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            sideOffset={6}
            className="z-50 w-[var(--radix-popover-trigger-width)] rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl outline-none"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              onKeyDown={onKeyDown}
            >
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  aria-label={searchPlaceholder}
                  className="h-9 w-full rounded-lg border border-transparent bg-muted/60 pl-8 pr-8 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              <div
                ref={listRef}
                id={`${id}-listbox`}
                role="listbox"
                className="mt-1.5 max-h-64 overflow-y-auto"
              >
                {filtered.length === 0 ? (
                  <p className="px-2.5 py-6 text-center text-sm text-muted-foreground">
                    {emptyText}
                  </p>
                ) : (
                  filtered.map((option, i) => {
                    const isActive = i === activeIndex;
                    const isSelected = option.value === value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setActiveIndex(i)}
                        onClick={() => choose(option)}
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-foreground outline-none",
                          isActive && "bg-secondary",
                          isSelected && "font-medium"
                        )}
                      >
                        <span className="truncate">{option.label}</span>
                        {isSelected && (
                          <Check className="size-4 shrink-0 text-primary" strokeWidth={2.5} />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </div>
      {error && <FieldError message={error} />}
    </PopoverPrimitive.Root>
  );
}
