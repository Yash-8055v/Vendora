import { Link, useNavigate } from "react-router-dom";
import CartItem from "@/components/ecommerce/CartItem";
import { EmptyState } from "@/components/common/States";
import Button from "@/components/common/Button";
import { formatCurrency } from "@/utils/format";
import { useCart } from "@/contexts/CartContext";

const SHIPPING_FLAT = 12;

// Cart is fully backed by CartContext (localStorage-persisted client-side
// cart). TODO: Once backend integration begins, replace CartContext's
// internal state with real calls to GET /cart, POST /cart/items,
// PATCH /cart/items/:productId, DELETE /cart/items/:productId.
export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  const shipping = items.length > 0 ? SHIPPING_FLAT : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="py-16">
        <EmptyState
          title="Your cart is empty"
          description="Browse the marketplace and add something you'll love."
          actionLabel="Browse Products"
          onAction={() => navigate("/products")}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-stone-900">Your Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="rounded-card border border-stone-200 bg-white p-5 shadow-soft lg:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onQuantityChange={(it, qty) => updateQuantity(it.productId, qty)}
              onRemove={(it) => removeItem(it.productId)}
            />
          ))}
        </div>

        <div className="h-fit rounded-card border border-stone-200 bg-white p-5 shadow-soft">
          <h2 className="font-semibold text-stone-800">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-stone-500">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-stone-100 pt-2 font-semibold text-stone-900">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <Button className="mt-6 w-full" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </Button>
          <Link to="/products" className="mt-3 block text-center text-sm text-stone-500 hover:text-brand-700">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
