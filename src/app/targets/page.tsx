"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { fetchAPI, getBaselines, getTargets, createTarget, getTargetProgress } from "@/lib/api";
import { toast } from "sonner";
import { Target as TargetIcon, Flag, CheckCircle } from "@phosphor-icons/react";

export default function TargetsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [activeBaseline, setActiveBaseline] = useState<any>(null);
  const [targets, setTargets] = useState<any[]>([]);
  const [targetProgressMap, setTargetProgressMap] = useState<Record<string, any>>({});
  
  const [formData, setFormData] = useState({
    targetYear: new Date().getFullYear() + 5,
    reductionPct: 20,
    description: ""
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const uId = localStorage.getItem("universityId");
      if (!uId) return;

      const [resBaselines, resTargets] = await Promise.all([
        getBaselines(),
        getTargets()
      ]);

      let baseline = null;
      if (resBaselines.success) {
        baseline = resBaselines.data.find((b: any) => b.status === "APPROVED");
        setActiveBaseline(baseline);
      }

      if (resTargets.success && baseline) {
        setTargets(resTargets.data);
        
        // Fetch progress for each target
        const currentPeriodId = localStorage.getItem("reportingPeriodId") || "";
        if (currentPeriodId) {
          const progressPromises = resTargets.data.map((t: any) => 
            getTargetProgress(t.id, currentPeriodId).then(r => ({ id: t.id, data: r.data })).catch(() => ({ id: t.id, data: null }))
          );
          const progresses = await Promise.all(progressPromises);
          const pMap: Record<string, any> = {};
          progresses.forEach(p => {
            if (p.data) pMap[p.id] = p.data;
          });
          setTargetProgressMap(pMap);
        }
      }
    } catch (err) {
      toast.error("Failed to load targets data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitTarget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBaseline) {
      toast.error("An approved baseline is required to set a target.");
      return;
    }
    
    try {
      setLoading(true);
      const res = await createTarget({
        targetYear: Number(formData.targetYear),
        reductionPct: Number(formData.reductionPct),
        description: formData.description
      });
      
      if (res.success) {
        toast.success("Target created successfully");
        setFormData(prev => ({ ...prev, description: "", targetYear: prev.targetYear + 5 }));
        await fetchData();
      } else {
        toast.error(res.message || "Failed to create target");
      }
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"targets"} onChange={() => {}} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar 
          onMenu={() => setMenuOpen(true)} 
          title="Sustainability Targets" 
          subtitle="Set reduction targets against your established baseline" 
        />

        <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-[24px]">
            
            {/* Active Baseline Status */}
            {!activeBaseline ? (
              <div className="rounded-[12px] border border-orange-200 bg-orange-50 p-[24px] text-orange-800">
                <h2 className="text-[16px] font-semibold mb-[4px]">No Active Baseline Found</h2>
                <p className="text-[13px]">You must establish and confirm a baseline in the Baseline Management section before setting targets.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
                {/* Create Target Form */}
                <div className="md:col-span-1 flex flex-col gap-[16px]">
                  <div className="rounded-[12px] border border-black/[0.08] bg-white p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <div className="mb-[20px]">
                      <h2 className="text-[16px] font-semibold text-black">Set New Target</h2>
                      <p className="text-[13px] text-[#71717a]">Baseline Year: {activeBaseline.baselineYear} ({(activeBaseline.totalKgCO2e / 1000).toLocaleString()} tCO₂e)</p>
                    </div>
                    
                    <form onSubmit={handleSubmitTarget} className="flex flex-col gap-[16px]">
                      <div className="flex flex-col gap-[6px]">
                        <label className="text-[13px] font-medium text-[#52525b]">Target Year *</label>
                        <input 
                          required
                          type="number"
                          className="rounded-[8px] border border-black/[0.1] bg-white px-[12px] py-[8px] text-[14px] outline-none focus:border-black focus:ring-1 focus:ring-black"
                          value={formData.targetYear}
                          onChange={(e) => setFormData(prev => ({ ...prev, targetYear: parseInt(e.target.value) || 2030 }))}
                        />
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <label className="text-[13px] font-medium text-[#52525b]">Reduction Percentage (%) *</label>
                        <div className="flex items-center gap-[12px]">
                          <input 
                            required
                            type="range"
                            min="1"
                            max="100"
                            className="flex-1"
                            value={formData.reductionPct}
                            onChange={(e) => setFormData(prev => ({ ...prev, reductionPct: parseInt(e.target.value) || 0 }))}
                          />
                          <span className="text-[16px] font-semibold text-black w-[40px] text-right">{formData.reductionPct}%</span>
                        </div>
                        <p className="text-[12px] text-[#a1a1aa] mt-[4px]">
                          Target emissions: {((activeBaseline.totalKgCO2e / 1000) * (1 - formData.reductionPct / 100)).toLocaleString(undefined, { maximumFractionDigits: 1 })} tCO₂e
                        </p>
                      </div>
                      <button 
                        disabled={loading}
                        className="mt-[8px] flex w-full items-center justify-center gap-[6px] rounded-[8px] bg-black px-[16px] py-[10px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors disabled:opacity-50"
                      >
                        <TargetIcon size={18} weight="bold" /> Create Target
                      </button>
                    </form>
                  </div>
                </div>

                {/* Targets List */}
                <div className="md:col-span-2 flex flex-col gap-[16px]">
                  {targets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-[12px] border border-dashed border-black/[0.1] bg-[#fafafa] py-[64px] text-center">
                      <div className="mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-black/[0.04]">
                        <Flag size={24} className="text-[#a1a1aa]" />
                      </div>
                      <h3 className="text-[14px] font-semibold text-black">No targets set</h3>
                      <p className="mt-[4px] text-[13px] text-[#71717a]">Create your first reduction target to track progress.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[16px]">
                      {targets.map(target => {
                        const progress = targetProgressMap[target.id];
                        
                        return (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={target.id} 
                            className="rounded-[12px] border border-black/[0.08] bg-white p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                          >
                            <div className="flex items-start justify-between mb-[24px]">
                              <div>
                                <div className="flex items-center gap-[8px] mb-[4px]">
                                  <h3 className="text-[18px] font-semibold text-black">{target.targetYear} Target</h3>
                                  <span className="rounded-full bg-green-100 px-[8px] py-[2px] text-[11px] font-bold text-green-700">
                                    {target.reductionPct}% REDUCTION
                                  </span>
                                </div>
                                <p className="text-[13px] text-[#71717a]">Target limit: {(target.targetCo2eKg / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} tCO₂e</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[12px] font-medium text-[#71717a] mb-[2px]">Progress towards goal</p>
                                <p className="text-[20px] font-semibold text-black">
                                  {progress ? progress.progressPercent : 0}%
                                </p>
                              </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="relative h-[8px] w-full overflow-hidden rounded-full bg-black/[0.04]">
                              <div 
                                className="absolute left-0 top-0 h-full bg-black transition-all duration-1000 ease-out" 
                                style={{ width: `${Math.min(Math.max(progress ? progress.progressPercent : 0, 0), 100)}%` }} 
                              />
                            </div>
                            
                            {progress && (
                              <div className="mt-[16px] grid grid-cols-3 gap-[12px] pt-[16px] border-t border-black/[0.04]">
                                <div>
                                  <p className="text-[12px] text-[#71717a]">Baseline</p>
                                  <p className="text-[14px] font-semibold text-black">{progress.baselineTCO2e.toLocaleString()} <span className="text-[11px] font-normal text-[#a1a1aa]">tCO₂e</span></p>
                                </div>
                                <div>
                                  <p className="text-[12px] text-[#71717a]">Current Emissions</p>
                                  <p className="text-[14px] font-semibold text-black">{progress.currentTCO2e.toLocaleString()} <span className="text-[11px] font-normal text-[#a1a1aa]">tCO₂e</span></p>
                                </div>
                                <div>
                                  <p className="text-[12px] text-[#71717a]">Required Reduction</p>
                                  <p className="text-[14px] font-semibold text-black">{progress.requiredReductionTCO2e.toLocaleString()} <span className="text-[11px] font-normal text-[#a1a1aa]">tCO₂e</span></p>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
