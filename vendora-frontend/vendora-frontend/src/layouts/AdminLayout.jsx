import { Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, FileCheck2, Users, Store, Package, ShoppingBag } from "lucide-react";
import Sidebar from "@/components/common/Sidebar";
import Breadcrumb from "@/components/common/Breadcrumb";

const ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/vendors/applications", label: "Vendor Applications", icon: FileCheck2 },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/vendors", label: "Vendors", icon: Store },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

function buildBreadcrumb(pathname) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Admin", to: "/admin" }];
  let path = "";
  segments.slice(1).forEach((seg) => {
    path += `/${seg}`;
    crumbs.push({ label: seg.replace(/-/g, " "), to: `/admin${path}` });
  });
  return crumbs;
}

export default function AdminLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-stone-25">
      <Sidebar items={ITEMS} title="Admin" />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <header className="flex h-16 shrink-0 items-center border-b border-stone-200 bg-white px-6">
          <Breadcrumb items={buildBreadcrumb(pathname)} />
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
