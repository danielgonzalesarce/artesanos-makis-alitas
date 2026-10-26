import type { Metadata } from "next";
import { Bebas_Neue, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileOrderBar } from "@/components/layout/MobileOrderBar";
import { site } from "@/data/site";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: "Artesanos! Alitas y Makis | Santa Anita",
    template: "%s",
  },
  description:
    "Alitas en más de 15 sabores y makis de fusión en Santa Anita. Mira la carta y pide por WhatsApp.",
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: site.name,
    images: ["/og-image.jpg"], // pendiente: archivo llegará con las fotos
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${bebas.variable} ${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <CartDrawer />
        <FloatingWhatsApp />
        <MobileOrderBar />
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
