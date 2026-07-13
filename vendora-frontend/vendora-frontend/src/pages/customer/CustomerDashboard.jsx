import { Link } from "react-router-dom";
import { Package, MapPin, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import OrderCard from "@/components/customer/OrderCard";
import { MOCK_ORDERS } from "@/constants/mockData";

export default function CustomerDashboard() {
  const { user } = useAuth();
  const recentOrders = MOCK_ORDERS.slice(0, 2);

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-xl font-semibold text-stone-900">
        Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
      </h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { to: "/orders", icon: Package, label: "Orders" },
          { to: "/account/addresses", icon: MapPin, label: "Addresses" },
          { to: "/cart", icon: ShoppingCart, label: "Cart" },
        ].map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 rounded-card border border-stone-200 bg-white p-5 shadow-soft hover:shadow-elevated"
          >
            <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-700">
              <Icon className="h-5 w-5" />
            </div>
            <span className="font-medium text-stone-800">{label}</span>
          </Link>
        ))}
      </div>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-stone-800">Recent Orders</h2>
          <Link to="/orders" className="text-sm font-medium text-brand-700">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </section>
    </div>
  );
}
