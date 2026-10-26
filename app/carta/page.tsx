import type { Metadata } from "next";
import { MenuTabs } from "@/components/menu/MenuTabs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Carta | Artesanos! Alitas y Makis",
  description:
    "Precios de makis, alitas, combos, refrescos, bar, salchis y burgers en Artesanos! Santa Anita.",
  openGraph: {
    title: "Carta | Artesanos! Alitas y Makis",
    description:
      "Precios de makis, alitas, combos, refrescos, bar, salchis y burgers en Artesanos! Santa Anita.",
    images: ["/og-image.jpg"], // pendiente: archivo llegará con las fotos
    url: `${site.siteUrl}/carta`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Carta | Artesanos! Alitas y Makis",
    description:
      "Precios de makis, alitas, combos, refrescos, bar, salchis y burgers en Artesanos! Santa Anita.",
    images: ["/og-image.jpg"],
  },
};

export default function CartaPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-28 md:px-6 md:pb-16">
      <h1 className="font-display text-5xl text-ink md:text-7xl">Nuestra carta</h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Arma tu pedido con los sabores que quieras y envíalo por WhatsApp.
      </p>
      <div className="mt-8">
        <MenuTabs />
      </div>
    </main>
  );
}
