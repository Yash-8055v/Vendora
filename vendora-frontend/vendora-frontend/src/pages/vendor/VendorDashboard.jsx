import { Link } from "react-router-dom";
import { IndianRupee, Clock, Package, Star, Plus } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { formatCurrency } from "@/utils/format";
import { MOCK_VENDOR_STATS, MOCK_VENDOR_ORDERS } from "@/constants/mockData";

// TODO: Replace with vendor dashboard API once confirmed (not yet specified
// in 08_API_MAPPING.md — ask before inventing the endpoint).
export default function VendorDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-stone-900">Dashboard</h1>
        <Link
          to="/vendor/products/new"
          className="inline-flex h-11 items-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> New Product
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Sales" value={formatCurrency(MOCK_VENDOR_STATS.totalSales)} icon={IndianRupee} />
        <StatCard label="Pending Orders" value={MOCK_VENDOR_STATS.pendingOrders} icon={Clock} />
        <StatCard label="Active Products" value={MOCK_VENDOR_STATS.activeProducts} icon={Package} />
        <StatCard label="Store Rating" value={MOCK_VENDOR_STATS.storeRating} icon={Star} />
      </div>

      <section className="mt-8 rounded-card border border-stone-200 bg-white p-6 shadow-soft">
        <h2 className="font-semibold text-stone-800">Sales Analytics</h2>
        <div className="mt-4 grid h-56 place-items-center rounded-md border border-dashed border-stone-200 bg-stone-50 text-sm text-stone-400">
          Analytics chart coming soon
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-stone-800">Recent Orders</h2>
          <Link to="/vendor/orders" className="text-sm font-medium text-brand-700">
            View all
          </Link>
        </div>
        <div className="overflow-hidden rounded-card border border-stone-200 bg-white">
          {MOCK_VENDOR_ORDERS.map((order) => (
            <div key={order.id} className="flex items-center justify-between border-b border-stone-100 p-4 text-sm last:border-0">
              <span className="font-medium text-stone-800">#{order.id}</span>
              <span className="text-stone-500">{order.customer}</span>
              <span className="font-semibold text-stone-900">{formatCurrency(order.total)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
