import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MOCK_NOTIFICATIONS } from "@/constants/mockData";
import { formatDate } from "@/utils/format";
import { cn } from "@/utils/cn";

// TODO: Replace MOCK_NOTIFICATIONS with a real notifications endpoint once
// one exists (not in 08_API_MAPPING.md yet — confirm shape before building).
export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const ref = useRef(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative grid h-10 w-10 place-items-center rounded-full text-stone-600 hover:bg-stone-100"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-error-500 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 z-50 w-80 rounded-card border border-stone-200 bg-white shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
              <span className="text-sm font-semibold text-stone-800">Notifications</span>
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="text-xs font-medium text-brand-700">
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-stone-400">You're all caught up</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "border-b border-stone-50 px-4 py-3 last:border-0",
                      !n.read && "bg-brand-50/40"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {!n.read && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />}
                      <div className={cn(!n.read ? "" : "pl-3.5")}>
                        <p className="text-sm font-medium text-stone-800">{n.title}</p>
                        <p className="mt-0.5 text-xs text-stone-500">{n.body}</p>
                        <p className="mt-1 text-[11px] text-stone-400">{formatDate(n.date, { dateStyle: "medium", timeStyle: "short" })}</p>
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
  );
}
