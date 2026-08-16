"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getEmissionFactors } from "@/lib/api";
import { MagnifyingGlass, Leaf, ShieldCheck, GlobeHemisphereWest, Tag } from "@phosphor-icons/react";
import { toast } from "sonner";

export default function EmissionFactorsPage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const isAdmin = ["SUPER_ADMIN", "UNIVERSITY_ADMIN"].includes(user?.role || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getEmissionFactors();
        if (response.success && response.data) {
          setData(response.data);
        } else {
          toast.error("Failed to fetch emission factors");
        }
      } catch (err: any) {
        toast.error(err.message || "Error loading emission factors");
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin) fetchData();
  }, [isAdmin]);

  const filteredData = useMemo(() => {
    return data.filter(ef => 
      ef.name.toLowerCase().includes(search.toLowerCase()) ||
      ef.category.toLowerCase().includes(search.toLowerCase()) ||
      ef.source.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (user && !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-[#a1a1aa]">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-dvh bg-[#fafafa]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"emission-factors"} onChange={() => {}} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar 
            onMenu={() => setMenuOpen(true)} 
            title="Emission Factors" 
            subtitle="View active calculation factors and data sources" 
          />

          <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
            <div className="mx-auto flex max-w-[1240px] flex-col gap-[16px]">
              
              <div className="flex justify-between items-center mb-[8px]">
                <div className="relative w-full max-w-[320px]">
                  <MagnifyingGlass size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
                  <input
                    type="text"
                    placeholder="Search by name, category, or source..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-[36px] w-full rounded-[8px] border border-black/[0.08] bg-white pl-[36px] pr-[12px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-[12px] border border-black/[0.08] bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] border-collapse">
                    <thead>
                      <tr className="border-b border-black/[0.06] bg-[#fafafa] text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#71717a]">
                        <th className="px-[20px] py-[12px]">Name</th>
                        <th className="px-[20px] py-[12px]">Category</th>
                        <th className="px-[20px] py-[12px]">Scope</th>
                        <th className="px-[20px] py-[12px]">Factor</th>
                        <th className="px-[20px] py-[12px]">Country</th>
                        <th className="px-[20px] py-[12px]">Source</th>
                        <th className="px-[20px] py-[12px]">Version</th>
                        <th className="px-[20px] py-[12px]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={8} className="px-[20px] py-[32px] text-center text-[13px] text-[#71717a]">
                            Loading emission factors...
                          </td>
                        </tr>
                      ) : filteredData.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-[20px] py-[32px] text-center text-[13px] text-[#71717a]">
                            No emission factors found.
                          </td>
                        </tr>
                      ) : (
                        filteredData.map((ef) => (
                          <tr key={ef.id} className="border-b border-black/[0.04] last:border-none hover:bg-black/[0.01] transition-colors">
                            <td className="px-[20px] py-[16px]">
                              <div className="flex items-center gap-[10px]">
                                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#f4f4f5] text-[#52525b]">
                                  <Leaf size={14} weight="fill" />
                                </div>
                                <p className="text-[13px] font-medium text-black max-w-[200px] truncate" title={ef.name}>
                                  {ef.name}
                                </p>
                              </div>
                            </td>
                            <td className="px-[20px] py-[16px] text-[13px] text-[#52525b]">
                              {ef.category.replace(/_/g, " ")}
                            </td>
                            <td className="px-[20px] py-[16px]">
                              <span className="rounded-[6px] border border-black/[0.08] bg-[#fafafa] px-[6px] py-[2px] text-[11px] font-medium text-[#52525b]">
                                {ef.scope.replace("_", " ")}
                              </span>
                            </td>
                            <td className="px-[20px] py-[16px]">
                              <p className="text-[13px] font-semibold text-[#16a34a]">
                                {ef.factor.toFixed(4)}
                              </p>
                              <p className="text-[11px] text-[#a1a1aa] mt-[2px]">{ef.unit}</p>
                            </td>
                            <td className="px-[20px] py-[16px]">
                              <div className="flex items-center gap-[6px] text-[13px] text-[#52525b]">
                                <GlobeHemisphereWest size={14} /> {ef.country}
                              </div>
                            </td>
                            <td className="px-[20px] py-[16px]">
                              <div className="flex items-center gap-[6px] text-[13px] text-[#52525b]">
                                <Tag size={14} /> {ef.source}
                              </div>
                            </td>
                            <td className="px-[20px] py-[16px] text-[13px] text-[#52525b]">
                              {ef.version}
                            </td>
                            <td className="px-[20px] py-[16px]">
                              {ef.isActive ? (
                                <span className="inline-flex items-center gap-[4px] rounded-full bg-[#f0fdf4] px-[8px] py-[2px] text-[11px] font-semibold text-[#16a34a]">
                                  <ShieldCheck size={14} weight="fill" /> ACTIVE
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-[4px] rounded-full bg-[#f4f4f5] px-[8px] py-[2px] text-[11px] font-semibold text-[#71717a]">
                                  INACTIVE
                                </span>
                              )}
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
      </div>
    </ProtectedRoute>
  );
}
