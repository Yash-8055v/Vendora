import { useState } from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { MOCK_STORES } from "@/constants/mockData";

// TODO: Replace mock submit with GET/PATCH /stores/:vendorId (see 08_API_MAPPING.md)
export default function StoreManagement() {
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();
  const currentStore = MOCK_STORES[0];

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSaving(false);
    showToast("Store profile updated", TOAST_TYPES.SUCCESS);
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-xl font-semibold text-stone-900">Store Management</h1>

      <form onSubmit={handleSave} className="mt-6 rounded-card border border-stone-200 bg-white p-6 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-stone-200">
            <img src={currentStore.avatar} alt="Store logo" className="h-full w-full object-cover" />
          </div>
          <Button type="button" variant="outline" size="sm">
            Upload Logo
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <Input label="Store name" defaultValue="North & Pine" />
          <Input label="Store slug" defaultValue="north-and-pine" helperText="vendora.com/stores/north-and-pine" />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">Description</label>
            <textarea
              rows={4}
              defaultValue="Handmade wooden home goods, finished by hand in small batches."
              className="rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 focus:border-brand-400"
            />
          </div>
        </div>

        <Button type="submit" isLoading={isSaving} disabled={isSaving} className="mt-6">
          Save Changes
        </Button>
      </form>
    </div>
  );
}
