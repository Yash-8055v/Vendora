import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Badge from "@/components/common/Badge";
import { cn } from "@/utils/cn";

/**
 * Product detail gallery: large auto-playing image carousel + clickable
 * thumbnail strip. Autoplay pauses whenever the shopper hovers/interacts,
 * matching common ecommerce PDP behavior (e.g. Myntra, Amazon).
 */
export default function ProductImageCarousel({ images, alt, badge, intervalMs = 4000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const gallery = images?.length ? images : [];

  const goTo = useCallback((i) => setIndex((i + gallery.length) % gallery.length), [gallery.length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || gallery.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % gallery.length), intervalMs);
    return () => clearInterval(timer);
  }, [paused, gallery.length, intervalMs]);

  if (!gallery.length) {
    return <div className="aspect-square w-full rounded-card bg-stone-100" aria-hidden="true" />;
  }

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-stone-100">
        {gallery.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={i === 0 ? alt : `${alt} — view ${i + 1}`}
            loading={i === 0 ? "eager" : "lazy"}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              i === index ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {badge && <span className="absolute left-4 top-4 z-10">{badge}</span>}

        {gallery.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-stone-700 shadow-soft hover:bg-white"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-stone-700 shadow-soft hover:bg-white"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {gallery.map((src, i) => (
            <button
              key={src + i}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "aspect-square overflow-hidden rounded-md border-2 transition-colors",
                i === index ? "border-brand-500" : "border-transparent hover:border-brand-200"
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
