import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Tag, X } from "lucide-react";
import Button from "@/components/common/Button";
import { EmptyState } from "@/components/common/States";
import { formatCurrency } from "@/utils/format";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { MOCK_ADDRESSES, MOCK_COUPONS } from "@/constants/mockData";

const SHIPPING_FLAT = 99;

// TODO: Replace with POST /orders. On success, navigate to a success page
// (see 07_PAGES.md / 08_API_MAPPING.md, Checkout section). Coupon handling
// is frontend-only demo logic — no coupon endpoint exists yet.
export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [selectedAddressId, setSelectedAddressId] = useState(
    MOCK_ADDRESSES.find((a) => a.isDefault)?.id ?? MOCK_ADDRESSES[0]?.id
  );
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isPlacing, setIsPlacing] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const shipping = items.length > 0 ? SHIPPING_FLAT : 0;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.minSubtotal && subtotal < appliedCoupon.minSubtotal) {
      discount = 0;
    } else if (appliedCoupon.discountPercent) {
      discount = subtotal * (appliedCoupon.discountPercent / 100);
    } else if (appliedCoupon.discountFlat) {
      discount = appliedCoupon.discountFlat;
    }
  }

  const total = Math.max(subtotal + shipping - discount, 0);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const match = MOCK_COUPONS.find((c) => c.code.toLowerCase() === couponInput.trim().toLowerCase());
    if (!match) {
      setCouponError("That code isn't valid.");
      setAppliedCoupon(null);
      return;
    }
    if (match.minSubtotal && subtotal < match.minSubtotal) {
      setCouponError(`This code requires a subtotal of at least ${formatCurrency(match.minSubtotal)}.`);
      setAppliedCoupon(null);
      return;
    }
    setCouponError("");
    setAppliedCoupon(match);
    showToast(`Coupon "${match.code}" applied`, TOAST_TYPES.SUCCESS);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsPlacing(false);
    clearCart();
    showToast("Order placed successfully", TOAST_TYPES.SUCCESS);
    navigate("/orders");
  };

  if (items.length === 0) {
    return (
      <div className="py-16">
        <EmptyState
          title="Your cart is empty"
          description="Add something to your cart before checking out."
          actionLabel="Browse Products"
          onAction={() => navigate("/products")}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-900">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-card border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="font-semibold text-stone-800">Delivery Address</h2>
            <div className="mt-4 space-y-3">
              {MOCK_ADDRESSES.map((address) => (
                <label
                  key={address.id}
                  className="flex cursor-pointer items-start gap-3 rounded-md border border-stone-200 p-4 hover:bg-stone-50"
                >
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddressId === address.id}
                    onChange={() => setSelectedAddressId(address.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-stone-800">{address.name}</p>
                    <p className="text-sm text-stone-500">{address.line}</p>
                  </div>
                </label>
              ))}
            </div>
            <Link to="/account/addresses" className="mt-3 inline-block text-sm font-medium text-brand-700">
              Manage addresses
            </Link>
          </section>

          <section className="rounded-card border border-stone-200 bg-white p-5 shadow-soft">
            <h2 className="flex items-center gap-2 font-semibold text-stone-800">
              <CreditCard className="h-4 w-4" /> Payment
            </h2>
            <div className="mt-4 rounded-md border border-dashed border-stone-200 bg-stone-50 p-6 text-center text-sm text-stone-400">
              Payment integration coming soon
            </div>
          </section>
        </div>

        <div className="h-fit rounded-card border border-stone-200 bg-white p-5 shadow-soft">
          <h2 className="font-semibold text-stone-800">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-stone-500">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-stone-100 pt-2 text-stone-500">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-success-600">
                <span>Discount ({appliedCoupon.code})</span>
                <span>−{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-stone-100 pt-2 font-semibold text-stone-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <div className="mt-4 border-t border-stone-100 pt-4">
            {appliedCoupon ? (
              <div className="flex items-center justify-between rounded-md bg-success-50 px-3 py-2 text-sm text-success-700">
                <span className="flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" /> {appliedCoupon.code}
                </span>
                <button onClick={handleRemoveCoupon} aria-label="Remove coupon">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon code"
                  className="h-10 flex-1 rounded-md border border-stone-200 px-3 text-sm focus:border-brand-400"
                />
                <Button type="submit" variant="outline" size="sm">
                  Apply
                </Button>
              </form>
            )}
            {couponError && <p className="mt-2 text-xs text-error-600">{couponError}</p>}
          </div>

          <Button className="mt-6 w-full" isLoading={isPlacing} disabled={isPlacing} onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}
