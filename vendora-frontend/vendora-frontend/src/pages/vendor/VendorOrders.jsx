import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { formatCurrency, formatDate } from "@/utils/format";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { MOCK_VENDOR_ORDERS } from "@/constants/mockData";

const STATUS_TONE = { pending: "warning", confirmed: "info", shipped: "info", out_for_delivery: "info", delivered: "success" };

const NEXT_ACTION = {
  pending: { label: "Confirm", next: "confirmed" },
  confirmed: { label: "Ship", next: "shipped" },
  shipped: { label: "Out for Delivery", next: "out_for_delivery" },
  out_for_delivery: { label: "Mark Delivered", next: "delivered" },
};

// TODO: Replace mock actions with PATCH /vendor-orders/:id/confirm|ship|
// out-for-delivery|deliver (see 08_API_MAPPING.md)
export default function VendorOrders() {
  const [orders, setOrders] = useState(MOCK_VENDOR_ORDERS.map((o) => ({ ...o, status: o.status })));
  const { showToast } = useToast();

  const advance = (order) => {
    const action = NEXT_ACTION[order.status];
    if (!action) return;
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: action.next } : o)));
    showToast(`Order #${order.id} updated to ${action.next.replace(/_/g, " ")}`, TOAST_TYPES.SUCCESS);
  };

  const columns = [
    { key: "id", header: "Order", render: (row) => `#${row.id}` },
    { key: "customer", header: "Customer" },
    { key: "date", header: "Date", render: (row) => formatDate(row.date) },
    { key: "total", header: "Total", render: (row) => formatCurrency(row.total) },
    { key: "status", header: "Status", render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status.replace(/_/g, " ")}</Badge> },
    {
      key: "actions",
      header: "",
      render: (row) =>
        NEXT_ACTION[row.status] ? (
          <Button size="sm" variant="outline" onClick={() => advance(row)}>
            {NEXT_ACTION[row.status].label}
          </Button>
        ) : (
          <span className="text-xs text-stone-400">Complete</span>
        ),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-stone-900">Vendor Orders</h1>
      <div className="mt-6">
        <DataTable columns={columns} rows={orders} emptyTitle="No orders yet" />
      </div>
    </div>
  );
}
