import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import { EmptyState } from "@/components/common/States";
import { useWishlist } from "@/contexts/WishlistContext";
import { MOCK_PRODUCTS } from "@/constants/mockData";

// Wishlist is a future module per the roadmap, implemented as a saved-items
// list backed by WishlistContext (localStorage-persisted) rather than a
// separate backend-driven flow. TODO: replace the MOCK_PRODUCTS lookup with
// a real product-by-id fetch once a wishlist endpoint exists.
export default function Wishlist() {
  const { productIds } = useWishlist();
  const navigate = useNavigate();

  const products = MOCK_PRODUCTS.filter((p) => productIds.includes(p.id));

  return (
    <div className="container-content py-10">
      <div className="flex items-center gap-2">
        <Heart className="h-5 w-5 fill-brand-500 text-brand-500" />
        <h1 className="font-display text-2xl font-semibold text-stone-900">Your Wishlist</h1>
      </div>

      <div className="mt-8">
        {products.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Tap the heart on any product to save it here for later."
            actionLabel="Browse Products"
            onAction={() => navigate("/products")}
          />
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
