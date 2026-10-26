import { site } from "@/data/site";
import { SCHEMA_DAYS } from "@/lib/hours";

export function buildRestaurantJsonLd(): Record<string, unknown> {
  const sameAs: string[] = [];
  if (site.instagramUrl) sameAs.push(site.instagramUrl);
  if (site.tiktokUrl) sameAs.push(site.tiktokUrl);

  const openingHoursSpecification = site.hours
    .filter((h) => !h.closed)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAYS[h.day],
      opens: h.open,
      closes: h.close,
    }));

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    url: site.siteUrl,
    telephone: `+${site.whatsappNumber}`,
    priceRange: site.priceRange,
    servesCuisine: ["Alitas", "Makis", "Fusión"],
    paymentAccepted: site.payments.join(", "),
    hasMenu: `${site.siteUrl}/carta`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coordinates.lat,
      longitude: site.coordinates.lng,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.district,
      addressRegion: "Lima",
      postalCode: site.postalCode,
      addressCountry: "PE",
    },
  };

  if (openingHoursSpecification.length > 0) {
    jsonLd.openingHoursSpecification = openingHoursSpecification;
  }
  if (sameAs.length > 0) {
    jsonLd.sameAs = sameAs;
  }

  return jsonLd;
}
