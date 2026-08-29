import { I } from "./images";

export type Category = "bags" | "ready-to-wear" | "shoes" | "accessories";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  line: string;
  name: string;
  category: Category;
  gender: "women" | "men" | "unisex";
  priceINR: number;
  colors: ProductColor[];
  sizes: string[];
  material: string;
  materialGroup: "Leather" | "Cashmere" | "Silk" | "Wool";
  isNew?: boolean;
  bestseller?: boolean;
  collection: string;
  description: string;
  details: string[];
  craftsmanship: string;
  image: string;
  imagePos?: string;
  hoverFlip?: boolean;
  alt: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "varsa-no-01",
    line: "Varsa N° 01",
    name: "The Varsa Top Handle",
    category: "bags",
    gender: "women",
    priceINR: 185000,
    colors: [
      { name: "Ivory Stone", hex: "#E4DCCB" },
      { name: "Obsidian", hex: "#141311" },
      { name: "Espresso", hex: "#3B2C22" },
    ],
    sizes: ["One Size"],
    material: "Hand-finished calfskin leather",
    materialGroup: "Leather",
    bestseller: true,
    collection: "Icon Collection",
    description:
      "The definitive LA VARSA silhouette. An architectural top handle in hand-finished calfskin, drawn in a single uninterrupted line and closed by a silent brushed clasp.",
    details: [
      "Hand-finished calfskin leather",
      "Brushed champagne hardware",
      "Suede-lined interior with single pocket",
      "Removable shoulder strap, 48 cm drop",
      "Width 26 cm — Height 19 cm — Depth 11 cm",
      "Made in Italy",
    ],
    craftsmanship:
      "Each handle is shaped over a wooden form and polished by hand for two hours, a technique preserved by our atelier since the House's first collection.",
    image: I.bag1,
    alt: "The Varsa Top Handle in ivory stone calfskin on a travertine plinth",
  },
  {
    id: "varsa-no-02",
    line: "Varsa N° 02",
    name: "The Élan Shoulder Bag",
    category: "bags",
    gender: "women",
    priceINR: 142000,
    colors: [
      { name: "Obsidian", hex: "#141311" },
      { name: "Stone", hex: "#B8B0A3" },
    ],
    sizes: ["One Size"],
    material: "Grained calfskin leather",
    materialGroup: "Leather",
    isNew: true,
    collection: "Autumn / Winter 2026",
    description:
      "A slender shoulder bag in obsidian grained calfskin. The Élan carries only what is essential — and carries it with quiet intention.",
    details: [
      "Grained calfskin leather",
      "Single brushed champagne stud",
      "Ivory nappa interior",
      "Adjustable strap, 52 cm drop",
      "Width 24 cm — Height 15 cm — Depth 7 cm",
      "Made in Italy",
    ],
    craftsmanship:
      "The grain of each hide is matched by eye across panels, so the bag reads as a single unbroken surface in low light.",
    image: I.bag2,
    alt: "The Élan Shoulder Bag in obsidian grained calfskin",
  },
  {
    id: "varsa-no-03",
    line: "Varsa N° 03",
    name: "The Aurelia Tote",
    category: "bags",
    gender: "women",
    priceINR: 168000,
    colors: [
      { name: "Espresso", hex: "#3B2C22" },
      { name: "Ivory Stone", hex: "#E4DCCB" },
    ],
    sizes: ["One Size"],
    material: "Full-grain vegetable-tanned leather",
    materialGroup: "Leather",
    collection: "Icon Collection",
    description:
      "An architectural tote in vegetable-tanned leather that deepens with every year of wear. Designed to be carried daily, and to endure far longer than the season.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Hand-saddle-stitched seams",
      "Unlined, raw-edge interior",
      "Interior leather tie closure",
      "Width 38 cm — Height 30 cm — Depth 14 cm",
      "Made in Italy",
    ],
    craftsmanship:
      "Vegetable tanning takes forty days in chestnut and mimosa baths — a slow process the House refuses to accelerate, for the leather ages rather than wears.",
    image: I.bag3,
    alt: "The Aurelia Tote in espresso vegetable-tanned leather",
  },
  {
    id: "varsa-no-04",
    line: "Varsa N° 04",
    name: "The Varsa Mini",
    category: "bags",
    gender: "women",
    priceINR: 112000,
    colors: [
      { name: "Champagne", hex: "#D8C8A8" },
      { name: "Obsidian", hex: "#141311" },
    ],
    sizes: ["One Size"],
    material: "Smooth calfskin leather",
    materialGroup: "Leather",
    isNew: true,
    collection: "Autumn / Winter 2026",
    description:
      "The signature reduced to its essence. A miniature top handle in smooth calfskin — an object closer to sculpture than accessory.",
    details: [
      "Smooth calfskin leather",
      "Brushed champagne clasp",
      "Micro-suede interior",
      "Chain-link strap, 55 cm drop",
      "Width 18 cm — Height 14 cm — Depth 8 cm",
      "Made in Italy",
    ],
    craftsmanship:
      "At this scale, every tolerance tightens. The Mini is assembled by a single artisan, start to finish, over two days.",
    image: I.bag1,
    imagePos: "62% 38%",
    hoverFlip: true,
    alt: "The Varsa Mini in champagne calfskin, studio study",
  },
  {
    id: "solenne-coat",
    line: "Ready-to-Wear",
    name: "The Solenne Coat",
    category: "ready-to-wear",
    gender: "women",
    priceINR: 245000,
    colors: [
      { name: "Camel", hex: "#A98B64" },
      { name: "Charcoal", hex: "#2E2C29" },
    ],
    sizes: ["36", "38", "40", "42", "44", "46"],
    material: "Double-faced cashmere and wool",
    materialGroup: "Wool",
    bestseller: true,
    collection: "Autumn / Winter 2026",
    description:
      "A floor-grazing coat in double-faced cashmere, cut without lining so the cloth alone holds the silhouette. The defining piece of the Autumn / Winter 2026 collection.",
    details: [
      "Double-faced cashmere and wool",
      "Unlined construction, hand-finished seams",
      "Horn buttons",
      "Two interior welt pockets",
      "Relaxed, floor-grazing cut",
      "Made in Italy",
    ],
    craftsmanship:
      "The two faces of the cloth are separated by hand and stitched together invisibly — twelve hours of work hidden inside each seam.",
    image: I.awMain,
    alt: "Model wearing the Solenne Coat beneath a stone archway",
  },
  {
    id: "aria-dress",
    line: "Ready-to-Wear",
    name: "The Aria Silk Dress",
    category: "ready-to-wear",
    gender: "women",
    priceINR: 158000,
    colors: [{ name: "Ivory Champagne", hex: "#EDE3CE" }],
    sizes: ["36", "38", "40", "42", "44"],
    material: "Silk charmeuse, cut on the bias",
    materialGroup: "Silk",
    isNew: true,
    collection: "Evening Collection",
    description:
      "Cut on the bias from a single length of silk charmeuse, the Aria moves as the wearer moves — a study in weightlessness and restraint.",
    details: [
      "100% silk charmeuse",
      "Bias-cut construction",
      "Hand-rolled hem",
      "Concealed side closure",
      "Falls to mid-calf",
      "Made in Italy",
    ],
    craftsmanship:
      "Bias-cut silk cannot be hurried; the cloth is rested for twenty-four hours before the final hem is rolled by hand.",
    image: I.her,
    alt: "The Aria Silk Dress in motion on a European stone street",
  },
  {
    id: "meridian-suit",
    line: "Ready-to-Wear",
    name: "The Meridian Suit",
    category: "ready-to-wear",
    gender: "men",
    priceINR: 285000,
    colors: [
      { name: "Espresso", hex: "#3B2C22" },
      { name: "Charcoal", hex: "#2E2C29" },
    ],
    sizes: ["46", "48", "50", "52", "54"],
    material: "Wool and silk twill",
    materialGroup: "Wool",
    collection: "Autumn / Winter 2026",
    description:
      "Modern tailoring in its quietest form. A soft-shouldered jacket and tapered trouser in espresso wool-silk twill, half-canvassed and finished by hand.",
    details: [
      "Wool and silk twill",
      "Half-canvassed, soft shoulder",
      "Hand-padded lapel",
      "Side-adjuster trouser, extended waistband",
      "Horn buttons",
      "Made in Italy",
    ],
    craftsmanship:
      "The lapel is padded with 1,400 hand stitches that give the chest its roll — invisible from outside, essential to the eye.",
    image: I.him,
    alt: "The Meridian Suit in espresso wool-silk against brutalist concrete",
  },
  {
    id: "linea-knit",
    line: "Ready-to-Wear",
    name: "The Linea Cashmere Knit",
    category: "ready-to-wear",
    gender: "unisex",
    priceINR: 88000,
    colors: [
      { name: "Oatmeal", hex: "#CFC3AC" },
      { name: "Stone Grey", hex: "#9A948A" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Ribbed Mongolian cashmere",
    materialGroup: "Cashmere",
    bestseller: true,
    collection: "Icon Collection",
    description:
      "A ribbed cashmere knit in oatmeal, knitted whole and finished by hand. The piece the House is known for — bought once, worn for a decade.",
    details: [
      "Grade-A Mongolian cashmere",
      "Fully-fashioned knitting",
      "Hand-linked seams",
      "Ribbed collar, cuff and hem",
      "Relaxed fit",
      "Made in Scotland",
    ],
    craftsmanship:
      "Each knit is washed in spring water and rested flat for a day, so the rib settles into its permanent, unhurried rhythm.",
    image: I.awSide1,
    alt: "Hands adjusting the collar of the Linea Cashmere Knit in oatmeal",
  },
  {
    id: "corso-loafer",
    line: "Footwear",
    name: "The Corso Loafer",
    category: "shoes",
    gender: "men",
    priceINR: 72000,
    colors: [
      { name: "Espresso", hex: "#3B2C22" },
      { name: "Obsidian", hex: "#141311" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    material: "Polished calfskin leather",
    materialGroup: "Leather",
    collection: "Autumn / Winter 2026",
    description:
      "A loafer of severe simplicity — polished calfskin over a hand-lasted form, worn best with everything.",
    details: [
      "Polished calfskin upper",
      "Blake-stitched leather sole",
      "Hand-lasted construction",
      "Vachetta leather lining",
      "Made in Italy",
    ],
    craftsmanship:
      "The upper is lasted by hand over a wooden form carved for the House, then rested for three days before soling.",
    image: I.him,
    imagePos: "50% 88%",
    alt: "The Corso Loafer — campaign study in espresso tailoring",
  },
  {
    id: "viale-boot",
    line: "Footwear",
    name: "The Viale Ankle Boot",
    category: "shoes",
    gender: "women",
    priceINR: 96000,
    colors: [{ name: "Obsidian", hex: "#141311" }],
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    material: "Brushed calfskin leather",
    materialGroup: "Leather",
    isNew: true,
    collection: "Autumn / Winter 2026",
    description:
      "A precise ankle boot in brushed calfskin with a sculpted 55 mm heel — proportion drawn from the House's evening silhouettes.",
    details: [
      "Brushed calfskin upper",
      "Sculpted 55 mm heel",
      "Leather sole with rubber inset",
      "Inside zip closure",
      "Made in Italy",
    ],
    craftsmanship:
      "The heel is carved from a single block of beech and wrapped in leather — a method reserved for the House's finest footwear.",
    image: I.awMain,
    imagePos: "50% 90%",
    alt: "The Viale Ankle Boot — campaign study beneath the stone archway",
  },
  {
    id: "varsa-carre",
    line: "Accessories",
    name: "The Varsa Silk Carré",
    category: "accessories",
    gender: "women",
    priceINR: 38000,
    colors: [
      { name: "Champagne", hex: "#D8C8A8" },
      { name: "Espresso", hex: "#3B2C22" },
    ],
    sizes: ["90 × 90 cm"],
    material: "Silk twill, hand-rolled edges",
    materialGroup: "Silk",
    isNew: true,
    collection: "Autumn / Winter 2026",
    description:
      "A square of silk twill printed with the House's original architectural motif, its edges rolled and stitched entirely by hand.",
    details: [
      "100% silk twill",
      "Original LA VARSA motif",
      "Hand-rolled edges",
      "90 × 90 cm",
      "Made in Italy",
    ],
    craftsmanship:
      "The edges are rolled by hand with a needle finer than the thread itself — an hour of work contained in each corner.",
    image: I.awSide1,
    imagePos: "40% 20%",
    hoverFlip: true,
    alt: "The Varsa Silk Carré — a study in oatmeal texture",
  },
  {
    id: "varsa-cardholder",
    line: "Accessories",
    name: "The Varsa Cardholder",
    category: "accessories",
    gender: "unisex",
    priceINR: 32000,
    colors: [
      { name: "Espresso", hex: "#3B2C22" },
      { name: "Ivory Stone", hex: "#E4DCCB" },
    ],
    sizes: ["One Size"],
    material: "Vegetable-tanned calfskin",
    materialGroup: "Leather",
    bestseller: true,
    collection: "Icon Collection",
    description:
      "Six cards, folded into a single piece of vegetable-tanned calfskin. Cut, edge-painted and stamped by one artisan.",
    details: [
      "Vegetable-tanned calfskin",
      "Six card slots, central pocket",
      "Hand-painted edges",
      "Debossed LA VARSA mark",
      "Made in Italy",
    ],
    craftsmanship:
      "The edges receive five coats of natural pigment, each cured and polished — the quiet signature of the House's leatherwork.",
    image: I.bag3,
    imagePos: "50% 78%",
    alt: "The Varsa Cardholder — detail of the Aurelia leather",
  },
];

export const CURRENCY_CODES = ["INR", "EUR", "USD", "GBP"] as const;
export type Currency = (typeof CURRENCY_CODES)[number];

export const CURRENCY_RATES: Record<Currency, number> = {
  INR: 1,
  EUR: 1 / 90,
  USD: 1 / 83,
  GBP: 1 / 105,
};

export function formatPrice(priceINR: number, currency: Currency): string {
  const value = priceINR * CURRENCY_RATES[currency];
  const locale =
    currency === "INR" ? "en-IN" : currency === "EUR" ? "de-DE" : currency === "GBP" ? "en-GB" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export const CATEGORY_LABEL: Record<Category, string> = {
  "ready-to-wear": "Ready-to-Wear",
  bags: "Bags",
  shoes: "Shoes",
  accessories: "Accessories",
};

/* ---------- Journal ---------- */

export interface JournalArticle {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imagePos?: string;
  date: string;
  readTime: string;
  body: string[];
}

export const JOURNAL: JournalArticle[] = [
  {
    slug: "the-language-of-luxury",
    category: "Essay",
    title: "The Language of Luxury",
    excerpt:
      "True luxury does not raise its voice. On silence, proportion, and the things a garment can say without speaking.",
    image: I.her,
    date: "January 2026",
    readTime: "7 min",
    body: [
      "There is a moment, just before a garment is finished, when it stops being material and becomes language. The seam is no longer a seam; it is a sentence. The weight of the cloth against the shoulder is no longer weight — it is tone.",
      "LA VARSA was founded on a conviction that has grown unfashionable and then fashionable again: that luxury is not ornament, but restraint. The most expensive thing a house can make is the decision to remove — one button, one seam, one gesture — until only the essential remains.",
      "We speak often in the atelier of the pause. A great coat, like a great sentence, contains pauses: the space between collar and neck, the breath of fabric at the wrist. It is in these pauses that the wearer enters the garment and makes it hers.",
      "Nothing about this is quiet by accident. Restraint is the most disciplined form of expression there is, and it demands more of the maker than spectacle ever will. What it asks of the wearer is simpler: attention.",
    ],
  },
  {
    slug: "behind-the-craft",
    category: "Atelier",
    title: "Behind the Craft",
    excerpt:
      "Forty days of tanning, twelve hours of hidden stitching, two days for a single miniature. Inside the slowness of the LA VARSA atelier.",
    image: I.craft,
    date: "February 2026",
    readTime: "9 min",
    body: [
      "In our atelier outside Florence, time is measured differently. Hides rest in chestnut and mimosa baths for forty days. A lapel receives 1,400 stitches no client will ever see. The Varsa Mini is assembled by one pair of hands, start to finish, across two unhurried days.",
      "We are sometimes asked why the House does not produce more. The answer is that we produce exactly as much as the craft allows, and not one piece beyond it. Speed is the one material we refuse to work with.",
      "Every artisan who joins the atelier trains for three years before signing a piece. The signature is small — a single stitch, hidden, known only to the maker. It is not for the client. It is for the object itself.",
      "Longevity is the quiet ambition behind all of it. A LA VARSA piece is not made for the season it is born into; it is made for the decade after, and the one after that. We consider it a compliment when a client returns for repair, not replacement.",
    ],
  },
  {
    slug: "the-new-era-of-elegance",
    category: "Culture",
    title: "The New Era of Elegance",
    excerpt:
      "Between Delhi and Milan, a new idea of elegance is taking shape — one that borrows from both and belongs to neither.",
    image: I.awSide2,
    date: "March 2026",
    readTime: "6 min",
    body: [
      "Elegance has always travelled. It moved from the courts of Rajasthan to the ateliers of Paris, from the wool houses of Scotland to the silk mills of Como. What is new is not the movement but the stillness with which it now arrives.",
      "LA VARSA was born between two cities — Delhi and Milan — and the House has never tried to choose between them. The precision is European; the sense of occasion, the patience, the instinct for ceremony is Indian. Neither is a costume. Both are native.",
      "The new elegance is not loud. It does not need to be recognised at thirty metres. It is designed for the second glance — the moment someone notices not what you are wearing, but how it holds itself.",
      "This is what we mean when we speak of modern grandeur: not more, but more considered. A house, like a person, is defined less by what it displays than by what it refuses to.",
    ],
  },
];

/* ---------- House timeline ---------- */

export interface Chapter {
  era: string;
  year: string;
  title: string;
  text: string;
}

export const CHAPTERS: Chapter[] = [
  {
    era: "I",
    year: "2016",
    title: "The Beginning",
    text: "Founded between Delhi and Milan, LA VARSA begins with a single conviction: modern luxury should be quiet, considered and made to endure.",
  },
  {
    era: "II",
    year: "2018",
    title: "The First Collection",
    text: "Twelve pieces, shown in a stone courtyard at dusk. No set, no soundtrack — only cloth, light and architecture. The collection sells out in eleven days.",
  },
  {
    era: "III",
    year: "2021",
    title: "The Signature",
    text: "The Varsa N° 01 top handle is introduced — one line, one clasp, no visible stitching. It becomes the object the House is known for.",
  },
  {
    era: "IV",
    year: "2024",
    title: "The Evolution",
    text: "Maisons open in New Delhi, Paris and Milan. The House remains deliberately small: one atelier, one collection at a time, no diffusion lines.",
  },
  {
    era: "V",
    year: "2026",
    title: "The Future",
    text: "A decade in, the House turns toward what lasts: repair ateliers in every maison, a lifetime guarantee on leather goods, and the next chapter of the Icon Collection.",
  },
];

/* ---------- Stores ---------- */

export interface Store {
  city: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
}

export const STORES: Store[] = [
  { city: "New Delhi", name: "The Lodhi Maison", address: "Lodhi Crescent, New Delhi 110003", hours: "10.00 — 20.00, daily", phone: "+91 11 4000 2016" },
  { city: "Mumbai", name: "Colaba House", address: "Arthur Bunder Road, Colaba, Mumbai 400005", hours: "10.30 — 20.30, daily", phone: "+91 22 6000 2016" },
  { city: "Paris", name: "Place Vendôme Maison", address: "16 Place Vendôme, 75001 Paris", hours: "10.00 — 19.00, Mon — Sat", phone: "+33 1 40 20 20 16" },
  { city: "Milan", name: "Via della Spiga Maison", address: "Via della Spiga 9, 20121 Milano", hours: "10.00 — 19.30, Mon — Sat", phone: "+39 02 7600 2016" },
  { city: "London", name: "Mayfair House", address: "Clifford Street, Mayfair, London W1S", hours: "10.00 — 19.00, Mon — Sat", phone: "+44 20 7600 2016" },
  { city: "Dubai", name: "DIFC Atelier", address: "Gate Village 7, DIFC, Dubai", hours: "10.00 — 22.00, daily", phone: "+971 4 600 2016" },
];

export const COLLECTIONS = [
  { id: "aw-2026", name: "Autumn / Winter 2026", note: "Nocturne" },
  { id: "ss-2026", name: "Spring / Summer 2026", note: "Solstice" },
  { id: "icon", name: "Icon Collection", note: "The enduring pieces" },
  { id: "evening", name: "Evening Collection", note: "After dark" },
];

export const CRAFT_VALUES = [
  { n: "01", title: "Premium Materials", text: "Grade-A cashmere, vegetable-tanned calfskin, silk charmeuse — chosen in person, season after season, from makers we have known for a decade." },
  { n: "02", title: "Skilled Artisans", text: "One atelier, forty-two artisans, three years of training before a single piece is signed. The hands are the House." },
  { n: "03", title: "Hand Finishing", text: "Edge painting, hand-rolling, saddle stitching — the hours no one sees are the ones the object remembers." },
  { n: "04", title: "Precision", text: "Tolerances measured in tenths of a millimetre. At this level, precision is a form of respect." },
  { n: "05", title: "Longevity", text: "Every leather good carries a lifetime guarantee and every maison holds a repair atelier. We make things to be kept." },
  { n: "06", title: "Responsibility", text: "Certified tanneries, traceable fibres, no seasonal disposal. Restraint applies to the planet as much as to the silhouette." },
];
