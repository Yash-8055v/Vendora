import { useParams } from "react-router-dom";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { ErrorState } from "@/components/common/States";
import { formatCurrency, formatDate } from "@/utils/format";
import { MOCK_ADMIN_ORDERS } from "@/constants/mockData";

// TODO: Replace with GET /admin/orders/:id
export default function AdminOrderDetails() {
  const { id } = useParams();
  const order = MOCK_ADMIN_ORDERS.find((o) => o.id === id);

  if (!order) {
    return <ErrorState title="Order not found" description="We couldn't find an order with that ID." />;
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-stone-900">Order #{order.id}</h1>
        <Badge tone="brand">{order.status}</Badge>
      </div>
      <p className="mt-1 text-sm text-stone-500">Placed on {formatDate(order.date)}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section className="rounded-card border border-stone-200 bg-white p-6 shadow-soft">
          <h2 className="font-semibold text-stone-800">Customer</h2>
          <p className="mt-2 text-sm text-stone-500">{order.customer}</p>
        </section>
        <section className="rounded-card border border-stone-200 bg-white p-6 shadow-soft">
          <h2 className="font-semibold text-stone-800">Vendor</h2>
          <p className="mt-2 text-sm text-stone-500">{order.vendor}</p>
        </section>
      </div>

      <section className="mt-6 rounded-card border border-stone-200 bg-white p-6 shadow-soft">
        <h2 className="font-semibold text-stone-800">Total</h2>
        <p className="mt-2 font-display text-xl font-semibold text-stone-900">{formatCurrency(order.total)}</p>
      </section>

      <div className="mt-6 flex gap-2">
        <Button variant="outline">Cancel Order</Button>
        <Button variant="danger">Issue Refund</Button>
      </div>
    </div>
  );
}
