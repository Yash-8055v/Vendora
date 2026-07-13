import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function StoreCard({ store }) {
  return (
    <div className="overflow-hidden rounded-card border border-stone-200 bg-white shadow-soft transition-shadow hover:shadow-elevated">
      <div className="h-24 w-full overflow-hidden bg-gradient-to-r from-brand-100 to-sky-100">
        {store.banner && <img src={store.banner} alt="" className="h-full w-full object-cover" loading="lazy" />}
      </div>
      <div className="p-4">
        <div className="-mt-10 mb-2 h-14 w-14 overflow-hidden rounded-full border-4 border-white bg-stone-200 shadow-soft">
          {store.avatar && <img src={store.avatar} alt={store.name} className="h-full w-full object-cover" loading="lazy" />}
        </div>
        <h3 className="font-display text-base font-semibold text-stone-900">{store.name}</h3>
        <p className="mt-1 text-sm text-stone-500">{store.description}</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-stone-400">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span>{store.rating}</span>
        </div>
        <Link
          to={`/stores/${store.slug}`}
          className="mt-4 block w-full rounded-md border border-brand-300 px-4 py-2 text-center text-sm font-medium text-brand-700 hover:bg-brand-50"
        >
          Visit Store
        </Link>
      </div>
    </div>
  );
}
