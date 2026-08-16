"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getCampuses, getBuildings, getFloors, getAssets } from "@/lib/api";
import { MapPin, Buildings, Steps, Engine, BuildingOffice } from "@phosphor-icons/react";
import { toast } from "sonner";

type SettingsTab = "organization" | "campuses" | "buildings" | "floors" | "assets";

export default function SettingsPage() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SettingsTab>("organization");
  
  const [loading, setLoading] = useState(false);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [floors, setFloors] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  const isAdmin = ["SUPER_ADMIN", "UNIVERSITY_ADMIN"].includes(user?.role || "");

  const fetchTabDetails = async (tab: SettingsTab) => {
    setLoading(true);
    try {
      if (tab === "campuses" && campuses.length === 0) {
        const res = await getCampuses();
        if (res.success) setCampuses(res.data);
      } else if (tab === "buildings" && buildings.length === 0) {
        const res = await getBuildings();
        if (res.success) setBuildings(res.data);
      } else if (tab === "floors" && floors.length === 0) {
        const res = await getFloors();
        if (res.success) setFloors(res.data);
      } else if (tab === "assets" && assets.length === 0) {
        const res = await getAssets();
        if (res.success) setAssets(res.data);
      }
    } catch (err) {
      toast.error("Failed to load data for " + tab);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchTabDetails(activeTab);
  }, [activeTab, isAdmin]);

  if (user && !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-[#a1a1aa]">You do not have permission to view this page.</p>
      </div>
    );
  }

  const TABS = [
    { id: "organization", label: "Organization", icon: BuildingOffice },
    { id: "campuses", label: "Campuses", icon: MapPin },
    { id: "buildings", label: "Buildings", icon: Buildings },
    { id: "floors", label: "Floors", icon: Steps },
    { id: "assets", label: "Assets", icon: Engine },
  ];

  return (
    <ProtectedRoute>
      <div className="flex min-h-dvh bg-[#fafafa]">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"settings"} onChange={() => {}} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar 
            onMenu={() => setMenuOpen(true)} 
            title="Settings & Infrastructure" 
            subtitle="Manage your organizational hierarchy and system settings" 
          />

          <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
            <div className="mx-auto flex max-w-[1000px] flex-col gap-[24px]">
              
              <div className="flex overflow-x-auto border-b border-black/[0.08] pb-[1px] scrollbar-hide">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as SettingsTab)}
                      className={`relative flex items-center gap-[8px] px-[16px] py-[12px] text-[13px] font-semibold transition-colors whitespace-nowrap
                        ${isActive ? "text-[#16a34a]" : "text-[#71717a] hover:text-black"}
                      `}
                    >
                      <Icon size={16} weight={isActive ? "bold" : "regular"} />
                      {tab.label}
                      {isActive && (
                        <motion.div
                          layoutId="settings-tab"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#16a34a]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {activeTab === "organization" && (
                  <div className="rounded-[12px] border border-black/[0.08] bg-white p-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <h3 className="text-[16px] font-semibold text-black mb-[16px]">University Profile</h3>
                    <div className="grid grid-cols-2 gap-[16px]">
                      <div className="flex flex-col gap-[6px]">
                        <label className="text-[12px] font-semibold text-[#52525b]">Organization Name</label>
                        <input type="text" defaultValue="Demo University" className="h-[36px] w-full rounded-[8px] border border-black/[0.08] px-[12px] text-[13px]" />
                      </div>
                      <div className="flex flex-col gap-[6px]">
                        <label className="text-[12px] font-semibold text-[#52525b]">Industry Sector</label>
                        <input type="text" defaultValue="Higher Education" className="h-[36px] w-full rounded-[8px] border border-black/[0.08] px-[12px] text-[13px]" />
                      </div>
                      <div className="flex flex-col gap-[6px] col-span-2">
                        <label className="text-[12px] font-semibold text-[#52525b]">Base Currency</label>
                        <select className="h-[36px] w-full rounded-[8px] border border-black/[0.08] px-[12px] text-[13px]">
                          <option>USD ($)</option>
                          <option>INR (₹)</option>
                          <option>EUR (€)</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-[24px] flex justify-end">
                      <button className="rounded-[8px] bg-[#16a34a] px-[16px] py-[8px] text-[13px] font-semibold text-white hover:bg-[#15803d]">Save Changes</button>
                    </div>
                  </div>
                )}

                {activeTab === "campuses" && (
                  <HierarchyList 
                    title="Campuses" 
                    data={campuses} 
                    loading={loading} 
                    emptyMessage="No campuses found. Add a campus to start your hierarchy." 
                  />
                )}

                {activeTab === "buildings" && (
                  <HierarchyList 
                    title="Buildings" 
                    data={buildings} 
                    loading={loading} 
                    emptyMessage="No buildings found." 
                  />
                )}

                {activeTab === "floors" && (
                  <HierarchyList 
                    title="Floors" 
                    data={floors} 
                    loading={loading} 
                    emptyMessage="No floors found." 
                  />
                )}

                {activeTab === "assets" && (
                  <HierarchyList 
                    title="Assets" 
                    data={assets} 
                    loading={loading} 
                    emptyMessage="No assets found." 
                  />
                )}

              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function HierarchyList({ title, data, loading, emptyMessage }: { title: string, data: any[], loading: boolean, emptyMessage: string }) {
  return (
    <div className="rounded-[12px] border border-black/[0.08] bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between p-[16px] border-b border-black/[0.06] bg-[#fafafa]">
        <h3 className="text-[14px] font-semibold text-black">{title}</h3>
        <button className="text-[12px] font-semibold text-[#16a34a] hover:underline">+ Add {title.slice(0, -1)}</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <tbody>
            {loading ? (
              <tr><td className="p-[24px] text-center text-[#71717a]">Loading {title.toLowerCase()}...</td></tr>
            ) : data.length === 0 ? (
              <tr><td className="p-[24px] text-center text-[#71717a]">{emptyMessage}</td></tr>
            ) : (
              data.map((item, i) => (
                <tr key={item.id || i} className="border-b border-black/[0.04] last:border-none hover:bg-black/[0.01]">
                  <td className="px-[16px] py-[12px] font-medium text-black">{item.name}</td>
                  {item.campus?.name && <td className="px-[16px] py-[12px] text-[#71717a]">Campus: {item.campus.name}</td>}
                  {item.building?.name && <td className="px-[16px] py-[12px] text-[#71717a]">Building: {item.building.name}</td>}
                  <td className="px-[16px] py-[12px] text-right">
                    <button className="text-[12px] font-medium text-blue-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
