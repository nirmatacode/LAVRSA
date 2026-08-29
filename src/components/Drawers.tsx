import React, { useEffect, useMemo, useRef, useState } from "react";
import { CURRENCY_CODES, PRODUCTS, Product } from "../data/catalog";
import { prefersReducedMotion, useShop } from "../lib/store";
import { Emblem, Lines } from "./ui";
import { IconArrow, IconCheck, IconClose, IconHeart, IconMinus, IconPlus, IconTrash } from "./icons";

/* ================= Preloader ================= */

export function Preloader() {
  const { setReady } = useShop();
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const fast = prefersReducedMotion();
    const t1 = window.setTimeout(() => setLeaving(true), fast ? 400 : 1900);
    const t2 = window.setTimeout(() => {
      setGone(true);
      setReady(true);
    }, fast ? 600 : 2850);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [setReady]);

  if (gone) return null;
  const letters = "LA VARSA".split("");

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian transition-transform duration-[950ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden="true"
    >
      <Emblem size={44} className="mb-8 text-champagne/80 rise-in" />
      <div className="display flex overflow-hidden text-[clamp(2rem,6vw,3.4rem)] tracking-[0.3em] text-ivory">
        {letters.map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              className="inline-block rise-in"
              style={{ animationDelay: `${300 + i * 70}ms`, animationDuration: "1s" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          </span>
        ))}
      </div>
      <div className="mt-9 h-px w-44 origin-left overflow-hidden bg-champagne/20">
        <div className="h-full w-full origin-left bg-champagne" style={{ animation: "draw-line 1.7s cubic-bezier(0.19,1,0.22,1) 0.4s both" }} />
      </div>
      <p className="micro mt-6 text-taupe rise-in" style={{ animationDelay: "900ms" }}>
        The Art of Timeless Elegance
      </p>
    </div>
  );
}

/* ================= Search overlay ================= */

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, go } = useShop();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setQ("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 350);
      return () => window.clearTimeout(t);
    }
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return PRODUCTS.filter((p) =>
      [p.name, p.line, p.category, p.collection, p.material, p.colors.map((c) => c.name).join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(term)
    ).slice(0, 6);
  }, [q]);

  const suggestions = [
    { label: "New Arrivals", to: "/shop/new-arrivals" },
    { label: "Handbags", to: "/shop/bags" },
    { label: "Shoes", to: "/shop/shoes" },
    { label: "Women", to: "/shop/women" },
    { label: "Men", to: "/shop/men" },
    { label: "Collections", to: "/shop/collections" },
  ];

  return (
    <div
      className={`fixed inset-0 z-[70] flex flex-col bg-obsidian/[0.985] transition-all duration-600 ${
        searchOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      aria-hidden={!searchOpen}
    >
      <div className="flex items-center justify-end px-6 py-5 md:px-12">
        <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="flex items-center gap-3 text-ivory transition-colors hover:text-champagne">
          <span className="micro">Close</span>
          <IconClose size={20} />
        </button>
      </div>

      <div className={`mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 transition-all delay-150 duration-700 ${searchOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
        <Lines
          lines={["What are you", <>looking <em className="serif-it text-champagne">for?</em></>]}
          className="display text-[clamp(2.2rem,6.5vw,4.5rem)] uppercase leading-[1.02] text-ivory"
        />
        <div className="mt-10 border-b border-champagne/30 pb-4 focus-within:border-champagne">
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the maison"
            aria-label="Search products"
            className="serif-it w-full bg-transparent text-[clamp(1.4rem,3vw,2.2rem)] text-ivory placeholder:text-taupe/50 focus:outline-none"
          />
        </div>

        {results.length > 0 ? (
          <ul className="mt-8 divide-y divide-champagne/10 overflow-y-auto no-scrollbar">
            {results.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => go(`/product/${p.id}`)}
                  className="group flex w-full items-center gap-5 py-4 text-left transition-colors hover:bg-charcoal/60"
                >
                  <span className="h-16 w-12 shrink-0 overflow-hidden bg-parchment">
                    <img src={p.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" style={p.imagePos ? { objectPosition: p.imagePos } : undefined} loading="lazy" />
                  </span>
                  <span className="flex-1">
                    <span className="display block text-lg text-ivory group-hover:text-champagne">{p.name}</span>
                    <span className="micro text-taupe">{p.category} — {p.collection}</span>
                  </span>
                  <IconArrow size={16} className="text-champagne opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10">
            <p className="micro mb-5 text-taupe">Suggested searches</p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {suggestions.map((s) => (
                <button key={s.label} type="button" onClick={() => go(s.to)} className="link-lux micro text-ivory/85 transition-colors hover:text-champagne">
                  {s.label}
                </button>
              ))}
            </div>
            {q.trim() && (
              <p className="serif-it mt-12 text-xl text-taupe">Nothing found for “{q}” — perhaps explore the collections.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= Cart drawer ================= */

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, removeFromBag, cartTotalINR, price, go, currency } = useShop();

  return (
    <>
      <div
        className={`fixed inset-0 z-[78] bg-obsidian/60 backdrop-blur-[2px] transition-opacity duration-600 ${cartOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setCartOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-ivory text-obsidian transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!cartOpen}
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-7 py-5">
          <h2 className="micro">Shopping Bag {cart.length > 0 && `(${cart.length})`}</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close bag" className="transition-colors hover:text-espresso/60">
            <IconClose size={20} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-10 text-center">
            <Emblem size={38} className="text-espresso/30" />
            <p className="serif-it text-2xl text-espresso/80">Your bag awaits its first piece.</p>
            <button type="button" onClick={() => go("/shop")} className="link-lux micro mt-2">
              Explore the Collection
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-espresso/10 overflow-y-auto no-scrollbar px-7">
              {cart.map((item) => {
                const p = PRODUCTS.find((x) => x.id === item.productId);
                if (!p) return null;
                return (
                  <li key={item.key} className="flex gap-5 py-6">
                    <button type="button" onClick={() => go(`/product/${p.id}`)} className="h-28 w-21 shrink-0 overflow-hidden bg-parchment" aria-label={`View ${p.name}`}>
                      <img src={p.image} alt={p.alt} className="h-full w-full object-cover" style={p.imagePos ? { objectPosition: p.imagePos } : undefined} loading="lazy" />
                    </button>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="display text-[1.05rem] leading-tight">{p.name}</p>
                          <p className="micro mt-1.5 !tracking-[0.22em] text-espresso/55">
                            {item.color} · {item.size}
                          </p>
                        </div>
                        <button type="button" onClick={() => removeFromBag(item.key)} aria-label={`Remove ${p.name}`} className="mt-1 text-espresso/40 transition-colors hover:text-espresso">
                          <IconTrash size={16} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center border border-espresso/20">
                          <button type="button" onClick={() => setQty(item.key, item.qty - 1)} aria-label="Decrease quantity" className="px-2.5 py-1.5 transition-colors hover:bg-espresso/5">
                            <IconMinus size={12} />
                          </button>
                          <span className="w-7 text-center text-sm">{item.qty}</span>
                          <button type="button" onClick={() => setQty(item.key, item.qty + 1)} aria-label="Increase quantity" className="px-2.5 py-1.5 transition-colors hover:bg-espresso/5">
                            <IconPlus size={12} />
                          </button>
                        </div>
                        <p className="text-sm tracking-[0.08em]">{price(p.priceINR * item.qty)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-espresso/10 px-7 py-6">
              <div className="flex items-baseline justify-between">
                <span className="micro">Subtotal</span>
                <span className="display text-xl">{price(cartTotalINR)}</span>
              </div>
              <p className="micro mt-2 !tracking-[0.22em] text-espresso/45">Shipping and taxes calculated at checkout · {currency}</p>
              <button
                type="button"
                onClick={() => go("/checkout")}
                className="btn-solid micro mt-5 w-full bg-obsidian py-4 text-ivory hover:text-obsidian"
              >
                Checkout <IconArrow size={16} />
              </button>
              <button type="button" onClick={() => setCartOpen(false)} className="link-lux micro mx-auto mt-5 block text-center">
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

/* ================= Account / wishlist drawer ================= */

export function AccountDrawer() {
  const { accountOpen, setAccountOpen, wishlist, toggleWishlist, addToBag, orders, currency, setCurrency, go, toast } = useShop();
  const [email, setEmail] = useState("");

  const wishlistProducts = useMemo(() => PRODUCTS.filter((p) => wishlist.includes(p.id)), [wishlist]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[78] bg-obsidian/60 backdrop-blur-[2px] transition-opacity duration-600 ${accountOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setAccountOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-[80] flex w-full max-w-md flex-col border-r border-champagne/10 bg-charcoal text-ivory transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
          accountOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Account"
        aria-hidden={!accountOpen}
      >
        <div className="flex items-center justify-between border-b border-champagne/10 px-7 py-5">
          <h2 className="micro">Your World</h2>
          <button type="button" onClick={() => setAccountOpen(false)} aria-label="Close account" className="transition-colors hover:text-champagne">
            <IconClose size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-7 py-8">
          {/* Access */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) {
                toast("Please enter a valid email address");
                return;
              }
              setEmail("");
              toast("Invitation requested — our concierge will write to you");
            }}
            className="border-b border-champagne/10 pb-8"
          >
            <p className="display text-2xl">Private Access</p>
            <p className="mt-2 text-sm leading-relaxed text-taupe">
              Receive invitations, early access to collections and a personal client advisor.
            </p>
            <div className="mt-5 flex items-end gap-4">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email address"
                aria-label="Email address"
                className="field flex-1"
              />
              <button type="submit" className="link-lux micro pb-2 text-champagne">Request</button>
            </div>
          </form>

          {/* Wishlist */}
          <section className="border-b border-champagne/10 py-8" aria-label="Wishlist">
            <div className="flex items-center justify-between">
              <h3 className="micro">Wishlist ({wishlistProducts.length})</h3>
              <IconHeart size={15} filled={wishlistProducts.length > 0} className="text-champagne" />
            </div>
            {wishlistProducts.length === 0 ? (
              <p className="serif-it mt-4 text-lg text-taupe">Pieces you save will live here.</p>
            ) : (
              <ul className="mt-5 space-y-5">
                {wishlistProducts.map((p) => (
                  <li key={p.id} className="flex gap-4">
                    <button type="button" onClick={() => go(`/product/${p.id}`)} className="h-24 w-[72px] shrink-0 overflow-hidden bg-parchment" aria-label={`View ${p.name}`}>
                      <img src={p.image} alt={p.alt} className="h-full w-full object-cover" style={p.imagePos ? { objectPosition: p.imagePos } : undefined} loading="lazy" />
                    </button>
                    <div className="flex flex-1 flex-col">
                      <p className="display leading-tight">{p.name}</p>
                      <p className="mt-1 text-xs tracking-[0.14em] text-champagne">{useShopPrice(p.priceINR, currency)}</p>
                      <div className="mt-auto flex gap-5 pt-2">
                        <button type="button" onClick={() => addToBag(p, p.colors[0].name, p.sizes[0])} className="link-lux micro !text-[0.6rem] text-ivory/80">
                          Add to Bag
                        </button>
                        <button type="button" onClick={() => toggleWishlist(p.id)} className="micro !text-[0.6rem] text-taupe transition-colors hover:text-ivory">
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Orders */}
          <section className="border-b border-champagne/10 py-8" aria-label="Orders">
            <h3 className="micro">Your Orders ({orders.length})</h3>
            {orders.length === 0 ? (
              <p className="serif-it mt-4 text-lg text-taupe">Your first order will appear here, with its journey.</p>
            ) : (
              <ul className="mt-5 space-y-6">
                {orders.map((o) => (
                  <li key={o.id} className="border border-champagne/15 p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="micro text-champagne">{o.id}</p>
                      <p className="micro text-taupe">{o.date}</p>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {o.items.map((it, i) => (
                        <li key={i} className="flex justify-between gap-4 text-sm text-ivory/80">
                          <span>{it.name} <span className="text-taupe">× {it.qty}</span></span>
                          <span className="micro self-center text-taupe">{it.color}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center justify-between border-t border-champagne/10 pt-3">
                      <span className="flex items-center gap-2 text-xs tracking-[0.2em] text-champagne uppercase">
                        <IconCheck size={13} /> {o.status}
                      </span>
                      <span className="display">{o.total}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Preferences */}
          <section className="py-8" aria-label="Preferences">
            <h3 className="micro">Country &amp; Currency</h3>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {CURRENCY_CODES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  aria-pressed={currency === c}
                  className={`micro border py-2.5 transition-all duration-300 ${
                    currency === c ? "border-champagne bg-champagne text-obsidian" : "border-champagne/20 text-taupe hover:border-champagne/60 hover:text-ivory"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <p className="micro mt-4 text-taupe">Shipping to — India</p>
          </section>
        </div>
      </aside>
    </>
  );
}

/* price helper for drawer scope */
import { formatPrice, Currency } from "../data/catalog";
function useShopPrice(inr: number, c: Currency) {
  return formatPrice(inr, c);
}

/* ================= Quick view ================= */

export function QuickView() {
  const { quickView, setQuickView, addToBag, toggleWishlist, wishlist, price, go } = useShop();
  const product: Product | undefined = PRODUCTS.find((p) => p.id === quickView);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    setColor(0);
    setSize(0);
  }, [quickView]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[82] flex items-end justify-center bg-obsidian/70 backdrop-blur-[2px] fade-in md:items-center md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view — ${product.name}`}
      onClick={() => setQuickView(null)}
    >
      <div
        className="grid max-h-[92vh] w-full max-w-3xl grid-cols-1 overflow-y-auto no-scrollbar bg-ivory text-obsidian rise-in md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-parchment md:aspect-auto">
          <img src={product.image} alt={product.alt} className="absolute inset-0 h-full w-full object-cover" style={product.imagePos ? { objectPosition: product.imagePos } : undefined} />
          {product.isNew && <span className="micro absolute left-4 top-4 bg-obsidian/85 px-2.5 py-1 text-champagne">New</span>}
        </div>
        <div className="flex flex-col p-7 md:p-9">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="micro text-espresso/50">{product.collection}</p>
              <h2 className="display mt-2 text-3xl leading-tight">{product.name}</h2>
              <p className="mt-3 text-sm tracking-[0.14em] text-espresso/70">{price(product.priceINR)}</p>
            </div>
            <button type="button" onClick={() => setQuickView(null)} aria-label="Close quick view" className="transition-colors hover:text-espresso/60">
              <IconClose size={20} />
            </button>
          </div>

          <p className="serif-it mt-5 text-lg leading-relaxed text-espresso/75">{product.description}</p>

          <div className="mt-6">
            <p className="micro text-espresso/55">Colour — {product.colors[color]?.name}</p>
            <div className="mt-3 flex gap-2.5">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(i)}
                  aria-label={c.name}
                  aria-pressed={color === i}
                  className={`h-7 w-7 rounded-full border transition-all duration-300 ${color === i ? "border-obsidian ring-1 ring-obsidian ring-offset-2 ring-offset-ivory" : "border-espresso/25"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="micro text-espresso/55">Size — {product.sizes[size]}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(i)}
                  aria-pressed={size === i}
                  className={`micro border px-4 py-2 transition-all duration-300 ${size === i ? "border-obsidian bg-obsidian text-ivory" : "border-espresso/25 hover:border-obsidian"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-7">
            <button
              type="button"
              onClick={() => {
                addToBag(product, product.colors[color].name, product.sizes[size]);
                setQuickView(null);
              }}
              className="btn-solid micro w-full bg-obsidian py-4 text-ivory hover:text-obsidian"
            >
              Add to Bag
            </button>
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`flex items-center gap-2 transition-colors ${wishlist.includes(product.id) ? "text-espresso" : "text-espresso/50 hover:text-espresso"}`}
              >
                <IconHeart size={16} filled={wishlist.includes(product.id)} />
                <span className="micro">Wishlist</span>
              </button>
              <button type="button" onClick={() => go(`/product/${product.id}`)} className="link-lux micro">
                Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= Toasts ================= */

export function Toasts() {
  const { toasts } = useShop();
  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-[95] flex flex-col gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="toast-in flex items-center gap-3 border-l border-champagne bg-obsidian/95 py-3.5 pl-4 pr-6 shadow-2xl backdrop-blur-sm">
          <Emblem size={14} className="text-champagne" />
          <p className="micro !tracking-[0.22em] text-ivory">{t.text}</p>
        </div>
      ))}
    </div>
  );
}
