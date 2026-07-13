import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { MOCK_ADMIN_VENDORS } from "@/constants/mockData";

// TODO: Replace with GET /admin/vendors, PATCH .../suspend, PATCH .../active
export default function AdminVendors() {
  const [vendors, setVendors] = useState(MOCK_ADMIN_VENDORS);
  const { showToast } = useToast();

  const toggleStatus = (vendor) => {
    const nextStatus = vendor.status === "active" ? "suspended" : "active";
    setVendors((prev) => prev.map((v) => (v.id === vendor.id ? { ...v, status: nextStatus } : v)));
    showToast(`${vendor.name} ${nextStatus}`, nextStatus === "active" ? TOAST_TYPES.SUCCESS : TOAST_TYPES.WARNING);
  };

  const columns = [
    { key: "name", header: "Store" },
    { key: "email", header: "Email" },
    { key: "products", header: "Products" },
    {
      key: "status",
      header: "Status",
      render: (row) => <Badge tone={row.status === "active" ? "success" : "error"}>{row.status}</Badge>,
    },
    {
      key: "actions",
      header: "",
      render: (row) => (
        <div className="flex gap-2">
          <Link to="/stores" className="text-sm font-medium text-brand-700">
            Preview
          </Link>
          <Button
            size="sm"
            variant={row.status === "active" ? "danger" : "success"}
            onClick={() => toggleStatus(row)}
          >
            {row.status === "active" ? "Suspend" : "Activate"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-stone-900">Vendors</h1>
      <div className="mt-6">
        <DataTable columns={columns} rows={vendors} emptyTitle="No vendors yet" />
      </div>
    </div>
  );
}
