import { useState } from "react";
import DataTable from "@/components/common/DataTable";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";
import { formatDate } from "@/utils/format";
import { useToast } from "@/contexts/ToastContext";
import { TOAST_TYPES } from "@/constants";
import { MOCK_VENDOR_APPLICATIONS } from "@/constants/mockData";

// TODO: Replace with GET /admin/vendor-applications, PATCH .../approve,
// PATCH .../reject (see 08_API_MAPPING.md)
export default function VendorApplications() {
  const [applications, setApplications] = useState(MOCK_VENDOR_APPLICATIONS);
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");
  const { showToast } = useToast();

  const approve = (app) => {
    setApplications((prev) => prev.map((a) => (a.id === app.id ? { ...a, status: "approved" } : a)));
    showToast(`${app.businessName} approved`, TOAST_TYPES.SUCCESS);
  };

  const confirmReject = () => {
    setApplications((prev) => prev.map((a) => (a.id === rejecting.id ? { ...a, status: "rejected" } : a)));
    showToast(`${rejecting.businessName} rejected`, TOAST_TYPES.INFO);
    setRejecting(null);
    setReason("");
  };

  const columns = [
    { key: "businessName", header: "Business" },
    { key: "contactName", header: "Contact" },
    { key: "date", header: "Submitted", render: (row) => formatDate(row.date) },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge tone={row.status === "approved" ? "success" : row.status === "rejected" ? "error" : "warning"}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (row) =>
        row.status === "pending" ? (
          <div className="flex gap-2">
            <Button size="sm" variant="success" onClick={() => approve(row)}>
              Approve
            </Button>
            <Button size="sm" variant="danger" onClick={() => setRejecting(row)}>
              Reject
            </Button>
          </div>
        ) : (
          <span className="text-xs text-stone-400">Resolved</span>
        ),
    },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-stone-900">Vendor Applications</h1>
      <div className="mt-6">
        <DataTable columns={columns} rows={applications} emptyTitle="No applications" />
      </div>

      {rejecting && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-stone-900/40 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-card bg-white p-6 shadow-elevated">
            <h2 className="font-semibold text-stone-800">Reject {rejecting.businessName}?</h2>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for rejection (optional)"
              className="mt-3 w-full rounded-sm border border-stone-300 px-3 py-2 text-sm focus:border-brand-400"
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setRejecting(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmReject}>
                Confirm Reject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
