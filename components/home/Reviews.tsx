import { Star } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import { formatRating } from "@/lib/format";

export function Reviews() {
  const moreUrl = site.googleReviewUrl || site.directionsUrl;

  return (
    <section className="texture-dark bg-navy px-4 py-16 text-cream md:px-6">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionTitle
            light
            title="Reseñas"
            description={`${formatRating(site.googleRating.value)} en Google · ${site.googleRating.count} reseñas`}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {reviews.map((r) => (
            <Reveal key={r.id}>
              <blockquote className="h-full rounded-[var(--radius)] border border-white/10 bg-ink/35 p-5">
                <div className="flex items-center gap-1 text-orange" aria-label={`${r.rating} estrellas`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-3 text-cream/85">&ldquo;{r.text}&rdquo;</p>
                <footer className="mt-4 text-sm text-cream/55">
                  <cite className="not-italic font-semibold text-cream">
                    {r.author}
                  </cite>
                  {" · "}
                  {r.relativeTime}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Button href={moreUrl} variant="primary" target="_blank" rel="noopener noreferrer">
            Ver más en Google
          </Button>
        </div>
      </div>
    </section>
  );
}
