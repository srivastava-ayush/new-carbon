"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, CalendarBlank, CaretDown, DownloadSimple, List, MagnifyingGlass, LockKey, CircleNotch, CheckCircle } from "@phosphor-icons/react";
import { EASE } from "@/lib/animations";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { getNotifications, getUnreadNotificationsCount, markNotificationAsRead } from "@/lib/api";
import { useEffect } from "react";

const RANGES = ["Last 12 months", "Last 6 months", "Last 3 months", "Year to date"];

interface TopbarProps {
  onMenu: () => void;
  title: string;
  subtitle: string;
}

export default function Topbar({ onMenu, title, subtitle }: TopbarProps) {
  const [range, setRange] = useState(0);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const canExport = ["SUPER_ADMIN", "UNIVERSITY_ADMIN", "MANAGEMENT", "AUDITOR"].includes(user?.role || "");
  const canLock = ["SUPER_ADMIN", "UNIVERSITY_ADMIN", "MANAGEMENT"].includes(user?.role || "");
  const [isLocked, setIsLocked] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [recentNotifs, setRecentNotifs] = useState<any[]>([]);

  useEffect(() => {
    getUnreadNotificationsCount().then(r => r.success && setUnreadCount(r.data.count)).catch(() => {});
  }, []);

  const fetchNotifs = async () => {
    const res = await getNotifications();
    if (res.success) setRecentNotifs(res.data.slice(0, 5)); // Just show recent 5 in popover
  };

  const toggleNotif = () => {
    if (!notifOpen) fetchNotifs();
    setNotifOpen(!notifOpen);
  };

  const handleRead = async (id: string) => {
    await markNotificationAsRead(id);
    setRecentNotifs(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    setUnreadCount(c => Math.max(0, c - 1));
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="sticky top-0 z-30 flex h-[60px] items-center justify-between gap-[16px] border-b border-black/[0.06] bg-[#fafafa]/85 px-[20px] backdrop-blur-md md:px-[32px]"
    >
      <div className="flex min-w-0 items-center gap-[12px]">
        <button
          onClick={onMenu}
          className="flex items-center justify-center rounded-[8px] p-[6px] text-[#71717a] hover:bg-black/[0.04] hover:text-black lg:hidden"
        >
          <List size={20} />
        </button>
        <div className="min-w-0">
          <div className="flex items-center gap-[8px]">
            <h1 className="truncate text-[15px] font-semibold tracking-[-0.2px] text-black">{title}</h1>
            <span className="hidden rounded-full border border-black/[0.06] bg-white px-[8px] py-[2px] text-[11px] font-medium text-[#a1a1aa] md:inline">
              FY 2025–26
            </span>
          </div>
          <p className="hidden truncate text-[11.5px] text-[#71717a] sm:block">{subtitle}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-[8px]">
        <div className="relative hidden md:block">
          <MagnifyingGlass size={15} className="pointer-events-none absolute top-1/2 left-[10px] -translate-y-1/2 text-[#a1a1aa]" />
          <input
            placeholder="Search…"
            className="h-[34px] w-[190px] rounded-[8px] border border-black/[0.06] bg-white pr-[10px] pl-[32px] text-[13px] text-black placeholder:text-[#a1a1aa] focus:border-[#16a34a]/40 focus:outline-none"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-[34px] items-center gap-[8px] rounded-[8px] border border-black/[0.06] bg-white px-[10px] text-[13px] font-medium text-[#52525b] transition-colors hover:border-black/10"
          >
            <CalendarBlank size={14} className="text-[#a1a1aa]" />
            <span className="hidden sm:inline">{RANGES[range]}</span>
            <CaretDown size={11} className={`text-[#a1a1aa] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="absolute top-full right-0 z-20 mt-[6px] w-[170px] rounded-[8px] border border-black/[0.06] bg-white p-[6px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              >
                {RANGES.map((r, i) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRange(i);
                      setOpen(false);
                    }}
                    className={`w-full rounded-[6px] px-[8px] py-[7px] text-left text-[13px] font-medium transition-colors hover:bg-black/[0.04] ${
                      i === range ? "text-black" : "text-[#71717a]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {canLock && (
          <button 
            onClick={() => {
              const newState = !isLocked;
              setIsLocked(newState);
              toast.success(`Reporting period ${newState ? "locked" : "unlocked"} successfully`);
            }}
            className={`hidden h-[34px] items-center gap-[6px] rounded-[8px] px-[12px] text-[13px] font-semibold transition-colors md:flex ${
              isLocked 
                ? "bg-[#fffbeb] text-[#d97706] border border-[#f59e0b]/20 hover:bg-[#fef3c7]" 
                : "bg-white border border-black/[0.06] text-[#52525b] hover:bg-black/5"
            }`}
          >
            <LockKey size={14} weight={isLocked ? "fill" : "regular"} />
            {isLocked ? "Period Locked" : "Lock Period"}
          </button>
        )}

        {canExport && (
          <button 
            onClick={() => {
              const t = toast.loading("Preparing export...");
              setTimeout(() => toast.success("Export successful", { id: t }), 1500);
            }}
            className="hidden h-[34px] items-center gap-[6px] rounded-[8px] bg-[#16a34a] px-[12px] text-[13px] font-semibold text-white transition-colors hover:bg-[#15803d] md:flex"
          >
            <DownloadSimple size={14} />
            Export
          </button>
        )}

        <div className="relative">
          <button 
            onClick={toggleNotif}
            className="relative flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border border-black/[0.06] bg-white text-[#71717a] transition-colors hover:text-black"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-[4px] -right-[4px] flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#ef4444] px-[4px] text-[9px] font-bold text-white shadow-sm border border-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="absolute top-[calc(100%+8px)] right-0 z-50 w-[320px] rounded-[12px] border border-black/[0.08] bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-black/[0.06] px-[16px] py-[12px] bg-[#fafafa]">
                  <h3 className="text-[13px] font-semibold text-black">Notifications</h3>
                  <a href="/notifications" className="text-[11px] font-medium text-[#15803d] hover:underline">View All</a>
                </div>
                
                <div className="flex max-h-[300px] flex-col overflow-y-auto">
                  {recentNotifs.length === 0 ? (
                    <div className="flex items-center justify-center py-[32px] text-[13px] text-[#71717a]">
                      No notifications
                    </div>
                  ) : (
                    recentNotifs.map(n => (
                      <div key={n.id} className={`flex gap-[12px] border-b border-black/[0.04] p-[16px] transition-colors hover:bg-black/[0.02] ${!n.isRead ? "bg-blue-50/30" : ""}`}>
                        <div className="mt-[2px] flex h-[8px] w-[8px] shrink-0 items-center justify-center">
                          {!n.isRead ? <span className="h-[6px] w-[6px] rounded-full bg-blue-600" /> : <span className="h-[6px] w-[6px] rounded-full bg-transparent" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-[12.5px] leading-snug ${!n.isRead ? "font-semibold text-black" : "font-medium text-[#52525b]"}`}>{n.title}</p>
                          <p className="mt-[4px] text-[11.5px] text-[#71717a] line-clamp-2">{n.message}</p>
                          <div className="mt-[8px] flex items-center justify-between">
                            <span className="text-[10px] font-medium text-[#a1a1aa] uppercase tracking-wide">
                              {new Date(n.createdAt).toLocaleDateString()}
                            </span>
                            {!n.isRead && (
                              <button onClick={() => handleRead(n.id)} className="flex items-center gap-[4px] text-[10px] font-semibold text-[#15803d] hover:text-[#16a34a]">
                                <CheckCircle size={12} weight="fill" /> Mark Read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
