import StoreCard from "@/components/ecommerce/StoreCard";
import { MOCK_STORES } from "@/constants/mockData";

// TODO: Replace with GET /stores
export default function Stores() {
  return (
    <div className="container-content py-10">
      <h1 className="font-display text-2xl font-semibold text-stone-900">All Stores</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_STORES.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
}
