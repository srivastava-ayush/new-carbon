"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";

import { EnvelopeSimple, Plus, DotsThree, CheckCircle } from "@phosphor-icons/react";
import Topbar from "@/components/dashboard/Topbar";

const MOCK_USERS = [
  { name: "Ayush Srivastava", email: "ayush@carbonsynq.com", role: "SUPER_ADMIN", status: "Active" },
  { name: "John Doe", email: "john@acme.com", role: "UNIVERSITY_ADMIN", status: "Active" },
  { name: "Jane Smith", email: "jane@acme.com", role: "DATA_ENTRY", status: "Pending" },
  { name: "Auditor Mike", email: "mike@auditfirm.com", role: "AUDITOR", status: "Active" },
];

export default function TeamPage() {
  const { user } = useAuth();
  const isAdmin = ["SUPER_ADMIN", "UNIVERSITY_ADMIN"].includes(user?.role || "");

  // Fallback protection in case a non-admin gets here
  if (user && !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-[#a1a1aa]">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-[#fafafa]">
        <Topbar 
          title="Team Directory" 
          subtitle="Manage users, assign roles, and invite new team members." 
          onMenu={() => {}} 
        />
        
        <main className="flex-1 overflow-y-auto px-[20px] py-[32px] md:px-[32px] max-w-[1200px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-[24px]">
              <div>
                <h2 className="text-[18px] font-semibold text-black">All Users</h2>
                <p className="text-[13px] text-[#71717a]">Manage roles and permissions across your organization.</p>
              </div>
              <button className="flex items-center gap-[6px] rounded-[8px] bg-[#16a34a] px-[12px] py-[8px] text-[13px] font-semibold text-white transition-colors hover:bg-[#15803d]">
                <Plus size={14} weight="bold" />
                Invite user
              </button>
            </div>

            <div className="rounded-[12px] border border-black/[0.08] bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[#fafafa] text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#71717a]">
                      <th className="px-[20px] py-[12px]">Name</th>
                      <th className="px-[20px] py-[12px]">Role</th>
                      <th className="px-[20px] py-[12px]">Status</th>
                      <th className="px-[20px] py-[12px] w-[60px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USERS.map((u, i) => (
                      <tr key={i} className="border-b border-black/[0.04] last:border-none hover:bg-black/[0.01] transition-colors">
                        <td className="px-[20px] py-[16px]">
                          <div className="flex items-center gap-[12px]">
                            <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#f4f4f5] text-[12px] font-semibold text-[#52525b]">
                              {u.name.charAt(0)}
                            </span>
                            <div>
                              <p className="text-[13.5px] font-medium text-black">{u.name}</p>
                              <p className="text-[12px] text-[#71717a]">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-[20px] py-[16px]">
                          <span className="rounded-[6px] border border-black/[0.08] bg-[#fafafa] px-[8px] py-[3px] text-[11px] font-semibold text-[#52525b]">
                            {u.role.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-[20px] py-[16px]">
                          {u.status === "Active" ? (
                            <span className="flex w-fit items-center gap-[4px] rounded-full bg-[#f0fdf4] px-[8px] py-[2px] text-[11px] font-medium text-[#16a34a]">
                              <CheckCircle size={12} weight="fill" /> Active
                            </span>
                          ) : (
                            <span className="flex w-fit items-center gap-[4px] rounded-full bg-[#fffbeb] px-[8px] py-[2px] text-[11px] font-medium text-[#d97706]">
                              <EnvelopeSimple size={12} weight="fill" /> Pending
                            </span>
                          )}
                        </td>
                        <td className="px-[20px] py-[16px] text-right">
                          <button className="text-[#a1a1aa] hover:text-black transition-colors">
                            <DotsThree size={20} weight="bold" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>
    </div>
  );
}
