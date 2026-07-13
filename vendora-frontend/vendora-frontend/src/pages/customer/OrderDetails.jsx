import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Badge from "@/components/common/Badge";
import { ErrorState } from "@/components/common/States";
import { formatCurrency, formatDate } from "@/utils/format";
import { MOCK_ORDERS } from "@/constants/mockData";

const TIMELINE_STEPS = ["pending", "confirmed", "shipped", "out_for_delivery", "delivered"];

// TODO: Replace with GET /orders/:id
export default function OrderDetails() {
  const { id } = useParams();
  const order = MOCK_ORDERS.find((o) => o.id === id);

  if (!order) {
    return <ErrorState title="Order not found" description="We couldn't find an order with that ID." />;
  }

  const currentStepIndex = TIMELINE_STEPS.indexOf(order.status);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-stone-900">Order #{order.id}</h1>
        <Badge tone="brand">{order.status.replace(/_/g, " ")}</Badge>
      </div>
      <p className="mt-1 text-sm text-stone-500">Placed on {formatDate(order.date)}</p>

      <section className="mt-8 rounded-card border border-stone-200 bg-white p-6 shadow-soft">
        <h2 className="font-semibold text-stone-800">Order Timeline</h2>
        <div className="mt-4 flex items-center">
          {TIMELINE_STEPS.map((step, i) => (
            <div key={step} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`grid h-8 w-8 place-items-center rounded-full ${
                    i <= currentStepIndex ? "bg-brand-600 text-white" : "bg-stone-100 text-stone-400"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-xs capitalize text-stone-500">{step.replace(/_/g, " ")}</span>
              </div>
              {i < TIMELINE_STEPS.length - 1 && (
                <div className={`mx-2 h-0.5 flex-1 ${i < currentStepIndex ? "bg-brand-600" : "bg-stone-100"}`} />
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-card border border-stone-200 bg-white p-6 shadow-soft">
        <h2 className="font-semibold text-stone-800">Items</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between text-stone-500">
            <span>{order.itemsCount} item(s)</span>
            <span className="font-semibold text-stone-900">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <section className="rounded-card border border-stone-200 bg-white p-6 shadow-soft">
          <h2 className="font-semibold text-stone-800">Shipping</h2>
          <p className="mt-2 text-sm text-stone-500">Standard delivery, 3–5 business days.</p>
        </section>
        <section className="rounded-card border border-stone-200 bg-white p-6 shadow-soft">
          <h2 className="font-semibold text-stone-800">Payment</h2>
          <p className="mt-2 text-sm text-stone-500">Paid via card ending in ****.</p>
        </section>
      </div>
    </div>
  );
}
