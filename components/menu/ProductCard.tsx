"use client";

import Image from "next/image";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Badge, productBadgeLabel } from "@/components/ui/Badge";
import { getMinPrice, type Product } from "@/data/menu";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

function kindFor(product: Product) {
  if (product.category === "makis" || product.category === "combos") return "maki" as const;
  if (product.category === "alitas") return "alita" as const;
  if (
    product.category === "refrescos" ||
    product.category === "jarras" ||
    product.category === "bar"
  )
    return "drink" as const;
  return "food" as const;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const min = getMinPrice(product);
  const hasManyPrices = product.variants.some((v) => v.price !== min);
  const priceLabel = hasManyPrices
    ? `desde ${formatPrice(min)}`
    : formatPrice(min);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] bg-sand transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(20,33,61,0.18)]">
      <div className="relative overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={`${product.name} en Artesanos! Santa Anita`}
            width={640}
            height={640}
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder name={product.name} kind={kindFor(product)} />
        )}
        {product.badge ? (
          <div className="absolute top-3 left-3">
            <Badge tone="orange">{productBadgeLabel(product.badge)}</Badge>
          </div>
        ) : null}
        <span className="price-sticker absolute right-3 bottom-3 rounded-md bg-orange px-3 py-1.5 font-display text-xl text-ink">
          {priceLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-2xl leading-none text-ink md:text-3xl">
          {product.name}
        </h3>
        {product.description ? (
          <p className="mt-2 text-sm text-ink/65">{product.description}</p>
        ) : null}
        {product.alcohol ? (
          <p className="mt-2 text-xs font-medium text-ink/50">
            Venta solo a mayores de 18 años
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => onAdd(product)}
          className="mt-auto flex min-h-12 w-full items-center justify-center rounded-[var(--radius)] bg-navy pt-0.5 font-semibold text-cream transition group-hover:bg-orange group-hover:text-ink"
        >
          Agregar
        </button>
      </div>
    </article>
  );
}
