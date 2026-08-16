"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  CaretDown,
  ChartBar,
  FileText,
  Flame,
  GearSix,
  GlobeHemisphereWest,
  House,
  Lightning,
  MapTrifold,
  X,
} from "@phosphor-icons/react";
import type { IconProps } from "@phosphor-icons/react";
import Logo from "@/components/ui/Logo";
import { EASE } from "@/lib/animations";

export type TabId = "overview" | "footprint" | "category" | "scope1" | "scope2" | "scope3" | "reports" | "settings";

interface NavEntry {
  id: TabId;
  label: string;
  Icon: ComponentType<IconProps>;
  tint?: string;
}

const NAV_GROUPS: { label: string; items: NavEntry[] }[] = [
  {
    label: "Analyze",
    items: [
      { id: "overview", label: "Overview", Icon: House },
      { id: "footprint", label: "Footprint overview", Icon: MapTrifold },
      { id: "category", label: "Emissions by category", Icon: ChartBar },
    ],
  },
  {
    label: "Carbon",
    items: [
      { id: "scope1", label: "Scope 1", Icon: Flame, tint: "#15803d" },
      { id: "scope2", label: "Scope 2", Icon: Lightning, tint: "#22c55e" },
      { id: "scope3", label: "Scope 3", Icon: GlobeHemisphereWest, tint: "#65a30d" },
    ],
  },
  {
    label: "Manage",
    items: [
      { id: "reports", label: "Reports", Icon: FileText },
      { id: "settings", label: "Settings", Icon: GearSix },
    ],
  },
];

const WORKSPACES = ["Carbonsynq Inc.", "Acme Corp", "Northwind Ltd"];

interface NavItemProps {
  entry: NavEntry;
  active: boolean;
  onClick: () => void;
}

function NavItem({ entry, active, onClick }: NavItemProps) {
  const Icon = entry.Icon;
  const color = entry.tint ?? "#16a34a";
  return (
    <button
      onClick={onClick}
      className={`relative flex w-full items-center gap-[10px] rounded-[8px] px-[10px] py-[8px] text-[13px] font-medium transition-colors duration-200 ${
        active ? "text-black" : "text-[#71717a] hover:bg-black/[0.03] hover:text-black"
      }`}
    >
      {active && (
        <motion.span
          layoutId="dash-nav"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className="absolute inset-0 rounded-[8px] border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
        />
      )}
      <Icon size={16} weight={active ? "fill" : "regular"} className="relative z-10" style={{ color: active ? color : undefined }} />
      <span className="relative z-10">{entry.label}</span>
      {active && (
        <span
          className="absolute right-[10px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full"
          style={{ backgroundColor: color }}
        />
      )}
    </button>
  );
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  active: TabId;
  onChange: (tab: TabId) => void;
}

export default function Sidebar({ open, onClose, active, onChange }: SidebarProps) {
  const [workspace, setWorkspace] = useState(0);
  const [wsOpen, setWsOpen] = useState(false);

  const content = (
    <div className="flex h-full w-[252px] flex-col border-r border-black/[0.06] bg-white">
      <div className="flex items-center justify-between px-[16px] pt-[16px] pb-[12px]">
        <Link href="/" className="flex items-center gap-[8px]">
          <Logo className="h-[20px] w-auto" />
          <span className="text-[15px] font-semibold tracking-[-0.2px] text-black">Carbonsynq</span>
        </Link>
        <button onClick={onClose} className="flex items-center justify-center text-[#a1a1aa] hover:text-black lg:hidden">
          <X size={18} />
        </button>
      </div>

      <div className="px-[12px]">
        <div className="relative">
          <button
            onClick={() => setWsOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-[8px] border border-black/[0.06] bg-[#fafafa] px-[10px] py-[8px] text-left transition-colors hover:border-black/10"
          >
            <div className="flex items-center gap-[8px]">
              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] bg-[#16a34a] text-[10px] font-bold text-white">
                {WORKSPACES[workspace].slice(0, 1)}
              </span>
              <span className="text-[13px] font-medium text-black">{WORKSPACES[workspace]}</span>
            </div>
            <CaretDown size={12} className="text-[#a1a1aa]" />
          </button>
          <AnimatePresence>
            {wsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="absolute inset-x-[10px] top-full z-20 mt-[6px] rounded-[8px] border border-black/[0.06] bg-white p-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                {WORKSPACES.map((w, i) => (
                  <button
                    key={w}
                    onClick={() => {
                      setWorkspace(i);
                      setWsOpen(false);
                    }}
                    className={`w-full rounded-[6px] px-[8px] py-[7px] text-left text-[13px] font-medium transition-colors hover:bg-black/[0.04] ${
                      i === workspace ? "text-black" : "text-[#71717a]"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="mt-[14px] flex flex-1 flex-col gap-[18px] overflow-y-auto px-[12px]">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-[6px] px-[10px] text-[10.5px] font-semibold uppercase tracking-[0.1em] text-[#a1a1aa]">
              {group.label}
            </p>
            <div className="flex flex-col gap-[2px]">
              {group.items.map((entry) => (
                <NavItem
                  key={entry.id}
                  entry={entry}
                  active={active === entry.id}
                  onClick={() => {
                    onChange(entry.id);
                    onClose();
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="mt-[2px] rounded-[10px] border border-[#16a34a]/15 bg-[#f6fbf8] p-[12px]">
          <div className="flex items-center justify-between">
            <p className="text-[12px] font-semibold text-[#15803d]">2030 target</p>
            <span className="text-[10.5px] font-semibold text-[#15803d]">−42%</span>
          </div>
          <div className="mt-[8px] h-[4px] w-full overflow-hidden rounded-full bg-[#d9efe2]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "44%" }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
              className="h-full rounded-full bg-gradient-to-r from-[#16a34a] to-[#22c55e]"
            />
          </div>
          <p className="mt-[8px] text-[11px] leading-snug text-[#71717a]">−18.6% of −42% target met</p>
        </div>
      </nav>

      <div className="border-t border-black/[0.06] p-[12px]">
        <Link
          href="/"
          className="mb-[8px] flex items-center justify-between rounded-[8px] px-[10px] py-[8px] text-[13px] font-medium text-[#71717a] transition-colors hover:bg-black/[0.03] hover:text-black"
        >
          View live site
          <ArrowUpRight size={14} className="text-[#a1a1aa]" />
        </Link>
        <div className="flex items-center gap-[10px] rounded-[8px] px-[10px] py-[8px]">
          <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#0d3b2d] text-[11px] font-semibold text-white">
            AK
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium text-black">Aria Khanna</p>
            <p className="truncate text-[11px] text-[#a1a1aa]">admin@carbonsynq.io</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="sticky top-0 hidden h-dvh lg:block">{content}</aside>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute top-0 bottom-0 left-0"
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
