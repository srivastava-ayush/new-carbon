"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/animations";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getAuditLogs } from "@/lib/api";
import { toast } from "sonner";
import { CircleNotch, List, X, Funnel, Database, User, Clock, FileText, MagnifyingGlass } from "@phosphor-icons/react";

const ACTIONS = ["ALL", "CREATE", "UPDATE", "DELETE", "VERIFY", "REJECT", "CALCULATE", "LOCK", "UNLOCK", "LOGIN"];
const ENTITIES = ["ALL", "ActivityData", "Calculation", "Document", "ReportingPeriod", "Target", "Baseline", "User"];

const ACTION_COLORS: Record<string, string> = {
  CREATE: "bg-green-100 text-green-700",
  UPDATE: "bg-blue-100 text-blue-700",
  DELETE: "bg-red-100 text-red-700",
  VERIFY: "bg-emerald-100 text-emerald-700",
  REJECT: "bg-orange-100 text-orange-700",
  CALCULATE: "bg-purple-100 text-purple-700",
  LOCK: "bg-yellow-100 text-yellow-700",
  UNLOCK: "bg-cyan-100 text-cyan-700",
  LOGIN: "bg-gray-100 text-gray-700"
};

export default function AuditLogsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  // Filters
  const [action, setAction] = useState("ALL");
  const [entity, setEntity] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAuditLogs({ action, entity, from: dateFrom, to: dateTo, page, limit: 30 });
      if (res.success) {
        setLogs(res.data);
        setTotalPages(res.pagination?.totalPages || 1);
      }
    } catch {
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  }, [action, entity, dateFrom, dateTo, page]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const handleFilterApply = () => {
    setPage(1);
    fetchLogs();
  };

  const renderDiff = (oldVal: any, newVal: any) => {
    if (!oldVal && !newVal) return <span className="text-[#a1a1aa] italic">No detailed values</span>;
    return (
      <div className="flex flex-col gap-[8px] font-mono text-[11px] overflow-x-auto p-[12px] bg-[#fafafa] rounded-[8px] border border-black/[0.06]">
        {oldVal && (
          <div className="flex gap-[8px]">
            <span className="text-red-600 font-bold w-[12px]">-</span>
            <span className="text-red-800 whitespace-pre-wrap">{JSON.stringify(oldVal, null, 2)}</span>
          </div>
        )}
        {newVal && (
          <div className="flex gap-[8px]">
            <span className="text-green-600 font-bold w-[12px]">+</span>
            <span className="text-green-800 whitespace-pre-wrap">{JSON.stringify(newVal, null, 2)}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"audit-logs" as any} onChange={() => {}} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} title="Audit Logs" subtitle="System activity and change history" />

        <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
          <div className="mx-auto flex max-w-[1240px] flex-col gap-[24px]">

            {/* Filter Bar */}
            <div className="flex flex-wrap items-end gap-[16px] rounded-[12px] border border-black/[0.08] bg-white p-[16px] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider">Action</label>
                <select 
                  value={action} 
                  onChange={e => setAction(e.target.value)} 
                  className="h-[34px] min-w-[140px] rounded-[8px] border border-black/[0.1] px-[10px] text-[13px] outline-none focus:border-black"
                >
                  {ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider">Entity</label>
                <select 
                  value={entity} 
                  onChange={e => setEntity(e.target.value)} 
                  className="h-[34px] min-w-[160px] rounded-[8px] border border-black/[0.1] px-[10px] text-[13px] outline-none focus:border-black"
                >
                  {ENTITIES.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider">Date From</label>
                <input 
                  type="date" 
                  value={dateFrom} 
                  onChange={e => setDateFrom(e.target.value)} 
                  className="h-[34px] rounded-[8px] border border-black/[0.1] px-[10px] text-[13px] outline-none focus:border-black text-[#52525b]" 
                />
              </div>

              <div className="flex flex-col gap-[6px]">
                <label className="text-[11px] font-semibold text-[#71717a] uppercase tracking-wider">Date To</label>
                <input 
                  type="date" 
                  value={dateTo} 
                  onChange={e => setDateTo(e.target.value)} 
                  className="h-[34px] rounded-[8px] border border-black/[0.1] px-[10px] text-[13px] outline-none focus:border-black text-[#52525b]" 
                />
              </div>

              <button 
                onClick={handleFilterApply}
                className="flex h-[34px] items-center gap-[6px] rounded-[8px] bg-black px-[16px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors"
              >
                <Funnel size={14} /> Apply Filters
              </button>
            </div>

            {/* Table */}
            <div className="rounded-[12px] border border-black/[0.08] bg-white shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[#f8fafc] text-[#71717a]">
                      <th className="px-[16px] py-[12px] font-medium">Timestamp</th>
                      <th className="px-[16px] py-[12px] font-medium">User</th>
                      <th className="px-[16px] py-[12px] font-medium">Action</th>
                      <th className="px-[16px] py-[12px] font-medium">Entity</th>
                      <th className="px-[16px] py-[12px] font-medium">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-[60px] text-center">
                          <div className="flex flex-col items-center gap-[12px]">
                            <CircleNotch size={24} className="animate-spin text-[#a1a1aa]" />
                            <span className="text-[13px] text-[#71717a]">Loading logs...</span>
                          </div>
                        </td>
                      </tr>
                    ) : logs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-[60px] text-center">
                          <div className="flex flex-col items-center gap-[12px]">
                            <Database size={24} className="text-[#a1a1aa]" />
                            <span className="text-[13px] text-[#71717a]">No audit logs match your filters</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      logs.map((log) => (
                        <tr 
                          key={log.id} 
                          onClick={() => setSelected(log)}
                          className="border-b border-black/[0.04] last:border-b-0 hover:bg-black/[0.02] transition-colors cursor-pointer"
                        >
                          <td className="px-[16px] py-[12px] whitespace-nowrap text-[#52525b]">
                            {new Date(log.createdAt).toLocaleString()}
                          </td>
                          <td className="px-[16px] py-[12px] font-medium text-black">
                            {log.user ? `${log.user.firstName} ${log.user.lastName || ""}` : "System"}
                          </td>
                          <td className="px-[16px] py-[12px]">
                            <span className={`inline-flex items-center rounded-full px-[8px] py-[2px] text-[11px] font-bold ${ACTION_COLORS[log.action] || "bg-gray-100 text-gray-700"}`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="px-[16px] py-[12px] text-[#52525b]">
                            {log.entity}
                          </td>
                          <td className="px-[16px] py-[12px] text-[#71717a] truncate max-w-[250px]">
                            {log.description || "No details provided"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-black/[0.06] p-[16px] bg-[#fafafa]">
                  <p className="text-[12px] text-[#71717a]">Page {page} of {totalPages}</p>
                  <div className="flex gap-[8px]">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-[6px] border border-black/[0.1] bg-white px-[12px] py-[4px] text-[12px] font-medium transition-colors hover:bg-black/[0.04] disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="rounded-[6px] border border-black/[0.1] bg-white px-[12px] py-[4px] text-[12px] font-medium transition-colors hover:bg-black/[0.04] disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: EASE }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-[540px] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.08)] flex flex-col overflow-y-auto"
            >
              <div className="flex items-center justify-between p-[24px] border-b border-black/[0.06]">
                <div>
                  <h2 className="text-[18px] font-semibold text-black">Audit Log Details</h2>
                  <p className="text-[13px] text-[#71717a] mt-[2px]">Log ID: {selected.id}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-[#a1a1aa] hover:text-black transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-[24px] flex flex-col gap-[24px]">
                
                {/* Meta grid */}
                <div className="grid grid-cols-2 gap-[16px]">
                  <div className="flex items-start gap-[10px]">
                    <div className="mt-[2px] text-[#a1a1aa]"><User size={16} /></div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">User</p>
                      <p className="text-[13px] font-medium text-black mt-[2px]">
                        {selected.user ? `${selected.user.firstName} ${selected.user.lastName || ""}` : "System Automated"}
                      </p>
                      {selected.user?.email && <p className="text-[12px] text-[#71717a]">{selected.user.email}</p>}
                    </div>
                  </div>
                  <div className="flex items-start gap-[10px]">
                    <div className="mt-[2px] text-[#a1a1aa]"><Clock size={16} /></div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Timestamp</p>
                      <p className="text-[13px] font-medium text-black mt-[2px]">
                        {new Date(selected.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-[10px]">
                    <div className="mt-[2px] text-[#a1a1aa]"><FileText size={16} /></div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">Action & Entity</p>
                      <div className="flex items-center gap-[6px] mt-[4px]">
                        <span className={`inline-flex items-center rounded-full px-[8px] py-[2px] text-[11px] font-bold ${ACTION_COLORS[selected.action] || "bg-gray-100 text-gray-700"}`}>
                          {selected.action}
                        </span>
                        <span className="text-[13px] font-medium text-black">{selected.entity}</span>
                      </div>
                      {selected.entityId && <p className="text-[11.5px] text-[#71717a] mt-[2px] font-mono">ID: {selected.entityId}</p>}
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-black/[0.06]" />

                {/* Description */}
                <div>
                  <h3 className="text-[13px] font-semibold text-black mb-[8px]">Description</h3>
                  <p className="text-[13px] text-[#52525b] leading-relaxed bg-[#f8fafc] p-[12px] rounded-[8px] border border-black/[0.04]">
                    {selected.description || "No description provided."}
                  </p>
                </div>

                {/* Diff Viewer */}
                <div>
                  <h3 className="text-[13px] font-semibold text-black mb-[8px]">Changes (Diff)</h3>
                  {renderDiff(selected.oldValue, selected.newValue)}
                </div>

                {/* IP / User Agent */}
                {(selected.ipAddress || selected.userAgent) && (
                  <>
                    <div className="h-[1px] w-full bg-black/[0.06]" />
                    <div className="grid grid-cols-1 gap-[12px]">
                      {selected.ipAddress && (
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">IP Address</p>
                          <p className="text-[12px] font-mono text-black mt-[2px]">{selected.ipAddress}</p>
                        </div>
                      )}
                      {selected.userAgent && (
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717a]">User Agent</p>
                          <p className="text-[11px] font-mono text-[#71717a] mt-[2px] break-all">{selected.userAgent}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
