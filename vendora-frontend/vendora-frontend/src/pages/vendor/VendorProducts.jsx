import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import { formatCurrency } from "@/utils/format";
import { MOCK_VENDOR_PRODUCTS } from "@/constants/mockData";

const STATUS_TONE = { draft: "neutral", published: "success", archived: "warning" };

// TODO: Replace with GET /products/my-products, PATCH /products/:id,
// PATCH /products/:id/publish, DELETE /products/:id
export default function VendorProducts() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filtered = useMemo(() => {
    return MOCK_VENDOR_PRODUCTS.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "all" || p.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const columns = [
    { key: "name", header: "Product" },
    { key: "price", header: "Price", render: (row) => formatCurrency(row.price) },
    { key: "stock", header: "Stock", render: (row) => (row.stock === 0 ? <span className="text-error-600">Out of stock</span> : row.stock) },
    { key: "status", header: "Status", render: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge> },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex gap-3">
          <Link to={`/vendor/products/${row.id}/edit`} className="text-stone-500 hover:text-brand-700">
            <Pencil className="h-4 w-4" />
          </Link>
          <button className="text-stone-500 hover:text-error-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-stone-900">My Products</h1>
        <Link
          to="/vendor/products/new"
          className="inline-flex h-10 items-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-medium text-white hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" /> New Product
        </Link>
      </div>

      <div className="mt-6 flex gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your products…"
            className="h-11 w-full rounded-md border border-stone-200 bg-white pl-9 pr-4 text-sm focus:border-brand-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-md border border-stone-200 bg-white px-3 text-sm text-stone-700"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      <div className="mt-6">
        <DataTable columns={columns} rows={filtered} emptyTitle="No products yet" emptyDescription="Create your first product to start selling." />
      </div>
    </div>
  );
}
