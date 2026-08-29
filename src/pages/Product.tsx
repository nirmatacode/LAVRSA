import React, { useEffect, useMemo, useRef, useState } from "react";
import { CATEGORY_LABEL, PRODUCTS } from "../data/catalog";
import { useShop } from "../lib/store";
import { ArrowLink, Lines, Reveal } from "../components/ui";
import { IconChevron, IconHeart, IconMinus, IconPlus, IconTrash } from "../components/icons";
import ProductCard from "../components/ProductCard";

const VIEWS = ["Front", "Reverse", "Detail", "In Situ"] as const;

export default function ProductPage() {
  const { route, go, price, addToBag, wishlist, toggleWishlist, recent, pushRecent } = useShop();
  const id = route.parts[1];
  const product = PRODUCTS.find((p) => p.id === id);

  const [colorIdx, setColorIdx] = useState(0);
  const [sizeIdx, setSizeIdx] = useState<number | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [view, setView] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [open, setOpen] = useState(0);
  const [qty, setQtyLocal] = useState(1);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      pushRecent(product.id);
      setColorIdx(0);
      setSizeIdx(product.sizes.length === 1 ? 0 : null);
      setView(0);
      setZoomed(false);
      setQtyLocal(1);
      setSizeError(false);
      setOpen(0);
      window.scrollTo(0, 0);
    }
  }, [product, pushRecent]);

  const related = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)).slice(0, 4);
  }, [product]);

  const recentProducts = useMemo(
    () => recent.map((r) => PRODUCTS.find((p) => p.id === r)).filter((p): p is NonNullable<typeof p> => !!p && p.id !== id).slice(0, 4),
    [recent, id]
  );

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center text-obsidian">
        <p className="serif-it text-3xl">This piece has left the atelier.</p>
        <ArrowLink href="#/shop" className="mt-8">Return to the Collection</ArrowLink>
      </div>
    );
  }

  const viewStyle = (i: number): React.CSSProperties => {
    const base = product.imagePos || "50% 50%";
    switch (i) {
      case 1:
        return { objectPosition: base, transform: "scaleX(-1)" };
      case 2:
        return { objectPosition: "50% 32%", transform: "scale(1.7)" };
      case 3:
        return { objectPosition: "50% 15%", transform: "scale(1.25)" };
      default:
        return { objectPosition: base };
    }
  };

  const accordions = [
    {
      title: "The Details",
      body: (
        <ul className="space-y-2">
          {product.details.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-[9px] h-px w-4 shrink-0 bg-champagne" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      ),
    },
    { title: "Materials", body: <p>{product.material}. Selected in person by the House, season after season, from makers we have known for a decade. {product.materialGroup === "Leather" ? "Leather is a natural material — subtle variation in grain is the mark of an authentic hide." : "Fibres are traceable to source and certified to the House's responsible-craftsmanship standard."}</p> },
    { title: "Craftsmanship", body: <p>{product.craftsmanship}</p> },
    { title: "Delivery", body: <p>Complimentary worldwide express delivery, three to five working days. Each order leaves the atelier in the signature matte black archive box, sealed by hand. Duties and taxes are settled by the House.</p> },
    { title: "Returns", body: <p>Returns are accepted within thirty days, in original condition, wearing tags attached. Leather goods carry a lifetime guarantee — our repair ateliers in every maison will care for your piece for as long as you keep it.</p> },
  ];

  const handleAdd = () => {
    if (sizeIdx === null) {
      setSizeError(true);
      return;
    }
    addToBag(product, product.colors[colorIdx].name, product.sizes[sizeIdx], qty);
  };

  return (
    <div className="bg-ivory pb-24 pt-28 text-obsidian md:pt-36">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-[1600px] px-6 md:px-14">
        <ol className="micro flex flex-wrap items-center gap-3 text-espresso/50">
          <li><a href="#/" className="transition-colors hover:text-obsidian">Home</a></li>
          <li aria-hidden="true">/</li>
          <li><a href="#/shop" className="transition-colors hover:text-obsidian">The Collection</a></li>
          <li aria-hidden="true">/</li>
          <li><a href={`#/shop/${product.category}`} className="transition-colors hover:text-obsidian">{CATEGORY_LABEL[product.category]}</a></li>
          <li aria-hidden="true">/</li>
          <li className="text-obsidian">{product.name}</li>
        </ol>
      </nav>

      <div className="mx-auto mt-10 grid max-w-[1600px] grid-cols-1 gap-14 px-6 md:px-14 lg:grid-cols-2 lg:gap-20">
        {/* ---------- Gallery ---------- */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div
            ref={imgWrapRef}
            className="relative aspect-[3/4] overflow-hidden bg-parchment"
            data-cursor={zoomed ? "" : "View"}
            onMouseMove={(e) => {
              const r = imgWrapRef.current!.getBoundingClientRect();
              setOrigin(`${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
            }}
            onClick={() => setZoomed(!zoomed)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setZoomed(!zoomed); } }}
            aria-label={`${product.name} — ${VIEWS[view]} view. Activate to zoom.`}
          >
            <div
              className={`h-full w-full transition-transform duration-[1200ms] ease-out ${zoomed ? "scale-[1.75]" : "scale-100"}`}
              style={{ transformOrigin: origin }}
            >
              <img
                src={product.image}
                alt={`${product.alt} — ${VIEWS[view]} view`}
                className="h-full w-full object-cover"
                style={viewStyle(view)}
              />
            </div>
            {product.isNew && <span className="micro absolute left-5 top-5 bg-obsidian/85 px-3 py-1.5 text-champagne">New</span>}
            <span className="micro absolute bottom-4 right-5 text-espresso/60">{VIEWS[view]}</span>
          </div>
          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-4 gap-3" role="tablist" aria-label="Product views">
            {VIEWS.map((v, i) => (
              <button
                key={v}
                type="button"
                role="tab"
                aria-selected={view === i}
                aria-label={`${v} view`}
                onClick={() => { setView(i); setZoomed(false); }}
                className={`group relative aspect-[3/4] overflow-hidden border transition-all duration-300 ${view === i ? "border-obsidian" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={product.image} alt="" className="h-full w-full object-cover" style={viewStyle(i)} loading="lazy" />
                <span className="micro absolute inset-x-0 bottom-0 bg-obsidian/70 py-1 text-center text-[0.55rem] text-ivory">{v}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------- Information ---------- */}
        <div className="flex flex-col">
          <p className="micro text-espresso/55">{product.collection} — {product.line}</p>
          <h1 className="display mt-4 text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05]">
            <Lines lines={[product.name]} />
          </h1>
          <p className="mt-5 text-lg tracking-[0.12em] text-espresso/80">{price(product.priceINR)}</p>
          <p className="micro mt-2 !tracking-[0.2em] text-espresso/45">Duties &amp; complimentary delivery included</p>

          <p className="serif-it mt-8 text-lg leading-relaxed text-espresso/80 md:text-xl">{product.description}</p>

          {/* Colour */}
          <div className="mt-9">
            <p className="micro text-espresso/55">Colour — {product.colors[colorIdx].name}</p>
            <div className="mt-3.5 flex gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorIdx(i)}
                  aria-pressed={colorIdx === i}
                  aria-label={`Colour ${c.name}`}
                  className={`h-8 w-8 rounded-full border transition-all duration-300 ${colorIdx === i ? "border-obsidian ring-1 ring-obsidian ring-offset-2 ring-offset-ivory" : "border-espresso/25 hover:border-espresso/60"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-7">
            <div className="flex items-baseline justify-between">
              <p className="micro text-espresso/55">Select Size {sizeIdx !== null && `— ${product.sizes[sizeIdx]}`}</p>
              <button type="button" onClick={() => go("/stores#services")} className="link-lux micro !text-[0.6rem] text-espresso/55">Size Guide</button>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {product.sizes.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setSizeIdx(i); setSizeError(false); }}
                  aria-pressed={sizeIdx === i}
                  className={`micro min-w-[52px] border px-4 py-3 transition-all duration-300 ${
                    sizeIdx === i ? "border-obsidian bg-obsidian text-ivory" : sizeError ? "border-espresso/60" : "border-espresso/25 hover:border-obsidian"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="micro mt-3 !tracking-[0.2em] text-espresso/80">Kindly select a size first.</p>}
          </div>

          {/* Quantity + actions */}
          <div className="mt-9 flex items-stretch gap-3">
            <div className="flex items-center border border-espresso/25">
              <button type="button" onClick={() => setQtyLocal(Math.max(1, qty - 1))} aria-label="Decrease quantity" className="px-4 py-4 transition-colors hover:bg-espresso/5">
                <IconMinus size={13} />
              </button>
              <span className="w-8 text-center text-sm" aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQtyLocal(Math.min(9, qty + 1))} aria-label="Increase quantity" className="px-4 py-4 transition-colors hover:bg-espresso/5">
                <IconPlus size={13} />
              </button>
            </div>
            <button type="button" onClick={handleAdd} className="btn-solid micro flex-1 bg-obsidian py-4 text-ivory hover:text-obsidian">
              Add to Bag — {price(product.priceINR * qty)}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between border-b border-espresso/15 pb-6">
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={wishlist.includes(product.id)}
              className={`flex items-center gap-2.5 transition-colors duration-300 ${wishlist.includes(product.id) ? "text-obsidian" : "text-espresso/55 hover:text-obsidian"}`}
            >
              <IconHeart size={17} filled={wishlist.includes(product.id)} />
              <span className="micro">Wishlist</span>
            </button>
            <button type="button" onClick={() => go("/stores#appointment")} className="link-lux micro text-champagne">
              Book a Private Appointment
            </button>
          </div>

          {/* Accordions */}
          <div className="mt-2">
            {accordions.map((a, i) => (
              <div key={a.title} className="border-b border-espresso/15">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                  className="group flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="micro group-hover:text-espresso/70">{a.title}</span>
                  <IconChevron size={14} className={`transition-transform duration-500 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] ${open === i ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="max-w-lg text-sm leading-relaxed text-espresso/70">{a.body}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="micro text-espresso/45">
              Reference — {product.id.toUpperCase()} · {product.materialGroup} · Made in Italy
            </p>
          </Reveal>
        </div>
      </div>

      {/* ---------- Recommendations ---------- */}
      <section className="mx-auto mt-28 max-w-[1600px] px-6 md:px-14" aria-label="You may also like">
        <div className="flex items-end justify-between gap-6 border-b border-espresso/15 pb-6">
          <h2 className="display text-[clamp(1.6rem,3.5vw,2.6rem)] uppercase">
            <Lines lines={["You May Also Like"]} />
          </h2>
          <ArrowLink href={`#/shop/${product.category}`} className="hidden md:inline-flex">All {CATEGORY_LABEL[product.category]}</ArrowLink>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {recentProducts.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1600px] px-6 md:px-14" aria-label="Recently viewed">
          <h2 className="micro border-b border-espresso/15 pb-6 text-espresso/55">Recently Viewed</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {recentProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ---------- Sticky mobile bar ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-champagne/20 bg-obsidian/95 px-5 py-3.5 backdrop-blur-md lg:hidden" role="region" aria-label="Add to bag">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="display truncate text-lg text-ivory">{product.name}</p>
            <p className="text-xs tracking-[0.14em] text-champagne">{price(product.priceINR * qty)}</p>
          </div>
          <button type="button" onClick={handleAdd} className="btn-solid micro shrink-0 bg-champagne px-7 py-3.5 text-obsidian hover:text-obsidian">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
