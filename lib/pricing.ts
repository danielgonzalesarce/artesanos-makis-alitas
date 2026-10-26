import { makiFlavors } from "@/data/flavors";
import { getProductById, getVariant } from "@/data/menu";

export type PricingSelection = {
  productId: string;
  variantId: string;
  makiFlavorIds?: string[];
  wingFlavorIds?: string[];
};

export function unitPrice(selection: PricingSelection): number {
  const product = getProductById(selection.productId);
  if (!product) return 0;
  const variant = getVariant(product, selection.variantId);
  if (!variant) return 0;

  let surcharge = 0;
  for (const id of selection.makiFlavorIds ?? []) {
    const flavor = makiFlavors.find((f) => f.id === id);
    if (flavor?.surcharge) surcharge += flavor.surcharge;
  }

  return variant.price + surcharge;
}

export function lineTotal(
  selection: PricingSelection & { quantity: number },
): number {
  return unitPrice(selection) * selection.quantity;
}
