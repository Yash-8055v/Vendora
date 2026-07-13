import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FullScreenLoader } from "@/components/common/Skeleton";
import ProtectedRoute from "@/routes/ProtectedRoute";
import { ROLES } from "@/constants";

// Layouts
import PublicLayout from "@/layouts/PublicLayout";
import CustomerLayout from "@/layouts/CustomerLayout";
import VendorLayout from "@/layouts/VendorLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Public pages
const Home = lazy(() => import("@/pages/public/Home"));
const ProductsListing = lazy(() => import("@/pages/public/ProductsListing"));
const ProductDetails = lazy(() => import("@/pages/public/ProductDetails"));
const Categories = lazy(() => import("@/pages/public/Categories"));
const Stores = lazy(() => import("@/pages/public/Stores"));
const StoreDetails = lazy(() => import("@/pages/public/StoreDetails"));
const Wishlist = lazy(() => import("@/pages/public/Wishlist"));

// Auth pages
const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const VerifyEmail = lazy(() => import("@/pages/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

// Customer pages
const CustomerDashboard = lazy(() => import("@/pages/customer/CustomerDashboard"));
const Profile = lazy(() => import("@/pages/customer/Profile"));
const Addresses = lazy(() => import("@/pages/customer/Addresses"));
const Cart = lazy(() => import("@/pages/customer/Cart"));
const Checkout = lazy(() => import("@/pages/customer/Checkout"));
const Orders = lazy(() => import("@/pages/customer/Orders"));
const OrderDetails = lazy(() => import("@/pages/customer/OrderDetails"));

// Vendor pages
const VendorDashboard = lazy(() => import("@/pages/vendor/VendorDashboard"));
const VendorApplication = lazy(() => import("@/pages/vendor/VendorApplication"));
const ApplicationStatus = lazy(() => import("@/pages/vendor/ApplicationStatus"));
const StoreManagement = lazy(() => import("@/pages/vendor/StoreManagement"));
const VendorProducts = lazy(() => import("@/pages/vendor/VendorProducts"));
const ProductForm = lazy(() => import("@/pages/vendor/ProductForm"));
const VendorOrders = lazy(() => import("@/pages/vendor/VendorOrders"));

// Admin pages
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const VendorApplications = lazy(() => import("@/pages/admin/VendorApplications"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminVendors = lazy(() => import("@/pages/admin/AdminVendors"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminOrderDetails = lazy(() => import("@/pages/admin/AdminOrderDetails"));

// Common pages
const NotFound = lazy(() => import("@/pages/common/NotFound"));
const Unauthorized = lazy(() => import("@/pages/common/Unauthorized"));
const Maintenance = lazy(() => import("@/pages/common/Maintenance"));

/** Scroll restoration on route change, per Routes & Navigation "UX" rules. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<FullScreenLoader />}>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/stores/:slug" element={<StoreDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Customer dashboard + shopping routes (CustomerLayout) */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]} />}>
            <Route element={<CustomerLayout />}>
              <Route path="/account" element={<CustomerDashboard />} />
              <Route path="/account/profile" element={<Profile />} />
              <Route path="/account/addresses" element={<Addresses />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Route>
          </Route>

          {/* Vendor routes */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.VENDOR]} />}>
            <Route element={<VendorLayout />}>
              <Route path="/vendor" element={<VendorDashboard />} />
              <Route path="/vendor/application" element={<VendorApplication />} />
              <Route path="/vendor/application-status" element={<ApplicationStatus />} />
              <Route path="/vendor/store" element={<StoreManagement />} />
              <Route path="/vendor/products" element={<VendorProducts />} />
              <Route path="/vendor/products/new" element={<ProductForm />} />
              <Route path="/vendor/products/:id/edit" element={<ProductForm />} />
              <Route path="/vendor/orders" element={<VendorOrders />} />
            </Route>
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/vendors/applications" element={<VendorApplications />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/vendors" element={<AdminVendors />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
