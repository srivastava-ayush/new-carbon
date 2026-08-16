"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AdminNav from "@/components/admin/AdminNav";
import { useAuth } from "@/context/AuthContext";
import { Warning, Key } from "@phosphor-icons/react";

export default function AdminSettingsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user: currentUser } = useAuth();
  const isAdmin = ["SUPER_ADMIN"].includes(currentUser?.role || "");

  if (!isAdmin) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fafafa]">
        <h1 className="text-[20px] font-bold text-red-600">Access Denied (Super Admin Only)</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"settings" as any} onChange={() => {}} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} title="Admin Settings" subtitle="Manage your university's configuration" />

        <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
          <div className="mx-auto flex max-w-[1240px] flex-col md:flex-row gap-[32px]">
            
            <aside className="w-full md:w-[240px] shrink-0">
              <AdminNav active="settings" />
            </aside>

            <div className="flex-1 flex flex-col gap-[24px]">
              <div>
                <h2 className="text-[18px] font-semibold text-black">System Settings</h2>
                <p className="text-[13px] text-[#71717a] mt-[4px]">Global configurations and environment parameters</p>
              </div>

              <div className="rounded-[12px] border border-orange-200 bg-orange-50 p-[16px] flex gap-[12px]">
                <Warning size={20} className="text-orange-600 shrink-0 mt-[2px]" weight="fill" />
                <div>
                  <h4 className="text-[13px] font-semibold text-orange-900">Environment Secrets</h4>
                  <p className="text-[12px] text-orange-800 mt-[4px]">
                    API Keys (Climatiq, Affinda) and Database URLs cannot be managed here for security reasons. Please update your <code className="bg-orange-200/50 px-1 rounded">.env.local</code> file or CI/CD environment variables.
                  </p>
                </div>
              </div>

              <div className="rounded-[12px] border border-black/[0.08] bg-white p-[24px] shadow-sm">
                <form className="flex flex-col gap-[20px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[12px] font-medium text-black">Default Currency</label>
                      <select className="h-[38px] w-full rounded-[8px] border border-black/[0.1] px-[12px] text-[13px] outline-none focus:border-black">
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="MYR">MYR (RM)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[12px] font-medium text-black">Default Unit System</label>
                      <select className="h-[38px] w-full rounded-[8px] border border-black/[0.1] px-[12px] text-[13px] outline-none focus:border-black">
                        <option value="METRIC">Metric (kg, L, km)</option>
                        <option value="IMPERIAL">Imperial (lbs, gal, mi)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-[16px] border-t border-black/[0.06] flex justify-end">
                    <button type="button" className="h-[36px] rounded-[8px] bg-[#16a34a] px-[20px] text-[13px] font-semibold text-white hover:bg-[#15803d]">
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
