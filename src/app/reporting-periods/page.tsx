"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { fetchAPI, lockReportingPeriod, openReportingPeriod } from "@/lib/api";
import { Plus, LockKey, LockOpen, CalendarBlank } from "@phosphor-icons/react";
import { toast } from "sonner";
import ReportingPeriodModal from "./ReportingPeriodModal";

export default function ReportingPeriodsPage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    const uId = localStorage.getItem("universityId");
    if (!uId) return;

    try {
      setLoading(true);
      const response = await fetchAPI(`/reporting-periods?universityId=${uId}`);
      if (response.success && response.data) {
        setData(response.data);
      } else {
        toast.error("Failed to fetch reporting periods");
      }
    } catch (err: any) {
      toast.error(err.message || "Error loading periods");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleLock = async (id: string, currentStatus: string) => {
    try {
      if (currentStatus === "OPEN") {
        if (!confirm("Once locked, activities and calculations in this reporting period cannot be modified. Continue?")) return;
        const res = await lockReportingPeriod(id);
        if (res.success) toast.success("Period Locked successfully");
        else toast.error(res.message || "Failed to lock period");
      } else {
        if (!confirm("Are you sure you want to unlock this period?")) return;
        const res = await openReportingPeriod(id);
        if (res.success) toast.success("Period Unlocked successfully");
        else toast.error(res.message || "Failed to unlock period");
      }
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    }
  };

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"reporting-periods"} onChange={() => {}} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar 
            onMenu={() => setMenuOpen(true)} 
            title="Reporting Periods" 
            subtitle="Manage emission data timelines and boundaries" 
          />

          <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-[16px]">
              
              <div className="flex items-center justify-between">
                <h1 className="text-[18px] font-semibold text-black">All Reporting Periods</h1>
                {isAdmin && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-[6px] rounded-[8px] bg-black px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors"
                  >
                    <Plus size={16} weight="bold" /> Create Reporting Period
                  </button>
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]"
              >
                {loading ? (
                  <div className="col-span-full py-[32px] text-center text-[13px] text-[#71717a]">
                    Loading reporting periods...
                  </div>
                ) : data.length === 0 ? (
                  <div className="col-span-full py-[32px] text-center text-[13px] text-[#71717a]">
                    No reporting periods found.
                  </div>
                ) : (
                  data.map((item) => (
                    <div key={item.id} className="flex flex-col gap-[16px] rounded-[12px] border border-black/[0.08] bg-white p-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-[12px]">
                          <div className={`flex h-[40px] w-[40px] items-center justify-center rounded-[8px] ${item.status === 'LOCKED' ? 'bg-red-50 text-red-600' : 'bg-[#f4f4f5] text-[#52525b]'}`}>
                            <CalendarBlank size={24} weight={item.isBaseline ? "fill" : "regular"} />
                          </div>
                          <div>
                            <h3 className="text-[15px] font-semibold text-black flex items-center gap-[8px]">
                              {item.name}
                              {item.isBaseline && <span className="rounded bg-black/[0.06] px-2 py-0.5 text-[10px] font-bold text-black uppercase">Baseline</span>}
                            </h3>
                            <p className="text-[12px] text-[#71717a]">
                              {new Date(item.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} 
                              {" → "}
                              {new Date(item.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-black/[0.06] pt-[16px]">
                        <div className="flex items-center gap-[8px]">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Status:</span>
                          <span className={`text-[12px] font-bold ${item.status === 'OPEN' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.status}
                          </span>
                        </div>
                        {isAdmin && (
                          <button 
                            onClick={() => handleToggleLock(item.id, item.status)}
                            className={`flex items-center gap-[6px] rounded-[6px] border px-[12px] py-[6px] text-[12px] font-medium transition-colors ${
                              item.status === 'OPEN' 
                                ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300' 
                                : 'border-black/[0.1] bg-white text-black hover:bg-black/5'
                            }`}
                          >
                            {item.status === 'OPEN' ? (
                              <><LockKey size={14} weight="bold" /> Lock Period</>
                            ) : (
                              <><LockOpen size={14} weight="bold" /> Unlock Period</>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>

            </div>
          </main>
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <ReportingPeriodModal 
              onClose={() => setIsModalOpen(false)}
              onSuccess={() => {
                setIsModalOpen(false);
                fetchData();
              }}
            />
          )}
        </AnimatePresence>
    </div>
  );
}
