import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Store as StoreIcon, Heart, Minus, Plus } from "lucide-react";
import { formatCurrency, computeOriginalPrice } from "@/utils/format";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import ProductImageCarousel from "@/components/ecommerce/ProductImageCarousel";
import ReviewsSection from "@/components/ecommerce/ReviewsSection";
import { ErrorState } from "@/components/common/States";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { cn } from "@/utils/cn";
import { MOCK_PRODUCTS, MOCK_REVIEWS } from "@/constants/mockData";

// TODO: Replace with GET /products/:id
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  const related = MOCK_PRODUCTS.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);
  const reviews = MOCK_REVIEWS.filter((r) => r.productId === id);

  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { trackView } = useRecentlyViewed();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  // Track this product as recently viewed once per visit.
  useEffect(() => {
    if (product) trackView(product.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Reset quantity selector when navigating between products.
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="container-content py-16">
        <ErrorState title="Product not found" description="This product may have been removed or never existed." />
      </div>
    );
  }

  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock != null && product.stock <= 5;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(product, quantity);
    showToast(`${quantity} × ${product.name} added to cart`, TOAST_TYPES.SUCCESS);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    addItem(product, quantity);
    navigate("/checkout");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    showToast(
      wishlisted ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
      TOAST_TYPES.INFO
    );
  };

  return (
    <div className="container-content py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <ProductImageCarousel
            images={product.images?.length ? product.images : [product.image]}
            alt={product.name}
            badge={
              outOfStock ? (
                <Badge tone="error">Out of stock</Badge>
              ) : lowStock ? (
                <Badge tone="warning">Only {product.stock} left</Badge>
              ) : product.discountPercent > 0 ? (
                <Badge className="bg-brand-500 text-white">{product.discountPercent}% OFF</Badge>
              ) : null
            }
          />
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-medium uppercase tracking-wide text-stone-400">{product.category}</p>
            <button
              onClick={handleToggleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wishlisted}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-stone-200 hover:bg-stone-50"
            >
              <Heart className={cn("h-4 w-4", wishlisted ? "fill-brand-500 text-brand-500" : "text-stone-400")} />
            </button>
          </div>

          <h1 className="mt-1 font-display text-2xl font-semibold text-stone-900">{product.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="font-display text-3xl font-semibold text-stone-900">{formatCurrency(product.price)}</p>
            {computeOriginalPrice(product.price, product.discountPercent) && (
              <p className="text-lg text-stone-400 line-through">
                {formatCurrency(computeOriginalPrice(product.price, product.discountPercent))}
              </p>
            )}
            {product.discountPercent > 0 && (
              <span className="rounded-full bg-success-50 px-2.5 py-1 text-sm font-semibold text-success-600">
                {product.discountPercent}% off
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-stone-400">Inclusive of all taxes</p>

          <Link
            to={`/stores/${product.storeId}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-stone-500 hover:text-brand-700"
          >
            <StoreIcon className="h-4 w-4" /> Sold by {product.storeName}
          </Link>

          <p className="mt-6 text-sm leading-relaxed text-stone-600">
            A thoughtfully made piece, finished by hand and built to last. Crafted in small batches by an
            independent vendor on Vendora.
          </p>

          {!outOfStock && (
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-medium text-stone-700">Quantity</span>
              <div className="flex items-center gap-2 rounded-md border border-stone-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="grid h-9 w-9 place-items-center text-stone-500 hover:bg-stone-50"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock ?? 99, q + 1))}
                  aria-label="Increase quantity"
                  className="grid h-9 w-9 place-items-center text-stone-500 hover:bg-stone-50"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            <Button variant="primary" size="lg" className="flex-1" disabled={outOfStock} onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" /> {outOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            <Button variant="outline" size="lg" disabled={outOfStock} onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <ReviewsSection product={product} reviews={reviews} />

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-semibold">You might also like</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
