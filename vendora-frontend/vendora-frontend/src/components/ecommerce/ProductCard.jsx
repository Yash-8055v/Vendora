import { Link } from "react-router-dom";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { formatCurrency, computeOriginalPrice } from "@/utils/format";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { cn } from "@/utils/cn";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock != null && product.stock <= 5;
  const wishlisted = isWishlisted(product.id);
  const originalPrice = computeOriginalPrice(product.price, product.discountPercent);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (outOfStock) return;
    addItem(product, 1);
    showToast(`${product.name} added to cart`, TOAST_TYPES.SUCCESS);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product.id);
    showToast(
      wishlisted ? `Removed ${product.name} from wishlist` : `Saved ${product.name} to wishlist`,
      TOAST_TYPES.INFO
    );
  };

  return (
    <div className="group relative overflow-hidden rounded-card border border-stone-200 bg-white shadow-soft transition-shadow hover:shadow-elevated">
      <button
        onClick={handleToggleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-soft hover:bg-white"
      >
        <Heart className={cn("h-4 w-4", wishlisted ? "fill-brand-500 text-brand-500" : "text-stone-400")} />
      </button>

      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {product.discountPercent > 0 && !outOfStock && (
            <span className="absolute left-3 top-3">
              <Badge className="bg-brand-500 text-white">{product.discountPercent}% OFF</Badge>
            </span>
          )}
          {outOfStock && (
            <span className="absolute left-3 top-3">
              <Badge tone="error">Out of stock</Badge>
            </span>
          )}
          {lowStock && (
            <span className="absolute left-3 top-3">
              <Badge tone="warning">Only {product.stock} left</Badge>
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-400">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="mt-1 truncate text-sm font-semibold text-stone-800 group-hover:text-brand-700">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-stone-400">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{product.rating ?? "—"}</span>
          {product.reviewCount != null && <span>({product.reviewCount})</span>}
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base font-semibold text-stone-900">
                {formatCurrency(product.price)}
              </span>
              {originalPrice && (
                <span className="text-xs text-stone-400 line-through">{formatCurrency(originalPrice)}</span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span className="text-[11px] font-semibold text-success-600">{product.discountPercent}% off</span>
            )}
          </div>
          <Button
            variant="primary"
            size="icon"
            aria-label="Add to cart"
            disabled={outOfStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
