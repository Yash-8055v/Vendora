import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/utils/cn";

/**
 * Full-bleed hero image carousel with autoplay, dot navigation, and
 * prev/next controls — the standard ecommerce homepage pattern (Myntra,
 * Nykaa, Amazon all use a variant of this above the fold).
 */
export default function HeroCarousel({ slides, intervalMs = 5000 }) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i) => setIndex((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), intervalMs);
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  if (!slides?.length) return null;

  return (
    <section className="relative overflow-hidden border-b border-stone-200 bg-stone-900">
      <div className="relative h-[62vh] min-h-[420px] w-full sm:h-[70vh]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-in-out",
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-stone-900/10" />
            <div className="container-content absolute inset-0 flex flex-col items-start justify-end gap-3 pb-16 sm:justify-center sm:pb-0">
              <span className="rounded-full bg-white/15 px-3 py-1 font-accent text-xs font-semibold uppercase tracking-[0.15em] text-white backdrop-blur">
                {slide.eyebrow}
              </span>
              <h1 className="max-w-lg font-display text-3xl font-bold leading-tight text-white sm:text-5xl">
                {slide.title}
              </h1>
              <p className="max-w-md text-sm text-white/85 sm:text-base">{slide.subtitle}</p>
              <Link
                to={slide.ctaTo}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-elevated transition-colors hover:bg-brand-600"
              >
                {slide.ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}

        {/* Prev / Next controls */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/25 text-white backdrop-blur transition-colors hover:bg-white/40 sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/25 text-white backdrop-blur transition-colors hover:bg-white/40 sm:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-7 bg-white" : "w-1.5 bg-white/50 hover:bg-white/75"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
