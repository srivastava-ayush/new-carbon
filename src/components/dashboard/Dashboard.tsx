"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Database } from "@phosphor-icons/react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import Overview from "@/components/dashboard/views/Overview";
import Footprint from "@/components/dashboard/views/Footprint";
import Category from "@/components/dashboard/views/Category";
import Scope from "@/components/dashboard/views/Scope";
import Placeholder from "@/components/dashboard/views/Placeholder";
import DashboardFilterBar from "@/components/dashboard/DashboardFilterBar";
import { EASE } from "@/lib/animations";
import type { TabId } from "@/components/dashboard/Sidebar";
import type { ScopeDetail } from "@/lib/demo-data";

const TITLES: Record<TabId, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Carbon footprint at a glance" },
  footprint: { title: "Footprint overview", subtitle: "Emissions by activity group" },
  category: { title: "Emissions by category", subtitle: "Where emissions come from, ranked" },
  scope1: { title: "Scope 1", subtitle: "Direct emissions from owned sources" },
  scope2: { title: "Scope 2", subtitle: "Indirect emissions from energy" },
  scope3: { title: "Scope 3", subtitle: "Indirect emissions across the value chain" },
  reports: { title: "Reports", subtitle: "Sustainability and audit exports" },
  settings: { title: "Settings", subtitle: "Workspace and team preferences" },
  "activity-data": { title: "Activity Data", subtitle: "Manage your imported activity data" },
  documents: { title: "Documents", subtitle: "Manage uploaded supporting documents" },
  review: { title: "Review Center", subtitle: "Review and approve data" },
  calculations: { title: "Calculations", subtitle: "CO₂e emission calculations" },
  "reporting-periods": { title: "Reporting Periods", subtitle: "Manage reporting periods" },
  "emission-factors": { title: "Emission Factors", subtitle: "Global emission factor library" },
  baseline: { title: "Baseline", subtitle: "Historical baseline comparisons" },
  targets: { title: "Targets", subtitle: "Reduction targets and progress" },
  "data-quality": { title: "Data Quality", subtitle: "Monitor carbon data completeness" },
  recommendations: { title: "Recommendations", subtitle: "Actionable steps to reduce emissions" },
  notifications: { title: "Notifications", subtitle: "System alerts and notifications" },
  "audit-logs": { title: "Audit Logs", subtitle: "System activity history" },
  team: { title: "Team", subtitle: "Manage your team" },
};

import { DashboardProvider, useDashboardContext } from "@/hooks/useDashboardContext";

function DashboardContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<TabId>("overview");
  
  // Auto-login utility removed for production

  const { data, loading, error } = useDashboardContext();

  const meta = TITLES[tab];

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-4 text-[#71717a]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/10 border-t-black" />
          <p className="text-sm font-medium">Loading your footprint data...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fafafa]">
        <div className="flex flex-col items-center gap-4 text-red-500">
          <p className="text-sm font-medium">Error loading data: {error}</p>
          <button 
            className="rounded bg-black px-4 py-2 text-sm text-white" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={tab} onChange={setTab} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} title={meta.title} subtitle={meta.subtitle} />

        <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
          <div className="mx-auto flex max-w-[1240px] flex-col">
            <DashboardFilterBar />

            {(!data || (data.TOTAL_12M === 0 && data.ACTIVITY_STATS.total === 0)) ? (
              <div className="mt-[40px] flex flex-col items-center justify-center text-center p-[40px] border border-black/[0.08] rounded-[12px] bg-white">
                <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-black/5 mb-[16px]">
                  <Database size={24} className="text-[#a1a1aa]" />
                </div>
                <h3 className="text-[16px] font-semibold text-black mb-[4px]">No emission data available</h3>
                <p className="text-[13px] text-[#71717a] max-w-[280px]">
                  No emission data or activities found for this reporting period. Please import data or change your filters.
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {tab === "overview" && <Overview onNavigate={setTab} />}
                  {tab === "footprint" && <Footprint />}
                  {tab === "category" && <Category />}
                  {tab === "scope1" && <Scope scope={"scope1" as ScopeDetail["key"]} />}
                  {tab === "scope2" && <Scope scope={"scope2" as ScopeDetail["key"]} />}
                  {tab === "scope3" && <Scope scope={"scope3" as ScopeDetail["key"]} />}
                  {(tab === "reports" || tab === "settings") && <Placeholder tab={tab} />}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardProvider>
        <DashboardContent />
      </DashboardProvider>
    </ProtectedRoute>
  );
}
