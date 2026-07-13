import { Link } from "react-router-dom";
import Logo from "@/components/common/Logo";

export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-50 via-stone-25 to-sky-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex justify-center">
          <Logo tagline />
        </Link>
        <div className="rounded-card border border-stone-200 bg-white p-8 shadow-soft">
          <h1 className="font-display text-xl font-semibold text-stone-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-stone-500">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
        {footer && <div className="mt-6 text-center text-sm text-stone-500">{footer}</div>}
      </div>
    </div>
  );
}
