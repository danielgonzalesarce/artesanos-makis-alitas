export type DayHours = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export const LOGO_SRC = ""; // vacío hasta que exista /images/logo.png

export const site = {
  name: "Artesanos! Alitas y Makis",
  shortName: "Artesanos!",
  tagline: "¿Alitas o makis? No tienes que elegir.",
  supportLine: "Puro sabor que te encantará.",
  whatsappNumber: "51960463200",
  whatsappDisplay: "960 463 200",
  payments: ["Yape"] as string[], // TODO(Daniel): confirmar efectivo, tarjetas, Plin
  district: "Santa Anita",
  city: "Lima",
  address: "Las Avutardas 194",
  postalCode: "15009",
  coordinates: { lat: -12.0497258, lng: -76.9665686 },
  plusCode: "X22M+49 Santa Anita",
  priceRange: "S/ 20-40",
  instagramUrl: "https://www.instagram.com/artesanosiperu/",
  rappiUrls: [
    "https://www.rappi.com.pe/restaurantes/55909-artesanos-santa-anita",
    "https://www.rappi.com.pe/restaurantes/66908-makis-by-artesanos",
  ] as string[],
  googleRating: {
    value: 4.6,
    count: 96,
    snapshotDate: "2026-10-25",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  LOGO_SRC,

  // TODO(Daniel): confirmar referencia exacta de la dirección
  addressReference: "",
  // TODO(Daniel): hay dos cuentas de TikTok; no elegir ninguna hasta confirmar
  tiktokUrl: "",
  // TODO(Daniel): URL directa a reseñas de Google
  googleReviewUrl: "",
  // TODO(Daniel): URL de ficha de Google Maps
  mapsUrl: "",
  // TODO(Daniel): zonas de delivery
  deliveryZones: "",
  // TODO(Daniel): nota de delivery (costos, tiempo)
  deliveryNote: "",
  // TODO(Daniel): días y horas del Happy Hour
  happyHourSchedule: "",

  // TODO(Daniel): confirmar con el dueño
  // Discrepancia: Google/Instagram dicen 3 pm–11 pm todos los días; usamos carta digital
  hours: [
    { day: "lunes", open: "17:00", close: "23:00" },
    { day: "martes", open: "15:00", close: "23:00" },
    { day: "miércoles", open: "15:00", close: "23:00" },
    { day: "jueves", open: "15:00", close: "23:00" },
    { day: "viernes", open: "15:00", close: "23:00" },
    { day: "sábado", open: "15:00", close: "23:00" },
    { day: "domingo", open: "15:30", close: "23:00" },
  ] as DayHours[],

  get fullAddress() {
    const parts = [this.address, this.district, this.city, this.postalCode].filter(
      Boolean,
    );
    return parts.join(", ");
  },

  get directionsUrl() {
    const { lat, lng } = this.coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  },

  get mapEmbedUrl() {
    const { lat, lng } = this.coordinates;
    return `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`;
  },

  get telHref() {
    return `tel:+${this.whatsappNumber}`;
  },
};