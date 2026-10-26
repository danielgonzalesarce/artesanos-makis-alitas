export function formatPrice(n: number): string {
  if (Number.isInteger(n)) {
    return `S/ ${n}`;
  }
  return `S/ ${n.toFixed(2)}`;
}

export function formatRating(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

export function truncate(text: string, max: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return trimmed.slice(0, max).trim();
}
