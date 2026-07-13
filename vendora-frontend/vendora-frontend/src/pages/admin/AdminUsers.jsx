import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import Badge from "@/components/common/Badge";
import { MOCK_USERS } from "@/constants/mockData";

// TODO: Replace with GET /admin/users (see 08_API_MAPPING.md)
export default function AdminUsers() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => MOCK_USERS.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search)),
    [search]
  );

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (row) => <Badge tone="brand">{row.role}</Badge> },
    {
      key: "status",
      header: "Status",
      render: (row) => <Badge tone={row.status === "active" ? "success" : "error"}>{row.status}</Badge>,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-stone-900">Users</h1>

      <div className="mt-6 max-w-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users…"
            className="h-11 w-full rounded-md border border-stone-200 bg-white pl-9 pr-4 text-sm focus:border-brand-400"
          />
        </div>
      </div>

      <div className="mt-6">
        <DataTable columns={columns} rows={filtered} emptyTitle="No users found" />
      </div>
    </div>
  );
}
