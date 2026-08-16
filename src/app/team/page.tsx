"use client";

import { motion, AnimatePresence } from "motion/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { EnvelopeSimple, Plus, Trash, CheckCircle, X } from "@phosphor-icons/react";
import Topbar from "@/components/dashboard/Topbar";
import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "@/lib/api";

export default function TeamPage() {
  const { user } = useAuth();
  const isAdmin = ["SUPER_ADMIN", "UNIVERSITY_ADMIN"].includes(user?.role || "");

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", role: "USER", universityId: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getUsers();
      if (res.success) {
        setUsers(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  // Fallback protection in case a non-admin gets here
  if (user && !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#fafafa]">
        <p className="text-[#a1a1aa]">You do not have permission to view this page.</p>
      </div>
    );
  }

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // Use current admin's university if they are UNIVERSITY_ADMIN
    const payload = { ...formData };
    if (user?.role === "UNIVERSITY_ADMIN" && user.universityId) {
      payload.universityId = user.universityId;
    }

    try {
      const res = await createUser(payload);
      if (res.success) {
        // Show the provisioned password in a blocking alert since we don't have email setup yet
        if (res.data.provisionedPassword) {
          alert(`User invited successfully!\n\nIMPORTANT: Their temporary password is:\n\n${res.data.provisionedPassword}\n\nPlease save this and send it to them securely.`);
        } else {
          alert("User invited successfully!");
        }
        setIsModalOpen(false);
        setFormData({ firstName: "", lastName: "", email: "", role: "USER", universityId: "" });
        loadUsers();
      } else {
        setError(res.message || "Failed to invite user");
      }
    } catch (e: any) {
      setError(e.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, role: string) => {
    if (role === "SUPER_ADMIN") {
      alert("Cannot delete SUPER_ADMIN accounts.");
      return;
    }
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await deleteUser(id);
        if (res.success) {
          loadUsers();
        } else {
          alert(res.message || "Failed to delete user");
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#fafafa] relative">
        <Topbar 
          title="Team Directory" 
          subtitle="Manage users, assign roles, and invite new team members." 
          onMenu={() => {}} 
        />
        
        <main className="flex-1 overflow-y-auto px-[20px] py-[32px] md:px-[32px] max-w-[1200px] mx-auto w-full relative z-0">
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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-[6px] rounded-[8px] bg-[#16a34a] px-[12px] py-[8px] text-[13px] font-semibold text-white transition-colors hover:bg-[#15803d]"
              >
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
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="p-[32px] text-center text-[#a1a1aa] text-[13px]">Loading users...</td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-[32px] text-center text-[#a1a1aa] text-[13px]">No users found.</td>
                      </tr>
                    ) : (
                      users.map((u, i) => (
                        <tr key={u.id} className="border-b border-black/[0.04] last:border-none hover:bg-black/[0.01] transition-colors">
                          <td className="px-[20px] py-[16px]">
                            <div className="flex items-center gap-[12px]">
                              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#f4f4f5] text-[12px] font-semibold uppercase text-[#52525b]">
                                {u.firstName.charAt(0)}{u.lastName ? u.lastName.charAt(0) : ""}
                              </span>
                              <div>
                                <p className="text-[13.5px] font-medium text-black">{u.firstName} {u.lastName}</p>
                                <p className="text-[12px] text-[#71717a]">{u.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-[20px] py-[16px]">
                            <span className="rounded-[6px] border border-black/[0.08] bg-[#fafafa] px-[8px] py-[3px] text-[11px] font-semibold text-[#52525b]">
                              {u.role.replace(/_/g, " ")}
                            </span>
                          </td>
                          <td className="px-[20px] py-[16px]">
                            {u.status === "ACTIVE" ? (
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
                            {u.role !== "SUPER_ADMIN" && u.id !== user?.id && (
                              <button 
                                onClick={() => handleDelete(u.id, u.role)}
                                className="text-[#a1a1aa] hover:text-red-600 transition-colors"
                              >
                                <Trash size={16} weight="bold" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </main>

        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
                onClick={() => setIsModalOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="relative w-full max-w-[440px] rounded-[16px] bg-white shadow-2xl p-[24px]"
              >
                <div className="flex items-center justify-between mb-[20px]">
                  <h3 className="text-[18px] font-semibold text-black">Invite Team Member</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-[#a1a1aa] hover:text-black">
                    <X size={20} />
                  </button>
                </div>
                
                {error && <div className="mb-[16px] rounded-[8px] bg-red-50 p-[12px] text-[13px] text-red-600 border border-red-100">{error}</div>}

                <form onSubmit={handleInvite} className="flex flex-col gap-[16px]">
                  <div className="grid grid-cols-2 gap-[12px]">
                    <div>
                      <label className="block text-[12px] font-medium text-[#71717a] mb-[6px]">First Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] py-[8px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#71717a] mb-[6px]">Last Name</label>
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] py-[8px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-[#71717a] mb-[6px]">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] py-[8px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-[#71717a] mb-[6px]">Role</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] py-[8px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                    >
                      {user?.role === "SUPER_ADMIN" && <option value="UNIVERSITY_ADMIN">University Admin</option>}
                      <option value="SUSTAINABILITY_MANAGER">Sustainability Manager</option>
                      <option value="FACILITIES_MANAGER">Facilities Manager</option>
                      <option value="REVIEWER">Reviewer</option>
                      <option value="DATA_ENTRY">Data Entry</option>
                      <option value="AUDITOR">Auditor</option>
                      <option value="MANAGEMENT">Management</option>
                      <option value="USER">Standard User</option>
                    </select>
                  </div>

                  {user?.role === "SUPER_ADMIN" && (
                    <div>
                      <label className="block text-[12px] font-medium text-[#71717a] mb-[6px]">University ID (UUID)</label>
                      <input 
                        required
                        type="text" 
                        value={formData.universityId}
                        onChange={(e) => setFormData({...formData, universityId: e.target.value})}
                        className="w-full rounded-[8px] border border-black/[0.08] bg-white px-[12px] py-[8px] text-[13px] text-black outline-none focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]"
                        placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                      />
                    </div>
                  )}

                  <div className="mt-[8px] flex gap-[10px] justify-end">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-[8px] px-[16px] py-[8px] text-[13px] font-semibold text-[#71717a] hover:bg-black/[0.03] transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="flex items-center gap-[6px] rounded-[8px] bg-[#16a34a] px-[16px] py-[8px] text-[13px] font-semibold text-white transition-colors hover:bg-[#15803d] disabled:opacity-50"
                    >
                      {submitting ? "Inviting..." : "Send Invitation"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </div>
  );
}
