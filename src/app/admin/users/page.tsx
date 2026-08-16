"use client";

import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import AdminNav from "@/components/admin/AdminNav";
import { getUsers, createUser, updateUser } from "@/lib/api";
import { toast } from "sonner";
import { CircleNotch, Plus, PencilSimple, UserCircle } from "@phosphor-icons/react";
import { useAuth } from "@/context/AuthContext";

export default function AdminUsersPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const { user: currentUser } = useAuth();
  const isAdmin = ["SUPER_ADMIN", "UNIVERSITY_ADMIN"].includes(currentUser?.role || "");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      if (res.success) setUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  if (!isAdmin) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fafafa]">
        <div className="text-center">
          <h1 className="text-[20px] font-bold text-red-600">Access Denied</h1>
          <p className="mt-[8px] text-[13px] text-[#71717a]">You do not have permission to view this page.</p>
        </div>
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
              <AdminNav active="users" />
            </aside>

            <div className="flex-1 flex flex-col gap-[24px]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[18px] font-semibold text-black">Users & Roles</h2>
                  <p className="text-[13px] text-[#71717a] mt-[4px]">Manage who has access to your organization's carbon data</p>
                </div>
                <button className="flex h-[34px] items-center gap-[6px] rounded-[8px] bg-black px-[16px] text-[13px] font-semibold text-white hover:bg-black/80 transition-colors">
                  <Plus size={14} weight="bold" /> Add User
                </button>
              </div>

              <div className="rounded-[12px] border border-black/[0.08] bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-black/[0.06] bg-[#f8fafc] text-[#71717a]">
                        <th className="px-[16px] py-[12px] font-medium">User</th>
                        <th className="px-[16px] py-[12px] font-medium">Role</th>
                        <th className="px-[16px] py-[12px] font-medium">Status</th>
                        <th className="px-[16px] py-[12px] font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={4} className="py-[60px] text-center">
                            <CircleNotch size={24} className="animate-spin text-[#a1a1aa] mx-auto" />
                          </td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-[60px] text-center text-[#71717a]">No users found</td>
                        </tr>
                      ) : (
                        users.map((u) => (
                          <tr key={u.id} className="border-b border-black/[0.04] last:border-b-0 hover:bg-black/[0.02]">
                            <td className="px-[16px] py-[12px]">
                              <div className="flex items-center gap-[12px]">
                                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-blue-100 text-blue-700">
                                  <UserCircle size={20} weight="fill" />
                                </div>
                                <div>
                                  <p className="font-semibold text-black">{u.firstName} {u.lastName}</p>
                                  <p className="text-[12px] text-[#71717a]">{u.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-[16px] py-[12px]">
                              <span className="inline-flex rounded-full bg-gray-100 px-[8px] py-[2px] text-[11px] font-bold text-gray-700">
                                {u.role}
                              </span>
                            </td>
                            <td className="px-[16px] py-[12px]">
                              <span className={`inline-flex rounded-full px-[8px] py-[2px] text-[11px] font-bold ${
                                u.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {u.status}
                              </span>
                            </td>
                            <td className="px-[16px] py-[12px] text-right">
                              <button className="inline-flex h-[28px] items-center justify-center rounded-[6px] border border-black/[0.1] bg-white px-[12px] text-[12px] font-medium text-[#52525b] hover:bg-black/[0.04]">
                                <PencilSimple size={14} className="mr-[4px]" /> Edit
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
