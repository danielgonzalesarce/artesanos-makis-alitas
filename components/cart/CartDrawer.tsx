"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore((s) => s.subtotal);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
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
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-ink/60"
        aria-label="Cerrar carrito"
        onClick={closeCart}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-cream shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4">
          <h2 id={titleId} className="font-display text-3xl text-ink">
            Tu pedido
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-sand"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {lines.length === 0 ? (
            <p className="text-ink/70">Aún no agregaste nada. Mira la carta.</p>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li key={line.id}>
                  <CartItemRow line={line} />
                </li>
              ))}
            </ul>
          )}

          {lines.length > 0 ? (
            <div className="mt-6 border-t border-ink/10 pt-4">
              <p className="flex items-center justify-between font-display text-2xl">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal())}</span>
              </p>
              <div className="mt-4">
                <CheckoutForm onContinue={closeCart} />
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={closeCart}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-[var(--radius)] bg-orange font-semibold text-ink"
            >
              Seguir pidiendo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
