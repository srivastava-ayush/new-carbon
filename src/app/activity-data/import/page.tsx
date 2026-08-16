"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, UploadSimple, DownloadSimple, CheckCircle, WarningCircle, FileX 
} from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";
import { downloadImportTemplate, previewImport, confirmImport } from "@/lib/api";
import { toast } from "sonner";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

export default function ImportPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState<"UPLOAD" | "PREVIEW">("UPLOAD");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  // Preview State
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [importJobId, setImportJobId] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadTemplate = async () => {
    try {
      const url = await downloadImportTemplate();
      window.open(url, "_blank");
    } catch (err: any) {
      toast.error(err.message || "Failed to download template");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    
    try {
      setLoading(true);
      const res = await previewImport(selected);
      if (res.success) {
        setPreviewData(res.data.validRows || []);
        setValidationErrors(res.data.invalidRows || []);
        setImportJobId(res.data.importJobId);
        setStep("PREVIEW");
      } else {
        toast.error(res.message || "Failed to preview file");
        setFile(null);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to process file");
      setFile(null);
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleConfirm = async () => {
    if (previewData.length === 0) {
      toast.error("No valid data to import");
      return;
    }
    
    try {
      setLoading(true);
      const res = await confirmImport(importJobId, previewData);
      if (res.success) {
        toast.success(`Successfully imported ${res.data.importedCount || previewData.length} activities.`);
        window.location.href = "/activity-data";
      } else {
        toast.error(res.message || "Import failed");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during import");
    } finally {
      setLoading(false);
    }
  };

  const downloadErrorReport = () => {
    if (validationErrors.length === 0) return;
    
    // Create CSV content for errors
    const headers = ["Row", "Error", "Category", "Quantity", "Unit", "Date"];
    const csvContent = [
      headers.join(","),
      ...validationErrors.map(err => {
        const d = err.data || {};
        return `${err.rowNumber || ""},"${err.error || ""}",${d.category || ""},${d.quantity || ""},${d.unit || ""},${d.activityDate || ""}`;
      })
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "import_error_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Combine valid and invalid data for a unified preview table
  const unifiedData = [
    ...previewData.map((d, i) => ({ ...d, isValid: true, _row: i + 1 })),
    ...validationErrors.map(e => ({ ...e.data, isValid: false, errorMsg: e.error, _row: e.rowNumber }))
  ].sort((a, b) => (a._row || 0) - (b._row || 0));

  return (
    <ProtectedRoute>
      <div className="flex min-h-dvh bg-[#fafafa]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"activity-data"} onChange={() => {}} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar 
            onMenu={() => setMenuOpen(true)} 
            title="Import Activity Data" 
            subtitle="Upload Excel or CSV files to bulk insert activity records" 
          />

          <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
            <div className="mx-auto flex max-w-[1000px] flex-col gap-[24px]">
              
              <button 
                onClick={() => window.location.href = "/activity-data"}
                className="flex items-center gap-[6px] text-[13px] font-semibold text-[#52525b] hover:text-black w-fit transition-colors"
              >
                <ArrowLeft size={16} weight="bold" /> Back to Activity Data
              </button>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-[16px] border border-black/[0.08] bg-white p-[32px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                {step === "UPLOAD" && (
                  <div className="flex flex-col gap-[32px]">
                    <div className="rounded-[12px] border border-[#16a34a]/20 bg-[#f0fdf4] p-[24px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-[16px]">
                      <div className="flex items-start sm:items-center gap-[16px]">
                        <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-white border border-black/[0.06] shadow-sm">
                          <DownloadSimple size={24} className="text-[#16a34a]" weight="bold" />
                        </div>
                        <div>
                          <p className="text-[16px] font-bold text-[#15803d]">Download Standard Template</p>
                          <p className="text-[13px] text-[#16a34a] mt-[4px] max-w-[400px]">
                            To ensure a successful import, please use our standardized Excel/CSV template. Do not modify the column headers.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleDownloadTemplate}
                        className="rounded-[8px] bg-[#16a34a] px-[16px] py-[10px] text-[13px] font-semibold text-white hover:bg-[#15803d] transition-colors shrink-0"
                      >
                        Download Excel Template
                      </button>
                    </div>

                    <div className="relative flex flex-col items-center justify-center rounded-[12px] border-2 border-dashed border-black/[0.1] bg-white py-[60px] px-[20px] transition-colors hover:bg-[#fafafa]">
                      <input
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        className="absolute inset-0 z-10 cursor-pointer opacity-0"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        disabled={loading}
                      />
                      <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#fafafa] text-[#52525b] border border-black/[0.08] shadow-sm mb-[20px]">
                        <UploadSimple size={32} weight="bold" />
                      </div>
                      <p className="text-[16px] font-semibold text-black">
                        {loading ? "Processing file..." : "Drop Excel / CSV here"}
                      </p>
                      {!loading && (
                        <>
                          <p className="mt-[8px] text-[13px] text-[#71717a] font-medium uppercase tracking-widest">or</p>
                          <button className="mt-[12px] rounded-[8px] border border-black/[0.08] bg-white px-[20px] py-[8px] text-[13px] font-semibold text-black shadow-sm">
                            Choose File
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {step === "PREVIEW" && (
                  <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-[16px]">
                      <div>
                        <h2 className="text-[18px] font-bold text-black">{previewData.length + validationErrors.length} rows found</h2>
                        <div className="flex items-center gap-[12px] mt-[6px]">
                          <span className="flex items-center gap-[4px] text-[13px] font-semibold text-[#16a34a]">
                            <CheckCircle size={16} weight="fill" /> {previewData.length} valid
                          </span>
                          <span className="flex items-center gap-[4px] text-[13px] font-semibold text-[#ef4444]">
                            <WarningCircle size={16} weight="fill" /> {validationErrors.length} invalid
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-[12px]">
                        <button 
                          onClick={() => { setStep("UPLOAD"); setFile(null); }}
                          className="text-[13px] font-semibold text-[#52525b] hover:text-black transition-colors"
                        >
                          Change file
                        </button>
                        {validationErrors.length > 0 && (
                          <button
                            onClick={downloadErrorReport}
                            className="rounded-[8px] border border-black/[0.08] bg-white px-[16px] py-[8px] text-[13px] font-semibold text-black hover:bg-black/5 transition-colors"
                          >
                            Download Error Report
                          </button>
                        )}
                        <button
                          disabled={loading || previewData.length === 0}
                          onClick={handleConfirm}
                          className="rounded-[8px] bg-[#16a34a] px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-[#15803d] transition-colors disabled:opacity-50"
                        >
                          {loading ? "Importing..." : `Confirm Import (${previewData.length})`}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-[12px] border border-black/[0.08] overflow-hidden">
                      <div className="max-h-[500px] overflow-y-auto">
                        <table className="w-full min-w-[700px] border-collapse text-left text-[13px]">
                          <thead className="sticky top-0 bg-[#fafafa] border-b border-black/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-10">
                            <tr>
                              <th className="px-[16px] py-[12px] font-semibold text-[#71717a]">Row</th>
                              <th className="px-[16px] py-[12px] font-semibold text-[#71717a]">Category</th>
                              <th className="px-[16px] py-[12px] font-semibold text-[#71717a]">Quantity</th>
                              <th className="px-[16px] py-[12px] font-semibold text-[#71717a]">Unit</th>
                              <th className="px-[16px] py-[12px] font-semibold text-[#71717a]">Date</th>
                              <th className="px-[16px] py-[12px] font-semibold text-[#71717a]">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {unifiedData.map((row, i) => (
                              <tr key={i} className={`border-b border-black/[0.04] last:border-none ${!row.isValid ? 'bg-red-50/50' : 'hover:bg-black/[0.01]'}`}>
                                <td className="px-[16px] py-[12px] text-[#71717a] font-medium">{row._row || i + 1}</td>
                                <td className={`px-[16px] py-[12px] ${!row.isValid ? 'text-red-900' : 'text-black'}`}>{row.category || "—"}</td>
                                <td className={`px-[16px] py-[12px] ${!row.isValid ? 'text-red-900' : 'text-black'}`}>{row.quantity || "—"}</td>
                                <td className={`px-[16px] py-[12px] ${!row.isValid ? 'text-red-900' : 'text-[#71717a]'}`}>{row.unit || "—"}</td>
                                <td className={`px-[16px] py-[12px] ${!row.isValid ? 'text-red-900' : 'text-black'}`}>{row.activityDate || "—"}</td>
                                <td className="px-[16px] py-[12px]">
                                  {row.isValid ? (
                                    <span className="flex items-center gap-[4px] text-[#16a34a] font-medium text-[12px]">
                                      <CheckCircle size={14} weight="fill" /> Valid
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-[4px] text-[#ef4444] font-medium text-[12px]">
                                      <WarningCircle size={14} weight="fill" /> {row.errorMsg}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
