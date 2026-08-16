"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/animations";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import {
  getRecommendations,
  updateRecommendationStatus,
  generateRecommendations,
} from "@/lib/api";
import { toast } from "sonner";
import {
  Lightbulb,
  CircleNotch,
  Lightning,
  Flame,
  Leaf,
  Truck,
  Thermometer,
  CheckCircle,
  ArrowClockwise,
  X,
  ArrowRight,
  Sparkle,
} from "@phosphor-icons/react";

// Priority config
const PRIORITY_CONFIG = {
  HIGH: { label: "High Impact", bg: "bg-red-50", border: "border-red-200", text: "text-red-700", dot: "bg-red-500", badge: "bg-red-100 text-red-700" },
  MEDIUM: { label: "Medium Impact", bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", dot: "bg-orange-400", badge: "bg-orange-100 text-orange-700" },
  LOW: { label: "Low Impact", bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700", dot: "bg-yellow-400", badge: "bg-yellow-100 text-yellow-700" },
} as const;

// Category config
const CATEGORY_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  ENERGY: { icon: <Lightning size={16} weight="fill" />, label: "Energy", color: "#f59e0b" },
  FUEL: { icon: <Flame size={16} weight="fill" />, label: "Fuel", color: "#ef4444" },
  TRANSPORT: { icon: <Truck size={16} weight="fill" />, label: "Transport", color: "#3b82f6" },
  REFRIGERANTS: { icon: <Thermometer size={16} weight="fill" />, label: "Refrigerants", color: "#8b5cf6" },
  DATA_QUALITY: { icon: <Sparkle size={16} weight="fill" />, label: "Data Quality", color: "#10b981" },
  OTHER: { icon: <Lightbulb size={16} weight="fill" />, label: "Other", color: "#6b7280" },
};

const STATUS_LABELS: Record<string, { label: string; class: string }> = {
  NEW: { label: "New", class: "bg-blue-100 text-blue-700" },
  IN_PROGRESS: { label: "In Progress", class: "bg-yellow-100 text-yellow-700" },
  COMPLETED: { label: "Completed", class: "bg-green-100 text-green-700" },
  DISMISSED: { label: "Dismissed", class: "bg-gray-100 text-gray-500" },
};

const CATEGORIES = ["All", "ENERGY", "FUEL", "TRANSPORT", "REFRIGERANTS", "DATA_QUALITY", "OTHER"];
const PRIORITIES = ["All", "HIGH", "MEDIUM", "LOW"];
const STATUSES = ["All", "NEW", "IN_PROGRESS", "COMPLETED"];

export default function RecommendationsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  const [filterCategory, setFilterCategory] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchRecs = useCallback(async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (filterCategory !== "All") filters.category = filterCategory;
      if (filterPriority !== "All") filters.priority = filterPriority;
      if (filterStatus !== "All") filters.status = filterStatus;

      const res = await getRecommendations(filters);
      if (res.success) {
        setRecommendations(res.data);
      } else {
        toast.error("Failed to load recommendations");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterPriority, filterStatus]);

  useEffect(() => { fetchRecs(); }, [fetchRecs]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await generateRecommendations();
      if (res.success) {
        toast.success(`${res.data.length} recommendations generated`);
        await fetchRecs();
      } else {
        toast.error(res.message || "Failed to generate recommendations");
      }
    } catch (err: any) {
      toast.error(err.message || "Generation failed");
    } finally {
      setGenerating(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      const res = await updateRecommendationStatus(id, status);
      if (res.success) {
        toast.success(`Marked as ${STATUS_LABELS[status]?.label || status}`);
        setRecommendations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
        if (selected?.id === id) setSelected({ ...selected, status });
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const highCount = recommendations.filter(r => r.priority === "HIGH").length;
  const medCount = recommendations.filter(r => r.priority === "MEDIUM").length;
  const lowCount = recommendations.filter(r => r.priority === "LOW").length;

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"recommendations"} onChange={() => {}} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          onMenu={() => setMenuOpen(true)}
          title="Recommendations"
          subtitle="Actionable insights to reduce your carbon footprint"
        />

        <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-[24px]">

            {/* Header Actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-[8px]">
                {[
                  { label: `${highCount} High`, cls: "bg-red-50 text-red-700 border border-red-200" },
                  { label: `${medCount} Medium`, cls: "bg-orange-50 text-orange-700 border border-orange-200" },
                  { label: `${lowCount} Low`, cls: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
                ].map(b => (
                  <span key={b.label} className={`rounded-full px-[10px] py-[4px] text-[12px] font-semibold ${b.cls}`}>{b.label}</span>
                ))}
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center gap-[8px] rounded-[8px] bg-black px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors disabled:opacity-60"
              >
                {generating ? <CircleNotch size={16} className="animate-spin" /> : <Sparkle size={16} weight="fill" />}
                {generating ? "Generating…" : "Generate Recommendations"}
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-[10px] rounded-[12px] border border-black/[0.08] bg-white px-[16px] py-[12px]">
              <div className="flex gap-[6px] flex-wrap">
                {CATEGORIES.map(c => (
                  <button
                    key={c}
                    onClick={() => setFilterCategory(c)}
                    className={`rounded-full px-[12px] py-[4px] text-[12px] font-medium transition-colors ${filterCategory === c ? "bg-black text-white" : "bg-black/[0.04] text-[#52525b] hover:bg-black/[0.08]"}`}
                  >
                    {c === "All" ? "All Categories" : (CATEGORY_CONFIG[c]?.label || c)}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex gap-[8px]">
                <select
                  className="rounded-[8px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] outline-none focus:border-black"
                  value={filterPriority}
                  onChange={e => setFilterPriority(e.target.value)}
                >
                  {PRIORITIES.map(p => <option key={p} value={p}>{p === "All" ? "All Priorities" : p}</option>)}
                </select>
                <select
                  className="rounded-[8px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] outline-none focus:border-black"
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s === "All" ? "All Statuses" : STATUS_LABELS[s]?.label}</option>)}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-[80px] gap-[12px]">
                <CircleNotch size={32} className="animate-spin text-[#a1a1aa]" />
                <p className="text-[13px] text-[#71717a]">Loading recommendations…</p>
              </div>
            ) : recommendations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-[80px] gap-[16px] text-center">
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-black/[0.04]">
                  <Lightbulb size={28} className="text-[#a1a1aa]" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-black">No recommendations yet</h3>
                  <p className="mt-[4px] text-[13px] text-[#71717a]">
                    Click "Generate Recommendations" to analyze your emission data and get actionable insights.
                  </p>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="flex items-center gap-[8px] rounded-[8px] bg-black px-[20px] py-[10px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors"
                >
                  <Sparkle size={16} weight="fill" /> Generate Recommendations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[16px]">
                {recommendations.map((rec, i) => {
                  const pConfig = PRIORITY_CONFIG[rec.priority as keyof typeof PRIORITY_CONFIG] ?? PRIORITY_CONFIG.LOW;
                  const catConfig = CATEGORY_CONFIG[rec.category] ?? CATEGORY_CONFIG.OTHER;

                  return (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: EASE, delay: i * 0.04 }}
                      className={`group relative rounded-[12px] border bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all ${pConfig.border}`}
                      onClick={() => setSelected(rec)}
                    >
                      {/* Priority stripe */}
                      <div className={`absolute top-0 left-0 h-[3px] w-full rounded-t-[12px] ${pConfig.dot}`} />

                      <div className="flex flex-col gap-[12px] p-[20px] pt-[22px] flex-1">
                        {/* Top badges */}
                        <div className="flex items-center justify-between">
                          <span className={`flex items-center gap-[5px] rounded-full px-[8px] py-[2px] text-[11px] font-bold ${pConfig.badge}`}>
                            <span className={`h-[6px] w-[6px] rounded-full ${pConfig.dot}`} />
                            {pConfig.label.toUpperCase()}
                          </span>
                          <span className={`rounded-full px-[8px] py-[2px] text-[11px] font-semibold ${STATUS_LABELS[rec.status]?.class || "bg-gray-100 text-gray-600"}`}>
                            {STATUS_LABELS[rec.status]?.label || rec.status}
                          </span>
                        </div>

                        {/* Category + Title */}
                        <div>
                          <div className="flex items-center gap-[6px] mb-[6px]" style={{ color: catConfig.color }}>
                            {catConfig.icon}
                            <span className="text-[11px] font-semibold uppercase tracking-wider">{catConfig.label}</span>
                          </div>
                          <h3 className="text-[14px] font-semibold text-black leading-snug">{rec.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-[12.5px] text-[#52525b] leading-relaxed line-clamp-3 flex-1">{rec.description}</p>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-[12px] border-t border-black/[0.05]">
                          {rec.estimatedReductionKg ? (
                            <span className="text-[11.5px] text-[#71717a]">
                              <span className="font-semibold text-green-700">~{Math.round(rec.estimatedReductionKg / 1000).toLocaleString()} tCO₂e</span> potential reduction
                            </span>
                          ) : <span />}
                          <span className="flex items-center gap-[4px] text-[12px] font-medium text-black group-hover:gap-[8px] transition-all">
                            View Details <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: EASE }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-[480px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] flex flex-col overflow-y-auto"
            >
              {/* Drawer Header */}
              {(() => {
                const pConfig = PRIORITY_CONFIG[selected.priority as keyof typeof PRIORITY_CONFIG] ?? PRIORITY_CONFIG.LOW;
                const catConfig = CATEGORY_CONFIG[selected.category] ?? CATEGORY_CONFIG.OTHER;
                return (
                  <>
                    <div className={`h-[3px] w-full ${pConfig.dot}`} />
                    <div className="flex items-start justify-between p-[24px] pb-[20px] border-b border-black/[0.06]">
                      <div>
                        <div className="flex items-center gap-[6px] mb-[6px]" style={{ color: catConfig.color }}>
                          {catConfig.icon}
                          <span className="text-[11px] font-semibold uppercase tracking-wider">{catConfig.label}</span>
                        </div>
                        <h2 className="text-[18px] font-semibold text-black leading-snug">{selected.title}</h2>
                      </div>
                      <button onClick={() => setSelected(null)} className="text-[#a1a1aa] hover:text-black transition-colors mt-1">
                        <X size={20} />
                      </button>
                    </div>

                    {/* Meta cards */}
                    <div className="grid grid-cols-2 gap-[12px] p-[24px] pb-0">
                      <div className="rounded-[10px] bg-[#fafafa] border border-black/[0.06] p-[14px]">
                        <p className="text-[11px] font-medium text-[#71717a] mb-[4px]">Impact Level</p>
                        <span className={`rounded-full px-[8px] py-[2px] text-[12px] font-bold ${pConfig.badge}`}>{pConfig.label}</span>
                      </div>
                      <div className="rounded-[10px] bg-[#fafafa] border border-black/[0.06] p-[14px]">
                        <p className="text-[11px] font-medium text-[#71717a] mb-[4px]">Status</p>
                        <span className={`rounded-full px-[8px] py-[2px] text-[12px] font-semibold ${STATUS_LABELS[selected.status]?.class || ""}`}>
                          {STATUS_LABELS[selected.status]?.label || selected.status}
                        </span>
                      </div>
                      {selected.estimatedReductionKg && (
                        <div className="col-span-2 rounded-[10px] bg-green-50 border border-green-200 p-[14px]">
                          <p className="text-[11px] font-medium text-green-700 mb-[2px]">Estimated Reduction Potential</p>
                          <p className="text-[20px] font-bold text-green-700">
                            ~{(selected.estimatedReductionKg / 1000).toFixed(1)} tCO₂e
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="px-[24px] py-[20px]">
                      <h3 className="text-[13px] font-semibold text-black mb-[8px]">Recommended Action</h3>
                      <p className="text-[13px] text-[#52525b] leading-relaxed">{selected.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-[24px] pb-[24px] flex flex-col gap-[8px] mt-auto">
                      <p className="text-[12px] font-medium text-[#71717a] mb-[4px]">Update Status</p>
                      <div className="grid grid-cols-2 gap-[8px]">
                        {selected.status !== "IN_PROGRESS" && selected.status !== "COMPLETED" && (
                          <button
                            onClick={() => handleStatusUpdate(selected.id, "IN_PROGRESS")}
                            className="flex items-center justify-center gap-[6px] rounded-[8px] border border-yellow-300 bg-yellow-50 px-[14px] py-[10px] text-[13px] font-semibold text-yellow-700 hover:bg-yellow-100 transition-colors"
                          >
                            <ArrowClockwise size={15} weight="bold" /> Mark In Progress
                          </button>
                        )}
                        {selected.status !== "COMPLETED" && (
                          <button
                            onClick={() => handleStatusUpdate(selected.id, "COMPLETED")}
                            className="flex items-center justify-center gap-[6px] rounded-[8px] border border-green-300 bg-green-50 px-[14px] py-[10px] text-[13px] font-semibold text-green-700 hover:bg-green-100 transition-colors"
                          >
                            <CheckCircle size={15} weight="bold" /> Mark Completed
                          </button>
                        )}
                        {selected.status !== "DISMISSED" && (
                          <button
                            onClick={() => handleStatusUpdate(selected.id, "DISMISSED")}
                            className="col-span-2 flex items-center justify-center gap-[6px] rounded-[8px] border border-black/10 bg-white px-[14px] py-[8px] text-[12px] font-medium text-[#71717a] hover:bg-black/[0.03] transition-colors"
                          >
                            <X size={14} /> Dismiss
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
