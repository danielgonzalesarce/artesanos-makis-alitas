"use client";

import { useState } from "react";
import { Reveal } from "@/components/home/Reveal";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductModal } from "@/components/menu/ProductModal";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { products, type Product } from "@/data/menu";

export function Combos() {
  const combos = products.filter((p) => p.category === "combos");
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <section className="bg-cream px-4 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle title="Nuestros combos" description="Lo mejor de ambos mundos, sin elegir." />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {combos.map((product) => (
            <Reveal key={product.id}>
              <ProductCard product={product} onAdd={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>
      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
