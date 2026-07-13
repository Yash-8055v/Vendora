import { Users, Store, ShoppingBag, IndianRupee } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { formatCurrency } from "@/utils/format";
import { MOCK_ADMIN_STATS, MOCK_ADMIN_ORDERS } from "@/constants/mockData";

// TODO: Replace with GET /admin/dashboard (see 08_API_MAPPING.md)
export default function AdminDashboard() {
  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-stone-900">Admin Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Users" value={MOCK_ADMIN_STATS.totalUsers.toLocaleString()} icon={Users} />
        <StatCard label="Total Vendors" value={MOCK_ADMIN_STATS.totalVendors} icon={Store} />
        <StatCard label="Total Orders" value={MOCK_ADMIN_STATS.totalOrders.toLocaleString()} icon={ShoppingBag} />
        <StatCard label="Revenue" value={formatCurrency(MOCK_ADMIN_STATS.revenue)} icon={IndianRupee} />
      </div>

      <section className="mt-8 rounded-card border border-stone-200 bg-white p-6 shadow-soft">
        <h2 className="font-semibold text-stone-800">Marketplace Activity</h2>
        <div className="mt-4 grid h-56 place-items-center rounded-md border border-dashed border-stone-200 bg-stone-50 text-sm text-stone-400">
          Charts coming soon
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-4 font-semibold text-stone-800">Recent Orders</h2>
        <div className="overflow-hidden rounded-card border border-stone-200 bg-white">
          {MOCK_ADMIN_ORDERS.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b border-stone-100 p-4 text-sm last:border-0">
              <span className="font-medium text-stone-800">#{order.id}</span>
              <span className="text-stone-500">{order.vendor}</span>
              <span className="font-semibold text-stone-900">{formatCurrency(order.total)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
