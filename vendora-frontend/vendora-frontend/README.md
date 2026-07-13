# Vendora Frontend

A multi-vendor marketplace frontend — React + Vite + Tailwind, JavaScript only (no TypeScript), built to the spec in `docs/00_SOURCE_DOCS_MERGED.md`.

## Getting started

```bash
npm install
cp .env.example .env   # set VITE_API_BASE_URL to your backend
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

## Status

This is a fully scaffolded frontend running on **mock data** — every page renders with realistic placeholder content, loading/empty/error states, and form validation, but nothing talks to a real backend yet. Every spot where backend integration belongs has a `// TODO:` comment pointing at the exact endpoint from `docs/00_SOURCE_DOCS_MERGED.md` § `08_API_MAPPING.md`.

See `docs/10_PROJECT_PROGRESS.md` for the full breakdown of what's done and what's next.

## A note on verification

This project was built in a sandboxed environment without access to the npm registry, so `npm install` and `npm run dev` could not be run live here. Instead, every source file was verified with:

- An esbuild syntax check across all 63 `.js`/`.jsx` files (all clean).
- A full esbuild bundle of the app with all npm dependencies externalized, confirming every internal import (the `@/...` alias, every page/component path) resolves correctly with zero errors.

What this **doesn't** verify: that the app actually renders correctly in a browser, that Tailwind classes produce the intended visual result, or that there are no runtime-only bugs. Please run `npm install && npm run dev` and do a visual pass before treating this as final — that's the natural next step.

## Project structure

See `docs/00_SOURCE_DOCS_MERGED.md` § `04_APP_STRUCTURE.md` for the full rationale. Short version:

```
src/
  api/          single shared Axios instance
  components/   common/auth/ecommerce/customer/vendor/admin — reusable UI only
  constants/    roles, statuses, mock data (isolated, clearly TODO-tagged)
  contexts/     AuthContext, ToastContext
  layouts/      PublicLayout, CustomerLayout, VendorLayout, AdminLayout
  pages/        route-level screens only, grouped by role
  routes/       AppRoutes.jsx (the router), ProtectedRoute.jsx
  utils/        cn, format helpers
```
