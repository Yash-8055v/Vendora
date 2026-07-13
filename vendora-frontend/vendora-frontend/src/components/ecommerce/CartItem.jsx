import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/format";

export default function CartItem({ item, onQuantityChange, onRemove, isUpdating = false }) {
  return (
    <div className="flex items-center gap-4 border-b border-stone-100 py-4 last:border-0">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-stone-100">
        {item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" loading="lazy" />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-stone-800">{item.name}</p>
        <p className="mt-1 text-sm text-stone-500">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-2 rounded-md border border-stone-200">
        <button
          onClick={() => onQuantityChange?.(item, Math.max(1, item.quantity - 1))}
          disabled={isUpdating}
          aria-label="Decrease quantity"
          className="grid h-8 w-8 place-items-center text-stone-500 disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
        <button
          onClick={() => onQuantityChange?.(item, item.quantity + 1)}
          disabled={isUpdating}
          aria-label="Increase quantity"
          className="grid h-8 w-8 place-items-center text-stone-500 disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="w-20 text-right font-display text-sm font-semibold text-stone-900">
        {formatCurrency(item.price * item.quantity)}
      </p>
      <button
        onClick={() => onRemove?.(item)}
        aria-label="Remove item"
        className="text-stone-400 hover:text-error-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
