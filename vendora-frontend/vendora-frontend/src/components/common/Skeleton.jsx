import { cn } from "@/utils/cn";

export function Skeleton({ className }) {
  return <div className={cn("animate-pulse rounded-sm bg-stone-200", className)} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-card border border-stone-200 bg-white p-4 shadow-soft">
      <Skeleton className="h-40 w-full rounded-md" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
    </div>
  );
}

export function SkeletonProductGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4 }) {
  return (
    <div className="overflow-hidden rounded-card border border-stone-200 bg-white">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 border-b border-stone-100 p-4 last:border-0">
          {Array.from({ length: columns }).map((__, c) => (
            <Skeleton key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-card" />
        ))}
      </div>
      <Skeleton className="h-72 w-full rounded-card" />
    </div>
  );
}

export function FullScreenLoader({ label = "Loading…" }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-brand-500" />
      <p className="text-sm text-stone-500">{label}</p>
    </div>
  );
}
