import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/** items: [{ label, to? }] — last item renders without a link, as current page. */
export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-stone-500">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-brand-700">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-stone-800" : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight className="h-3.5 w-3.5 text-stone-300" />}
          </span>
        );
      })}
    </nav>
  );
}
