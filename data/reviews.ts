// TODO(Daniel): pedir autorización al dueño para mostrarlas
export type Review = {
  id: string;
  author: string;
  rating: number;
  relativeTime: string;
  text: string;
};

export const reviews: Review[] = [
  {
    id: "kelvin-b",
    author: "Kelvin B.",
    rating: 5,
    relativeTime: "hace 2 semanas",
    text: "me encanto el lugar muy limpio y ordenado la comida deliciosa y la atencion increibleee",
  },
  {
    id: "joshua-r",
    author: "Joshua R.",
    rating: 5,
    relativeTime: "hace 5 meses",
    text: "Increíble lugar, buena comida y además bien servicio, te tratan super bien, y además sirven buena cantidad",
  },
  {
    id: "norma-c",
    author: "Norma C.",
    rating: 5,
    relativeTime: "hace 8 meses",
    text: "Los detalles del local, la higiene, el carisma, acogida amable del personal y la comida fue todo super genial.",
  },
  {
    id: "anthuane-g",
    author: "Anthuane G.",
    rating: 5,
    relativeTime: "hace 9 meses",
    text: "Excelente trato muy amables ... Y las alitas muy ricas igual que los makis",
  },
];
