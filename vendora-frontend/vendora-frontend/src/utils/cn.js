import clsx from "clsx";

/** Thin wrapper around clsx for conditional Tailwind class composition. */
export function cn(...inputs) {
  return clsx(...inputs);
}
