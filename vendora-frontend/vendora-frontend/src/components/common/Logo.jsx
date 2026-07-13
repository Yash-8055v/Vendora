import { cn } from "@/utils/cn";

/**
 * Text-based wordmark, replacing the old dark-green PNG logo which clashed
 * with the new pastel palette. Uses the display (Playfair Display) font for
 * "Vendora" and a small accent dot in the brand pink.
 */
export default function Logo({ className, tagline = false }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="font-display text-2xl font-bold tracking-tight text-stone-900">
        Vendora<span className="text-brand-400">.</span>
      </span>
      {tagline && (
        <span className="mt-0.5 font-accent text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
          Shop the makers
        </span>
      )}
    </span>
  );
}
