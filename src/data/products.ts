export type Product = {
  id: number;
  name: string;
  inspiration: string;
  brand: string;
  category: "fresh" | "sweet" | "oud" | "woody" | "signature";
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  prices: {
    "30ml": number;
    "50ml": number;
    "100ml": number;
  };
  slug: string;
  description: string;
  bestseller?: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Rouge Intense 540",
    inspiration: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    category: "sweet",
    notes: {
      top: ["Safran", "Jasmin"],
      heart: ["Ambrette", "Cèdre"],
      base: ["Ambre", "Musc", "Fir Resin"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "rouge-intense-540",
    description:
      "Une fragrance lumineuse et cristalline, mêlant safran et ambrette dans un sillage envoûtant qui ne laisse personne indifférent.",
    bestseller: true,
  },
  {
    id: 2,
    name: "Sauvage Elixir",
    inspiration: "Sauvage",
    brand: "Dior",
    category: "fresh",
    notes: {
      top: ["Bergamote", "Poivre de Sichuan"],
      heart: ["Lavande", "Poivre noir"],
      base: ["Ambroxan", "Cèdre", "Labdanum"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "sauvage-elixir",
    description:
      "Un parfum masculin brut et magnétique, porté par des notes fraîches de bergamote et une base boisée puissante.",
    bestseller: true,
  },
  {
    id: 3,
    name: "Bleu Absolu",
    inspiration: "Bleu de Chanel",
    brand: "Chanel",
    category: "woody",
    notes: {
      top: ["Citron", "Menthe", "Pamplemousse rose"],
      heart: ["Gingembre", "Jasmin", "Noix de muscade"],
      base: ["Bois de santal", "Cèdre", "Patchouli"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "bleu-absolu",
    description:
      "L'incarnation de la liberté masculine. Des agrumes vifs plongent dans un cœur épicé, le tout reposant sur un fond boisé noble.",
    bestseller: true,
  },
  {
    id: 4,
    name: "Ombre du Désert",
    inspiration: "Ombre Nomade",
    brand: "Louis Vuitton",
    category: "oud",
    notes: {
      top: ["Rose de Damas", "Safran"],
      heart: ["Oud", "Framboise"],
      base: ["Ambre gris", "Benjoin", "Bois de gaïac"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "ombre-du-desert",
    description:
      "Un voyage sensoriel au cœur du désert. L'oud se mêle à la rose dans une composition d'une profondeur rare.",
    bestseller: true,
  },
  {
    id: 5,
    name: "Cerise Perdue",
    inspiration: "Lost Cherry",
    brand: "Tom Ford",
    category: "sweet",
    notes: {
      top: ["Cerise noire", "Amande amère"],
      heart: ["Cerise griotte", "Liqueur de cerise"],
      base: ["Bois de santal", "Vanille", "Musc"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "cerise-perdue",
    description:
      "Une gourmandise irrésistible. La cerise noire se révèle dans un écrin de vanille et de bois de santal.",
    bestseller: true,
  },
  {
    id: 6,
    name: "Tabac Vanillé",
    inspiration: "Tobacco Vanille",
    brand: "Tom Ford",
    category: "signature",
    notes: {
      top: ["Tabac", "Épices"],
      heart: ["Vanille", "Fève de tonka", "Cacao"],
      base: ["Bois sec", "Fruits secs", "Suédé"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "tabac-vanille",
    description:
      "L'alliance ultime du tabac et de la vanille. Un classique intemporel, opulent et addictif.",
    bestseller: true,
  },
  {
    id: 7,
    name: "Aventure Noire",
    inspiration: "Aventus",
    brand: "Creed",
    category: "fresh",
    notes: {
      top: ["Ananas", "Bergamote", "Cassis"],
      heart: ["Bouleau", "Patchouli", "Jasmin"],
      base: ["Musc", "Chêne", "Vanille"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "aventure-noire",
    description:
      "La puissance et le charisme dans un flacon. Un parfum frais et fruité qui laisse une empreinte indélébile.",
  },
  {
    id: 8,
    name: "Oud Royal",
    inspiration: "Royal Oud",
    brand: "Creed",
    category: "oud",
    notes: {
      top: ["Citron de Sicile", "Pamplemousse rose"],
      heart: ["Cèdre de l'Atlas", "Galbanum"],
      base: ["Oud", "Santal", "Musc"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "oud-royal",
    description:
      "La noblesse de l'oud dans sa forme la plus raffinée. Un parfum royal entre tradition orientale et élégance occidentale.",
  },
  {
    id: 9,
    name: "Iris Céleste",
    inspiration: "Iris Ganache",
    brand: "Guerlain",
    category: "signature",
    notes: {
      top: ["Iris", "Violette"],
      heart: ["Chocolat", "Rose"],
      base: ["Patchouli", "Vanille", "Musc blanc"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "iris-celeste",
    description:
      "Un iris d'une élégance rare, sublimé par des touches gourmandes de chocolat et une base poudrée.",
  },
  {
    id: 10,
    name: "Bois d'Argent",
    inspiration: "Bois d'Argent",
    brand: "Dior",
    category: "woody",
    notes: {
      top: ["Miel", "Iris"],
      heart: ["Encens", "Bois de rose"],
      base: ["Musc", "Patchouli", "Bois de cachemire"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "bois-dargent",
    description:
      "Un boisé précieux et lumineux. Le miel caresse l'iris tandis que l'encens révèle un fond mystérieux.",
  },
  {
    id: 11,
    name: "Aqua Fraîche",
    inspiration: "Acqua di Gio Profondo",
    brand: "Giorgio Armani",
    category: "fresh",
    notes: {
      top: ["Bergamote", "Mandarine verte", "Aquozone"],
      heart: ["Lavande", "Romarin", "Cyprès"],
      base: ["Musc", "Ambre minéral", "Patchouli"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "aqua-fraiche",
    description:
      "L'essence de la Méditerranée en un souffle. Un parfum aquatique et aromatique d'une fraîcheur absolue.",
  },
  {
    id: 12,
    name: "Vanille Orientale",
    inspiration: "Spiritueuse Double Vanille",
    brand: "Guerlain",
    category: "sweet",
    notes: {
      top: ["Bergamote", "Rose"],
      heart: ["Vanille de Tahiti", "Ylang-ylang"],
      base: ["Benjoin", "Bois de gaïac", "Réglisse"],
    },
    prices: { "30ml": 5, "50ml": 8, "100ml": 12 },
    slug: "vanille-orientale",
    description:
      "La vanille dans toute sa splendeur. Un voyage entre Orient et Occident, porté par une douceur enveloppante.",
  },
];

export const categories = [
  { id: "fresh", name: "Fresh", description: "Fraîcheur et vivacité" },
  { id: "sweet", name: "Sweet", description: "Douceur et gourmandise" },
  { id: "oud", name: "Oud", description: "Profondeur et mystère" },
  { id: "woody", name: "Woody", description: "Élégance boisée" },
  { id: "signature", name: "Signature", description: "L'audace unique" },
] as const;
