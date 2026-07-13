import CategoryCard from "@/components/ecommerce/CategoryCard";
import { MOCK_CATEGORIES } from "@/constants/mockData";

// TODO: Replace with GET /categories
export default function Categories() {
  return (
    <div className="container-content py-10">
      <h1 className="font-display text-2xl font-semibold text-stone-900">Browse Categories</h1>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {MOCK_CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
