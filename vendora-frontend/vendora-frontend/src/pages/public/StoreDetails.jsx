import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import ProductGrid from "@/components/ecommerce/ProductGrid";
import { ErrorState } from "@/components/common/States";
import { MOCK_STORES, MOCK_PRODUCTS } from "@/constants/mockData";

// TODO: Replace with GET /stores/:slug and GET /stores/:slug/products
export default function StoreDetails() {
  const { slug } = useParams();
  const store = MOCK_STORES.find((s) => s.slug === slug);
  const products = MOCK_PRODUCTS.filter((p) => p.storeId === store?.id);

  if (!store) {
    return (
      <div className="container-content py-16">
        <ErrorState title="Store not found" description="This store may have been removed or never existed." />
      </div>
    );
  }

  return (
    <div>
      <div className="h-48 w-full overflow-hidden bg-gradient-to-r from-brand-100 to-sky-100">
        {store.banner && <img src={store.banner} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="container-content -mt-12 pb-16">
        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-stone-200 shadow-soft">
          {store.avatar && <img src={store.avatar} alt={store.name} className="h-full w-full object-cover" />}
        </div>
        <h1 className="mt-4 font-display text-2xl font-semibold text-stone-900">{store.name}</h1>
        <p className="mt-2 max-w-xl text-sm text-stone-500">{store.description}</p>
        <div className="mt-2 flex items-center gap-1 text-sm text-stone-500">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          {store.rating}
        </div>

        <section className="mt-10">
          <h2 className="mb-6 text-xl font-semibold">Products from {store.name}</h2>
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}
