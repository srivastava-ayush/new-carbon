"use client";

import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AdminNav from "@/components/admin/AdminNav";
import { useAuth } from "@/context/AuthContext";
import { Plus, Buildings, PencilSimple, Trash } from "@phosphor-icons/react";

export default function AdminCampusesPage() {
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
              <AdminNav active="campuses" />
            </aside>

            <div className="flex-1 flex flex-col gap-[24px]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-semibold text-black">Campuses & Buildings</h2>
                  <p className="text-[13px] text-[#71717a] mt-[4px]">Manage physical infrastructure boundaries</p>
                </div>
                <button className="flex h-[34px] items-center gap-[6px] rounded-[8px] bg-black px-[16px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors">
                  <Plus size={14} weight="bold" /> Add Campus
                </button>
              </div>

              <div className="flex flex-col gap-[16px]">
                {/* Example Campus Block */}
                <div className="rounded-[12px] border border-black/[0.08] bg-white overflow-hidden shadow-sm">
                  <div className="flex items-center justify-between bg-[#fafafa] p-[16px] border-b border-black/[0.06]">
                    <div className="flex items-center gap-[12px]">
                      <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-indigo-100 text-indigo-700">
                        <Buildings size={18} weight="fill" />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-black">Main Campus</h3>
                        <p className="text-[12px] text-[#71717a]">Delhi, India • 2 Buildings</p>
                      </div>
                    </div>
                    <div className="flex gap-[8px]">
                      <button className="h-[28px] px-[10px] rounded-[6px] border border-black/[0.1] text-[12px] font-medium text-[#52525b] hover:bg-black/[0.04]">Add Building</button>
                      <button className="h-[28px] px-[10px] rounded-[6px] text-[12px] font-medium text-[#15803d] hover:bg-green-50"><PencilSimple size={14}/></button>
                    </div>
                  </div>
                  
                  <div className="p-[16px]">
                    <div className="flex flex-col gap-[8px]">
                      <div className="flex items-center justify-between p-[12px] rounded-[8px] border border-black/[0.04] bg-[#fafafa] hover:border-black/[0.1]">
                        <div>
                          <p className="text-[13px] font-medium text-black">Admin Block</p>
                          <p className="text-[11px] text-[#71717a]">ADMIN-01</p>
                        </div>
                        <button className="text-[#a1a1aa] hover:text-red-600 transition-colors"><Trash size={16} /></button>
                      </div>
                      <div className="flex items-center justify-between p-[12px] rounded-[8px] border border-black/[0.04] bg-[#fafafa] hover:border-black/[0.1]">
                        <div>
                          <p className="text-[13px] font-medium text-black">Academic Block</p>
                          <p className="text-[11px] text-[#71717a]">ACAD-01</p>
                        </div>
                        <button className="text-[#a1a1aa] hover:text-red-600 transition-colors"><Trash size={16} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
