"use client";

import { Reveal } from "@/components/home/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { formatHoursList } from "@/lib/hours";

export function LocationHours() {
  const hours = formatHoursList();

  return (
    <section className="bg-cream px-4 py-16 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <Reveal>
          <SectionTitle title="Ubicación y horarios" />
          <p className="mt-4 text-ink/75">{site.fullAddress}</p>
          {site.plusCode ? (
            <p className="mt-1 text-sm text-ink/55">Plus Code: {site.plusCode}</p>
          ) : null}
          <ul className="mt-6 space-y-1 text-sm text-ink/75">
            {hours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="mt-6">
            <Button
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_como_llegar")}
            >
              Cómo llegar
            </Button>
          </div>
        </Reveal>
        <Reveal>
          <div className="overflow-hidden rounded-[var(--radius)] border border-ink/10 bg-sand">
            <iframe
              title={`Mapa de ${site.name} en ${site.district}`}
              src={site.mapEmbedUrl}
              className="aspect-video w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
