"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Button } from "@/components/ui/Button";
import { flavorCount, wingFlavors } from "@/data/flavors";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { buildInfoMessage, whatsappUrl } from "@/lib/whatsapp";

export function Hero() {
  const [hover, setHover] = useState<"alitas" | "makis" | null>(null);
  const zone = site.district ? `, en ${site.district}.` : ".";
  const wa = whatsappUrl(buildInfoMessage());

  return (
    <section className="relative overflow-hidden bg-ink pt-20 text-cream">
      <div className="texture-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:items-center md:px-6 md:py-16">
        <div>
          <p className="text-sm font-semibold tracking-widest text-orange uppercase">
            {site.shortName}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[0.92] md:text-6xl lg:text-7xl">
            {site.tagline}
          </h1>
          <p className="mt-4 max-w-md text-base text-cream/75 md:text-lg">
            {flavorCount} sabores para combinar{zone}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/carta" size="lg">
              Ver carta
            </Button>
            <Button
              href={wa}
              variant="ghost"
              size="lg"
              className="border border-cream/25"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", { source: "hero" })}
            >
              Pídelo por WhatsApp
            </Button>
          </div>
        </div>

        <div className="relative">
          <ImagePlaceholder
            name="Combo alitas y makis"
            kind="combo"
            aspect="hero"
            className="rounded-[var(--radius)]"
          />
        </div>
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-2 px-4 pb-10 md:flex-row md:px-6">
        <div
          className={`hero-half relative min-h-40 flex-1 overflow-hidden rounded-[var(--radius)] bg-navy p-6 ${
            hover === "alitas" ? "md:flex-[1.35]" : hover === "makis" ? "md:flex-[0.85]" : ""
          }`}
          onMouseEnter={() => setHover("alitas")}
          onMouseLeave={() => setHover(null)}
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,106,0,0.35), transparent 55%)",
          }}
        >
          <p className="font-display text-4xl text-orange md:text-5xl">#TeamAlitas</p>
          <p className="mt-2 max-w-xs text-sm text-cream/70">
            {wingFlavors.length} salsas: BBQ, búfalo, maracumango y más.
          </p>
        </div>
        <div
          className={`hero-half relative min-h-40 flex-1 overflow-hidden rounded-[var(--radius)] bg-navy p-6 ${
            hover === "makis" ? "md:flex-[1.35]" : hover === "alitas" ? "md:flex-[0.85]" : ""
          }`}
          onMouseEnter={() => setHover("makis")}
          onMouseLeave={() => setHover(null)}
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 40%, rgba(255,106,0,0.35), transparent 55%)",
          }}
        >
          <p className="font-display text-4xl text-orange md:text-5xl">#TeamMakis</p>
          <p className="mt-2 max-w-xs text-sm text-cream/70">
            Makis de fusión: acevichado, furai, spicy y más.
          </p>
        </div>
      </div>
    </section>
  );
}
