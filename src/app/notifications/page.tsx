"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/animations";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/api";
import { toast } from "sonner";
import { CircleNotch, CheckCircle, Bell, EnvelopeOpen, Check } from "@phosphor-icons/react";

export default function NotificationsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

  const fetchNotifs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getNotifications(filter === "UNREAD" ? { isRead: false } : undefined);
      if (res.success) setNotifications(res.data);
    } catch {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchNotifs(); }, [fetchNotifs]);

  const handleRead = async (id: string) => {
    try {
      const res = await markNotificationAsRead(id);
      if (res.success) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      }
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAll = async () => {
    try {
      const res = await markAllNotificationsAsRead();
      if (res.success) {
        toast.success("All marked as read");
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      }
    } catch {
      toast.error("Failed to mark all as read");
    }
  };

  return (
    <div className="flex min-h-dvh bg-[#fafafa]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={"notifications" as any} onChange={() => {}} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} title="Notifications" subtitle="System alerts and updates" />

        <main className="flex-1 px-[20px] py-[24px] md:px-[32px]">
          <div className="mx-auto flex max-w-[800px] flex-col gap-[24px]">
            
            <div className="flex items-center justify-between">
              <div className="flex rounded-[8px] bg-black/[0.04] p-[4px]">
                <button
                  onClick={() => setFilter("ALL")}
                  className={`rounded-[6px] px-[16px] py-[6px] text-[13px] font-medium transition-colors ${filter === "ALL" ? "bg-white text-black shadow-sm" : "text-[#71717a] hover:text-black"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("UNREAD")}
                  className={`rounded-[6px] px-[16px] py-[6px] text-[13px] font-medium transition-colors ${filter === "UNREAD" ? "bg-white text-black shadow-sm" : "text-[#71717a] hover:text-black"}`}
                >
                  Unread
                </button>
              </div>
              <button
                onClick={handleMarkAll}
                className="flex items-center gap-[6px] rounded-[8px] px-[12px] py-[8px] text-[12px] font-semibold text-[#52525b] hover:bg-black/[0.04] transition-colors"
              >
                <CheckCircle size={14} weight="bold" /> Mark all as read
              </button>
            </div>

            <div className="rounded-[12px] border border-black/[0.06] bg-white shadow-sm overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-[80px] gap-[12px]">
                  <CircleNotch size={32} className="animate-spin text-[#a1a1aa]" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-[80px] gap-[16px]">
                  <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-black/[0.04]">
                    <Bell size={24} className="text-[#a1a1aa]" />
                  </div>
                  <p className="text-[14px] text-[#71717a]">No notifications found</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {notifications.map((n, i) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.03, ease: EASE }}
                      className={`flex gap-[16px] border-b border-black/[0.04] p-[20px] last:border-b-0 ${!n.isRead ? "bg-[#f8fafc]" : ""}`}
                    >
                      <div className="mt-[4px] flex shrink-0 items-start justify-center">
                        {!n.isRead ? (
                          <span className="h-[8px] w-[8px] rounded-full bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)]" />
                        ) : (
                          <span className="h-[8px] w-[8px] rounded-full bg-[#d4d4d8]" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className={`text-[14px] leading-snug ${!n.isRead ? "font-semibold text-black" : "font-medium text-[#52525b]"}`}>
                            {n.title}
                          </h3>
                          <span className="shrink-0 text-[11px] font-medium text-[#a1a1aa]">
                            {new Date(n.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="mt-[4px] text-[13px] text-[#71717a]">{n.message}</p>
                      </div>

                      <div className="flex shrink-0 items-center justify-center ml-[16px]">
                        {!n.isRead ? (
                          <button
                            onClick={() => handleRead(n.id)}
                            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white border border-black/[0.08] text-[#71717a] hover:text-[#15803d] hover:border-[#15803d] hover:bg-green-50 transition-all"
                            title="Mark as read"
                          >
                            <Check size={14} weight="bold" />
                          </button>
                        ) : (
                          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-black/[0.02] text-[#a1a1aa]">
                            <EnvelopeOpen size={14} />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
