"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { X, UploadSimple } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";
import { uploadDocument } from "@/lib/api";
import { toast } from "sonner";

interface DocumentUploadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function DocumentUploadModal({ onClose, onSuccess }: DocumentUploadModalProps) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState("ELECTRICITY_BILL");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }
    
    try {
      setLoading(true);
      const res = await uploadDocument(file, docType);
      if (res.success) {
        toast.success("Document uploaded successfully");
        onSuccess();
      } else {
        toast.error(res.message || "Failed to upload document");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during upload");
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
        className="relative z-10 w-full max-w-md rounded-[16px] bg-white p-[24px] shadow-xl mx-[20px]"
      >
        <div className="mb-[20px] flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-semibold text-black">Upload Document</h2>
            <p className="text-[13px] text-[#71717a]">Upload an invoice or bill for OCR processing.</p>
          </div>
          <button onClick={onClose} className="text-[#a1a1aa] hover:text-black transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[6px]">
            <label className="text-[12px] font-semibold text-[#52525b]">Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
            >
              <option value="ELECTRICITY_BILL">Electricity Bill</option>
              <option value="FUEL_RECEIPT">Fuel Receipt</option>
              <option value="FLIGHT_TICKET">Flight Ticket</option>
              <option value="OTHER">Other Invoice</option>
            </select>
          </div>

          <div className="relative flex flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-black/[0.1] bg-white p-[32px] transition-colors hover:bg-[#fafafa]">
            <input
              type="file"
              accept=".pdf, .png, .jpg, .jpeg"
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
              onChange={handleFileChange}
              ref={fileInputRef}
              disabled={loading}
            />
            <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#f0fdf4] text-[#16a34a] mb-[12px]">
              <UploadSimple size={20} weight="bold" />
            </div>
            {file ? (
              <p className="text-[13px] font-semibold text-black text-center truncate max-w-full px-[10px]">
                {file.name}
              </p>
            ) : (
              <>
                <p className="text-[13px] font-semibold text-black">
                  Click to upload or drag and drop
                </p>
                <p className="mt-[4px] text-[12px] text-[#71717a]">
                  PDF, PNG, JPG (max. 10MB)
                </p>
              </>
            )}
          </div>
        </div>

        <div className="mt-[24px] flex justify-end gap-[12px]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[8px] px-[16px] py-[8px] text-[13px] font-semibold text-[#52525b] hover:bg-black/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading || !file}
            onClick={handleUpload}
            className="rounded-[8px] bg-[#16a34a] px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-[#15803d] transition-colors disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload Document"}
          </button>
        </div>

      </motion.div>
    </div>
  );
}
