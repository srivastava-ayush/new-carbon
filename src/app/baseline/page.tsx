"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { fetchAPI, getBaselines, createBaseline, approveBaseline, getBaselineComparison } from "@/lib/api";
import { toast } from "sonner";
import { CheckCircle, LockKey } from "@phosphor-icons/react";
import BaselineComparisonView from "./BaselineComparisonView";

export default function BaselinePage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [periods, setPeriods] = useState<any[]>([]);
  const [baselines, setBaselines] = useState<any[]>([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  
  const [activeBaseline, setActiveBaseline] = useState<any>(null);
  const [comparisonData, setComparisonData] = useState<any>(null);

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const fetchData = async () => {
    try {
      setLoading(true);
      const uId = localStorage.getItem("universityId");
      if (!uId) return;

      const [resPeriods, resBaselines] = await Promise.all([
        fetchAPI(`/reporting-periods?universityId=${uId}`),
        getBaselines()
      ]);

      if (resPeriods.success) {
        setPeriods(resPeriods.data);
      }

      if (resBaselines.success) {
        setBaselines(resBaselines.data);
        const approved = resBaselines.data.find((b: any) => b.status === "APPROVED");
        if (approved) {
          setActiveBaseline(approved);
          loadComparison(approved.id);
        } else if (resBaselines.data.length > 0) {
          setActiveBaseline(resBaselines.data[0]);
          loadComparison(resBaselines.data[0].id);
        }
      }
    } catch (err) {
      toast.error("Failed to load baseline data");
    } finally {
      setLoading(false);
    }
  };

  const loadComparison = async (baselineId: string) => {
    try {
      const res = await getBaselineComparison(baselineId);
      if (res.success) {
        setComparisonData(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSetBaseline = async () => {
    if (!selectedPeriodId) {
      toast.error("Please select a reporting period");
      return;
    }
    
    try {
      setLoading(true);
      const res = await createBaseline({
        reportingPeriodId: selectedPeriodId,
        methodology: "GHG Protocol Corporate Standard",
        notes: "Initial baseline"
      });
      
      if (res.success) {
        toast.success("Baseline drafted successfully");
        await fetchData();
      } else {
        toast.error(res.message || "Failed to draft baseline");
      }
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBaseline = async (id: string) => {
    try {
      setLoading(true);
      const res = await approveBaseline(id);
      if (res.success) {
        toast.success("Baseline confirmed and active");
        await fetchData();
      } else {
        toast.error(res.message || "Failed to confirm baseline");
      }
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"baseline"} onChange={() => {}} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar 
          onMenu={() => setMenuOpen(true)} 
          title="Baseline Management" 
          subtitle="Compare current emissions against a fixed historical period" 
        />

        <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-[24px]">
            
            {/* Baseline Selection */}
            {isAdmin && (!activeBaseline || activeBaseline.status !== "APPROVED") && (
              <div className="rounded-[12px] border border-black/[0.08] bg-white p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-[16px]">
                <div>
                  <h2 className="text-[16px] font-semibold text-black">Select Baseline Period</h2>
                  <p className="text-[13px] text-[#71717a]">Choose a historical reporting period to act as the baseline.</p>
                </div>
                
                <div className="flex items-end gap-[16px] max-w-[500px]">
                  <div className="flex-1 flex flex-col gap-[6px]">
                    <select 
                      className="rounded-[8px] border border-black/[0.1] bg-white px-[12px] py-[8px] text-[14px] outline-none focus:border-black focus:ring-1 focus:ring-black w-full"
                      value={selectedPeriodId}
                      onChange={e => setSelectedPeriodId(e.target.value)}
                    >
                      <option value="" disabled>Select Reporting Period</option>
                      {periods.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.status})</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    onClick={handleSetBaseline}
                    disabled={loading || !selectedPeriodId}
                    className="flex shrink-0 items-center gap-[6px] rounded-[8px] bg-black px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors disabled:opacity-50"
                  >
                    Draft Baseline
                  </button>
                </div>
              </div>
            )}

            {/* Active Baseline Status */}
            {activeBaseline && (
              <div className="rounded-[12px] border border-black/[0.08] bg-white p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-[16px]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[16px] font-semibold text-black">Current Baseline</h2>
                    <p className="text-[13px] text-[#71717a]">This baseline is being used for target and reduction tracking.</p>
                  </div>
                  {activeBaseline.status === "APPROVED" ? (
                    <div className="flex items-center gap-[6px] rounded-[8px] bg-green-50 border border-green-200 px-[12px] py-[6px] text-[12px] font-semibold text-green-700">
                      <CheckCircle size={16} weight="bold" /> BASELINE ACTIVE
                    </div>
                  ) : (
                    <div className="flex items-center gap-[12px]">
                      <span className="text-[12px] font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">DRAFT</span>
                      {isAdmin && (
                        <button 
                          onClick={() => handleConfirmBaseline(activeBaseline.id)}
                          className="flex items-center gap-[6px] rounded-[8px] bg-[#16a34a] px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-[#15803d] transition-colors"
                        >
                          <LockKey size={16} weight="bold" /> Confirm Baseline
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-[40px] pt-[16px] border-t border-black/[0.06]">
                  <div>
                    <p className="text-[12px] font-medium text-[#71717a]">Baseline Year</p>
                    <p className="text-[16px] font-semibold text-black">{activeBaseline.baselineYear}</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-[#71717a]">Total Emissions</p>
                    <p className="text-[16px] font-semibold text-black">{(activeBaseline.totalKgCO2e / 1000).toLocaleString()} <span className="text-[12px] text-[#a1a1aa] font-medium">tCO₂e</span></p>
                  </div>
                </div>
              </div>
            )}

            {/* Comparison View */}
            {comparisonData && (
              <BaselineComparisonView comparisonData={comparisonData} />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
