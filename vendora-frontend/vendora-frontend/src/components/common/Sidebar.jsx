import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, LogOut, Store } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/utils/cn";

/**
 * Sidebar — shared across Customer / Vendor / Admin layouts.
 * `items`: [{ to, label, icon }]
 */
export default function Sidebar({ items, title }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-stone-200 bg-white transition-all duration-200",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex shrink-0 items-center justify-between px-4 py-5">
        {!collapsed && <span className="font-display text-lg font-semibold text-brand-700">{title}</span>}
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-stone-400 hover:bg-stone-100"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="mx-4 mb-4 flex shrink-0 items-center gap-3 rounded-card bg-stone-50 p-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
            {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-stone-800">{user?.name ?? "Guest"}</p>
            <p className="truncate text-xs text-stone-500">{user?.email ?? ""}</p>
          </div>
        </div>
      )}

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100",
                isActive && "bg-brand-50 text-brand-700",
                collapsed && "justify-center"
              )
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="shrink-0 space-y-1 border-t border-stone-100 px-3 py-4">
        <Link
          to="/"
          title={collapsed ? "Back to main site" : undefined}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50",
            collapsed && "justify-center"
          )}
        >
          <Store className="h-4.5 w-4.5 shrink-0" />
          {!collapsed && <span>Back to Main Site</span>}
        </Link>
        <button
          onClick={logout}
          className={cn(
            "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-stone-500 hover:bg-stone-100",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
