"use client";

import { ShoppingBag } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useCartCount } from "@/lib/useCartCount";
import { buildInfoMessage, whatsappUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/store/cart";

export function MobileOrderBar() {
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartCount();
  const href = whatsappUrl(buildInfoMessage());

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-navy/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("click_whatsapp", { source: "mobile_bar" })}
          className="flex min-h-12 flex-1 items-center justify-center rounded-[var(--radius)] bg-orange px-4 font-semibold text-ink"
        >
          Pedir por WhatsApp
        </a>
        <button
          type="button"
          onClick={openCart}
          className="relative flex min-h-12 min-w-12 items-center justify-center rounded-[var(--radius)] bg-cream text-ink"
          aria-label="Abrir carrito"
        >
          <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          {count > 0 ? (
            <span
              className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-ink"
              aria-live="polite"
            >
              {count}
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
}
