"use client";

import { Minus, Plus, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FlavorPicker } from "@/components/menu/FlavorPicker";
import { makiFlavors, wingFlavors } from "@/data/flavors";
import type { Product } from "@/data/menu";
import { trackEvent } from "@/lib/analytics";
import { formatPrice } from "@/lib/format";
import { unitPrice } from "@/lib/pricing";
import { useCartStore } from "@/store/cart";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

function ProductModalForm({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const addLine = useCartStore((s) => s.addLine);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [variantId, setVariantId] = useState(product.variants[0]?.id ?? "");
  const [makiIds, setMakiIds] = useState<string[]>([]);
  const [wingIds, setWingIds] = useState<string[]>([]);
  const [choice, setChoice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const variant = useMemo(
    () => product.variants.find((v) => v.id === variantId),
    [product, variantId],
  );

  function selectVariant(id: string) {
    setVariantId(id);
    setMakiIds([]);
    setWingIds([]);
  }

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!variant) return null;

  const needMaki = variant.makiFlavors ?? 0;
  const needWing = variant.wingFlavors ?? 0;
  const needChoice = Boolean(product.choice);

  const missing: string[] = [];
  if (needMaki > 0 && makiIds.length !== needMaki) {
    missing.push(
      `elige ${needMaki} sabor${needMaki > 1 ? "es" : ""} de makis`,
    );
  }
  if (needWing > 0 && wingIds.length !== needWing) {
    missing.push(
      `elige ${needWing} sabor${needWing > 1 ? "es" : ""} de alitas`,
    );
  }
  if (needChoice && !choice) {
    missing.push(product.choice?.label.toLowerCase() ?? "elige una opción");
  }

  const canAdd = missing.length === 0;
  const total =
    unitPrice({
      productId: product.id,
      variantId,
      makiFlavorIds: makiIds,
      wingFlavorIds: wingIds,
    }) * quantity;

  function handleAdd() {
    if (!canAdd) return;
    addLine({
      productId: product.id,
      variantId,
      makiFlavorIds: makiIds,
      wingFlavorIds: wingIds,
      choice: choice || undefined,
      note: note.trim() || undefined,
      quantity,
    });
    trackEvent("add_to_cart", {
      product_id: product.id,
      quantity,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[70]" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-ink/60"
        aria-label="Cerrar"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[var(--radius)] bg-cream shadow-2xl md:inset-y-8 md:bottom-auto md:rounded-[var(--radius)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-ink/10 px-4 py-4">
          <div>
            <h2 id={titleId} className="font-display text-3xl text-ink">
              {product.name}
            </h2>
            {product.description ? (
              <p className="mt-1 text-sm text-ink/65">{product.description}</p>
            ) : null}
            {product.alcohol ? (
              <p className="mt-2 text-xs font-semibold text-ink/55">
                Venta solo a mayores de 18 años
              </p>
            ) : null}
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full hover:bg-sand"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {product.variants.length > 1 ? (
            <fieldset>
              <legend className="mb-2 font-semibold">Elige el tamaño</legend>
              <div className="space-y-2">
                {product.variants.map((v) => (
                  <label
                    key={v.id}
                    className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-[var(--radius)] border px-3 ${
                      variantId === v.id
                        ? "border-orange bg-orange/15"
                        : "border-ink/10 bg-cream"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="variant"
                        value={v.id}
                        checked={variantId === v.id}
                        onChange={() => selectVariant(v.id)}
                      />
                      <span>{v.label}</span>
                    </span>
                    <span className="font-semibold">{formatPrice(v.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          {needMaki > 0 ? (
            <FlavorPicker
              type="maki"
              flavors={makiFlavors}
              selected={makiIds}
              max={needMaki}
              onChange={setMakiIds}
            />
          ) : null}

          {needWing > 0 ? (
            <FlavorPicker
              type="wing"
              flavors={wingFlavors}
              selected={wingIds}
              max={needWing}
              onChange={setWingIds}
            />
          ) : null}

          {product.choice ? (
            <fieldset>
              <legend className="mb-2 font-semibold">
                {product.choice.label}
              </legend>
              <div className="flex flex-wrap gap-2">
                {product.choice.options.map((opt) => (
                  <label
                    key={opt}
                    className={`flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-semibold ${
                      choice === opt
                        ? "border-orange bg-orange text-ink"
                        : "border-ink/15 bg-cream"
                    }`}
                  >
                    <input
                      type="radio"
                      name="choice"
                      value={opt}
                      checked={choice === opt}
                      onChange={() => setChoice(opt)}
                      className="sr-only"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : null}

          <div>
            <label htmlFor="product-note" className="mb-1 block font-semibold">
              Nota (opcional)
            </label>
            <textarea
              id="product-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={300}
              className="min-h-20 w-full rounded-[var(--radius)] border border-ink/15 bg-cream px-3 py-2"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-semibold">Cantidad</span>
            <div className="inline-flex items-center gap-1 rounded-full bg-sand p-1">
              <button
                type="button"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-cream"
                aria-label="Quitar uno"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="min-w-8 text-center font-semibold" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-cream"
                aria-label="Agregar uno"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-ink/10 bg-cream px-4 py-4">
          {!canAdd ? (
            <p className="mb-2 text-sm text-ink/65" role="status">
              Para continuar: {missing.join("; ")}.
            </p>
          ) : null}
          <button
            type="button"
            disabled={!canAdd}
            onClick={handleAdd}
            className="flex min-h-12 w-full items-center justify-center rounded-[var(--radius)] bg-orange font-semibold text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            Agregar al pedido · {formatPrice(total)}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;
  return (
    <ProductModalForm key={product.id} product={product} onClose={onClose} />
  );
}
