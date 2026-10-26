import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Categories } from "@/components/home/Categories";
import { Combos } from "@/components/home/Combos";
import { Delivery } from "@/components/home/Delivery";
import { Faq } from "@/components/home/Faq";
import { FlavorExplorer } from "@/components/home/FlavorExplorer";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { LocationHours } from "@/components/home/LocationHours";
import { Reviews } from "@/components/home/Reviews";
import { Ticker } from "@/components/home/Ticker";
import { JsonLd } from "@/components/JsonLd";
import { Divider } from "@/components/ui/Divider";
import { site } from "@/data/site";
import { buildRestaurantJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Artesanos! Alitas y Makis | Santa Anita",
  description:
    "Alitas en más de 15 sabores y makis de fusión en Santa Anita. Mira la carta y pide por WhatsApp.",
  openGraph: {
    title: "Artesanos! Alitas y Makis | Santa Anita",
    description:
      "Alitas en más de 15 sabores y makis de fusión en Santa Anita. Mira la carta y pide por WhatsApp.",
    images: ["/og-image.jpg"], // pendiente: archivo llegará con las fotos
    url: site.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Artesanos! Alitas y Makis | Santa Anita",
    description:
      "Alitas en más de 15 sabores y makis de fusión en Santa Anita. Mira la carta y pide por WhatsApp.",
    images: ["/og-image.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildRestaurantJsonLd()} />
      <main>
        <Hero />
        <Ticker />
        <Combos />
        <Divider from="cream" to="navy" />
        <FlavorExplorer />
        <Divider from="navy" to="cream" />
        <Categories />
        <Divider from="cream" to="ink" variant="diagonal" />
        <About />
        <Divider from="ink" to="cream" />
        <Gallery />
        <Divider from="cream" to="navy" />
        <Reviews />
        <Divider from="navy" to="cream" />
        <Delivery />
        <Divider from="cream" to="ink" variant="diagonal" />
        <Faq />
        <Divider from="ink" to="cream" />
        <LocationHours />
      </main>
    </>
  );
}
