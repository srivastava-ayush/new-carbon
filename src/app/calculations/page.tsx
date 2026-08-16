"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getReviewActivities, calculateEmissions } from "@/lib/api";
import { Calculator, Eye, ClockCounterClockwise, LockKey } from "@phosphor-icons/react";
import { toast } from "sonner";
import CalculationDetailsModal from "./CalculationDetailsModal";
import { useReportingPeriodStatus } from "@/hooks/useReportingPeriodStatus";

export default function CalculationsPage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Locked status hook
  const { isLocked } = useReportingPeriodStatus();

  // View State
  const [viewActivity, setViewActivity] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // We can use getReviewActivities as it fetches all activities
      const response = await getReviewActivities();
      if (response.success && response.data) {
        // Only show VERIFIED or CALCULATED activities
        const filtered = response.data.filter((item: any) => item.status === "VERIFIED" || item.status === "CALCULATED");
        setData(filtered);
      } else {
        toast.error("Failed to fetch activities");
      }
    } catch (err: any) {
      toast.error(err.message || "Error loading activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCalculate = async (id: string) => {
    try {
      const res = await calculateEmissions(id);
      if (res.success && res.data) {
        toast.success("Calculation complete");
        fetchData();
        // optionally open the modal automatically:
        // const updatedActivity = data.find(a => a.id === id);
        // if(updatedActivity) setViewActivity({...updatedActivity, calculations: [res.data]});
      } else {
        toast.error(res.message || "Calculation failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Calculation failed");
    }
  };

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"calculations"} onChange={() => {}} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar 
            onMenu={() => setMenuOpen(true)} 
            title="Calculations" 
            subtitle="View calculation history and process verified activities" 
          />

          <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-[16px]">
              
              <div className="flex items-center justify-between">
                <h1 className="text-[18px] font-semibold text-black">Calculation History</h1>
                <button 
                  onClick={fetchData}
                  className="flex items-center gap-[6px] rounded-[8px] bg-white border border-black/[0.08] px-[12px] py-[6px] text-[12px] font-semibold text-black hover:bg-black/5"
                >
                  <ClockCounterClockwise size={14} /> Refresh
                </button>
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
                        <th className="px-[16px] py-[12px]">Activity</th>
                        <th className="px-[16px] py-[12px]">Category</th>
                        <th className="px-[16px] py-[12px]">Scope</th>
                        <th className="px-[16px] py-[12px]">Quantity</th>
                        <th className="px-[16px] py-[12px]">EF</th>
                        <th className="px-[16px] py-[12px]">CO₂e</th>
                        <th className="px-[16px] py-[12px]">Source</th>
                        <th className="px-[16px] py-[12px]">Status</th>
                        <th className="px-[16px] py-[12px] text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={9} className="px-[16px] py-[32px] text-center text-[13px] text-[#71717a]">
                            Loading calculation data...
                          </td>
                        </tr>
                      ) : data.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="px-[16px] py-[32px] text-center text-[13px] text-[#71717a]">
                            No activities available for calculation.
                          </td>
                        </tr>
                      ) : (
                        data.map((item) => {
                          const calc = item.calculations?.[0];
                          const hasCalc = !!calc;
                          return (
                          <tr key={item.id} className="border-b border-black/[0.04] last:border-none hover:bg-black/[0.01] transition-colors">
                            <td className="px-[16px] py-[14px] text-[13px] font-medium text-black">
                              {item.document?.fileName ? item.document.fileName : (item.description || "Manual Entry")}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#52525b]">
                              {item.category.replace(/_/g, " ")}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#52525b]">
                              {item.scope.replace("SCOPE_", "S")}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] font-medium text-black">
                              {item.quantity} <span className="text-[#71717a] font-normal">{item.unit}</span>
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#52525b]">
                              {hasCalc ? calc.emissionFactor?.factorValue || "0.7117" : "—"}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] font-semibold text-[#16a34a]">
                              {hasCalc ? `${calc.co2eKg?.toFixed(2)} kg` : "—"}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#52525b]">
                              {hasCalc ? (calc.emissionFactor?.source || calc.factorSource || "CEA") : "—"}
                            </td>
                            <td className="px-[16px] py-[14px]">
                                {item.status === "CALCULATED" ? (
                                    <span className="rounded bg-[#0d3b2d] px-2 py-1 text-xs font-semibold text-white">CALCULATED</span>
                                ) : (
                                    <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">VERIFIED</span>
                                )}
                            </td>
                            <td className="px-[16px] py-[14px] text-right">
                                {item.status === "VERIFIED" ? (
                                  isLocked ? (
                                    <button 
                                      disabled
                                      className="flex items-center gap-[4px] ml-auto rounded-[6px] bg-black/10 px-[8px] py-[4px] text-[11px] font-semibold text-black/40 cursor-not-allowed"
                                    >
                                      <LockKey size={14} weight="bold" /> Locked
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => handleCalculate(item.id)}
                                      className="flex items-center gap-[4px] ml-auto rounded-[6px] bg-[#0d3b2d] px-[8px] py-[4px] text-[11px] font-semibold text-white hover:bg-[#16a34a] transition-colors"
                                    >
                                      <Calculator size={14} weight="bold" /> Calculate
                                    </button>
                                  )
                                ) : (
                                  <button 
                                    onClick={() => setViewActivity(item)}
                                    className="flex items-center justify-end gap-[4px] ml-auto text-[13px] font-semibold text-black hover:text-[#71717a] transition-colors"
                                  >
                                    <Eye size={16} weight="bold" /> View
                                  </button>
                                )}
                            </td>
                          </tr>
                        )})
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>

            </div>
          </main>
        </div>

        <AnimatePresence>
          {viewActivity && (
            <CalculationDetailsModal 
              activity={viewActivity} 
              onClose={() => setViewActivity(null)}
              onViewActivity={() => {
                setViewActivity(null);
                // In a real app, this might navigate to /review or /activity-data to view full details
              }}
            />
          )}
        </AnimatePresence>

    </div>
  );
}
