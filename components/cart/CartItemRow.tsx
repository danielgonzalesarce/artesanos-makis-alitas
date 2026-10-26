"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { makiFlavors, wingFlavors } from "@/data/flavors";
import { getProductById, getVariant } from "@/data/menu";
import { formatPrice } from "@/lib/format";
import {
  getLineUnitPrice,
  useCartStore,
  type CartLine,
} from "@/store/cart";

type CartItemRowProps = {
  line: CartLine;
};

export function CartItemRow({ line }: CartItemRowProps) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeLine = useCartStore((s) => s.removeLine);
  const product = getProductById(line.productId);
  const variant = product
    ? getVariant(product, line.variantId)
    : undefined;

  if (!product || !variant) return null;

  const unit = getLineUnitPrice(line);
  const makiNames = line.makiFlavorIds
    .map((id) => makiFlavors.find((f) => f.id === id)?.name)
    .filter(Boolean);
  const wingNames = line.wingFlavorIds
    .map((id) => wingFlavors.find((f) => f.id === id)?.name)
    .filter(Boolean);

  return (
    <article className="rounded-[var(--radius)] border border-ink/10 bg-sand/60 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-none text-ink">
            {product.name}
          </h3>
          {variant.id !== "unico" ? (
            <p className="mt-1 text-sm text-ink/60">{variant.label}</p>
          ) : null}
          {makiNames.length > 0 ? (
            <p className="mt-1 text-xs text-ink/70">
              Makis: {makiNames.join(", ")}
            </p>
          ) : null}
          {wingNames.length > 0 ? (
            <p className="mt-0.5 text-xs text-ink/70">
              Alitas: {wingNames.join(", ")}
            </p>
          ) : null}
          {line.choice ? (
            <p className="mt-0.5 text-xs text-ink/70">Opción: {line.choice}</p>
          ) : null}
          {line.note ? (
            <p className="mt-0.5 text-xs text-ink/55 italic">Nota: {line.note}</p>
          ) : null}
        </div>
        <p className="shrink-0 font-semibold text-ink">
          {formatPrice(unit * line.quantity)}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="inline-flex items-center gap-1 rounded-full bg-cream p-1">
          <button
            type="button"
            className="flex min-h-10 min-w-10 items-center justify-center rounded-full hover:bg-sand"
            aria-label="Quitar uno"
            onClick={() => setQuantity(line.id, line.quantity - 1)}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="min-w-8 text-center font-semibold" aria-live="polite">
            {line.quantity}
          </span>
          <button
            type="button"
            className="flex min-h-10 min-w-10 items-center justify-center rounded-full hover:bg-sand"
            aria-label="Agregar uno"
            onClick={() => setQuantity(line.id, line.quantity + 1)}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <button
          type="button"
          className="flex min-h-10 min-w-10 items-center justify-center rounded-full text-ink/60 hover:bg-cream hover:text-ink"
          aria-label={`Quitar ${product.name}`}
          onClick={() => removeLine(line.id)}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
