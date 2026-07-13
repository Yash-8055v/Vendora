import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-center gap-2.5 rounded-card border border-stone-200 bg-white p-4 text-center shadow-soft transition-shadow hover:shadow-elevated"
    >
      <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-brand-50">
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full bg-brand-50" />
        )}
      </div>
      <span className="text-sm font-semibold text-stone-800">{category.name}</span>
      <span className="text-xs text-stone-400">{category.productCount} products</span>
    </Link>
  );
}
