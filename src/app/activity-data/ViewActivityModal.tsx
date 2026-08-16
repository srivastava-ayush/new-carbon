"use client";

import { motion } from "motion/react";
import { X, FileText, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";

export default function ViewActivityModal({ activity, onClose }: { activity: any, onClose: () => void }) {
  if (!activity) return null;

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
        className="relative z-10 w-full max-w-2xl rounded-[16px] bg-white p-[24px] shadow-xl mx-[20px] max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-[20px] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-black">Activity Details</h2>
            <p className="text-[13px] text-[#71717a]">View complete record information.</p>
          </div>
          <button onClick={onClose} className="text-[#a1a1aa] hover:text-black transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-[24px]">
          {/* Main Activity details */}
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Category</span>
              <span className="text-[14px] font-medium text-black">{activity.category.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Scope</span>
              <span className="text-[14px] font-medium text-black">{activity.scope.replace("_", " ")}</span>
            </div>
            <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Quantity</span>
              <span className="text-[14px] font-medium text-black">{activity.quantity} {activity.unit}</span>
            </div>
            <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Activity Date</span>
              <span className="text-[14px] font-medium text-black">
                {new Date(activity.activityDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="flex flex-col gap-[4px] border-b border-black/[0.04] pb-[8px]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Status</span>
              <span className="text-[14px] font-medium text-black">{activity.status}</span>
            </div>
            {activity.description && (
              <div className="flex flex-col gap-[4px] col-span-2 border-b border-black/[0.04] pb-[8px]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Description</span>
                <span className="text-[14px] text-black">{activity.description}</span>
              </div>
            )}
          </div>

          {/* Linked Document Section (Step 7) */}
          {activity.document && (
            <div className="rounded-[12px] border border-black/[0.08] bg-[#fafafa] p-[16px] flex flex-col gap-[12px]">
              <div className="flex items-center gap-[8px] text-[14px] font-semibold text-black mb-[4px]">
                <FileText size={18} /> Source Document
              </div>
              <div className="flex justify-between items-center pb-[8px] border-b border-black/[0.04]">
                <span className="text-[12px] font-semibold text-[#52525b]">File Name</span>
                <span className="text-[12px] text-black font-medium">{activity.document.fileName || "Unknown Document"}</span>
              </div>
              {activity.document.fileUrl && (
                <a href={activity.document.fileUrl} target="_blank" rel="noreferrer" className="mt-[8px] flex items-center justify-center gap-[6px] rounded-[8px] bg-white border border-black/[0.08] px-[12px] py-[8px] text-[12px] font-semibold text-black hover:bg-black/5 transition-colors">
                  View Document
                </a>
              )}
            </div>
          )}

          {/* Verification Log */}
          {activity.verifierId && (
            <div className="rounded-[12px] border border-[#16a34a]/20 bg-[#f0fdf4] p-[16px]">
              <div className="flex items-start gap-[12px]">
                <CheckCircle size={20} weight="fill" className="text-[#16a34a] shrink-0 mt-[2px]" />
                <div>
                  <h3 className="text-[13px] font-semibold text-[#15803d]">Verified by {activity.verifier?.firstName || "Reviewer"}</h3>
                  <p className="text-[12px] text-[#16a34a] mt-[4px]">
                    Verified on {new Date(activity.verifiedAt).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </motion.div>
    </div>
  );
}
