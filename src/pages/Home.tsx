import React, { useRef } from "react";
import { CHAPTERS, CRAFT_VALUES, JOURNAL, PRODUCTS } from "../data/catalog";
import { useShop } from "../lib/store";
import { ArrowLink, Emblem, Lines, Magnetic, Marquee, Reveal, SectionLabel, useParallax } from "../components/ui";
import { IconArrow, IconChevron, IconPlay } from "../components/icons";
import ProductCard from "../components/ProductCard";
import { I } from "../data/images";

const BAGS = PRODUCTS.filter((p) => p.category === "bags");

export default function Home() {
  const { go, ready } = useShop();

  return (
    <>
      <Hero />

      {/* ================= Statement ================= */}
      <section className="bg-ivory px-6 py-28 text-center text-obsidian md:py-44" aria-label="The House statement">
        <Reveal>
          <Emblem size={30} className="mx-auto text-espresso/60" />
        </Reveal>
        <Reveal delay={100}>
          <p className="micro mt-7 tracking-[0.55em]">LA VARSA</p>
        </Reveal>
        <h2 className="sr-only">Elegance is not designed for a moment. It is created to endure.</h2>
        <Lines
          lines={[
            <span key="1">Elegance is not designed</span>,
            <span key="2">
              for a <em className="serif-it text-espresso/80">moment.</em>
            </span>,
            <span key="3">It is created to endure.</span>,
          ]}
          className="display mx-auto mt-10 max-w-4xl text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.12]"
          stagger={170}
        />
        <Reveal delay={300}>
          <p className="mx-auto mt-10 max-w-xl text-[15px] leading-relaxed text-espresso/70">
            Discover a contemporary expression of luxury where exceptional materials, refined silhouettes and
            considered craftsmanship come together.
          </p>
        </Reveal>
        <Reveal delay={400} className="mt-12">
          <ArrowLink href="#/house">Discover Our Story</ArrowLink>
        </Reveal>
      </section>

      <Marquee items={["Autumn — Winter 2026", "The Art of Timeless Elegance", "Nocturne", "Crafted with Intention", "Milano — New Delhi — Paris"]} />

      {/* ================= New Collection ================= */}
      <section className="bg-ivory px-6 pb-28 pt-24 text-obsidian md:px-14 md:pb-40" aria-labelledby="new-collection-title">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel className="text-espresso/60">The New Collection</SectionLabel>
              <h2 id="new-collection-title" className="display mt-6 text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[1.02]">
                <Lines lines={["Autumn /", "Winter 2026"]} stagger={150} />
              </h2>
            </div>
            <Reveal delay={200} className="pb-2">
              <ArrowLink href="#/shop/collections?col=aw-2026">Discover the Collection</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-7">
            <Reveal variant="reveal-scale" className="md:col-span-7">
              <button type="button" onClick={() => go("/shop/collections?col=aw-2026")} className="img-zoom group relative block aspect-[4/5] w-full overflow-hidden text-left" data-cursor="View">
                <img src={I.awMain} alt="The Solenne Coat beneath a Milanese stone archway — Autumn Winter 2026" className="h-full w-full object-cover object-top" loading="lazy" />
                <span className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
                <span className="absolute bottom-0 left-0 p-7 md:p-10">
                  <span className="micro block text-champagne">Nocturne</span>
                  <span className="display mt-3 block text-2xl uppercase text-ivory md:text-4xl">Autumn / Winter 2026</span>
                  <span className="micro mt-4 flex items-center gap-3 text-ivory/80">
                    Discover the Collection
                    <IconArrow size={15} className="transition-transform duration-500 group-hover:translate-x-1.5" />
                  </span>
                </span>
              </button>
            </Reveal>
            <div className="flex flex-col gap-5 md:col-span-5 md:gap-7">
              <Reveal variant="reveal-scale" delay={120}>
                <button type="button" onClick={() => go("/product/linea-knit")} className="img-zoom group relative block aspect-[4/3] w-full overflow-hidden text-left md:aspect-auto md:flex-1" data-cursor="View">
                  <img src={I.awSide1} alt="Detail — the Linea cashmere knit in oatmeal" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <span className="absolute bottom-0 left-0 bg-obsidian/70 px-5 py-3 backdrop-blur-sm">
                    <span className="micro text-ivory">The Linea Knit — Cashmere</span>
                  </span>
                </button>
              </Reveal>
              <Reveal variant="reveal-scale" delay={240}>
                <button type="button" onClick={() => go("/stores")} className="img-zoom group relative block aspect-[4/3] w-full overflow-hidden text-left md:aspect-auto md:flex-1" data-cursor="View">
                  <img src={I.awSide2} alt="A shaft of light inside the LA VARSA maison" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <span className="absolute bottom-0 left-0 bg-obsidian/70 px-5 py-3 backdrop-blur-sm">
                    <span className="micro text-ivory">The Maison — A Light Study</span>
                  </span>
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= For Her ================= */}
      <section className="grid grid-cols-1 bg-ivory text-obsidian lg:grid-cols-2" aria-labelledby="for-her-title">
        <Reveal variant="reveal-left" className="relative">
          <button type="button" onClick={() => go("/shop/women")} className="img-zoom relative block aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[720px]" data-cursor="View" aria-label="Explore women — campaign image">
            <img src={I.her} alt="The Aria silk dress in motion on a European stone street" className="absolute inset-0 h-full w-full object-cover object-top" loading="lazy" />
          </button>
        </Reveal>
        <div className="flex flex-col justify-center px-6 py-20 md:px-16 md:py-28 lg:py-0">
          <SectionLabel className="text-espresso/60">Women</SectionLabel>
          <h2 id="for-her-title" className="display mt-6 text-[clamp(3rem,7vw,5.5rem)] uppercase leading-none">
            <Lines lines={["For Her"]} />
          </h2>
          <Reveal delay={150}>
            <p className="serif-it mt-6 text-[clamp(1.2rem,2vw,1.6rem)] text-espresso/75">A study in silhouette, texture and movement.</p>
          </Reveal>
          <nav className="mt-12" aria-label="Women categories">
            {[
              { label: "Ready-to-Wear", to: "/shop/women?cat=ready-to-wear" },
              { label: "Bags", to: "/shop/women?cat=bags" },
              { label: "Shoes", to: "/shop/women?cat=shoes" },
              { label: "Accessories", to: "/shop/women?cat=accessories" },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 90}>
                <button
                  type="button"
                  onClick={() => go(c.to)}
                  className="group flex w-full items-baseline gap-6 border-t border-espresso/15 py-5 text-left transition-all duration-500 hover:pl-4"
                >
                  <span className="micro text-champagne">0{i + 1}</span>
                  <span className="display text-xl uppercase md:text-2xl">{c.label}</span>
                  <IconArrow size={17} className="ml-auto text-espresso/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-espresso" />
                </button>
              </Reveal>
            ))}
            <div className="border-t border-espresso/15" />
          </nav>
          <Reveal delay={300} className="mt-10">
            <ArrowLink href="#/shop/women">Explore Women</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* ================= For Him ================= */}
      <section className="grid grid-cols-1 bg-obsidian text-ivory lg:grid-cols-2" aria-labelledby="for-him-title">
        <div className="order-2 flex flex-col justify-center px-6 py-20 md:px-16 md:py-28 lg:order-1 lg:py-0">
          <SectionLabel className="text-champagne/80">Men</SectionLabel>
          <h2 id="for-him-title" className="display mt-6 text-[clamp(3rem,7vw,5.5rem)] uppercase leading-none">
            <Lines lines={["For Him"]} />
          </h2>
          <Reveal delay={150}>
            <p className="serif-it mt-6 text-[clamp(1.2rem,2vw,1.6rem)] text-taupe">Modern tailoring. Quiet confidence.</p>
          </Reveal>
          <nav className="mt-12" aria-label="Men categories">
            {[
              { label: "Ready-to-Wear", to: "/shop/men?cat=ready-to-wear" },
              { label: "Bags", to: "/shop/men?cat=bags" },
              { label: "Shoes", to: "/shop/men?cat=shoes" },
              { label: "Accessories", to: "/shop/men?cat=accessories" },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 90}>
                <button
                  type="button"
                  onClick={() => go(c.to)}
                  className="group flex w-full items-baseline gap-6 border-t border-champagne/15 py-5 text-left transition-all duration-500 hover:pl-4"
                >
                  <span className="micro text-champagne">0{i + 1}</span>
                  <span className="display text-xl uppercase md:text-2xl">{c.label}</span>
                  <IconArrow size={17} className="ml-auto text-taupe/50 transition-all duration-500 group-hover:translate-x-1 group-hover:text-champagne" />
                </button>
              </Reveal>
            ))}
            <div className="border-t border-champagne/15" />
          </nav>
          <Reveal delay={300} className="mt-10">
            <ArrowLink href="#/shop/men" inverted>Explore Men</ArrowLink>
          </Reveal>
        </div>
        <Reveal variant="reveal-right" className="order-1 relative lg:order-2">
          <button type="button" onClick={() => go("/shop/men")} className="img-zoom relative block aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[720px]" data-cursor="View" aria-label="Explore men — campaign image">
            <img src={I.him} alt="The Meridian suit against brutalist concrete" className="absolute inset-0 h-full w-full object-cover object-top" loading="lazy" />
            <span className="absolute inset-0 bg-obsidian/25" />
          </button>
        </Reveal>
      </section>

      {/* ================= Signature bags ================= */}
      <SignatureBags />

      {/* ================= Campaign ================= */}
      <Campaign />

      {/* ================= Craftsmanship ================= */}
      <Craftsmanship />

      {/* ================= Packaging ================= */}
      <Packaging />

      {/* ================= The House ================= */}
      <HouseTimeline />

      {/* ================= Journal ================= */}
      <JournalPreview />

      {/* ================= Stores / private experience ================= */}
      <PrivateExperience />
    </>
  );

  /* ---------------- Hero ---------------- */
  function Hero() {
    const parallaxRef = useParallax<HTMLDivElement>(0.1);
    return (
      <section className="relative h-screen min-h-[640px] overflow-hidden" aria-label="LA VARSA — The Art of Timeless Elegance">
        <div ref={parallaxRef} className="absolute inset-[-8%]">
          <img src={I.hero} alt="A model in an ivory coat standing in a monumental stone courtyard at first light" className="kenburns h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-obsidian/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-transparent" />

        {/* Vertical season label */}
        <p className="micro absolute right-7 top-1/2 hidden -translate-y-1/2 text-champagne/70 md:block" style={{ writingMode: "vertical-rl" }}>
          Autumn — Winter 2026 · N° 09
        </p>

        {/* Content */}
        <div className="relative flex h-full flex-col justify-end px-6 pb-20 md:px-14 md:pb-24">
          {ready && (
            <div className="max-w-[1600px]">
              <p className="micro rise-in flex items-center gap-4 text-champagne" style={{ animationDelay: "150ms" }}>
                <span className="inline-block h-px w-12 bg-champagne/70" /> A Contemporary Luxury Maison
              </p>
              <h1 className="display mt-7 text-ivory">
                <span className="block overflow-hidden">
                  <span className="rise-in block text-[clamp(3.2rem,10vw,8.5rem)] leading-[0.95] tracking-[0.14em]" style={{ animationDelay: "280ms" }}>
                    LA&nbsp;VARSA
                  </span>
                </span>
              </h1>
              <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
                <p className="serif-it rise-in text-[clamp(1.5rem,3.2vw,2.6rem)] leading-snug text-ivory/90" style={{ animationDelay: "480ms" }}>
                  The art of
                  <br />
                  timeless elegance
                </p>
                <div className="rise-in" style={{ animationDelay: "640ms" }}>
                  <p className="max-w-sm text-[15px] leading-relaxed text-ivory/70">A new expression of modern luxury.</p>
                  <div className="mt-7 flex flex-wrap items-center gap-9">
                    <Magnetic>
                      <a href="#/shop/collections?col=aw-2026" className="link-lux micro text-ivory transition-colors hover:text-champagne">
                        Discover the Collection
                      </a>
                    </Magnetic>
                    <Magnetic>
                      <a href="#/house" className="link-lux micro text-ivory/70 transition-colors hover:text-champagne">
                        Explore LA VARSA
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-14 hidden h-20 w-px overflow-hidden bg-ivory/20 md:block" aria-hidden="true">
          <span className="scroll-hint-line block h-full w-px bg-champagne" />
        </div>
        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block" aria-hidden="true">
          <IconChevron size={18} className="animate-bounce text-ivory/50" style={{ animationDuration: "2.4s" }} />
        </div>
      </section>
    );
  }

  /* ---------------- Signature bags ---------------- */
  function SignatureBags() {
    const trackRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: number) => trackRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

    return (
      <section className="bg-ivory px-6 py-24 text-obsidian md:px-14 md:py-36" aria-labelledby="signature-title">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <SectionLabel className="text-espresso/60">Leather Goods</SectionLabel>
              <h2 id="signature-title" className="display mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[1.02]">
                <Lines lines={["The Signature", "Collection"]} stagger={150} />
              </h2>
              <Reveal delay={200}>
                <p className="serif-it mt-5 text-xl text-espresso/70 md:text-2xl">Objects of enduring elegance.</p>
              </Reveal>
            </div>
            <Reveal delay={250} className="flex items-center gap-3">
              <button type="button" onClick={() => scroll(-1)} aria-label="Scroll bags left" className="border border-espresso/25 p-3.5 transition-all duration-300 hover:border-obsidian hover:bg-obsidian hover:text-ivory">
                <IconArrow size={17} className="rotate-180" />
              </button>
              <button type="button" onClick={() => scroll(1)} aria-label="Scroll bags right" className="border border-espresso/25 p-3.5 transition-all duration-300 hover:border-obsidian hover:bg-obsidian hover:text-ivory">
                <IconArrow size={17} />
              </button>
            </Reveal>
          </div>

          <div ref={trackRef} className="no-scrollbar -mx-6 mt-14 flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-6 pb-2 md:-mx-14 md:px-14">
            {BAGS.map((p, i) => (
              <div key={p.id} className="w-[280px] shrink-0 snap-start md:w-[340px]" style={{ transitionDelay: `${i * 80}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
            <div className="flex w-[240px] shrink-0 snap-start flex-col items-start justify-center md:w-[300px]">
              <Emblem size={30} className="text-espresso/40" />
              <p className="serif-it mt-6 text-xl leading-relaxed text-espresso/70">
                Four objects. One line.
                <br />
                The Icon Collection.
              </p>
              <ArrowLink href="#/shop/bags" className="mt-8">All Leather Goods</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Campaign ---------------- */
  function Campaign() {
    return (
      <section className="relative flex h-[92vh] min-h-[560px] items-center justify-center overflow-hidden bg-obsidian text-center" aria-label="Campaign 2026 — The Beauty of Restraint">
        <div className="absolute inset-0">
          <img src={I.hero} alt="" aria-hidden="true" className="kenburns h-full w-full object-cover" style={{ objectPosition: "68% 22%" }} loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-obsidian/55" />
        <div className="relative px-6">
          <Reveal>
            <p className="micro text-champagne">LA VARSA — Campaign 2026</p>
          </Reveal>
          <Lines
            lines={["The Beauty", "of Restraint"]}
            className="display mt-8 text-[clamp(2.6rem,7vw,5.5rem)] uppercase leading-[1.02] text-ivory"
            stagger={160}
          />
          <Reveal delay={250} className="mt-12 flex justify-center">
            <Magnetic strength={0.35}>
              <button
                type="button"
                onClick={() => go("/journal/behind-the-craft")}
                data-cursor="Play"
                aria-label="Watch the campaign film"
                className="group mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-ivory/40 transition-all duration-700 hover:scale-105 hover:border-champagne hover:bg-champagne/10"
              >
                <IconPlay size={26} className="translate-x-0.5 text-ivory transition-colors duration-500 group-hover:text-champagne" />
              </button>
            </Magnetic>
          </Reveal>
          <Reveal delay={350} className="mt-10">
            <ArrowLink href="#/journal/behind-the-craft" inverted>Watch the Campaign</ArrowLink>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------------- Craftsmanship ---------------- */
  function Craftsmanship() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const shots = [
      { src: I.craft, n: "01", label: "The Hand", pos: "50% 50%" },
      { src: I.bag1, n: "02", label: "The Form", pos: "50% 72%" },
      { src: I.bag3, n: "03", label: "The Leather", pos: "50% 60%" },
      { src: I.awSide1, n: "04", label: "The Cloth", pos: "50% 30%" },
      { src: I.bag2, n: "05", label: "The Hardware", pos: "50% 40%" },
    ];
    return (
      <section id="craft" className="bg-ivory px-6 py-24 text-obsidian md:px-14 md:py-36" aria-labelledby="craft-title">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionLabel className="text-espresso/60">Craftsmanship</SectionLabel>
              <h2 id="craft-title" className="display mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[1.02]">
                <Lines lines={["Crafted with", "Intention"]} stagger={150} />
              </h2>
              <Reveal delay={200}>
                <p className="serif-it mt-8 text-[clamp(1.2rem,2vw,1.55rem)] leading-relaxed text-espresso/80">
                  Every LA VARSA creation begins with an appreciation for material, proportion and detail.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-6 text-[15px] leading-relaxed text-espresso/65">
                  One atelier. Forty-two artisans. Forty days to tan a hide, twelve hours to close a seam, three years
                  before a maker may sign a piece. We measure our work in decades — because our objects are made to
                  live in them.
                </p>
              </Reveal>
              <Reveal delay={380} className="mt-10">
                <ArrowLink href="#/house#craft">Inside the Atelier</ArrowLink>
              </Reveal>
            </div>
            <Reveal variant="reveal-scale" className="lg:col-span-7">
              <div className="img-zoom relative aspect-[4/3] overflow-hidden" data-cursor="View">
                <img src={I.craft} alt="An artisan hand-stitching vegetable-tanned leather with waxed linen thread" className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute bottom-0 left-0 bg-obsidian/70 px-5 py-3">
                  <span className="micro text-ivory">Atelier LA VARSA — The Saddle Stitch</span>
                </span>
              </div>
            </Reveal>
          </div>

          {/* Values */}
          <div className="mt-20 grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {CRAFT_VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 80}>
                <div className="group border-t border-espresso/15 pt-6 transition-colors duration-500">
                  <div className="flex items-baseline gap-5">
                    <span className="micro text-champagne">{v.n}</span>
                    <h3 className="display text-xl uppercase">{v.title}</h3>
                  </div>
                  <p className="mt-3.5 text-sm leading-relaxed text-espresso/65">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Horizontal gallery */}
          <div className="mt-20">
            <div className="flex items-center justify-between">
              <p className="micro text-espresso/50">Studies from the Atelier</p>
              <p className="micro hidden text-espresso/40 md:block">Scroll — 01 / 05</p>
            </div>
            <div ref={galleryRef} className="no-scrollbar -mx-6 mt-7 flex snap-x gap-5 overflow-x-auto px-6 pb-2 md:-mx-14 md:gap-7 md:px-14">
              {shots.map((s) => (
                <figure key={s.n} className="group w-[260px] shrink-0 snap-start md:w-[340px]">
                  <div className="img-zoom relative aspect-[4/3] overflow-hidden bg-parchment" data-cursor="View">
                    <img src={s.src} alt={`${s.label} — atelier study`} className="h-full w-full object-cover" style={{ objectPosition: s.pos }} loading="lazy" />
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-4">
                    <span className="micro text-champagne">{s.n}</span>
                    <span className="display text-lg uppercase">{s.label}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Packaging ---------------- */
  function Packaging() {
    return (
      <section className="bg-obsidian px-6 py-24 text-ivory md:px-14 md:py-36" aria-labelledby="packaging-title">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <SectionLabel className="text-champagne/80">The Packaging</SectionLabel>
            <h2 id="packaging-title" className="display mt-6 text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[1.02]">
              <Lines lines={["The Ritual of", "Unfolding"]} stagger={150} />
            </h2>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-taupe">
                A matte black box, an ivory interior, a single champagne line. Tissue folded by hand, a ribbon drawn
                tight, the wordmark debossed — not printed. The first object you receive from the House is the box
                itself; it is made to be kept.
              </p>
            </Reveal>
            <ul className="mt-10 max-w-md">
              {["Matte black archive box", "Warm ivory interior", "Hand-folded tissue & ribbon", "Debossed wordmark, champagne edge"].map((f, i) => (
                <Reveal key={f} delay={i * 80}>
                  <li className="flex items-baseline gap-5 border-t border-champagne/15 py-4">
                    <span className="micro text-champagne">0{i + 1}</span>
                    <span className="text-sm tracking-[0.16em] uppercase text-ivory/85">{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* CSS composition */}
          <Reveal variant="reveal-scale" className="order-1 lg:order-2">
            <div className="group relative mx-auto aspect-square w-full max-w-[440px]" aria-hidden="true">
              <div className="absolute inset-0 border border-champagne/15" />
              {/* lid */}
              <div className="absolute inset-[10%] bg-gradient-to-br from-charcoal to-obsidian shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-2 group-hover:rotate-[-0.5deg]">
                <div className="absolute inset-3 border border-champagne/25" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-champagne/25" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-champagne/25" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <Emblem size={44} className="text-champagne/85" />
                  <p className="display tracking-[0.4em] text-ivory/90 text-lg">LA&nbsp;VARSA</p>
                  <p className="micro text-taupe/80">Milano · New Delhi · Paris</p>
                </div>
                {/* ribbon */}
                <div className="absolute -right-[13%] top-1/2 h-10 w-[126%] -translate-y-1/2 rotate-[3deg] bg-gradient-to-r from-parchment via-ivory to-parchment opacity-95 shadow-lg">
                  <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-champagne/60" />
                </div>
              </div>
              {/* inner card peeking */}
              <div className="absolute bottom-[4%] left-1/2 h-[9%] w-[62%] -translate-x-1/2 bg-ivory shadow-md transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-2">
                <p className="micro absolute inset-0 flex items-center justify-center text-espresso/70">N° 01 — With our compliments</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------------- House timeline ---------------- */
  function HouseTimeline() {
    return (
      <section className="border-t border-champagne/10 bg-obsidian px-6 py-24 text-ivory md:px-14 md:py-36" aria-labelledby="house-home-title">
        <div className="mx-auto max-w-[1600px]">
          <div className="max-w-3xl">
            <SectionLabel className="text-champagne/80">Since MMXVI</SectionLabel>
            <h2 id="house-home-title" className="display mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[1.02]">
              <Lines lines={["The House of", "LA VARSA"]} stagger={150} />
            </h2>
            <Reveal delay={220}>
              <p className="mt-8 text-[15px] leading-relaxed text-taupe">
                Born from a desire to redefine modern elegance, LA VARSA brings together timeless design, exceptional
                craftsmanship and a distinctly contemporary spirit.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16">
            {CHAPTERS.map((c, i) => (
              <Reveal key={c.year} as="li" delay={i * 90}>
                <div className="group grid grid-cols-[64px_1fr] gap-6 border-t border-champagne/15 py-8 transition-all duration-500 hover:bg-charcoal/50 hover:pl-4 md:grid-cols-[110px_140px_1fr] md:gap-10 md:py-10">
                  <span className="display text-2xl text-champagne/70 transition-colors duration-500 group-hover:text-champagne">{c.era}</span>
                  <span className="micro self-center text-taupe">{c.year}</span>
                  <div className="col-span-2 md:col-span-1">
                    <h3 className="display text-xl uppercase md:text-2xl">{c.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-taupe">{c.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <li className="border-t border-champagne/15" />
          </ol>

          <Reveal className="mt-12">
            <ArrowLink href="#/house" inverted>Read the Full Story</ArrowLink>
          </Reveal>
        </div>
      </section>
    );
  }

  /* ---------------- Journal preview ---------------- */
  function JournalPreview() {
    const [lead, second, third] = JOURNAL;
    return (
      <section className="bg-ivory px-6 py-24 text-obsidian md:px-14 md:py-36" aria-labelledby="journal-home-title">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel className="text-espresso/60">Stories</SectionLabel>
              <h2 id="journal-home-title" className="display mt-6 text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase leading-[1.02]">
                <Lines lines={["The LA VARSA", "Journal"]} stagger={150} />
              </h2>
            </div>
            <Reveal delay={200} className="pb-2">
              <ArrowLink href="#/journal">All Stories</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-12">
            {/* Lead story */}
            <Reveal className="md:col-span-7">
              <article className="group">
                <button type="button" onClick={() => go(`/journal/${lead.slug}`)} className="img-zoom block aspect-[4/3] w-full overflow-hidden" data-cursor="Read">
                  <img src={lead.image} alt={lead.title} className="h-full w-full object-cover object-top" loading="lazy" />
                </button>
                <p className="micro mt-6 text-espresso/55">{lead.category} — {lead.readTime}</p>
                <h3 className="display mt-3 text-3xl leading-tight md:text-4xl">
                  <button type="button" onClick={() => go(`/journal/${lead.slug}`)} className="text-left transition-colors duration-300 hover:text-espresso/70">
                    {lead.title}
                  </button>
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-espresso/65">{lead.excerpt}</p>
                <ArrowLink href={`#/journal/${lead.slug}`} className="mt-6">Read Story</ArrowLink>
              </article>
            </Reveal>

            <div className="flex flex-col gap-16 md:col-span-5">
              {[second, third].map((a, i) => (
                <Reveal key={a.slug} delay={i * 120}>
                  <article className="group">
                    <button type="button" onClick={() => go(`/journal/${a.slug}`)} className="img-zoom block aspect-[16/10] w-full overflow-hidden" data-cursor="Read">
                      <img src={a.image} alt={a.title} className="h-full w-full object-cover object-top" style={a.imagePos ? { objectPosition: a.imagePos } : undefined} loading="lazy" />
                    </button>
                    <p className="micro mt-6 text-espresso/55">{a.category} — {a.readTime}</p>
                    <h3 className="display mt-3 text-2xl leading-tight">
                      <button type="button" onClick={() => go(`/journal/${a.slug}`)} className="text-left transition-colors duration-300 hover:text-espresso/70">
                        {a.title}
                      </button>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-espresso/65">{a.excerpt}</p>
                    <ArrowLink href={`#/journal/${a.slug}`} className="mt-5">Read Story</ArrowLink>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- Private experience ---------------- */
  function PrivateExperience() {
    return (
      <section className="grid grid-cols-1 bg-espresso text-ivory lg:grid-cols-2" aria-labelledby="experience-title">
        <Reveal variant="reveal-left" className="relative order-2 lg:order-1">
          <div className="img-zoom relative block aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[620px]">
            <img src={I.awSide2} alt="Inside the LA VARSA maison — travertine, light and a single garment" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            <span className="absolute inset-0 bg-obsidian/20" />
          </div>
        </Reveal>
        <div className="order-1 flex flex-col justify-center px-6 py-20 md:px-16 md:py-28 lg:order-2">
          <SectionLabel className="text-champagne/80">Maisons &amp; Appointments</SectionLabel>
          <h2 id="experience-title" className="display mt-6 text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[1.05]">
            <Lines lines={["The LA VARSA", "Experience"]} stagger={150} />
          </h2>
          <Reveal delay={180}>
            <p className="serif-it mt-7 text-xl leading-relaxed text-ivory/80 md:text-2xl">
              Discover LA VARSA in an environment designed around the art of personal service.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-taupe">
              Six maisons worldwide. Private salons, an espresso or a glass of something cold, and time — as much of
              it as you need. Appointments are personal, unhurried and without obligation.
            </p>
          </Reveal>
          <Reveal delay={340} className="mt-10 flex flex-wrap gap-5">
            <button type="button" onClick={() => go("/stores")} className="btn-solid micro border border-ivory px-9 py-4 text-ivory hover:text-obsidian">
              Find a Store
            </button>
            <button type="button" onClick={() => go("/stores#appointment")} className="link-lux micro self-center text-champagne">
              Book a Private Appointment
            </button>
          </Reveal>
        </div>
      </section>
    );
  }
}
