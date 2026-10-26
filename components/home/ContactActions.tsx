"use client";

import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { buildInfoMessage, whatsappUrl } from "@/lib/whatsapp";

export function ContactActions() {
  const wa = whatsappUrl(buildInfoMessage());

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("click_whatsapp", { source: "contacto" })}
      >
        WhatsApp
      </Button>
      <Button
        href={site.telHref}
        variant="dark"
        onClick={() => trackEvent("click_llamar")}
      >
        Llamar
      </Button>
      <Button
        href={site.directionsUrl}
        variant="secondary"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("click_como_llegar")}
      >
        Cómo llegar
      </Button>
      {site.instagramUrl ? (
        <Button
          href={site.instagramUrl}
          variant="outline"
          className="border-ink text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </Button>
      ) : null}
      {site.tiktokUrl ? (
        <Button
          href={site.tiktokUrl}
          variant="outline"
          className="border-ink text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          TikTok
        </Button>
      ) : null}
      {site.rappiUrls.map((url, i) => (
        <Button
          key={url}
          href={url}
          variant="dark"
          target="_blank"
          rel="noopener noreferrer"
        >
          {i === 0 ? "Rappi" : "Makis by Artesanos"}
        </Button>
      ))}
    </div>
  );
}
