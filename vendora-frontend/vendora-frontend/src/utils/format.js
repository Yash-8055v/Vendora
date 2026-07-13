export function formatCurrency(amount, currency = "INR") {
  if (typeof amount !== "number") return "—";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

/** Compute a "was" price from a discounted price + discount percent, for strikethrough displays. */
export function computeOriginalPrice(price, discountPercent) {
  if (typeof price !== "number" || !discountPercent) return null;
  return Math.round(price / (1 - discountPercent / 100));
}

export function formatDate(dateInput, options = { dateStyle: "medium" }) {
  if (!dateInput) return "—";
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function truncate(text, maxLength = 80) {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text;
}
