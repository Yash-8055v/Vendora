import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";
import Logo from "@/components/common/Logo";

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Vendora", to: "/" },
      { label: "Become a Vendor", to: "/vendor/application" },
      { label: "Careers", to: "/" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Browse Categories", to: "/categories" },
      { label: "All Products", to: "/products" },
      { label: "All Stores", to: "/stores" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Track an Order", to: "/orders" },
      { label: "Contact Support", to: "/" },
      { label: "Returns", to: "/" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="container-content grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-stone-500">
            A marketplace built on trust — connecting independent vendors with customers who care.
          </p>
          <div className="mt-4 flex gap-3">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-9 w-9 place-items-center rounded-full bg-brand-50 text-brand-600 hover:bg-brand-100"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-stone-800">{col.title}</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-stone-500 hover:text-brand-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-stone-100 py-6 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Vendora. All rights reserved.
      </div>
    </footer>
  );
}
