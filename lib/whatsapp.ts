import { makiFlavors, wingFlavors } from "@/data/flavors";
import { getProductById, getVariant } from "@/data/menu";
import { site } from "@/data/site";
import { formatPrice, truncate } from "@/lib/format";
import { unitPrice } from "@/lib/pricing";

export type CartLineForMessage = {
  productId: string;
  variantId: string;
  quantity: number;
  choice?: string;
  makiFlavorIds: string[];
  wingFlavorIds: string[];
  note?: string;
};

export type CheckoutInfo = {
  name: string;
  modality: "recojo" | "delivery";
  address?: string;
  reference?: string;
  payment: string;
  notes?: string;
};

export function buildInfoMessage(): string {
  return "Hola Artesanos! 👋 Quisiera información.";
}

export function buildOrderMessage(
  lines: CartLineForMessage[],
  checkout: CheckoutInfo,
): string {
  const itemLines: string[] = [];
  let subtotal = 0;

  for (const line of lines) {
    const product = getProductById(line.productId);
    if (!product) continue;
    const variant = getVariant(product, line.variantId);
    if (!variant) continue;

    const price = unitPrice({
      productId: line.productId,
      variantId: line.variantId,
      makiFlavorIds: line.makiFlavorIds,
      wingFlavorIds: line.wingFlavorIds,
    });
    const lineSum = price * line.quantity;
    subtotal += lineSum;

    const variantLabel =
      variant.label === "Único" ? "" : ` (${variant.label})`;
    itemLines.push(
      `• ${line.quantity}x ${product.name}${variantLabel} — ${formatPrice(lineSum)}`,
    );

    if (line.makiFlavorIds.length > 0) {
      const names = line.makiFlavorIds.map((id) => {
        const f = makiFlavors.find((x) => x.id === id);
        if (!f) return id;
        return f.surcharge
          ? `${f.name} (+ ${formatPrice(f.surcharge)})`
          : f.name;
      });
      itemLines.push(`   Makis: ${names.join(", ")}`);
    }

    if (line.wingFlavorIds.length > 0) {
      const names = line.wingFlavorIds.map((id) => {
        const f = wingFlavors.find((x) => x.id === id);
        return f?.name ?? id;
      });
      itemLines.push(`   Alitas: ${names.join(", ")}`);
    }

    if (line.choice) {
      const choiceLabel = product.choice?.label.toLowerCase().includes("salsa")
        ? "Salsa"
        : "Opción";
      itemLines.push(`   ${choiceLabel}: ${line.choice}`);
    }

    if (line.note?.trim()) {
      itemLines.push(`   Nota: ${truncate(line.note, 300)}`);
    }
  }

  const parts: string[] = [
    "Hola Artesanos! 👋 Quiero hacer un pedido:",
    "",
    ...itemLines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Modalidad: ${checkout.modality === "delivery" ? "Delivery" : "Recojo en local"}`,
    `Nombre: ${truncate(checkout.name, 60)}`,
  ];

  if (checkout.modality === "delivery") {
    if (checkout.address?.trim()) {
      parts.push(`Dirección: ${truncate(checkout.address, 120)}`);
    }
    if (checkout.reference?.trim()) {
      parts.push(`Referencia: ${truncate(checkout.reference, 120)}`);
    }
  }

  parts.push(`Pago: ${checkout.payment}`);

  if (checkout.notes?.trim()) {
    parts.push(`Notas: ${truncate(checkout.notes, 300)}`);
  }

  parts.push("", "El costo de envío se confirma por este chat.");

  return parts.join("\n");
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
