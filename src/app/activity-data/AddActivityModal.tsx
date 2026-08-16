"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";
import { createActivityData, fetchAPI } from "@/lib/api";
import { toast } from "sonner";

interface AddActivityModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CATEGORIES = [
  "DIESEL", "PETROL", "LPG", "NATURAL_GAS", "CNG", "GENERATOR_FUEL", 
  "BOILER_FUEL", "REFRIGERANT", "OWNED_VEHICLE", "PURCHASED_ELECTRICITY", 
  "PURCHASED_STEAM", "PURCHASED_HEATING", "PURCHASED_COOLING"
];

export default function AddActivityModal({ onClose, onSuccess }: AddActivityModalProps) {
  const [loading, setLoading] = useState(false);
  const [periods, setPeriods] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    reportingPeriodId: "",
    category: "PURCHASED_ELECTRICITY",
    scope: "SCOPE_2",
    quantity: "",
    unit: "kWh",
    activityDate: new Date().toISOString().split("T")[0],
    campus: "",
    building: "",
    floor: "",
    description: "",
  });

  useEffect(() => {
    async function loadPeriods() {
      const uId = localStorage.getItem("universityId");
      if (!uId) return;
      try {
        const res = await fetchAPI(`/reporting-periods?universityId=${uId}`);
        if (res.success && res.data) {
          const openPeriods = res.data.filter((p: any) => p.status === "OPEN");
          setPeriods(openPeriods);
          
          const storedPid = localStorage.getItem("reportingPeriodId");
          if (storedPid && openPeriods.find((p: any) => p.id === storedPid)) {
            setFormData(prev => ({ ...prev, reportingPeriodId: storedPid }));
          } else if (openPeriods.length > 0) {
            setFormData(prev => ({ ...prev, reportingPeriodId: openPeriods[0].id }));
          }
        }
      } catch (err) {}
    }
    loadPeriods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        quantity: parseFloat(formData.quantity),
        activityDate: new Date(formData.activityDate).toISOString(),
      };
      
      const res = await createActivityData(payload);
      if (res.success) {
        toast.success("Activity drafted successfully");
        onSuccess();
      } else {
        toast.error(res.message || "Failed to create activity");
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative z-10 w-full max-w-lg rounded-[16px] bg-white p-[24px] shadow-xl mx-[20px] max-h-[90vh] overflow-y-auto"
      >
        <div className="mb-[20px] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-black">Manual Activity Entry</h2>
          </div>
          <button onClick={onClose} className="text-[#a1a1aa] hover:text-black transition-colors self-start mt-[-4px]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[13px] font-medium text-[#52525b]">Reporting Period <span className="text-red-500">*</span></label>
            <select 
              required
              className="rounded-[8px] border border-black/[0.1] bg-white px-[12px] py-[8px] text-[14px] outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={formData.reportingPeriodId}
              onChange={(e) => setFormData(prev => ({ ...prev, reportingPeriodId: e.target.value }))}
            >
              <option value="" disabled>Select Reporting Period</option>
              {periods.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] font-semibold text-[#52525b]">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => {
                  const val = e.target.value;
                  const newScope = val.includes("PURCHASED_") ? "SCOPE_2" : "SCOPE_1";
                  setFormData({ ...formData, category: val, scope: newScope });
                }}
                className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] font-semibold text-[#52525b]">Scope *</label>
              <select
                required
                value={formData.scope}
                onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              >
                <option value="SCOPE_1">Scope 1</option>
                <option value="SCOPE_2">Scope 2</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] font-semibold text-[#52525b]">Quantity *</label>
              <input
                required
                type="number"
                step="0.01"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g. 10000"
                className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] font-semibold text-[#52525b]">Unit *</label>
              <input
                required
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="e.g. kWh, L, kg"
                className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[12px] font-semibold text-[#52525b]">Activity Date *</label>
            <input
              required
              type="date"
              value={formData.activityDate}
              onChange={(e) => setFormData({ ...formData, activityDate: e.target.value })}
              className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
            />
          </div>

          <div className="grid grid-cols-3 gap-[12px]">
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] font-semibold text-[#52525b]">Campus</label>
              <input
                type="text"
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                placeholder="Optional"
                className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] font-semibold text-[#52525b]">Building</label>
              <input
                type="text"
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                placeholder="Optional"
                className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              />
            </div>
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] font-semibold text-[#52525b]">Floor</label>
              <input
                type="text"
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                placeholder="Optional"
                className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <label className="text-[12px] font-semibold text-[#52525b]">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="E.g., August electricity bill for main campus"
              className="h-[80px] w-full resize-none rounded-[8px] border border-black/[0.08] bg-white p-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
            />
          </div>

          <div className="mt-[8px] flex justify-end gap-[12px]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[8px] px-[16px] py-[8px] text-[13px] font-semibold text-[#52525b] hover:bg-black/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-[8px] bg-[#16a34a] px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-[#15803d] transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
