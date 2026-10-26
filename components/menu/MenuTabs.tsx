"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { makiFlavors, wingFlavors } from "@/data/flavors";
import {
  categories,
  products,
  type CategoryId,
  type Product,
} from "@/data/menu";
import { site } from "@/data/site";

function readHashCategory(): CategoryId | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace("#", "") as CategoryId;
  return categories.some((c) => c.id === hash) ? hash : null;
}

export function MenuTabs() {
  const [active, setActive] = useState<CategoryId>(categories[0].id);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    const hash = readHashCategory();
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      setActive(hash);
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id as CategoryId);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

    const flavorMatchIds = new Set<string>();
    for (const f of makiFlavors) {
      if (f.name.toLowerCase().includes(q)) flavorMatchIds.add("maki");
    }
    for (const f of wingFlavors) {
      if (f.name.toLowerCase().includes(q)) flavorMatchIds.add("wing");
    }

    return products.filter((p) => {
      if (p.name.toLowerCase().includes(q)) return true;
      if (p.description?.toLowerCase().includes(q)) return true;
      if (
        flavorMatchIds.has("maki") &&
        (p.category === "makis" || p.category === "combos")
      )
        return true;
      if (
        flavorMatchIds.has("wing") &&
        (p.category === "alitas" ||
          p.category === "combos" ||
          p.id === "salchiwing")
      )
        return true;
      if (p.choice?.options.some((o) => o.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [query]);

  function scrollToCategory(id: CategoryId) {
    setActive(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }

  const hasQuery = query.trim().length > 0;

  return (
    <div>
      <div className="sticky top-[4.25rem] z-30 -mx-4 border-b border-ink/10 bg-cream/95 px-4 py-3 backdrop-blur md:-mx-0 md:rounded-[var(--radius)] md:border md:px-3">
        <div className="relative mb-3">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink/40"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto o sabor…"
            className="min-h-12 w-full rounded-[var(--radius)] border border-ink/15 bg-sand/50 py-2 pr-3 pl-10 text-ink placeholder:text-ink/40"
            aria-label="Buscar en la carta"
          />
        </div>
        {!hasQuery ? (
          <div
            className="chips-scroll flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Categorías"
          >
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active === c.id}
                onClick={() => scrollToCategory(c.id)}
                className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition ${
                  active === c.id
                    ? "bg-navy text-cream"
                    : "bg-sand text-ink hover:bg-orange hover:text-ink"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {hasQuery ? (
        <div className="mt-8">
          {filtered.length === 0 ? (
            <p className="text-ink/70">No encontramos resultados</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onAdd={setSelected} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8 space-y-14">
          {categories.map((cat) => {
            const items = products.filter((p) => p.category === cat.id);
            return (
              <section key={cat.id} id={cat.id} className="scroll-mt-36">
                <h2 className="font-display text-4xl text-ink md:text-5xl">
                  {cat.name}
                </h2>
                {cat.id === "bar" ? (
                  <div className="mt-3 space-y-2 text-sm text-ink/70">
                    <p>Venta solo a mayores de 18 años.</p>
                    <p className="font-semibold text-ink">
                      Happy Hour 2x S/ 30 en tragos
                      {site.happyHourSchedule
                        ? ` · ${site.happyHourSchedule}`
                        : ""}
                    </p>
                  </div>
                ) : null}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} onAdd={setSelected} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
