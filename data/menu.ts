import { wingFlavors } from "./flavors";

export type CategoryId =
  | "combos"
  | "makis"
  | "alitas"
  | "papas"
  | "refrescos"
  | "jarras"
  | "bar"
  | "salchis"
  | "burgers";

// makiFlavors / wingFlavors = cantidad EXACTA de sabores que el cliente debe elegir.
export type Variant = {
  id: string;
  label: string;
  price: number;
  makiFlavors?: number;
  wingFlavors?: number;
};

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  description?: string;
  image?: string;
  badge?: "mas-pedido" | "promo" | "nuevo";
  variants: Variant[];
  choice?: { label: string; options: string[] };
  alcohol?: boolean; // venta solo a mayores de 18 años
};

export const categories: {
  id: CategoryId;
  name: string;
  group: "comer" | "beber";
}[] = [
  { id: "combos", name: "Combos", group: "comer" },
  { id: "makis", name: "Makis", group: "comer" },
  { id: "alitas", name: "Alitas", group: "comer" },
  { id: "salchis", name: "Salchis", group: "comer" },
  { id: "burgers", name: "Burgers", group: "comer" },
  { id: "papas", name: "Papas", group: "comer" },
  { id: "refrescos", name: "Refrescos", group: "beber" },
  { id: "jarras", name: "Jarras de 1 L", group: "beber" },
  { id: "bar", name: "Bar", group: "beber" },
];

const v = (
  id: string,
  label: string,
  price: number,
  extra: Partial<Variant> = {},
): Variant => ({ id, label, price, ...extra });
const one = (price: number): Variant[] => [v("unico", "Único", price)];

export const products: Product[] = [
  // COMBOS
  {
    id: "maki-alitas",
    name: "Maki Alitas",
    category: "combos",
    badge: "promo",
    description: "10 makis y 6 alitas, 1 sabor de cada uno.",
    variants: [
      v("unico", "10 makis + 6 alitas", 35, { makiFlavors: 1, wingFlavors: 1 }),
    ],
  },
  {
    id: "duo-perfecto",
    name: "Dúo Perfecto",
    category: "combos",
    badge: "promo",
    description: "20 makis (2 sabores) y 10 alitas (2 sabores).",
    variants: [
      v("unico", "20 makis + 10 alitas", 60, { makiFlavors: 2, wingFlavors: 2 }),
    ],
  },

  // MAKIS (cada sabor es una tabla de 10 cortes)
  {
    id: "makis",
    name: "Makis",
    category: "makis",
    description: "Cada sabor es una tabla de 10 cortes.",
    variants: [
      v("10", "10 makis · 1 sabor", 25, { makiFlavors: 1 }),
      v("20", "20 makis · 2 sabores", 37, { makiFlavors: 2 }),
      v("30", "30 makis · 3 sabores", 49, { makiFlavors: 3 }),
      v("40", "40 makis · 4 sabores", 62, { makiFlavors: 4 }),
      v("50", "50 makis · 5 sabores", 75, { makiFlavors: 5 }),
    ],
  },

  // ALITAS
  {
    id: "alitas",
    name: "Alitas",
    category: "alitas",
    variants: [
      v("6", "6 alitas · 1 sabor", 22, { wingFlavors: 1 }),
      v("10", "10 alitas · 2 sabores", 35, { wingFlavors: 2 }),
      v("15", "15 alitas · 3 sabores", 47, { wingFlavors: 3 }),
      v("20", "20 alitas · 4 sabores", 59, { wingFlavors: 4 }),
    ],
  },

  // SALCHIS
  {
    id: "salchiwing",
    name: "Salchiwing",
    category: "salchis",
    description:
      "Frankfurter, chorizo, queso, chimichurri y 6 alitas (1 salsa).",
    variants: one(36),
    choice: {
      label: "Elige la salsa de tus alitas",
      options: wingFlavors.map((f) => f.name),
    },
  },
  {
    id: "mixta",
    name: "Mixta",
    category: "salchis",
    description: "Frankfurter, chorizo, queso y chimichurri.",
    variants: one(24),
  },

  // BURGERS
  {
    id: "gloriosa",
    name: "Gloriosa",
    category: "burgers",
    description:
      "Brioche, lechuga hidro y tomate, doble carne, cheddar y chimichurri.",
    variants: one(30),
  },
  {
    id: "royal",
    name: "Royal",
    category: "burgers",
    description:
      "Brioche, lechuga hidro y tomate, carne, cheddar y chimichurri.",
    variants: one(24),
  },
  {
    id: "parri",
    name: "Parri",
    category: "burgers",
    description:
      "Brioche, lechuga hidro y tomate, carne, cheddar, huevo, chorizo y chimichurri.",
    variants: one(28),
  },

  // PAPAS
  {
    id: "papas",
    name: "Papas",
    category: "papas",
    variants: [v("mediana", "Mediana", 7), v("grande", "Grande", 9)],
  },

  // REFRESCOS (vaso)
  {
    id: "ref-maracumango",
    name: "Maracumango",
    category: "refrescos",
    variants: one(10),
  },
  {
    id: "ref-fresa-maracuya",
    name: "Fresa con maracuyá",
    category: "refrescos",
    variants: one(10),
  },
  {
    id: "ref-limonada-fresa",
    name: "Limonada de fresa",
    category: "refrescos",
    variants: one(10),
  },
  {
    id: "ref-limonada-hierba-luisa",
    name: "Limonada de hierba luisa",
    category: "refrescos",
    variants: one(10),
  },
  {
    id: "ref-limonada-coco",
    name: "Limonada de coco",
    category: "refrescos",
    variants: one(10),
  },

  // JARRAS 1 L
  {
    id: "jarra-limonada-pina",
    name: "Limonada de piña",
    category: "jarras",
    variants: one(17),
  },
  {
    id: "jarra-limonada-clasica",
    name: "Limonada clásica",
    category: "jarras",
    variants: one(14),
  },
  {
    id: "jarra-limonada-frozen",
    name: "Limonada frozen",
    category: "jarras",
    variants: one(16),
  },
  {
    id: "jarra-maracuya",
    name: "Maracuyá",
    category: "jarras",
    variants: one(14),
  },

  // BAR
  {
    id: "pisco-sour",
    name: "Pisco sour",
    category: "bar",
    alcohol: true,
    variants: one(20),
  },
  {
    id: "whiscano",
    name: "Whiscano",
    category: "bar",
    alcohol: true,
    description: "Whisky.",
    variants: one(20),
  },
  {
    id: "vodka-sunrise",
    name: "Vodka sunrise",
    category: "bar",
    alcohol: true,
    variants: one(20),
  },
  {
    id: "algarrobina",
    name: "Algarrobina",
    category: "bar",
    alcohol: true,
    variants: one(20),
  },
  {
    id: "pina-colada",
    name: "Piña colada",
    category: "bar",
    alcohol: true,
    variants: one(20),
  },
  {
    id: "daiquiri",
    name: "Daiquiri",
    category: "bar",
    alcohol: true,
    variants: one(20),
    choice: { label: "Elige tu sabor", options: ["Fresa", "Maracuyá"] },
  },
  {
    id: "cerveza-artesanal",
    name: "Cerveza artesanal",
    category: "bar",
    alcohol: true,
    variants: one(18),
    choice: {
      label: "Elige tu sabor",
      options: ["Borgoña", "Maracuyá", "Limón"],
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getVariant(
  product: Product,
  variantId: string,
): Variant | undefined {
  return product.variants.find((v) => v.id === variantId);
}

export function getMinPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}
