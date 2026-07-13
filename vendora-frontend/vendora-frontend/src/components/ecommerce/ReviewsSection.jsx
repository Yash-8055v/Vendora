import { useState } from "react";
import { Star } from "lucide-react";
import Button from "@/components/common/Button";
import { formatDate } from "@/utils/format";
import { cn } from "@/utils/cn";

function StarRating({ value, onChange, size = "h-4 w-4", readOnly = false }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          className={cn(readOnly && "cursor-default")}
        >
          <Star
            className={cn(size, star <= value ? "fill-amber-400 text-amber-400" : "text-stone-300")}
          />
        </button>
      ))}
    </div>
  );
}

/**
 * ReviewsSection — star summary, existing reviews, and a (mock) add-review
 * form. No backend endpoint exists for reviews yet (not in
 * 08_API_MAPPING.md) — this is a frontend-only future module per the
 * roadmap, demoed here as an in-page section rather than a separate route.
 */
export default function ReviewsSection({ product, reviews }) {
  const [allReviews, setAllReviews] = useState(reviews);
  const [showForm, setShowForm] = useState(false);
  const [draftRating, setDraftRating] = useState(0);
  const [draftComment, setDraftComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (draftRating === 0 || !draftComment.trim()) return;
    const newReview = {
      id: `local-${Date.now()}`,
      productId: product.id,
      author: "You",
      rating: draftRating,
      date: new Date().toISOString(),
      comment: draftComment.trim(),
    };
    setAllReviews((prev) => [newReview, ...prev]);
    setDraftRating(0);
    setDraftComment("");
    setShowForm(false);
  };

  return (
    <section className="mt-16 border-t border-stone-200 pt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">Reviews</h2>
          <div className="mt-2 flex items-center gap-2">
            <StarRating value={Math.round(product.rating ?? 0)} readOnly />
            <span className="text-sm text-stone-500">
              {product.rating ?? "—"} · {allReviews.length} review{allReviews.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowForm((s) => !s)}>
          Write a review
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-card border border-stone-200 bg-stone-50 p-5">
          <label className="text-sm font-medium text-stone-700">Your rating</label>
          <div className="mt-2">
            <StarRating value={draftRating} onChange={setDraftRating} size="h-5 w-5" />
          </div>
          <label className="mt-4 block text-sm font-medium text-stone-700">Your review</label>
          <textarea
            value={draftComment}
            onChange={(e) => setDraftComment(e.target.value)}
            rows={3}
            placeholder="Share what you thought about this product…"
            className="mt-2 w-full rounded-sm border border-stone-300 bg-white px-3 py-2 text-sm focus:border-brand-400"
          />
          <div className="mt-3 flex gap-2">
            <Button type="submit" size="sm" disabled={draftRating === 0 || !draftComment.trim()}>
              Submit review
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 space-y-6">
        {allReviews.length === 0 ? (
          <p className="text-sm text-stone-400">No reviews yet — be the first to share your thoughts.</p>
        ) : (
          allReviews.map((review) => (
            <div key={review.id} className="border-b border-stone-100 pb-6 last:border-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-stone-800">{review.author}</span>
                <span className="text-xs text-stone-400">{formatDate(review.date)}</span>
              </div>
              <div className="mt-1">
                <StarRating value={review.rating} readOnly size="h-3.5 w-3.5" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
