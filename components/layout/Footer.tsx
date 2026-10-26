import Link from "next/link";
import { Logo } from "@/components/Logo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { site } from "@/data/site";
import { formatHoursList } from "@/lib/hours";

export function Footer() {
  // Año fijo: Next.js Cache Components no permite new Date() en prerender
  const year = 2026;
  const hours = formatHoursList();

  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-cream/75">{site.tagline}</p>
          <p className="mt-2 text-sm text-orange">{site.supportLine}</p>
        </div>

        <div>
          <h2 className="font-display text-2xl text-orange">Horarios</h2>
          <ul className="mt-3 space-y-1 text-sm text-cream/80">
            {hours.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-orange">Enlaces</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/carta" className="hover:text-orange">
                Carta
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-orange">
                Contacto
              </Link>
            </li>
            {site.instagramUrl ? (
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-orange"
                >
                  <InstagramIcon className="h-4 w-4" />
                  Instagram
                </a>
              </li>
            ) : null}
            {site.tiktokUrl ? (
              <li>
                <a
                  href={site.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange"
                >
                  TikTok
                </a>
              </li>
            ) : null}
          </ul>
          {site.payments.length > 0 ? (
            <p className="mt-4 text-sm text-cream/70">
              Pagos: {site.payments.join(", ")}
            </p>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-cream/55 md:px-6">
        <p>Venta de bebidas alcohólicas prohibida a menores de 18 años</p>
        <p className="mt-2">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
