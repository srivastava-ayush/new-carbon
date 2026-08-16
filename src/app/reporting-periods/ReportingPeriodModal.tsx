"use client";

import { motion } from "motion/react";
import { X, CalendarBlank } from "@phosphor-icons/react";
import { useState } from "react";
import { EASE } from "@/lib/animations";
import { createReportingPeriod } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

interface ReportingPeriodModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ReportingPeriodModal({ onClose, onSuccess }: ReportingPeriodModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const uId = localStorage.getItem("universityId");
    if (!uId) {
      toast.error("University ID not found");
      return;
    }

    try {
      setLoading(true);
      const res = await createReportingPeriod({
        ...formData,
        universityId: uId
      });
      if (res.success) {
        toast.success("Reporting period created successfully");
        onSuccess();
      } else {
        toast.error(res.message || "Failed to create reporting period");
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
        className="relative z-10 w-full max-w-[480px] rounded-[16px] bg-white p-[24px] shadow-xl mx-[20px]"
      >
        <div className="mb-[20px] flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px] bg-[#f4f4f5] text-[#52525b]">
              <CalendarBlank size={24} weight="bold" />
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-black">Create Reporting Period</h2>
              <p className="text-[13px] text-[#71717a]">Define a new timeline for your emission data</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#a1a1aa] hover:text-black transition-colors self-start mt-[-8px]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-medium text-[#52525b]">Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              placeholder="e.g. 2025-26" 
              required
              className="rounded-[8px] border border-black/[0.1] bg-white px-[12px] py-[8px] text-[14px] outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-[16px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] font-medium text-[#52525b]">Start Date <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                required
                className="rounded-[8px] border border-black/[0.1] bg-white px-[12px] py-[8px] text-[14px] outline-none focus:border-black focus:ring-1 focus:ring-black"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[13px] font-medium text-[#52525b]">End Date <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                required
                className="rounded-[8px] border border-black/[0.1] bg-white px-[12px] py-[8px] text-[14px] outline-none focus:border-black focus:ring-1 focus:ring-black"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-medium text-[#52525b]">Description</label>
            <textarea 
              rows={3}
              placeholder="Optional notes about this period..." 
              className="rounded-[8px] border border-black/[0.1] bg-white px-[12px] py-[8px] text-[14px] outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="mt-[8px] flex justify-end gap-[12px]">
            <button 
              type="button" 
              onClick={onClose}
              className="rounded-[8px] px-[16px] py-[8px] text-[14px] font-medium text-[#52525b] hover:bg-black/5"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="rounded-[8px] bg-black px-[16px] py-[8px] text-[14px] font-medium text-white hover:bg-black/80 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Period"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
