import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";

const ICONS = {
  [TOAST_TYPES.SUCCESS]: CheckCircle2,
  [TOAST_TYPES.ERROR]: XCircle,
  [TOAST_TYPES.INFO]: Info,
  [TOAST_TYPES.WARNING]: AlertTriangle,
};

const COLORS = {
  [TOAST_TYPES.SUCCESS]: "border-success-500/30 text-success-600",
  [TOAST_TYPES.ERROR]: "border-error-500/30 text-error-600",
  [TOAST_TYPES.INFO]: "border-info-500/30 text-info-600",
  [TOAST_TYPES.WARNING]: "border-warning-500/30 text-warning-600",
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2" role="region" aria-label="Notifications">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] ?? Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              role="status"
              className={`flex items-start gap-3 rounded-card border bg-white p-4 shadow-elevated ${COLORS[toast.type]}`}
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="flex-1 text-sm text-stone-700">{toast.message}</p>
              <button
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
