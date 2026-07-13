import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 px-4 text-center">
      <span className="font-display text-6xl font-semibold text-brand-200">404</span>
      <h1 className="font-display text-xl font-semibold text-stone-900">Page not found</h1>
      <p className="max-w-sm text-sm text-stone-500">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link to="/" className="mt-4 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
        Back to Home
      </Link>
    </div>
  );
}
