"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { X, FileText, CheckCircle, WarningCircle, Calculator, MagnifyingGlassPlus, PencilSimple, FloppyDisk, PlayCircle, LockKey } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";
import { updateActivityData } from "@/lib/api";
import { toast } from "sonner";
import { useReportingPeriodStatus } from "@/hooks/useReportingPeriodStatus";

interface ReviewDetailsModalProps {
  activity: any;
  onClose: () => void;
  onVerify: (id: string) => void;
  onStartReview: (id: string) => void;
  onRejectClick: (id: string) => void;
  onCalculate: (id: string) => void;
  onSuccess: () => void;
}

export default function ReviewDetailsModal({ activity, onClose, onVerify, onStartReview, onRejectClick, onCalculate, onSuccess }: ReviewDetailsModalProps) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    quantity: activity?.quantity || 0,
    unit: activity?.unit || "",
    activityDate: activity?.activityDate ? new Date(activity.activityDate).toISOString().split('T')[0] : ""
  });

  const { isLocked } = useReportingPeriodStatus();

  if (!activity) return null;

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await updateActivityData(activity.id, {
        quantity: Number(formData.quantity),
        unit: formData.unit,
        activityDate: new Date(formData.activityDate).toISOString()
      });
      if (res.success) {
        toast.success("Activity updated successfully");
        setEditMode(false);
        onSuccess();
      } else {
        toast.error(res.message || "Failed to update");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative z-10 w-full max-w-4xl rounded-[16px] bg-white p-[24px] shadow-xl mx-[20px] max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="mb-[20px] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-[#f4f4f5] text-[#52525b]">
              <MagnifyingGlassPlus size={24} weight="bold" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-black">Review Activity Data</h2>
              <p className="text-[13px] text-[#71717a]">Compare user-entered values against the source document and OCR data.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#a1a1aa] hover:text-black transition-colors self-start mt-[-8px]">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-[8px]">
          <div className="grid grid-cols-[300px_1fr] gap-[24px]">
            
            <div className="flex flex-col gap-[16px]">
              <div className="rounded-[12px] border border-black/[0.08] bg-[#fafafa] p-[16px] flex flex-col gap-[12px]">
                <div className="flex items-center gap-[8px] text-[14px] font-semibold text-black mb-[4px]">
                  <FileText size={18} /> Source Document
                </div>
                {activity.document ? (
                  <>
                    <div className="flex flex-col gap-[4px] pb-[8px] border-b border-black/[0.04]">
                      <span className="text-[12px] font-semibold text-[#52525b]">File Name</span>
                      <span className="text-[12px] text-black font-medium break-all">{activity.document.fileName}</span>
                    </div>
                    {activity.document.fileUrl && (
                      <a href={activity.document.fileUrl} target="_blank" rel="noreferrer" className="mt-[4px] flex items-center justify-center gap-[6px] rounded-[8px] bg-white border border-black/[0.08] px-[12px] py-[8px] text-[12px] font-semibold text-black hover:bg-black/5 transition-colors">
                        View Document
                      </a>
                    )}
                  </>
                ) : (
                  <p className="text-[12px] text-[#71717a]">No document attached. Entered manually.</p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[16px]">
              <div className="rounded-[12px] border border-black/[0.08] overflow-hidden">
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#fafafa] border-b border-black/[0.08]">
                    <tr>
                      <th className="px-[16px] py-[12px] font-semibold text-[#71717a] w-1/3">Field</th>
                      <th className="px-[16px] py-[12px] font-semibold text-[#71717a] w-1/3">OCR Extracted</th>
                      <th className="px-[16px] py-[12px] font-semibold text-black w-1/3">User Entered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/[0.04]">
                      <td className="px-[16px] py-[12px] font-medium text-[#52525b]">Category</td>
                      <td className="px-[16px] py-[12px] text-[#71717a]">{activity.document?.extractedData?.category || "—"}</td>
                      <td className="px-[16px] py-[12px] font-medium text-black">{activity.category.replace(/_/g, " ")}</td>
                    </tr>
                    <tr className="border-b border-black/[0.04]">
                      <td className="px-[16px] py-[12px] font-medium text-[#52525b]">Scope</td>
                      <td className="px-[16px] py-[12px] text-[#71717a]">{activity.document?.extractedData?.scope || "—"}</td>
                      <td className="px-[16px] py-[12px] font-medium text-black">{activity.scope.replace("_", " ")}</td>
                    </tr>
                    <tr className="border-b border-black/[0.04]">
                      <td className="px-[16px] py-[12px] font-medium text-[#52525b]">Quantity</td>
                      <td className="px-[16px] py-[12px] text-[#71717a]">
                        {activity.document?.extractedData?.quantity ? `${activity.document.extractedData.quantity} ${activity.document.extractedData.unit || ''}` : "—"}
                      </td>
                      <td className="px-[16px] py-[12px] font-medium text-black">
                        {editMode ? (
                          <div className="flex items-center gap-[8px]">
                            <input 
                              type="number" 
                              value={formData.quantity} 
                              onChange={(e) => setFormData({...formData, quantity: e.target.value as any})}
                              className="h-[28px] w-[80px] rounded-[6px] border border-black/[0.1] px-[8px] text-[13px]"
                            />
                            <input 
                              type="text" 
                              value={formData.unit} 
                              onChange={(e) => setFormData({...formData, unit: e.target.value})}
                              className="h-[28px] w-[60px] rounded-[6px] border border-black/[0.1] px-[8px] text-[13px]"
                            />
                          </div>
                        ) : (
                          `${activity.quantity} ${activity.unit}`
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-black/[0.04]">
                      <td className="px-[16px] py-[12px] font-medium text-[#52525b]">Date</td>
                      <td className="px-[16px] py-[12px] text-[#71717a]">
                        {activity.document?.extractedData?.activityDate ? new Date(activity.document.extractedData.activityDate).toLocaleDateString("en-GB") : "—"}
                      </td>
                      <td className="px-[16px] py-[12px] font-medium text-black">
                        {editMode ? (
                          <input 
                            type="date" 
                            value={formData.activityDate} 
                            onChange={(e) => setFormData({...formData, activityDate: e.target.value})}
                            className="h-[28px] rounded-[6px] border border-black/[0.1] px-[8px] text-[13px]"
                          />
                        ) : (
                          new Date(activity.activityDate).toLocaleDateString("en-GB")
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {editMode && (
                <div className="flex justify-end">
                  <button 
                    disabled={loading}
                    onClick={handleSave}
                    className="flex items-center gap-[6px] rounded-[8px] bg-black px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors disabled:opacity-50"
                  >
                    <FloppyDisk size={16} /> {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}

              {activity.status === "VERIFIED" && activity.calculations?.length > 0 && (
                <div className="rounded-[12px] border border-[#16a34a]/20 bg-[#f0fdf4] p-[16px]">
                  <div className="flex items-center gap-[12px] mb-[8px]">
                    <Calculator size={20} weight="fill" className="text-[#16a34a]" />
                    <h3 className="text-[14px] font-bold text-[#15803d]">Calculation Result</h3>
                  </div>
                  <div className="font-mono text-[13px] text-[#16a34a] bg-white p-[12px] rounded-[8px] border border-[#16a34a]/20">
                    {activity.quantity} {activity.unit} × {activity.calculations[0].emissionFactor?.factorValue || "0.7117"} kgCO₂e/{activity.unit} = <span className="font-bold text-[15px]">{activity.calculations[0].co2eKg.toFixed(2)} kgCO₂e</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        <div className="mt-[20px] pt-[16px] border-t border-black/[0.08] shrink-0 flex justify-between gap-[12px]">
          <div className="flex items-center">
            {isLocked && (
              <span className="flex items-center gap-[6px] text-[13px] font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100">
                <LockKey size={16} weight="bold" /> Reporting Period is Locked
              </span>
            )}
          </div>
          
          <div className="flex justify-end gap-[12px]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[8px] px-[16px] py-[8px] text-[13px] font-semibold text-[#52525b] hover:bg-black/5 transition-colors"
            >
              Close
            </button>
            
            {!isLocked && (
              <>
                {activity.status === "SUBMITTED" && (
                  <button
                    onClick={() => onStartReview(activity.id)}
                    className="flex items-center gap-[6px] rounded-[8px] bg-blue-600 px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    <PlayCircle size={16} weight="bold" /> Start Review
                  </button>
                )}

                {activity.status === "UNDER_REVIEW" && (
                  <>
                    {!editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className="flex items-center gap-[6px] rounded-[8px] bg-white border border-black/[0.08] px-[16px] py-[8px] text-[13px] font-semibold text-black hover:bg-black/5 transition-colors"
                      >
                        <PencilSimple size={16} weight="bold" /> Edit
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onRejectClick(activity.id);
                        onClose();
                      }}
                      className="flex items-center gap-[6px] rounded-[8px] bg-white border border-red-200 px-[16px] py-[8px] text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <WarningCircle size={16} weight="bold" /> Reject
                    </button>
                    <button
                      onClick={() => {
                        onVerify(activity.id);
                        onClose();
                      }}
                      className="flex items-center gap-[6px] rounded-[8px] bg-[#16a34a] px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-[#15803d] transition-colors"
                    >
                      <CheckCircle size={16} weight="bold" /> Verify Data
                    </button>
                  </>
                )}

                {activity.status === "VERIFIED" && (
                  <button
                    onClick={() => {
                      onCalculate(activity.id);
                      onClose();
                    }}
                    className="flex items-center gap-[6px] rounded-[8px] bg-[#0d3b2d] px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-[#16a34a] transition-colors"
                  >
                    <Calculator size={16} weight="bold" /> Run Calculation
                  </button>
                )}
              </>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
