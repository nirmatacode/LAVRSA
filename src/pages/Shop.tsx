import React, { useEffect, useMemo, useState } from "react";
import { CATEGORY_LABEL, Category, PRODUCTS, Product } from "../data/catalog";
import { useShop } from "../lib/store";
import { Lines, Reveal, SectionLabel } from "../components/ui";
import { IconChevron } from "../components/icons";
import ProductCard from "../components/ProductCard";

type Sort = "featured" | "new" | "price-asc" | "price-desc";

const HEADINGS: Record<string, { title: string; sub: string }> = {
  all: { title: "The Collection", sub: "Every object, in one place." },
  women: { title: "Women", sub: "A study in silhouette, texture and movement." },
  men: { title: "Men", sub: "Modern tailoring. Quiet confidence." },
  bags: { title: "Bags", sub: "Objects of enduring elegance." },
  shoes: { title: "Shoes", sub: "Proportion, drawn from the evening silhouettes." },
  accessories: { title: "Accessories", sub: "The final, quiet gesture." },
  "ready-to-wear": { title: "Ready-to-Wear", sub: "Cloth, cut with intention." },
  "new-arrivals": { title: "New Arrivals", sub: "The latest expressions of the House." },
  collections: { title: "Collections", sub: "One collection at a time — never more." },
};

export default function Shop() {
  const { route, price } = useShop();
  const slug = route.parts[1] || "all";

  const [category, setCategory] = useState<Category | "all">("all");
  const [gender, setGender] = useState<"all" | "women" | "men">("all");
  const [collection, setCollection] = useState<string>("all");
  const [colors, setColors] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [priceBand, setPriceBand] = useState("all");
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyBest, setOnlyBest] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");
  const [refineOpen, setRefineOpen] = useState(false);

  /* Sync filters with route */
  useEffect(() => {
    setCategory("all");
    setGender("all");
    setCollection("all");
    setOnlyNew(false);
    setOnlyBest(false);
    const q = route.query;
    if (slug === "women") setGender("women");
    else if (slug === "men") setGender("men");
    else if (["bags", "shoes", "accessories", "ready-to-wear"].includes(slug)) setCategory(slug as Category);
    else if (slug === "new-arrivals") setOnlyNew(true);
    if (q.get("cat")) setCategory(q.get("cat") as Category);
    if (q.get("gender")) setGender(q.get("gender") as "women" | "men");
    if (q.get("col")) setCollection(q.get("col")!);
    if (q.get("mat")) setMaterials([q.get("mat")!]);
    if (q.get("filter") === "new") setOnlyNew(true);
    if (q.get("filter") === "best") setOnlyBest(true);
  }, [slug, route.query]);

  const allColors = useMemo(() => {
    const set = new Map<string, string>();
    PRODUCTS.forEach((p) => p.colors.forEach((c) => set.set(c.name, c.hex)));
    return Array.from(set.entries());
  }, []);
  const allMaterials = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.materialGroup))), []);
  const allSizes = useMemo(() => {
    const order = ["One Size", "90 × 90 cm", "XS", "S", "M", "L", "XL", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "48", "50", "52", "54"];
    const present = new Set(PRODUCTS.flatMap((p) => p.sizes));
    return order.filter((s) => present.has(s));
  }, []);

  const toggle = (list: string[], set: (v: string[]) => void, v: string) =>
    set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const filtered = useMemo(() => {
    let list: Product[] = PRODUCTS.slice();
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (gender !== "all") list = list.filter((p) => p.gender === gender || p.gender === "unisex");
    if (collection !== "all") {
      list = list.filter((p) => {
        if (collection === "aw-2026") return p.collection.includes("Autumn");
        if (collection === "ss-2026") return p.collection.includes("Spring");
        if (collection === "icon") return p.collection.includes("Icon");
        if (collection === "evening") return p.collection.includes("Evening");
        return true;
      });
    }
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
    if (materials.length) list = list.filter((p) => materials.includes(p.materialGroup));
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s)));
    if (priceBand !== "all") {
      const [min, max] = priceBand.split("-").map(Number);
      list = list.filter((p) => p.priceINR >= min && (max ? p.priceINR <= max : true));
    }
    if (onlyNew) list = list.filter((p) => p.isNew);
    if (onlyBest) list = list.filter((p) => p.bestseller);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.priceINR - b.priceINR);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceINR - a.priceINR);
        break;
      case "new":
        list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      default:
        list.sort((a, b) => Number(b.bestseller ?? false) - Number(a.bestseller ?? false));
    }
    return list;
  }, [category, gender, collection, colors, materials, sizes, priceBand, onlyNew, onlyBest, sort]);

  const activeCount =
    colors.length + materials.length + sizes.length + (priceBand !== "all" ? 1 : 0) + (onlyNew ? 1 : 0) + (onlyBest ? 1 : 0);

  const clearAll = () => {
    setColors([]);
    setMaterials([]);
    setSizes([]);
    setPriceBand("all");
    setOnlyNew(false);
    setOnlyBest(false);
  };

  const heading = HEADINGS[slug] || HEADINGS.all;
  const priceBands = [
    { id: "all", label: "All Prices" },
    { id: "0-50000", label: `Under ${price(50000)}` },
    { id: "50000-100000", label: `${price(50000)} — ${price(100000)}` },
    { id: "100000-200000", label: `${price(100000)} — ${price(200000)}` },
    { id: "200000-0", label: `${price(200000)} +` },
  ];

  const cats: (Category | "all")[] = ["all", "ready-to-wear", "bags", "shoes", "accessories"];

  return (
    <div className="bg-ivory px-6 pb-28 pt-32 text-obsidian md:px-14 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        {/* Masthead */}
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-espresso/15 pb-10">
          <div>
            <SectionLabel className="text-espresso/60">LA VARSA — {heading.sub}</SectionLabel>
            <h1 className="display mt-5 text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[1.02]">
              <Lines lines={[heading.title]} />
            </h1>
          </div>
          <Reveal className="pb-2">
            <p className="micro text-espresso/55">{filtered.length} {filtered.length === 1 ? "Piece" : "Pieces"}</p>
          </Reveal>
        </div>

        {/* Toolbar */}
        <div className="sticky top-16 z-30 -mx-6 mt-0 flex flex-wrap items-center gap-3 border-b border-espresso/10 bg-ivory/95 px-6 py-4 backdrop-blur-sm md:-mx-14 md:px-14">
          <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`micro whitespace-nowrap border px-4 py-2.5 transition-all duration-300 ${
                  category === c ? "border-obsidian bg-obsidian text-ivory" : "border-espresso/20 hover:border-obsidian"
                }`}
              >
                {c === "all" ? "All" : CATEGORY_LABEL[c]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => { setOnlyNew(!onlyNew); setOnlyBest(false); }}
              aria-pressed={onlyNew}
              className={`micro whitespace-nowrap border px-4 py-2.5 transition-all duration-300 ${
                onlyNew ? "border-champagne bg-champagne text-obsidian" : "border-espresso/20 hover:border-obsidian"
              }`}
            >
              New Arrivals
            </button>
            <button
              type="button"
              onClick={() => { setOnlyBest(!onlyBest); setOnlyNew(false); }}
              aria-pressed={onlyBest}
              className={`micro whitespace-nowrap border px-4 py-2.5 transition-all duration-300 ${
                onlyBest ? "border-champagne bg-champagne text-obsidian" : "border-espresso/20 hover:border-obsidian"
              }`}
            >
              Best Sellers
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setRefineOpen(!refineOpen)}
              aria-expanded={refineOpen}
              className={`micro flex items-center gap-2 border px-4 py-2.5 transition-all duration-300 ${
                refineOpen || activeCount ? "border-obsidian bg-obsidian text-ivory" : "border-espresso/20 hover:border-obsidian"
              }`}
            >
              Refine {activeCount > 0 && `(${activeCount})`}
              <IconChevron size={13} className={`transition-transform duration-500 ${refineOpen ? "rotate-180" : ""}`} />
            </button>
            <label htmlFor="sort" className="sr-only">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field !w-auto !border-espresso/25 !py-2.5 !text-[0.65rem] !text-obsidian focus:!border-obsidian">
              <option value="featured">Sort — Featured</option>
              <option value="new">Sort — Newest</option>
              <option value="price-asc">Price — Low to High</option>
              <option value="price-desc">Price — High to Low</option>
            </select>
          </div>
        </div>

        {/* Refine panel */}
        <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${refineOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 gap-x-12 gap-y-10 border-b border-espresso/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h2 className="micro text-espresso/55">Colour</h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {allColors.map(([name, hex]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => toggle(colors, setColors, name)}
                      aria-pressed={colors.includes(name)}
                      title={name}
                      aria-label={`Colour ${name}`}
                      className={`h-7 w-7 rounded-full border transition-all duration-300 ${
                        colors.includes(name) ? "border-obsidian ring-1 ring-obsidian ring-offset-2 ring-offset-ivory" : "border-espresso/25 hover:border-espresso/60"
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="micro text-espresso/55">Material</h2>
                <div className="mt-4 space-y-2.5">
                  {allMaterials.map((m) => (
                    <label key={m} className="flex cursor-pointer items-center gap-3">
                      <input type="checkbox" checked={materials.includes(m)} onChange={() => toggle(materials, setMaterials, m)} className="peer sr-only" />
                      <span className={`flex h-4 w-4 items-center justify-center border transition-all duration-300 peer-checked:border-obsidian peer-checked:bg-obsidian peer-focus-visible:outline peer-focus-visible:outline-champagne ${materials.includes(m) ? "border-obsidian bg-obsidian" : "border-espresso/30"}`}>
                        {materials.includes(m) && <span className="h-1.5 w-1.5 bg-champagne" />}
                      </span>
                      <span className="text-sm tracking-[0.14em] uppercase">{m}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="micro text-espresso/55">Size</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {allSizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggle(sizes, setSizes, s)}
                      aria-pressed={sizes.includes(s)}
                      className={`micro border px-3 py-1.5 transition-all duration-300 ${sizes.includes(s) ? "border-obsidian bg-obsidian text-ivory" : "border-espresso/20 hover:border-obsidian"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="micro text-espresso/55">Price</h2>
                <div className="mt-4 space-y-2.5">
                  {priceBands.map((b) => (
                    <label key={b.id} className="flex cursor-pointer items-center gap-3">
                      <input type="radio" name="priceband" checked={priceBand === b.id} onChange={() => setPriceBand(b.id)} className="sr-only" />
                      <span className={`h-4 w-4 rounded-full border transition-all duration-300 ${priceBand === b.id ? "border-obsidian" : "border-espresso/30"}`}>
                        {priceBand === b.id && <span className="mx-auto mt-[3px] block h-2 w-2 rounded-full bg-obsidian" />}
                      </span>
                      <span className="text-sm tracking-[0.14em] uppercase">{b.label}</span>
                    </label>
                  ))}
                </div>
                {activeCount > 0 && (
                  <button type="button" onClick={clearAll} className="link-lux micro mt-6 text-espresso/70">
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="serif-it text-3xl text-espresso/70">Nothing matches — yet.</p>
            <p className="mt-4 text-sm tracking-[0.16em] text-espresso/55 uppercase">Refine fewer criteria, or explore the full collection.</p>
            <button type="button" onClick={clearAll} className="link-lux micro mt-8">
              Clear Refinements
            </button>
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 70}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}

        {/* Editorial foot */}
        <Reveal className="mt-24 border-t border-espresso/15 pt-10 text-center">
          <p className="serif-it text-xl text-espresso/70 md:text-2xl">
            Every piece is made to order in our atelier and delivered worldwide, complimentary.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
