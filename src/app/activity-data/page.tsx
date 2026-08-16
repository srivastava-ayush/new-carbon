"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getActivityData, deleteActivityData, submitActivityData } from "@/lib/api";
import { Plus, UploadSimple, FileArrowUp, PencilSimple, Trash, Eye, PaperPlaneRight, LockKey } from "@phosphor-icons/react";
import { toast } from "sonner";
import AddActivityModal from "./AddActivityModal";
import ViewActivityModal from "./ViewActivityModal";
import { useReportingPeriodStatus } from "@/hooks/useReportingPeriodStatus";

export default function ActivityDataPage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewActivity, setViewActivity] = useState<any>(null);

  const { isLocked } = useReportingPeriodStatus();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getActivityData();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        toast.error("Failed to fetch activity data");
      }
    } catch (err: any) {
      toast.error(err.message || "Error loading activity data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this draft?")) return;
    try {
      await deleteActivityData(id);
      toast.success("Activity deleted");
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  const handleSubmit = async (id: string) => {
    if (!confirm("Submit this activity for review? It will no longer be editable.")) return;
    try {
      await submitActivityData(id);
      toast.success("Activity submitted for review");
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">Draft</span>;
      case "SUBMITTED":
      case "UNDER_REVIEW":
        return <span className="rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-600">Review</span>;
      case "VERIFIED":
        return <span className="rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">Verified</span>;
      case "REJECTED":
        return <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">Rejected</span>;
      default:
        return <span className="rounded bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600">{status}</span>;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#fafafa]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"activity-data"} onChange={() => {}} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar 
            onMenu={() => setMenuOpen(true)} 
            title="Activity Data" 
            subtitle="Manage your primary data, invoices, and manual entries" 
          />

          <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-[16px]">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px] mb-[8px]">
                <div className="flex items-center gap-[8px]">
                  <button 
                    onClick={() => !isLocked && setIsModalOpen(true)}
                    disabled={isLocked}
                    className={`flex items-center gap-[6px] rounded-[8px] px-[12px] py-[8px] text-[13px] font-semibold transition-colors ${
                      isLocked 
                        ? "bg-black/10 text-black/40 cursor-not-allowed"
                        : "bg-[#16a34a] text-white hover:bg-[#15803d]"
                    }`}
                  >
                    {isLocked ? <LockKey size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
                    Add Activity
                  </button>
                  <button 
                    onClick={() => !isLocked && (window.location.href = "/activity-data/import")}
                    disabled={isLocked}
                    className={`flex items-center gap-[6px] rounded-[8px] border px-[12px] py-[8px] text-[13px] font-semibold transition-colors ${
                      isLocked 
                        ? "bg-black/5 border-transparent text-black/40 cursor-not-allowed"
                        : "bg-white border-black/[0.06] text-[#52525b] hover:bg-black/5"
                    }`}
                  >
                    <UploadSimple size={14} weight="bold" />
                    Import Excel/CSV
                  </button>
                </div>
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
                        <th className="px-[16px] py-[12px]">Scope</th>
                        <th className="px-[16px] py-[12px]">Quantity</th>
                        <th className="px-[16px] py-[12px]">Unit</th>
                        <th className="px-[16px] py-[12px]">Status</th>
                        <th className="px-[16px] py-[12px]">CO₂e</th>
                        <th className="px-[16px] py-[12px] text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={8} className="px-[16px] py-[32px] text-center text-[13px] text-[#71717a]">
                            Loading activity data...
                          </td>
                        </tr>
                      ) : data.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-[16px] py-[32px] text-center text-[13px] text-[#71717a]">
                            No activity data found. Add your first record to begin.
                          </td>
                        </tr>
                      ) : (
                        data.map((item) => (
                          <tr key={item.id} className="border-b border-black/[0.04] last:border-none hover:bg-black/[0.01] transition-colors">
                            <td className="px-[16px] py-[14px] text-[13px] font-medium text-black">
                              {item.activityDate ? new Date(item.activityDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'short' }) : "N/A"}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#52525b]">
                              {item.category.replace(/_/g, " ")}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#52525b]">
                              {item.scope.replace("_", " ")}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] font-medium text-black">
                              {item.quantity}
                            </td>
                            <td className="px-[16px] py-[14px] text-[13px] text-[#71717a]">
                              {item.unit}
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
                              <div className="flex items-center justify-end gap-[8px]">
                                {(item.status === "DRAFT" || item.status === "REJECTED") ? (
                                  isLocked ? (
                                    <button 
                                      onClick={() => setViewActivity(item)}
                                      className="text-[#a1a1aa] hover:text-black transition-colors" title="View Details"
                                    >
                                      <Eye size={16} weight="bold" />
                                    </button>
                                  ) : (
                                    <>
                                      <button className="text-[#a1a1aa] hover:text-black transition-colors" title="Edit">
                                        <PencilSimple size={16} weight="bold" />
                                      </button>
                                      <button 
                                        onClick={() => handleDelete(item.id)}
                                        className="text-[#ef4444] hover:text-[#b91c1c] transition-colors" title="Delete"
                                      >
                                        <Trash size={16} weight="bold" />
                                      </button>
                                      <button 
                                        onClick={() => handleSubmit(item.id)}
                                        className="text-[#16a34a] hover:text-[#15803d] transition-colors" title="Submit"
                                      >
                                        <PaperPlaneRight size={16} weight="bold" />
                                      </button>
                                    </>
                                  )
                                ) : (
                                  <button 
                                    onClick={() => setViewActivity(item)}
                                    className="text-[#a1a1aa] hover:text-black transition-colors" title="View Details"
                                  >
                                    <Eye size={16} weight="bold" />
                                  </button>
                                )}
                              </div>
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

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <AddActivityModal 
              onClose={() => setIsModalOpen(false)} 
              onSuccess={() => {
                setIsModalOpen(false);
                fetchData();
              }}
            />
          )}
          {viewActivity && (
            <ViewActivityModal activity={viewActivity} onClose={() => setViewActivity(null)} />
          )}
        </AnimatePresence>
    </div>
  );
}
