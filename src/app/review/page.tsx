"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getReviewActivities, verifyActivityData, rejectActivityData, calculateEmissions, startReviewActivityData } from "@/lib/api";
import { CheckCircle, XCircle, Calculator, Eye, WarningCircle, ArrowRight } from "@phosphor-icons/react";
import { toast } from "sonner";
import CalculationResultModal from "./CalculationResultModal";
import ReviewDetailsModal from "./ReviewDetailsModal";

export default function ReviewPage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Reject Modal State
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [filter, setFilter] = useState("All");
  
  // Calculation & View State
  const [calcResult, setCalcResult] = useState<any>(null);
  const [viewActivity, setViewActivity] = useState<any>(null);

  const isReviewer = ["SUPER_ADMIN", "UNIVERSITY_ADMIN", "MANAGEMENT", "REVIEWER", "AUDITOR"].includes(user?.role || "");

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getReviewActivities();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        toast.error("Failed to fetch review data");
      }
    } catch (err: any) {
      toast.error(err.message || "Error loading review data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isReviewer) fetchData();
  }, [isReviewer]);

  const handleVerify = async (id: string) => {
    if (!confirm("Approve this activity data? It will be marked as verified.")) return;
    try {
      await verifyActivityData(id);
      toast.success("Activity verified successfully");
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to verify");
    }
  };

  const handleStartReview = async (id: string) => {
    try {
      await startReviewActivityData(id);
      toast.success("Review started");
      fetchData();
      setViewActivity(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to start review");
    }
  };

  const handleReject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectId || !rejectReason.trim()) return;
    try {
      await rejectActivityData(rejectId, rejectReason);
      toast.success("Activity rejected");
      setRejectId(null);
      setRejectReason("");
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to reject");
    }
  };

  const handleCalculate = async (id: string) => {
    try {
      const res = await calculateEmissions(id);
      if (res.success && res.data) {
        setCalcResult(res.data);
        fetchData();
      } else {
        toast.error(res.message || "Calculation failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Calculation failed");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT": return <span className="flex items-center gap-[4px] rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">⚪ Draft</span>;
      case "SUBMITTED": return <span className="flex items-center gap-[4px] rounded bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">🟡 Submitted</span>;
      case "UNDER_REVIEW": return <span className="flex items-center gap-[4px] rounded bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">🟠 Under Review</span>;
      case "VERIFIED": return <span className="flex items-center gap-[4px] rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">🟢 Verified</span>;
      case "REJECTED": return <span className="flex items-center gap-[4px] rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">🔴 Rejected</span>;
      case "CALCULATED": return <span className="flex items-center gap-[4px] rounded bg-[#0d3b2d] px-2 py-1 text-xs font-semibold text-white">✨ Calculated</span>;
      default: return <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">{status}</span>;
    }
  };

  const filteredData = data.filter(item => {
    if (filter === "All") return true;
    if (filter === "Submitted") return item.status === "SUBMITTED";
    if (filter === "Under Review") return item.status === "UNDER_REVIEW";
    if (filter === "Verified") return item.status === "VERIFIED" || item.status === "CALCULATED";
    if (filter === "Rejected") return item.status === "REJECTED";
    return true;
  });

  if (user && !isReviewer) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-[#a1a1aa]">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"review"} onChange={() => {}} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar 
            onMenu={() => setMenuOpen(true)} 
            title="Data Review" 
            subtitle="Verify submitted activity data and calculate emissions" 
          />

          <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-[16px]">
              
              <div className="flex items-center gap-[8px] overflow-x-auto pb-[4px] scrollbar-hide">
                {["All", "Submitted", "Under Review", "Verified", "Rejected"].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`rounded-[8px] px-[16px] py-[6px] text-[13px] font-semibold whitespace-nowrap transition-colors ${
                      filter === tab 
                        ? "bg-black text-white" 
                        : "bg-white border border-black/[0.08] text-[#52525b] hover:bg-black/5"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-[12px] border border-black/[0.08] bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                      <tr className="border-b border-black/[0.06] bg-[#fafafa] text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#71717a]">
                        <th className="px-[16px] py-[12px]">Date</th>
                        <th className="px-[16px] py-[12px]">Category</th>
                        <th className="px-[16px] py-[12px]">Quantity</th>
                        <th className="px-[16px] py-[12px]">Submitted By</th>
                        <th className="px-[16px] py-[12px]">Status</th>
                        <th className="px-[16px] py-[12px]">CO₂e</th>
                        <th className="px-[16px] py-[12px] text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={7} className="px-[16px] py-[32px] text-center text-[13px] text-[#71717a]">
                            Loading review data...
                          </td>
                        </tr>
                      ) : filteredData.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-[16px] py-[32px] text-center text-[13px] text-[#71717a]">
                            No activities match this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredData.map((item) => (
                          <tr key={item.id} className="border-b border-black/[0.04] last:border-none hover:bg-black/[0.01] transition-colors">
                            <td className="px-[16px] py-[14px] text-[13px] font-medium text-black">
                              {item.activityDate ? new Date(item.activityDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' }) : "N/A"}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#52525b]">
                              {item.category.replace(/_/g, " ")}
                              <p className="text-[11px] text-[#a1a1aa] mt-[2px]">{item.scope.replace("_", " ")}</p>
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] font-medium text-black">
                              {item.quantity} <span className="text-[#71717a] font-normal">{item.unit}</span>
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#52525b]">
                              {item.createdBy?.firstName ? `${item.createdBy.firstName} ${item.createdBy.lastName || ""}` : "System"}
                            </td>
                            <td className="px-[16px] py-[14px]">
                              {getStatusBadge(item.status)}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] font-semibold text-[#16a34a]">
                              {item.status === "CALCULATED" || item.calculations?.length > 0
                                ? `${Math.round(item.calculations[0]?.co2eKg || 0)} kg`
                                : "—"}
                            </td>
                            <td className="px-[16px] py-[14px] text-right">
                              <button 
                                onClick={() => setViewActivity(item)}
                                className="flex items-center justify-end gap-[4px] ml-auto text-[13px] font-semibold text-[#16a34a] hover:text-[#15803d] transition-colors"
                              >
                                Review <ArrowRight size={14} weight="bold" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>

            </div>
          </main>
        </div>

        {/* Reject Modal */}
        <AnimatePresence>
          {rejectId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setRejectId(null)}
              />
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="relative z-10 w-full max-w-sm rounded-[16px] bg-white p-[24px] shadow-xl mx-[20px]"
              >
                <div className="mb-[16px] flex items-center gap-[12px]">
                  <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <WarningCircle size={24} weight="fill" />
                  </div>
                  <div>
                    <h2 className="text-[16px] font-semibold text-black">Reject Activity</h2>
                    <p className="text-[13px] text-[#71717a]">Please provide a reason for rejection.</p>
                  </div>
                </div>
                <form onSubmit={handleReject} className="flex flex-col gap-[16px]">
                  <textarea
                    required
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="E.g., Quantity seems incorrect, please re-check invoice."
                    className="h-[80px] w-full resize-none rounded-[8px] border border-black/[0.08] bg-white p-[12px] text-[13px] text-black outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  />
                  <div className="flex justify-end gap-[12px]">
                    <button type="button" onClick={() => setRejectId(null)} className="rounded-[8px] px-[16px] py-[8px] text-[13px] font-semibold text-[#52525b] hover:bg-black/5">Cancel</button>
                    <button type="submit" className="rounded-[8px] bg-red-600 px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-red-700">Reject Data</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Calculation Result Modal */}
        <AnimatePresence>
          {calcResult && (
            <CalculationResultModal result={calcResult} onClose={() => setCalcResult(null)} />
          )}
          {viewActivity && (
            <ReviewDetailsModal 
              activity={viewActivity} 
              onClose={() => setViewActivity(null)}
              onVerify={handleVerify}
              onStartReview={handleStartReview}
              onRejectClick={(id) => setRejectId(id)}
              onCalculate={handleCalculate}
              onSuccess={() => { setViewActivity(null); fetchData(); }}
            />
          )}
        </AnimatePresence>

    </div>
  );
}
