import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <ShieldAlert className="h-12 w-12 text-amber-400" />
      <h1 className="font-display text-xl font-semibold text-stone-900">You don't have access to this page</h1>
      <p className="max-w-sm text-sm text-stone-500">
        Your account role doesn't have permission to view this section.
      </p>
      <Link to="/" className="mt-4 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
        Back to Home
      </Link>
    </div>
  );
}
