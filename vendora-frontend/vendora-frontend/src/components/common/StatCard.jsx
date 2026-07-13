import { cn } from "@/utils/cn";

export default function StatCard({ label, value, icon: Icon, trend, tone = "neutral" }) {
  return (
    <div className="rounded-card border border-stone-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm text-stone-500">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-stone-400" />}
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-stone-900">{value}</p>
      {trend && (
        <p
          className={cn(
            "mt-1 text-xs font-medium",
            tone === "positive" ? "text-success-600" : tone === "negative" ? "text-error-600" : "text-stone-400"
          )}
        >
          {trend}
        </p>
      )}
    </div>
  );
}
