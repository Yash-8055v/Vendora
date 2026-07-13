import { Outlet } from "react-router-dom";
import { LayoutDashboard, User, MapPin, ShoppingCart, Package } from "lucide-react";
import Sidebar from "@/components/common/Sidebar";

const ITEMS = [
  { to: "/account", label: "Dashboard", icon: LayoutDashboard },
  { to: "/account/profile", label: "Profile", icon: User },
  { to: "/account/addresses", label: "Addresses", icon: MapPin },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/orders", label: "Orders", icon: Package },
];

export default function CustomerLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-stone-25">
      <Sidebar items={ITEMS} title="My Account" />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-stone-200 bg-white px-6">
          <h1 className="font-display text-lg font-semibold text-stone-800">Customer</h1>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
