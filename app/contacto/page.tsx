import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";
import { ContactActions } from "@/components/home/ContactActions";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { site } from "@/data/site";
import { formatHoursList } from "@/lib/hours";

export const metadata: Metadata = {
  title: "Cómo llegar y horarios | Artesanos! Alitas y Makis",
  description:
    "Dirección, horarios y delivery de Artesanos! en Santa Anita. Escríbenos por WhatsApp al 960 463 200.",
  openGraph: {
    title: "Cómo llegar y horarios | Artesanos! Alitas y Makis",
    description:
      "Dirección, horarios y delivery de Artesanos! en Santa Anita. Escríbenos por WhatsApp al 960 463 200.",
    images: ["/og-image.jpg"], // pendiente
    url: `${site.siteUrl}/contacto`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cómo llegar y horarios | Artesanos! Alitas y Makis",
    description:
      "Dirección, horarios y delivery de Artesanos! en Santa Anita. Escríbenos por WhatsApp al 960 463 200.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactoPage() {
  const hours = formatHoursList();

  return (
    <main className="mx-auto max-w-6xl px-4 pt-28 pb-28 md:px-6 md:pb-16">
      <h1 className="font-display text-5xl text-ink md:text-7xl">
        Visítanos o pide por WhatsApp
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-3xl text-ink">Dirección</h2>
            <p className="mt-2 flex items-start gap-2 text-ink/75">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange" aria-hidden="true" />
              <span>
                {site.fullAddress}
                {site.addressReference ? (
                  <>
                    <br />
                    {site.addressReference}
                  </>
                ) : null}
              </span>
            </p>
            {site.plusCode ? (
              <p className="mt-2 text-sm text-ink/55">Plus Code: {site.plusCode}</p>
            ) : null}
          </div>

          <div>
            <h2 className="font-display text-3xl text-ink">Horarios</h2>
            <ul className="mt-2 space-y-1 text-ink/75">
              {hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl text-ink">Contacto</h2>
            <p className="mt-2 flex items-center gap-2 text-ink/75">
              <Phone className="h-5 w-5 text-orange" aria-hidden="true" />
              {site.whatsappDisplay}
            </p>
            {site.instagramUrl ? (
              <p className="mt-2 flex items-center gap-2 text-ink/75">
                <InstagramIcon className="h-5 w-5 text-orange" />
                @artesanosiperu
              </p>
            ) : null}
          </div>

          {site.payments.length > 0 ? (
            <div>
              <h2 className="font-display text-3xl text-ink">Pagos</h2>
              <p className="mt-2 text-ink/75">{site.payments.join(", ")}</p>
            </div>
          ) : null}

          <ContactActions />
        </div>

        <div className="overflow-hidden rounded-[var(--radius)] border border-ink/10 bg-sand">
          <iframe
            title={`Mapa de ${site.name} en ${site.district}`}
            src={site.mapEmbedUrl}
            className="aspect-square w-full border-0 md:aspect-auto md:min-h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
