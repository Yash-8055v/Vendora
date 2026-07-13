import { Outlet } from "react-router-dom";
import { LayoutDashboard, Store, Package, ShoppingBag, FileText } from "lucide-react";
import Sidebar from "@/components/common/Sidebar";

const ITEMS = [
  { to: "/vendor", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vendor/store", label: "Store", icon: Store },
  { to: "/vendor/products", label: "Products", icon: Package },
  { to: "/vendor/orders", label: "Orders", icon: ShoppingBag },
  { to: "/vendor/application", label: "Application", icon: FileText },
];

export default function VendorLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-stone-25">
      <Sidebar items={ITEMS} title="Vendor Hub" />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-stone-200 bg-white px-6">
          <h1 className="font-display text-lg font-semibold text-stone-800">Vendor</h1>
          <div className="hidden items-center gap-6 text-sm text-stone-500 sm:flex">
            <span>
              Today's sales: <strong className="text-stone-800">—</strong>
            </span>
            <span>
              Pending orders: <strong className="text-stone-800">—</strong>
            </span>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
