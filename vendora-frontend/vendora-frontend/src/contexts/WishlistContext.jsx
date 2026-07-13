import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const WishlistContext = createContext(undefined);

const STORAGE_KEY = "vendora_wishlist";

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * WishlistContext — tracks saved product IDs. Future module per the
 * roadmap; implemented here as a heart-toggle affordance on product
 * cards/details plus a simple saved-items list, not a separate flow.
 *
 * TODO: Replace localStorage persistence with GET/POST/DELETE
 * /wishlist once a backend endpoint exists. Not in 08_API_MAPPING.md
 * yet — confirm shape before implementing.
 */
export function WishlistProvider({ children }) {
  const [productIds, setProductIds] = useState(readInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
    } catch {
      // Ignore storage errors — wishlist still works in-memory.
    }
  }, [productIds]);

  const isWishlisted = useCallback((productId) => productIds.includes(productId), [productIds]);

  const toggleWishlist = useCallback((productId) => {
    setProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }, []);

  const value = useMemo(
    () => ({ productIds, isWishlisted, toggleWishlist, count: productIds.length }),
    [productIds, isWishlisted, toggleWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (ctx === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return ctx;
}
