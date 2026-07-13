import { MapPin, Pencil, Trash2 } from "lucide-react";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";

export default function AddressCard({ address, onEdit, onDelete, onSetDefault }) {
  return (
    <div className="rounded-card border border-stone-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand-600" />
          <span className="font-semibold text-stone-800">{address.name}</span>
        </div>
        {address.isDefault && <Badge tone="brand">Default</Badge>}
      </div>
      <p className="mt-2 text-sm text-stone-500">{address.phone}</p>
      <p className="mt-1 text-sm text-stone-600">{address.line}</p>

      <div className="mt-4 flex gap-2">
        <Button variant="ghost" size="sm" onClick={() => onEdit?.(address)}>
          <Pencil className="h-3.5 w-3.5" /> Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete?.(address)}>
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </Button>
        {!address.isDefault && (
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => onSetDefault?.(address)}>
            Set Default
          </Button>
        )}
      </div>
    </div>
  );
}
