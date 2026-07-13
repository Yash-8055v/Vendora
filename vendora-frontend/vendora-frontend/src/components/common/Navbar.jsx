import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Menu, X, Heart, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import NotificationBell from "@/components/common/NotificationBell";
import Logo from "@/components/common/Logo";
import { ROLE_DASHBOARD_PATH } from "@/constants";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/stores", label: "Stores" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { isAuthenticated, user, role, logout } = useAuth();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const avatarMenuRef = useRef(null);

  const dashboardPath = ROLE_DASHBOARD_PATH[role] ?? "/account";
  const initials = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  // Close the avatar dropdown on outside click.
  useEffect(() => {
    if (!avatarMenuOpen) return;
    const handleClick = (e) => {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [avatarMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    setAvatarMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-25/95 backdrop-blur">
      <div className="container-content flex h-16 items-center gap-6">
        <Link to="/" className="flex shrink-0 items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-stone-600 transition-colors hover:text-brand-700",
                  isActive && "text-brand-700"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={handleSearchSubmit} className="ml-auto hidden flex-1 max-w-sm items-center md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products, stores…"
              aria-label="Search"
              className="h-10 w-full rounded-full border border-stone-200 bg-white pl-9 pr-4 text-sm placeholder:text-stone-400 focus:border-brand-400"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/wishlist"
            aria-label="View wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-full text-stone-600 hover:bg-stone-100"
          >
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-error-500 text-[10px] font-semibold text-white">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>

          {isAuthenticated && <NotificationBell />}

          <Link
            to="/cart"
            aria-label="View cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-stone-600 hover:bg-stone-100"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-brand-600 text-[10px] font-semibold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={avatarMenuRef}>
              <button
                onClick={() => setAvatarMenuOpen((o) => !o)}
                aria-label="Account menu"
                aria-expanded={avatarMenuOpen}
                className="flex h-10 items-center gap-1.5 rounded-full bg-brand-100 pl-1 pr-2 text-brand-800 hover:bg-brand-200"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                  {initials}
                </span>
                <ChevronDown className={cn("hidden h-3.5 w-3.5 transition-transform sm:block", avatarMenuOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {avatarMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-card border border-stone-200 bg-white p-1.5 shadow-elevated"
                  >
                    <div className="px-3 py-2">
                      <p className="truncate text-sm font-semibold text-stone-800">{user?.name ?? "Guest"}</p>
                      <p className="truncate text-xs text-stone-500">{user?.email ?? ""}</p>
                    </div>
                    <div className="my-1 h-px bg-stone-100" />
                    <Link
                      to={dashboardPath}
                      onClick={() => setAvatarMenuOpen(false)}
                      className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-brand-50 hover:text-brand-700"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium text-stone-700 hover:bg-brand-50 hover:text-brand-700"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 sm:inline-flex"
            >
              Login / Register
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-md text-stone-600 hover:bg-stone-100 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.22 }}
              className="absolute right-0 top-0 h-full w-72 bg-white p-6 shadow-elevated"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-brand-700">Menu</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-5 w-5 text-stone-500" />
                </button>
              </div>
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search…"
                    aria-label="Search"
                    className="h-10 w-full rounded-full border border-stone-200 bg-white pl-9 pr-4 text-sm focus:border-brand-400"
                  />
                </div>
              </form>
              <nav className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-stone-700"
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <>
                    <div className="mt-2 h-px bg-stone-100" />
                    <Link
                      to={dashboardPath}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 text-sm font-medium text-stone-700"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Go to Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2.5 text-left text-sm font-medium text-stone-700"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 rounded-md bg-brand-600 px-4 py-2 text-center text-sm font-medium text-white"
                  >
                    Login / Register
                  </Link>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
