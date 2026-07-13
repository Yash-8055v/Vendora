import { Link } from "react-router-dom";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import { formatCurrency, formatDate } from "@/utils/format";
import { MOCK_ADMIN_ORDERS } from "@/constants/mockData";

const STATUS_TONE = { delivered: "success", shipped: "info", cancelled: "error", refunded: "neutral", pending: "warning" };

// TODO: Replace with GET /admin/orders, PATCH .../cancel, PATCH .../refund
export default function AdminOrders() {
  const columns = [
    { key: "id", header: "Order", render: (row) => <Link to={`/admin/orders/${row.id}`} className="font-medium text-brand-700">#{row.id}</Link> },
    { key: "customer", header: "Customer" },
    { key: "vendor", header: "Vendor" },
    { key: "date", header: "Date", render: (row) => formatDate(row.date) },
    { key: "total", header: "Total", render: (row) => formatCurrency(row.total) },
    { key: "status", header: "Status", render: (row) => <Badge tone={STATUS_TONE[row.status] ?? "neutral"}>{row.status}</Badge> },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-stone-900">Orders</h1>
      <div className="mt-6">
        <DataTable columns={columns} rows={MOCK_ADMIN_ORDERS} emptyTitle="No orders yet" />
      </div>
    </div>
  );
}
