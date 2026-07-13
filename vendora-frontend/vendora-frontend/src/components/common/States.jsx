import { PackageOpen, AlertCircle } from "lucide-react";
import Button from "@/components/common/Button";

/** Generic empty state — illustration slot, title, description, CTA. */
export function EmptyState({
  icon: Icon = PackageOpen,
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-stone-200 bg-stone-50 px-6 py-16 text-center">
      <Icon className="h-10 w-10 text-stone-400" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
      {description && <p className="max-w-sm text-sm text-stone-500">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

/** Generic error state — message, retry button, helpful explanation. */
export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this right now. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-error-50 bg-error-50/40 px-6 py-16 text-center">
      <AlertCircle className="h-10 w-10 text-error-500" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
      <p className="max-w-sm text-sm text-stone-500">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-2">
          Retry
        </Button>
      )}
    </div>
  );
}
