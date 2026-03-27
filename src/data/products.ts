export type Product = {
  id: number;
  name: string;
  brand: string;
  category: "homme" | "femme" | "unisexe" | "oud" | "niche";
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  prices: {
    "3ml": number;
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
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    category: "unisexe",
    notes: {
      top: ["Safran", "Jasmin"],
      heart: ["Ambrette", "Cèdre de Virginie"],
      base: ["Ambre", "Musc", "Résine de sapin"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "baccarat-rouge-540",
    description:
      "Une fragrance lumineuse et cristalline, mêlant safran et ambrette dans un sillage envoûtant qui ne laisse personne indifférent.",
    bestseller: true,
  },
  {
    id: 2,
    name: "Sauvage",
    brand: "Dior",
    category: "homme",
    notes: {
      top: ["Bergamote de Calabre", "Poivre"],
      heart: ["Lavande", "Poivre de Sichuan", "Géranium"],
      base: ["Ambroxan", "Cèdre", "Labdanum"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "sauvage",
    description:
      "Un parfum masculin brut et magnétique, porté par des notes fraîches de bergamote et une base boisée puissante.",
    bestseller: true,
  },
  {
    id: 3,
    name: "Bleu de Chanel",
    brand: "Chanel",
    category: "homme",
    notes: {
      top: ["Citron", "Menthe", "Pamplemousse rose"],
      heart: ["Gingembre", "Jasmin", "Noix de muscade"],
      base: ["Bois de santal", "Cèdre", "Patchouli"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "bleu-de-chanel",
    description:
      "L'incarnation de la liberté masculine. Des agrumes vifs plongent dans un cœur épicé, reposant sur un fond boisé noble.",
    bestseller: true,
  },
  {
    id: 4,
    name: "Lost Cherry",
    brand: "Tom Ford",
    category: "unisexe",
    notes: {
      top: ["Cerise noire", "Amande amère"],
      heart: ["Cerise griotte", "Liqueur de cerise", "Rose de Turquie"],
      base: ["Bois de santal", "Vanille", "Musc"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "lost-cherry",
    description:
      "Une gourmandise irrésistible. La cerise noire se révèle dans un écrin de vanille et de bois de santal.",
    bestseller: true,
  },
  {
    id: 5,
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    category: "unisexe",
    notes: {
      top: ["Tabac", "Épices"],
      heart: ["Vanille", "Fève de tonka", "Cacao"],
      base: ["Bois sec", "Fruits secs", "Suédé"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "tobacco-vanille",
    description:
      "L'alliance ultime du tabac et de la vanille. Un classique intemporel, opulent et addictif.",
    bestseller: true,
  },
  {
    id: 6,
    name: "Aventus",
    brand: "Creed",
    category: "homme",
    notes: {
      top: ["Ananas", "Bergamote", "Cassis", "Pomme verte"],
      heart: ["Bouleau", "Patchouli", "Jasmin", "Rose"],
      base: ["Musc", "Chêne", "Ambre gris", "Vanille"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "aventus",
    description:
      "La puissance et le charisme dans un flacon. Un parfum frais et fruité qui laisse une empreinte indélébile.",
    bestseller: true,
  },
  {
    id: 7,
    name: "Oud Ispahan",
    brand: "Dior",
    category: "oud",
    notes: {
      top: ["Rose de Damas"],
      heart: ["Oud de Laos", "Labdanum"],
      base: ["Ambre", "Santal", "Vétiver"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "oud-ispahan",
    description:
      "Un voyage sensoriel entre Orient et Occident. L'oud se mêle à la rose dans une composition d'une profondeur rare.",
  },
  {
    id: 8,
    name: "Coco Mademoiselle",
    brand: "Chanel",
    category: "femme",
    notes: {
      top: ["Orange", "Bergamote", "Pamplemousse"],
      heart: ["Rose", "Jasmin", "Litchi"],
      base: ["Patchouli", "Vétiver", "Vanille", "Musc blanc"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "coco-mademoiselle",
    description:
      "L'essence de la féminité moderne. Un parfum frais et oriental, audacieux et irrésistiblement sensuel.",
  },
  {
    id: 9,
    name: "Black Opium",
    brand: "Yves Saint Laurent",
    category: "femme",
    notes: {
      top: ["Café noir", "Poire", "Bergamote"],
      heart: ["Jasmin", "Fleur d'oranger"],
      base: ["Vanille", "Patchouli", "Cèdre"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "black-opium",
    description:
      "Un élixir de séduction. Le café noir rencontre la vanille dans un cocktail envoûtant et addictif.",
  },
  {
    id: 10,
    name: "Oud Satin Mood",
    brand: "Maison Francis Kurkdjian",
    category: "oud",
    notes: {
      top: ["Violette", "Rose de Damas"],
      heart: ["Oud", "Vanille"],
      base: ["Benjoin", "Bois de santal"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "oud-satin-mood",
    description:
      "La noblesse de l'oud dans sa forme la plus raffinée. Un parfum soyeux entre rose et bois précieux.",
  },
  {
    id: 11,
    name: "La Vie Est Belle",
    brand: "Lancôme",
    category: "femme",
    notes: {
      top: ["Cassis", "Poire"],
      heart: ["Iris", "Jasmin", "Fleur d'oranger"],
      base: ["Patchouli", "Vanille", "Praliné", "Fève de tonka"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "la-vie-est-belle",
    description:
      "Un hymne à la joie de vivre. L'iris et la vanille s'enlacent dans une composition gourmande et lumineuse.",
  },
  {
    id: 12,
    name: "Oud Wood",
    brand: "Tom Ford",
    category: "oud",
    notes: {
      top: ["Oud", "Bois de rose", "Cardamome"],
      heart: ["Santal", "Vétiver"],
      base: ["Fève de tonka", "Ambre"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "oud-wood",
    description:
      "L'oud dans toute sa noblesse. Un boisé fumé et crémeux, sophistiqué et addictif.",
  },
  {
    id: 13,
    name: "Flowerbomb",
    brand: "Viktor & Rolf",
    category: "femme",
    notes: {
      top: ["Thé", "Bergamote"],
      heart: ["Jasmin", "Rose", "Orchidée", "Freesia"],
      base: ["Patchouli", "Musc", "Vanille"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "flowerbomb",
    description:
      "Une explosion florale addictive. Un bouquet de fleurs précieuses sur un lit de patchouli et vanille.",
  },
  {
    id: 14,
    name: "Stronger With You",
    brand: "Armani",
    category: "homme",
    notes: {
      top: ["Cardamome", "Poivre rose", "Violet"],
      heart: ["Sauge", "Cannelle"],
      base: ["Vanille", "Ambre", "Châtaigne", "Suédé"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "stronger-with-you",
    description:
      "Un parfum chaleureux et réconfortant. La châtaigne et la vanille créent un sillage irrésistiblement gourmand.",
  },
  {
    id: 15,
    name: "Santal 33",
    brand: "Le Labo",
    category: "niche",
    notes: {
      top: ["Cardamome", "Iris", "Violet"],
      heart: ["Ambrox", "Bois de santal australien"],
      base: ["Cèdre de Virginie", "Cuir", "Musc"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "santal-33",
    description:
      "L'icône de la parfumerie niche. Un santal crémeux et cuiré, devenu un véritable classique contemporain.",
  },
  {
    id: 16,
    name: "Delina",
    brand: "Parfums de Marly",
    category: "femme",
    notes: {
      top: ["Litchi", "Rhubarbe", "Bergamote"],
      heart: ["Rose de Mai", "Pivoine", "Muguet"],
      base: ["Musc blanc", "Vanille", "Cashmeran", "Cèdre"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "delina",
    description:
      "La féminité réinventée. Un bouquet rose-litchi d'une élégance rare, porté par un fond crémeux et velouté.",
  },
  {
    id: 17,
    name: "Erba Pura",
    brand: "Xerjoff",
    category: "niche",
    notes: {
      top: ["Orange de Sicile", "Bergamote de Calabre", "Citron de Sicile"],
      heart: ["Fruits blancs", "Abricot"],
      base: ["Vanille de Madagascar", "Musc blanc", "Ambre"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "erba-pura",
    description:
      "Un cocktail solaire de fruits et de vanille. L'incarnation de la dolce vita italienne dans un flacon.",
  },
  {
    id: 18,
    name: "Layton",
    brand: "Parfums de Marly",
    category: "homme",
    notes: {
      top: ["Pomme", "Bergamote", "Mandarine"],
      heart: ["Jasmin", "Violet", "Lavande"],
      base: ["Vanille", "Santal", "Poivre", "Guaïac"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "layton",
    description:
      "L'élégance royale. Un parfum raffiné entre pomme mentholée et vanille boisée, d'une tenue exceptionnelle.",
  },
  {
    id: 19,
    name: "J'adore",
    brand: "Dior",
    category: "femme",
    notes: {
      top: ["Mandarine", "Champagne", "Bergamote"],
      heart: ["Jasmin", "Rose", "Muguet"],
      base: ["Ambre", "Musc", "Vanille", "Bois de santal"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "jadore",
    description:
      "Un bouquet solaire de fleurs blanches. L'icône de la féminité Dior, radieuse et intemporelle.",
  },
  {
    id: 20,
    name: "Fucking Fabulous",
    brand: "Tom Ford",
    category: "niche",
    notes: {
      top: ["Lavande", "Amande amère"],
      heart: ["Fève de tonka", "Sauge sclarée", "Orris"],
      base: ["Cuir", "Cashmeran", "Ambre"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "fucking-fabulous",
    description:
      "L'audace incarnée. Un cuir lavandé d'une sophistication brute, provocant et inoubliable.",
  },
  {
    id: 21,
    name: "Good Girl",
    brand: "Carolina Herrera",
    category: "femme",
    notes: {
      top: ["Amande", "Café"],
      heart: ["Tubéreuse", "Jasmin sambac", "Rose"],
      base: ["Cacao", "Fève de tonka", "Bois de santal"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "good-girl",
    description:
      "La dualité de la femme moderne. Le jasmin lumineux rencontre la fève de cacao dans un contraste saisissant.",
  },
  {
    id: 22,
    name: "Invictus",
    brand: "Rabanne",
    category: "homme",
    notes: {
      top: ["Pamplemousse", "Mandarine", "Notes marines"],
      heart: ["Laurier", "Jasmin"],
      base: ["Ambre gris", "Bois de gaïac", "Patchouli", "Musc"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "invictus",
    description:
      "La victoire dans un flacon. Un parfum frais et puissant, sportif et séducteur.",
  },
  {
    id: 23,
    name: "Khamrah",
    brand: "Lattafa",
    category: "oud",
    notes: {
      top: ["Cannelle", "Bergamote", "Noix de muscade"],
      heart: ["Datte", "Praline", "Tubéreuse"],
      base: ["Vanille", "Benjoin", "Ambre", "Oud"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "khamrah",
    description:
      "Un élixir oriental enivrant. Les épices chaudes et la datte créent un sillage gourmand d'une richesse rare.",
  },
  {
    id: 24,
    name: "Libre",
    brand: "Yves Saint Laurent",
    category: "femme",
    notes: {
      top: ["Mandarine", "Groseille", "Lavande"],
      heart: ["Fleur d'oranger", "Jasmin"],
      base: ["Vanille de Madagascar", "Musc", "Cèdre", "Ambre gris"],
    },
    prices: { "3ml": 75, "30ml": 250, "50ml": 395, "100ml": 595 },
    slug: "libre",
    description:
      "La liberté en parfum. Un floral lavandé audacieux, entre masculin et féminin, d'une modernité absolue.",
  },
];

export const categories = [
  { id: "homme", name: "Homme", description: "Fragrances masculines" },
  { id: "femme", name: "Femme", description: "Fragrances féminines" },
  { id: "unisexe", name: "Unisexe", description: "Pour tous" },
  { id: "oud", name: "Oud", description: "Profondeur orientale" },
  { id: "niche", name: "Niche", description: "Parfumerie d'exception" },
] as const;
