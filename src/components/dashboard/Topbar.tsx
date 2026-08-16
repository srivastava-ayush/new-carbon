"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, CalendarBlank, CaretDown, DownloadSimple, List, MagnifyingGlass } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";

const RANGES = ["Last 12 months", "Last 6 months", "Last 3 months", "Year to date"];

interface TopbarProps {
  onMenu: () => void;
  title: string;
  subtitle: string;
}

export default function Topbar({ onMenu, title, subtitle }: TopbarProps) {
  const [range, setRange] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="sticky top-0 z-30 flex h-[60px] items-center justify-between gap-[16px] border-b border-black/[0.06] bg-[#fafafa]/85 px-[20px] backdrop-blur-md md:px-[32px]"
    >
      <div className="flex min-w-0 items-center gap-[12px]">
        <button
          onClick={onMenu}
          className="flex items-center justify-center rounded-[8px] p-[6px] text-[#71717a] hover:bg-black/[0.04] hover:text-black lg:hidden"
        >
          <List size={20} />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-[8px]">
            <h1 className="truncate text-[15px] font-semibold tracking-[-0.2px] text-black">{title}</h1>
            <span className="hidden rounded-full border border-black/[0.06] bg-white px-[8px] py-[2px] text-[11px] font-medium text-[#a1a1aa] md:inline">
              FY 2025–26
            </span>
          </div>
          <p className="hidden truncate text-[11.5px] text-[#71717a] sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-[8px]">
        <div className="relative hidden md:block">
          <MagnifyingGlass size={15} className="pointer-events-none absolute top-1/2 left-[10px] -translate-y-1/2 text-[#a1a1aa]" />
          <input
            placeholder="Search…"
            className="h-[34px] w-[190px] rounded-[8px] border border-black/[0.06] bg-white pr-[10px] pl-[32px] text-[13px] text-black placeholder:text-[#a1a1aa] focus:border-[#16a34a]/40 focus:outline-none"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-[34px] items-center gap-[8px] rounded-[8px] border border-black/[0.06] bg-white px-[10px] text-[13px] font-medium text-[#52525b] transition-colors hover:border-black/10"
          >
            <CalendarBlank size={14} className="text-[#a1a1aa]" />
            <span className="hidden sm:inline">{RANGES[range]}</span>
            <CaretDown size={11} className={`text-[#a1a1aa] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="absolute top-full right-0 z-20 mt-[6px] w-[170px] rounded-[8px] border border-black/[0.06] bg-white p-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                {RANGES.map((r, i) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRange(i);
                      setOpen(false);
                    }}
                    className={`w-full rounded-[6px] px-[8px] py-[7px] text-left text-[13px] font-medium transition-colors hover:bg-black/[0.04] ${
                      i === range ? "text-black" : "text-[#71717a]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="hidden h-[34px] items-center gap-[6px] rounded-[8px] bg-[#16a34a] px-[12px] text-[13px] font-semibold text-white transition-colors hover:bg-[#15803d] md:flex">
          <DownloadSimple size={14} />
          Export
        </button>

        <button className="relative flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-black/[0.06] bg-white text-[#71717a] transition-colors hover:text-black">
          <Bell size={16} />
          <span className="absolute top-[7px] right-[8px] h-[5px] w-[5px] rounded-full bg-[#16a34a]" />
        </button>
      </div>
    </motion.header>
  );
}
