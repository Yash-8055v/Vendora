import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus } from "lucide-react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { MOCK_VENDOR_PRODUCTS, MOCK_CATEGORIES } from "@/constants/mockData";

const schema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Select a category"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Enter a valid price"),
  stock: z.coerce.number().int().min(0, "Enter a valid stock count"),
});

// TODO: Replace mock submit with POST /products (create) or PATCH /products/:id (edit)
export default function ProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existing = isEdit ? MOCK_VENDOR_PRODUCTS.find((p) => p.id === id) : null;
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: existing
      ? { name: existing.name, category: "", description: "", price: existing.price, stock: existing.stock }
      : {},
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 700));
    showToast(isEdit ? "Product updated" : "Product created", TOAST_TYPES.SUCCESS);
    navigate("/vendor/products");
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-semibold text-stone-900">
        {isEdit ? "Edit Product" : "Create Product"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 rounded-card border border-stone-200 bg-white p-6 shadow-soft" noValidate>
        <div className="grid h-40 place-items-center gap-2 rounded-md border border-dashed border-stone-200 bg-stone-50 text-stone-400">
          <ImagePlus className="h-6 w-6" />
          <span className="text-sm">Upload product images</span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input label="Product name" className="sm:col-span-2" error={errors.name?.message} {...register("name")} />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-stone-700">Category</label>
            <select {...register("category")} className="h-11 rounded-sm border border-stone-300 bg-white px-3 text-sm text-stone-800">
              <option value="">Select category</option>
              {MOCK_CATEGORIES.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-error-600">{errors.category.message}</p>}
          </div>

          <Input label="Price" type="number" step="0.01" error={errors.price?.message} {...register("price")} />
          <Input label="Stock" type="number" error={errors.stock?.message} {...register("stock")} />

          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className="text-sm font-medium text-stone-700">Description</label>
            <textarea
              rows={4}
              {...register("description")}
              className="rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm text-stone-800 focus:border-brand-400"
            />
            {errors.description && <p className="text-xs text-error-600">{errors.description.message}</p>}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
            {isEdit ? "Save Changes" : "Create Product"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate("/vendor/products")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
