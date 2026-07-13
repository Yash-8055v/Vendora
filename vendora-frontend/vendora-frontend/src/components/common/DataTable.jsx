import { ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/common/States";
import { SkeletonTable } from "@/components/common/Skeleton";

/**
 * columns: [{ key, header, render?(row) }]
 * Pagination is page-based and purely presentational here — wire to real
 * params (page/limit) once a list API is integrated.
 */
export default function DataTable({
  columns,
  rows,
  isLoading = false,
  page = 1,
  totalPages = 1,
  onPageChange,
  emptyTitle = "Nothing to show",
  emptyDescription,
  rowKey = "id",
}) {
  if (isLoading) return <SkeletonTable columns={columns.length} />;

  if (!rows || rows.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-hidden rounded-card border border-stone-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-stone-100 bg-stone-50">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-medium text-stone-500">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[rowKey]} className="border-b border-stone-100 last:border-0 hover:bg-stone-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-stone-700">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-stone-100 px-4 py-3">
          <span className="text-xs text-stone-400">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange?.(Math.max(1, page - 1))}
              disabled={page <= 1}
              aria-label="Previous page"
              className="grid h-8 w-8 place-items-center rounded-md border border-stone-200 text-stone-500 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
              disabled={page >= totalPages}
              aria-label="Next page"
              className="grid h-8 w-8 place-items-center rounded-md border border-stone-200 text-stone-500 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
