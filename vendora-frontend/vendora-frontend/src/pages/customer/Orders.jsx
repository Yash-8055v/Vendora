import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import OrderCard from "@/components/customer/OrderCard";
import { EmptyState } from "@/components/common/States";
import { MOCK_ORDERS } from "@/constants/mockData";

// TODO: Replace with GET /orders
export default function Orders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return MOCK_ORDERS.filter((o) => {
      const matchesSearch = o.id.includes(search);
      const matchesStatus = status === "all" || o.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-stone-900">My Orders</h1>

      <div className="mt-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order ID…"
            className="h-11 w-full rounded-md border border-stone-200 bg-white pl-9 pr-4 text-sm focus:border-brand-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-md border border-stone-200 bg-white px-3 text-sm text-stone-700"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 ? (
          <EmptyState title="No orders found" description="Orders you place will show up here." />
        ) : (
          filtered.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
}
