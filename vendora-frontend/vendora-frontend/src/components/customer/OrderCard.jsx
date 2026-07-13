import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "@/utils/format";
import Badge from "@/components/common/Badge";

const STATUS_TONE = {
  pending: "warning",
  confirmed: "info",
  shipped: "info",
  out_for_delivery: "info",
  delivered: "success",
  cancelled: "error",
  refunded: "neutral",
};

export default function OrderCard({ order, basePath = "/orders" }) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-stone-200 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-800">Order #{order.id}</span>
          <Badge tone={STATUS_TONE[order.status] ?? "neutral"}>{order.status.replace(/_/g, " ")}</Badge>
        </div>
        <p className="mt-1 text-sm text-stone-500">
          {formatDate(order.date)} · {order.itemsCount} item{order.itemsCount === 1 ? "" : "s"}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-display text-base font-semibold text-stone-900">{formatCurrency(order.total)}</span>
        <Link to={`${basePath}/${order.id}`} className="text-sm font-medium text-brand-700">
          View Details
        </Link>
      </div>
    </div>
  );
}
