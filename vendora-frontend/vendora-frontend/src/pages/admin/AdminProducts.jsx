import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { formatCurrency } from "@/utils/format";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { MOCK_VENDOR_PRODUCTS } from "@/constants/mockData";

// TODO: Replace with GET /admin/products, PATCH .../archive,
// PATCH .../activate, DELETE /admin/products/:id
export default function AdminProducts() {
  const [products, setProducts] = useState(MOCK_VENDOR_PRODUCTS);
  const { showToast } = useToast();

  const archive = (product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, status: "archived" } : p)));
    showToast(`${product.name} archived`, TOAST_TYPES.INFO);
  };

  const activate = (product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, status: "published" } : p)));
    showToast(`${product.name} activated`, TOAST_TYPES.SUCCESS);
  };

  const remove = (product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    showToast(`${product.name} deleted`, TOAST_TYPES.SUCCESS);
  };

  const columns = [
    { key: "name", header: "Product" },
    { key: "price", header: "Price", render: (row) => formatCurrency(row.price) },
    { key: "status", header: "Status", render: (row) => <Badge tone="brand">{row.status}</Badge> },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Link to={`/products/${row.id}`} className="text-sm font-medium text-brand-700">
            Preview
          </Link>
          {row.status === "archived" ? (
            <Button size="sm" variant="success" onClick={() => activate(row)}>
              Activate
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => archive(row)}>
              Archive
            </Button>
          )}
          <Button size="sm" variant="danger" onClick={() => remove(row)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-stone-900">Products</h1>
      <div className="mt-6">
        <DataTable columns={columns} rows={products} emptyTitle="No products" />
      </div>
    </div>
  );
}
