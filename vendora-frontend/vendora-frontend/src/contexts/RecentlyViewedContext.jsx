import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const RecentlyViewedContext = createContext(undefined);

const STORAGE_KEY = "vendora_recently_viewed";
const MAX_ITEMS = 8;

function readInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * RecentlyViewedContext — tracks the last few product IDs viewed, most
 * recent first, for the "Recently Viewed" row on the Home page.
 * Purely client-side; no backend endpoint exists for this yet.
 */
export function RecentlyViewedProvider({ children }) {
  const [productIds, setProductIds] = useState(readInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
    } catch {
      // Ignore storage errors.
    }
  }, [productIds]);

  const trackView = useCallback((productId) => {
    setProductIds((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX_ITEMS));
  }, []);

  const value = useMemo(() => ({ productIds, trackView }), [productIds, trackView]);

  return <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>;
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (ctx === undefined) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return ctx;
}
