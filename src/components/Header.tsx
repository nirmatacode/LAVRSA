import React, { useEffect, useState } from "react";
import { useShop } from "../lib/store";
import { I } from "../data/images";
import { Emblem } from "./ui";
import { IconArrowUpRight, IconBag, IconClose, IconHeart, IconMenu, IconSearch, IconUser } from "./icons";

interface NavItem {
  label: string;
  to: string;
  image: string;
  caption: string;
  links: { label: string; to: string }[];
}

const NAV: NavItem[] = [
  {
    label: "Women",
    to: "/shop/women",
    image: I.her,
    caption: "Autumn / Winter 2026",
    links: [
      { label: "New Arrivals", to: "/shop/women?filter=new" },
      { label: "Ready-to-Wear", to: "/shop/women?cat=ready-to-wear" },
      { label: "Bags", to: "/shop/women?cat=bags" },
      { label: "Shoes", to: "/shop/women?cat=shoes" },
      { label: "Accessories", to: "/shop/women?cat=accessories" },
    ],
  },
  {
    label: "Men",
    to: "/shop/men",
    image: I.him,
    caption: "The Meridian Suit",
    links: [
      { label: "New Arrivals", to: "/shop/men?filter=new" },
      { label: "Ready-to-Wear", to: "/shop/men?cat=ready-to-wear" },
      { label: "Bags", to: "/shop/men?cat=bags" },
      { label: "Shoes", to: "/shop/men?cat=shoes" },
      { label: "Accessories", to: "/shop/men?cat=accessories" },
    ],
  },
  {
    label: "New Arrivals",
    to: "/shop/new-arrivals",
    image: I.bag2,
    caption: "The Élan Shoulder Bag",
    links: [
      { label: "This Season", to: "/shop/new-arrivals" },
      { label: "The Icon Edit", to: "/shop?filter=best" },
      { label: "Evening Collection", to: "/shop/collections?col=evening" },
    ],
  },
  {
    label: "Collections",
    to: "/shop/collections",
    image: I.awMain,
    caption: "Nocturne — Autumn / Winter 2026",
    links: [
      { label: "Autumn / Winter 2026", to: "/shop/collections?col=aw-2026" },
      { label: "Spring / Summer 2026", to: "/shop/collections?col=ss-2026" },
      { label: "Icon Collection", to: "/shop/collections?col=icon" },
      { label: "Evening Collection", to: "/shop/collections?col=evening" },
    ],
  },
  {
    label: "Bags",
    to: "/shop/bags",
    image: I.bag1,
    caption: "The Varsa N° 01",
    links: [
      { label: "Top Handle", to: "/product/varsa-no-01" },
      { label: "Shoulder", to: "/product/varsa-no-02" },
      { label: "Tote", to: "/product/varsa-no-03" },
      { label: "Mini", to: "/product/varsa-no-04" },
      { label: "All Bags", to: "/shop/bags" },
    ],
  },
  {
    label: "Shoes",
    to: "/shop/shoes",
    image: I.awMain,
    caption: "The Viale Ankle Boot",
    links: [
      { label: "Women", to: "/shop/shoes?gender=women" },
      { label: "Men", to: "/shop/shoes?gender=men" },
      { label: "All Shoes", to: "/shop/shoes" },
    ],
  },
  {
    label: "Accessories",
    to: "/shop/accessories",
    image: I.bag3,
    caption: "Small leather goods",
    links: [
      { label: "Silk", to: "/shop/accessories?mat=Silk" },
      { label: "Small Leather Goods", to: "/shop/accessories?mat=Leather" },
      { label: "All Accessories", to: "/shop/accessories" },
    ],
  },
  {
    label: "The House",
    to: "/house",
    image: I.awSide2,
    caption: "The Lodhi Maison, New Delhi",
    links: [
      { label: "Our Story", to: "/house" },
      { label: "Craftsmanship", to: "/house#craft" },
      { label: "Journal", to: "/journal" },
      { label: "Stores", to: "/stores" },
    ],
  },
];

export default function Header() {
  const { route, go, menuOpen, setMenuOpen, setSearchOpen, setAccountOpen, setCartOpen, cartCount, wishlist } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(0);
  const [panelIn, setPanelIn] = useState(false);
  const isHome = route.parts.length === 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const t = window.setTimeout(() => setPanelIn(true), 60);
      return () => window.clearTimeout(t);
    }
    setPanelIn(false);
  }, [menuOpen]);

  const solid = scrolled || !isHome || menuOpen;
  const activeNav = NAV[active];

  return (
    <>
      {/* Announcement */}
      <div
        className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-center gap-8 border-b border-champagne/10 bg-obsidian px-4 py-2 transition-transform duration-700 ${
          scrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <p className="micro truncate text-taupe">Complimentary worldwide delivery on every order</p>
        <button
          type="button"
          onClick={() => go("/shop/new-arrivals")}
          className="micro hidden text-champagne transition-colors hover:text-ivory sm:block"
        >
          Discover Autumn / Winter 2026
        </button>
      </div>

      {/* Header */}
      <header
        className={`fixed inset-x-0 z-50 transition-all duration-700 ${scrolled ? "top-0" : "top-8"} ${
          solid ? "border-b border-champagne/10 bg-obsidian/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-4 md:px-10">
          {/* Left */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex items-center gap-3 text-ivory"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <IconClose size={20} /> : <IconMenu size={20} className="transition-transform duration-500 group-hover:scale-x-90" />}
              <span className="micro hidden md:inline">{menuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>

          {/* Wordmark */}
          <a
            href="#/"
            onClick={() => setMenuOpen(false)}
            className="display text-[1.35rem] tracking-[0.32em] text-ivory transition-opacity duration-500 hover:opacity-80 md:text-[1.55rem]"
            aria-label="LA VARSA — home"
          >
            LA&nbsp;VARSA
          </a>

          {/* Right */}
          <div className="flex items-center justify-end gap-5 text-ivory md:gap-6">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search" className="transition-colors duration-300 hover:text-champagne">
              <IconSearch size={19} />
            </button>
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              aria-label="Account and orders"
              className="hidden transition-colors duration-300 hover:text-champagne sm:block"
            >
              <IconUser size={19} />
            </button>
            <button
              type="button"
              onClick={() => setAccountOpen(true)}
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative hidden transition-colors duration-300 hover:text-champagne md:block"
            >
              <IconHeart size={19} filled={wishlist.length > 0} />
              {wishlist.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-champagne px-0.5 text-[8px] font-medium text-obsidian">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative transition-colors duration-300 hover:text-champagne"
            >
              <IconBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-champagne px-0.5 text-[8px] font-medium text-obsidian">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- Mega menu ---------------- */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian transition-all duration-700 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col pt-28 md:pt-32">
          <div className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 overflow-hidden px-6 md:grid-cols-[7fr_5fr] md:px-14">
            {/* Category list */}
            <nav aria-label="Primary" className="overflow-y-auto no-scrollbar pb-8">
              <ul>
                {NAV.map((item, i) => (
                  <li key={item.label} className="border-b border-champagne/10">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => go(item.to)}
                        className={`display group flex w-full items-baseline gap-5 py-4 text-left text-[clamp(1.6rem,3.2vw,2.6rem)] uppercase transition-all duration-500 md:py-[1.05vh] ${
                          active === i ? "translate-x-3 text-ivory" : "text-taupe hover:text-ivory"
                        }`}
                      >
                        <span className="micro text-champagne/70">0{i + 1}</span>
                        <span>{item.label}</span>
                        <IconArrowUpRight
                          size={20}
                          className={`ml-auto self-center transition-all duration-500 ${
                            active === i ? "translate-x-0 text-champagne opacity-100" : "-translate-x-2 opacity-0"
                          }`}
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Editorial panel */}
            <div className="relative hidden overflow-hidden md:block">
              {NAV.map((item, i) => (
                <div
                  key={item.label}
                  className={`absolute inset-0 transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`}
                  aria-hidden={active !== i}
                >
                  <img src={item.image} alt="" className="h-full w-full object-cover object-top" loading={i === 0 ? "eager" : "lazy"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-obsidian/30" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="micro mb-3 text-champagne">{item.caption}</p>
                    <ul className="space-y-2.5">
                      {item.links.map((l) => (
                        <li key={l.label}>
                          <button
                            type="button"
                            onClick={() => go(l.to)}
                            className="micro text-ivory/85 transition-all duration-300 hover:pl-2 hover:text-champagne"
                          >
                            {l.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu footer */}
          <div
            className={`border-t border-champagne/10 px-6 py-5 transition-all delay-300 duration-700 md:px-14 ${
              panelIn ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-champagne/80">
                <Emblem size={18} />
                <span className="micro">The Art of Timeless Elegance</span>
              </div>
              <div className="flex gap-7">
                {["Instagram", "Pinterest", "YouTube"].map((s) => (
                  <a key={s} href="#/journal" onClick={() => setMenuOpen(false)} className="micro text-taupe transition-colors hover:text-ivory">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
