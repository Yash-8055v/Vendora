import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import { SkeletonProductGrid } from "@/components/common/Skeleton";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "@/constants/mockData";

// TODO: Replace with GET /products?page&limit&search&category&minPrice&maxPrice&sort
export default function ProductsListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [sort, setSort] = useState("relevance");
  const loading = false;

  // Keep the search box in sync if the URL changes (e.g. a new search from
  // the Navbar while already on this page).
  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleSearchChange = (value) => {
    setSearch(value);
    const next = new URLSearchParams(searchParams);
    if (value) next.set("search", value);
    else next.delete("search");
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let results = MOCK_PRODUCTS;
    if (search) {
      results = results.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== "all") {
      results = results.filter((p) => p.category === category);
    }
    if (sort === "price-asc") results = [...results].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") results = [...results].sort((a, b) => b.price - a.price);
    return results;
  }, [search, category, sort]);

  return (
    <div className="container-content py-10">
      <h1 className="font-display text-2xl font-semibold text-stone-900">All Products</h1>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            type="search"
            placeholder="Search products…"
            className="h-11 w-full rounded-md border border-stone-200 bg-white pl-9 pr-4 text-sm focus:border-brand-400"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-md border border-stone-200 bg-white px-3 text-sm text-stone-700"
        >
          <option value="all">All Categories</option>
          {MOCK_CATEGORIES.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-11 rounded-md border border-stone-200 bg-white px-3 text-sm text-stone-700"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        <button className="flex h-11 items-center gap-2 rounded-md border border-stone-200 bg-white px-4 text-sm text-stone-600 sm:hidden">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="mt-8">{loading ? <SkeletonProductGrid /> : <ProductGrid products={filtered} />}</div>
    </div>
  );
}
