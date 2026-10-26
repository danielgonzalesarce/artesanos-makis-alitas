"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/Logo";
import { OpenNowBadge } from "@/components/layout/OpenNowBadge";
import { useCartCount } from "@/lib/useCartCount";
import { useCartStore } from "@/store/cart";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/carta", label: "Carta" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartCount();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Logo variant="light" />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-orange text-ink"
                    : "text-cream hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <OpenNowBadge className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={openCart}
            className="relative flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-cream hover:bg-white/15"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only" aria-live="polite">
              {count} {count === 1 ? "producto" : "productos"} en el carrito
            </span>
            {count > 0 ? (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-cream md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          id={menuId}
          className="border-t border-white/10 bg-navy px-4 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Móvil">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-12 rounded-[var(--radius)] px-4 py-3 font-semibold text-cream hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 px-1">
            <OpenNowBadge />
          </div>
        </div>
      ) : null}
    </header>
  );
}
