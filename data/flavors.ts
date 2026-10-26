export type Heat =
  | "dulce"
  | "salado"
  | "dulce-salado"
  | "picante"
  | "muy-picante"
  | "ardiente";

export type WingFlavor = { id: string; name: string; heat?: Heat; note?: string };

export type MakiFlavor = {
  id: string;
  name: string;
  description?: string;
  surcharge?: number; // S/ extra por cada sabor (tabla de 10 cortes)
};

export const wingFlavors: WingFlavor[] = [
  { id: "chimichurri", name: "Chimichurri", heat: "salado" },
  { id: "parmesano", name: "Parmesano", heat: "salado" },
  { id: "maracumango", name: "Maracumango", heat: "dulce" },
  { id: "acevichadas", name: "Acevichadas", note: "Sin palabras" }, // TODO(Daniel): la carta no clasifica este sabor
  { id: "teriyaki", name: "Teriyaki", heat: "dulce", note: "Dulce oriental" },
  { id: "honey-mustard", name: "Honey Mustard", heat: "dulce-salado" },
  { id: "maracuya", name: "Maracuyá", heat: "dulce" },
  { id: "pachamanqueras", name: "Pachamanqueras", heat: "salado" },
  { id: "anticucheras", name: "Anticucheras", heat: "salado" },
  { id: "crispy-picante", name: "Crispy Picante", heat: "picante" },
  { id: "passion", name: "Passión", heat: "dulce" },
  { id: "jalapeno-ardiente", name: "Jalapeño Ardiente", heat: "ardiente" },
  { id: "olivo-marino", name: "Al Olivo Marino", heat: "salado" },
  { id: "lomo-saltado", name: "Lomo Saltado", heat: "salado" },
  { id: "bbq-pina", name: "BBQ Piña", heat: "dulce" },
  { id: "bufalo", name: "Búfalo", heat: "muy-picante" },
  { id: "bbq", name: "BBQ", heat: "dulce" },
  { id: "bbq-picante", name: "BBQ Picante", heat: "picante" },
  { id: "crispy", name: "Crispy", heat: "salado" },
];

export const makiFlavors: MakiFlavor[] = [
  {
    id: "acevichado",
    name: "Acevichado",
    description:
      "Langostino empanizado, palta y pescado. Bañado en salsa acevichada y togarashi.",
  },
  {
    id: "avocado",
    name: "Avocado",
    description:
      "Langostino empanizado, queso crema. Por fuera, láminas de palta, ajonjolí negro y desh de tare.",
  },
  {
    id: "furai",
    name: "Furai",
    description:
      "Langostino empanizado, palta y queso crema. Por fuera, frito con panko.",
  },
  {
    id: "california",
    name: "California",
    description:
      "Langostino empanizado, palta y queso crema. Por fuera, mix de ajonjolí negro y blanco.",
  },
  {
    id: "philadelphia",
    name: "Philadelphia",
    description:
      "Langostino empanizado y palta. Por fuera, queso Philadelphia y ajonjolí negro.",
  },
  {
    id: "bbq",
    name: "BBQ",
    description:
      "Langostino empanizado y queso crema. Por fuera, láminas de pescado y salsa BBQ, mix de ajonjolí blanco y negro.",
  },
  {
    id: "parrillero",
    name: "Parrillero",
    description:
      "Langostino empanizado y palta. Por fuera, carne flameada y chimichurri.",
  },
  {
    id: "anticuchero",
    name: "Anticuchero",
    description:
      "Langostino empanizado y palta. Por fuera, carne flameada y chimichurri.",
  },
  {
    id: "tropical",
    name: "Tropical",
    description:
      "Langostino empanizado y palta. Por fuera, queso crema, salsa maracumango y ajonjolí negro.",
  },
  {
    id: "spicy",
    name: "Spicy",
    description:
      "Langostino empanizado y palta. Por fuera, salmón y salsa spicy flameada con toques de togarashi y desh de tare.",
  },
  {
    id: "parmesano",
    name: "Parmesano",
    description:
      "Langostino empanizado y palta. Por fuera, salmón y salsa parmesana flameada, rociado parmesano en polvo y desh de tare.",
  },
  {
    id: "furai-acevichado",
    name: "Furai Acevichado",
    description:
      "Langostino empanizado y palta. Por fuera, frito con panko y salsa acevichada con toques de togarashi.",
  },
  {
    id: "chicken",
    name: "Chicken",
    description:
      "Pollo y palta. Por fuera, papas al hilo y pollo deshilachado bañado en ají de gallina.",
  },
  {
    id: "fuego",
    name: "Fuego",
    description:
      "Langostino empanizado y palta. Por fuera, queso crema y chimichurri con toques de sriracha.",
  },
  {
    id: "dragon-roll",
    name: "Dragon Roll",
    description:
      "Langostino empanizado y palta. Por fuera, láminas de palta y salsa spicy flameada, toques de togarashi y desh de tare.",
  },
  {
    id: "pachamanquero",
    name: "Pachamanquero",
    surcharge: 1,
    description:
      "Langostino empanizado y palta. Por fuera, cobertura de carne flameada con salsa pachamanquera.",
  }, // "Especial +1.00" en la carta. TODO(Daniel): confirmar si el +S/ 1 es por cada tabla de 10 cortes
  {
    id: "spicy-crab",
    name: "Spicy Crab",
    description:
      "Langostino empanizado y palta. Por fuera, togarashi, cobertura superior mix de salsa spicy y pulpa de cangrejo flameado con toques de togarashi y desh de tare.",
  },
  {
    id: "seiji",
    name: "Seiji",
    description:
      "Langostino empanizado y palta. Por fuera, nori y frito en tempura, topping superior seiji flameado, togarashi y desh de tare.",
  },
  {
    id: "pulpo-olivo",
    name: "Pulpo al Olivo",
    description:
      "Langostino empanizado y queso crema. Por fuera, toque de togarashi y mix de ajonjolí blanco y negro. Topping superior mix de salsa al olivo con pulpo picado, toques de togarashi y desh de tare.",
  },
  {
    id: "lomo-saltado",
    name: "Lomo Saltado",
    description:
      "Langostino empanizado y palta. Por fuera, carne flameada con salsa salteada de lomo.",
  },
];

export const flavorCount = makiFlavors.length + wingFlavors.length;
