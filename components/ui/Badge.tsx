import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "orange" | "cream" | "navy" | "heat";
  className?: string;
};

const toneClass = {
  orange: "bg-orange text-ink",
  cream: "bg-cream text-ink",
  navy: "bg-navy text-cream",
  heat: "bg-sand text-ink border border-ink/10",
};

export function Badge({
  children,
  tone = "orange",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function productBadgeLabel(
  badge: "mas-pedido" | "promo" | "nuevo",
): string {
  switch (badge) {
    case "mas-pedido":
      return "Más pedido";
    case "promo":
      return "Promo";
    case "nuevo":
      return "Nuevo";
  }
}
