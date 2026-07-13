import { Clock, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

// TODO: Replace with GET /vendor/application-status (see 08_API_MAPPING.md)
const MOCK_STATUS = "pending"; // "pending" | "approved" | "rejected"

const CONFIG = {
  pending: {
    icon: Clock,
    color: "text-amber-500 bg-amber-50",
    title: "Application under review",
    body: "Our team is reviewing your vendor application. This usually takes 2–3 business days.",
  },
  approved: {
    icon: CheckCircle2,
    color: "text-success-600 bg-success-50",
    title: "Application approved",
    body: "Welcome to Vendora! Set up your store to start selling.",
  },
  rejected: {
    icon: XCircle,
    color: "text-error-600 bg-error-50",
    title: "Application not approved",
    body: "Unfortunately your application wasn't approved this time. You can reapply with updated information.",
  },
};

export default function ApplicationStatus() {
  const { icon: Icon, color, title, body } = CONFIG[MOCK_STATUS];

  return (
    <div className="mx-auto max-w-md py-10 text-center">
      <div className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${color}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h1 className="mt-4 font-display text-xl font-semibold text-stone-900">{title}</h1>
      <p className="mt-2 text-sm text-stone-500">{body}</p>

      {MOCK_STATUS === "approved" && (
        <Link
          to="/vendor/store"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-brand-600 px-6 text-sm font-medium text-white hover:bg-brand-700"
        >
          Set Up Store
        </Link>
      )}
      {MOCK_STATUS === "rejected" && (
        <Link
          to="/vendor/application"
          className="mt-6 inline-flex h-11 items-center rounded-md border border-stone-300 px-6 text-sm font-medium text-stone-800 hover:bg-stone-50"
        >
          Reapply
        </Link>
      )}
    </div>
  );
}
