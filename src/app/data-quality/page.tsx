"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getDataQualityMetrics, fetchAPI } from "@/lib/api";
import { toast } from "sonner";
import {
  ShieldCheck,
  Warning,
  CheckCircle,
  XCircle,
  ArrowRight,
  CircleNotch,
  Funnel,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const SCOPES = ["SCOPE_1", "SCOPE_2", "SCOPE_3"];
const CATEGORIES = [
  "DIESEL", "PETROL", "LPG", "NATURAL_GAS", "CNG", "GENERATOR_FUEL",
  "BOILER_FUEL", "REFRIGERANT", "OWNED_VEHICLE", "PURCHASED_ELECTRICITY",
  "PURCHASED_STEAM", "PURCHASED_HEATING", "PURCHASED_COOLING",
];

function scoreColor(score: number) {
  if (score >= 85) return { bg: "bg-green-100", text: "text-green-700", bar: "bg-green-500", label: "Excellent" };
  if (score >= 70) return { bg: "bg-blue-100", text: "text-blue-700", bar: "bg-blue-500", label: "Good" };
  if (score >= 50) return { bg: "bg-yellow-100", text: "text-yellow-700", bar: "bg-yellow-500", label: "Fair" };
  return { bg: "bg-red-100", text: "text-red-700", bar: "bg-red-500", label: "Poor" };
}

function CoverageCard({ title, numerator, denominator, rate, subtitle }: {
  title: string; numerator: number; denominator: number; rate: number; subtitle?: string;
}) {
  const { bar } = scoreColor(rate);
  return (
    <div className="rounded-[12px] border border-black/[0.08] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-[12px]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-semibold text-black">{title}</p>
          {subtitle && <p className="text-[12px] text-[#71717a] mt-[2px]">{subtitle}</p>}
        </div>
        <span className={`text-[22px] font-semibold ${scoreColor(rate).text}`}>{rate}%</span>
      </div>
      <div className="h-[6px] w-full rounded-full bg-black/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(rate, 100)}%` }}
          transition={{ duration: 0.9, ease: EASE }}
          className={`h-full rounded-full ${bar}`}
        />
      </div>
      <div className="flex justify-between text-[12px] text-[#71717a]">
        <span>{numerator.toLocaleString()} / {denominator.toLocaleString()}</span>
        <span>{denominator - numerator > 0 ? `${(denominator - numerator).toLocaleString()} missing` : "Complete"}</span>
      </div>
    </div>
  );
}

export default function DataQualityPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [periods, setPeriods] = useState<any[]>([]);

  const [filters, setFilters] = useState({
    reportingPeriodId: "",
    scope: "",
    category: "",
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const activeFilters: any = {};
      if (filters.reportingPeriodId) activeFilters.reportingPeriodId = filters.reportingPeriodId;
      if (filters.scope) activeFilters.scope = filters.scope;
      if (filters.category) activeFilters.category = filters.category;

      const res = await getDataQualityMetrics(activeFilters);
      if (res.success) {
        setData(res.data);
      } else {
        toast.error("Failed to load data quality metrics");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const uId = localStorage.getItem("universityId");
    if (uId) {
      fetchAPI(`/reporting-periods?universityId=${uId}`).then(r => {
        if (r.success) setPeriods(r.data);
      });
    }
    fetchData();
  }, [fetchData]);

  const score = data?.qualityScore ?? 0;
  const colors = scoreColor(score);
  const summary = data?.summary ?? {};
  const issues = data?.issues ?? [];
  const coverage = data?.coverage ?? {};

  const ISSUE_LINKS: Record<string, string> = {
    missingQuantity: "/activity-data?status=DRAFT",
    missingUnit: "/activity-data?status=DRAFT",
    missingDate: "/activity-data?status=DRAFT",
    unverified: "/activity-data?status=SUBMITTED",
    uncalculated: "/calculations",
    duplicates: "/activity-data",
  };

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"data-quality"} onChange={() => {}} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onMenu={() => setMenuOpen(true)}
          title="Data Quality"
          subtitle="Monitor the completeness and reliability of your carbon data"
        />

        <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-[24px]">

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-[12px] rounded-[12px] border border-black/[0.08] bg-white px-[20px] py-[14px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-[6px] text-[13px] font-medium text-[#52525b] shrink-0">
                <Funnel size={16} /> Filters
              </div>
              <select
                className="rounded-[8px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] outline-none focus:border-black"
                value={filters.reportingPeriodId}
                onChange={e => setFilters(p => ({ ...p, reportingPeriodId: e.target.value }))}
              >
                <option value="">All Reporting Periods</option>
                {periods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
              <select
                className="rounded-[8px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] outline-none focus:border-black"
                value={filters.scope}
                onChange={e => setFilters(p => ({ ...p, scope: e.target.value }))}
              >
                <option value="">All Scopes</option>
                {SCOPES.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
              <select
                className="rounded-[8px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] outline-none focus:border-black"
                value={filters.category}
                onChange={e => setFilters(p => ({ ...p, category: e.target.value }))}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c.replace(/_/g, " ")}</option>)}
              </select>
              {(filters.reportingPeriodId || filters.scope || filters.category) && (
                <button
                  onClick={() => setFilters({ reportingPeriodId: "", scope: "", category: "" })}
                  className="ml-auto text-[12px] font-medium text-[#71717a] hover:text-black transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-[80px] gap-[12px]">
                <CircleNotch size={32} className="animate-spin text-[#a1a1aa]" />
                <p className="text-[13px] text-[#71717a]">Loading data quality metrics…</p>
              </div>
            ) : (
              <>
                {/* Quality Score Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-[12px] border border-black/[0.08] bg-white p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                >
                  <div className="flex items-center justify-between mb-[16px]">
                    <div>
                      <h2 className="text-[16px] font-semibold text-black flex items-center gap-[8px]">
                        <ShieldCheck size={20} className={colors.text} weight="fill" />
                        Data Quality Score
                      </h2>
                      <p className="text-[12px] text-[#71717a] mt-[2px]">
                        Weighted: 40% Verification + 30% Calculation + 20% Documents + 10% No Duplicates
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-[40px] font-bold leading-none ${colors.text}`}>{score}%</p>
                      <span className={`inline-block mt-[4px] rounded-full px-[10px] py-[2px] text-[12px] font-semibold ${colors.bg} ${colors.text}`}>
                        {colors.label}
                      </span>
                    </div>
                  </div>
                  <div className="h-[10px] w-full rounded-full bg-black/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 1.2, ease: EASE }}
                      className={`h-full rounded-full ${colors.bar}`}
                    />
                  </div>
                </motion.div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-[12px]">
                  {[
                    { label: "Total Activities", value: summary.total ?? 0, icon: <CheckCircle size={18} className="text-[#52525b]" /> },
                    { label: "Verified", value: (summary.verified ?? 0) + (summary.calculated ?? 0), icon: <CheckCircle size={18} className="text-green-600" weight="fill" /> },
                    { label: "Pending Review", value: (summary.draft ?? 0) + (summary.submitted ?? 0) + (summary.needsReview ?? 0), icon: <Warning size={18} className="text-yellow-600" weight="fill" /> },
                    { label: "Rejected", value: summary.rejected ?? 0, icon: <XCircle size={18} className="text-red-500" weight="fill" /> },
                    { label: "Calculated", value: summary.calculated ?? 0, icon: <CheckCircle size={18} className="text-blue-600" weight="fill" /> },
                  ].map((c, i) => (
                    <motion.div
                      key={c.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: EASE, delay: i * 0.05 }}
                      className="rounded-[12px] border border-black/[0.08] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                    >
                      <div className="flex items-center gap-[8px] mb-[8px]">
                        {c.icon}
                        <p className="text-[12px] font-medium text-[#71717a]">{c.label}</p>
                      </div>
                      <p className="text-[28px] font-semibold text-black leading-none">{c.value.toLocaleString()}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Coverage Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px]">
                  <CoverageCard
                    title="Verification Rate"
                    subtitle="Activities verified or calculated"
                    numerator={(coverage.verification?.verified ?? 0)}
                    denominator={coverage.verification?.total ?? 1}
                    rate={coverage.verification?.rate ?? 0}
                  />
                  <CoverageCard
                    title="Calculation Coverage"
                    subtitle="Verified activities with CO₂e calculated"
                    numerator={coverage.calculation?.calculated ?? 0}
                    denominator={coverage.calculation?.verified ?? 1}
                    rate={coverage.calculation?.rate ?? 0}
                  />
                  <CoverageCard
                    title="Document Coverage"
                    subtitle="Activities with a supporting document"
                    numerator={coverage.document?.withDocument ?? 0}
                    denominator={coverage.document?.total ?? 1}
                    rate={coverage.document?.rate ?? 0}
                  />
                </div>

                {/* Issues Table */}
                <div className="rounded-[12px] border border-black/[0.08] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
                  <div className="px-[20px] py-[16px] border-b border-black/[0.06] bg-[#fafafa] flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-black flex items-center gap-[8px]">
                      <Warning size={16} className="text-yellow-600" weight="fill" />
                      Data Quality Issues
                    </h3>
                    <span className="rounded-full bg-yellow-100 px-[8px] py-[2px] text-[12px] font-semibold text-yellow-700">
                      {issues.length} issue type{issues.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {issues.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-[48px] gap-[8px] text-center">
                      <CheckCircle size={32} className="text-green-500" weight="fill" />
                      <p className="text-[14px] font-semibold text-black">No data quality issues found</p>
                      <p className="text-[13px] text-[#71717a]">Your carbon data is complete and well-structured.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left text-[13px]">
                      <thead className="bg-[#f8f8f8] text-[#71717a]">
                        <tr>
                          <th className="px-[20px] py-[12px] font-medium">Issue</th>
                          <th className="px-[20px] py-[12px] font-medium text-right">Count</th>
                          <th className="px-[20px] py-[12px] font-medium text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/[0.04]">
                        {issues.map((issue: any) => (
                          <tr key={issue.key} className="hover:bg-[#fafafa]/50 transition-colors">
                            <td className="px-[20px] py-[14px]">
                              <div className="flex items-center gap-[8px]">
                                <Warning size={16} className="text-yellow-500 shrink-0" weight="fill" />
                                <span className="font-medium text-black">{issue.label}</span>
                              </div>
                            </td>
                            <td className="px-[20px] py-[14px] text-right">
                              <span className="rounded-full bg-red-50 px-[8px] py-[2px] text-[12px] font-bold text-red-600">
                                {issue.count.toLocaleString()}
                              </span>
                            </td>
                            <td className="px-[20px] py-[14px] text-right">
                              <button
                                onClick={() => router.push(ISSUE_LINKS[issue.key] || "/activity-data")}
                                className="flex items-center gap-[4px] text-[12px] font-medium text-black hover:underline ml-auto"
                              >
                                View Activities <ArrowRight size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
