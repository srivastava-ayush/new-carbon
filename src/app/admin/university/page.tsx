"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AdminNav from "@/components/admin/AdminNav";
import { useAuth } from "@/context/AuthContext";

export default function AdminUniversityPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user: currentUser } = useAuth();
  const isAdmin = ["SUPER_ADMIN", "UNIVERSITY_ADMIN"].includes(currentUser?.role || "");

  if (!isAdmin) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fafafa]">
        <h1 className="text-[20px] font-bold text-red-600">Access Denied</h1>
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
              <AdminNav active="university" />
            </aside>

            <div className="flex-1 flex flex-col gap-[24px]">
              <div>
                <h2 className="text-[18px] font-semibold text-black">University Profile</h2>
                <p className="text-[13px] text-[#71717a] mt-[4px]">Basic details about your organization</p>
              </div>

              <div className="rounded-[12px] border border-black/[0.08] bg-white p-[24px] shadow-sm">
                <form className="flex flex-col gap-[20px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[12px] font-medium text-black">University Name</label>
                      <input type="text" className="h-[38px] w-full rounded-[8px] border border-black/[0.1] px-[12px] text-[13px] outline-none focus:border-black" defaultValue="Global Tech University" />
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[12px] font-medium text-black">University Code</label>
                      <input type="text" className="h-[38px] w-full rounded-[8px] border border-black/[0.1] px-[12px] text-[13px] outline-none focus:border-black" defaultValue="GTU" disabled />
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[12px] font-medium text-black">Country</label>
                      <input type="text" className="h-[38px] w-full rounded-[8px] border border-black/[0.1] px-[12px] text-[13px] outline-none focus:border-black" defaultValue="India" />
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      <label className="text-[12px] font-medium text-black">Contact Email</label>
                      <input type="email" className="h-[38px] w-full rounded-[8px] border border-black/[0.1] px-[12px] text-[13px] outline-none focus:border-black" defaultValue="admin@gtu.edu" />
                    </div>
                  </div>
                  
                  <div className="pt-[16px] border-t border-black/[0.06] flex justify-end">
                    <button type="button" className="h-[36px] rounded-[8px] bg-[#16a34a] px-[20px] text-[13px] font-semibold text-white hover:bg-[#15803d]">
                      Save Changes
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
