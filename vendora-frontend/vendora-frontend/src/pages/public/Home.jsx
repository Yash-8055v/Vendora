import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import HeroCarousel from "@/components/ecommerce/HeroCarousel";
import CategoryCard from "@/components/ecommerce/CategoryCard";
import StoreCard from "@/components/ecommerce/StoreCard";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import { SkeletonProductGrid } from "@/components/common/Skeleton";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { MOCK_CATEGORIES, MOCK_STORES, MOCK_PRODUCTS, MOCK_HERO_SLIDES } from "@/constants/mockData";

// TODO: Replace mock fetch with GET /products, GET /categories, GET /stores
// once backend integration begins (see 08_API_MAPPING.md, Home section).
function useHomeData() {
  const [state, setState] = useState({ loading: true, error: null });

  useEffect(() => {
    const timer = setTimeout(() => setState({ loading: false, error: null }), 500);
    return () => clearTimeout(timer);
  }, []);

  return state;
}

export default function Home() {
  const { loading } = useHomeData();
  const { productIds: recentlyViewedIds } = useRecentlyViewed();
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const recentlyViewedProducts = recentlyViewedIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <div>
      {/* Hero */}
      <HeroCarousel slides={MOCK_HERO_SLIDES} />

      <div className="container-content -mt-7 relative z-10 sm:-mt-8">
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSearchSubmit}
          className="mx-auto max-w-xl"
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for products, stores, categories…"
              aria-label="Search Vendora"
              className="h-14 w-full rounded-full border border-stone-200 bg-white py-3.5 pl-11 pr-4 text-sm shadow-elevated placeholder:text-stone-400 focus:border-brand-400"
            />
          </div>
        </motion.form>
      </div>

      <div className="container-content space-y-16 py-16">
        {/* Featured categories */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Categories</h2>
            <Link to="/categories" className="flex items-center gap-1 text-sm font-medium text-brand-700">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {MOCK_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Featured stores */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Stores</h2>
            <Link to="/stores" className="flex items-center gap-1 text-sm font-medium text-brand-700">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_STORES.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>

        {/* Trending products */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Trending Products</h2>
            <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-brand-700">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {loading ? <SkeletonProductGrid /> : <ProductGrid products={MOCK_PRODUCTS.slice(0, 4)} />}
        </section>

        {/* New arrivals */}
        <section>
          <h2 className="mb-6 text-xl font-semibold">New Arrivals</h2>
          {loading ? <SkeletonProductGrid /> : <ProductGrid products={MOCK_PRODUCTS.slice(4, 8)} />}
        </section>

        {/* Recently viewed */}
        {!loading && recentlyViewedProducts.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-semibold">Recently Viewed</h2>
            <ProductGrid products={recentlyViewedProducts} />
          </section>
        )}

        {/* Why choose Vendora */}
        <section className="rounded-card border border-stone-200 bg-white p-10 shadow-soft">
          <h2 className="mb-8 text-center text-xl font-semibold">Why Choose Vendora</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { title: "Curated Vendors", body: "Every store is reviewed before it goes live." },
              { title: "Fast Fulfillment", body: "Orders ship directly from the vendor, tracked end to end." },
              { title: "Buyer Protection", body: "Clear policies and responsive support, always." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <h3 className="font-display text-base font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-500">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="rounded-card bg-brand-700 p-10 text-center text-white">
          <h2 className="font-display text-2xl font-semibold">Stay in the loop</h2>
          <p className="mt-2 text-brand-100">New vendors, new arrivals, occasional good deals.</p>
          <form className="mx-auto mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              className="h-11 flex-1 rounded-md border-0 px-4 text-sm text-stone-800 placeholder:text-stone-400"
            />
            <button type="submit" className="h-11 rounded-md bg-white px-5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
