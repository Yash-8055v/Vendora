import { useState } from "react";
import { Plus } from "lucide-react";
import AddressCard from "@/components/customer/AddressCard";
import { EmptyState } from "@/components/common/States";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { MOCK_ADDRESSES } from "@/constants/mockData";

// TODO: Wire up to Address APIs: GET/POST /addresses, PATCH /addresses/:id,
// DELETE /addresses/:id, PATCH /addresses/:id/default
export default function Addresses() {
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  const { showToast } = useToast();

  const handleDelete = (address) => {
    setAddresses((prev) => prev.filter((a) => a.id !== address.id));
    showToast("Address deleted", TOAST_TYPES.SUCCESS);
  };

  const handleSetDefault = (address) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === address.id })));
    showToast("Default address updated", TOAST_TYPES.SUCCESS);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-stone-900">Addresses</h1>
        <Button size="sm">
          <Plus className="h-4 w-4" /> Add Address
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {addresses.length === 0 ? (
          <div className="sm:col-span-2">
            <EmptyState title="No addresses yet" description="Add an address to speed up checkout." actionLabel="Add Address" />
          </div>
        ) : (
          addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))
        )}
      </div>
    </div>
  );
}
