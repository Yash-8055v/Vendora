import { cn } from "@/utils/cn";

const TONE_CLASSES = {
  neutral: "bg-stone-100 text-stone-700",
  success: "bg-success-50 text-success-600",
  warning: "bg-warning-50 text-warning-600",
  error: "bg-error-50 text-error-600",
  info: "bg-info-50 text-info-600",
  brand: "bg-brand-50 text-brand-700",
};

export default function Badge({ tone = "neutral", className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium",
        TONE_CLASSES[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
