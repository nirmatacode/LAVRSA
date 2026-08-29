import React, { useMemo, useState } from "react";
import { CHAPTERS, CRAFT_VALUES, JOURNAL, PRODUCTS, STORES } from "../data/catalog";
import { I } from "../data/images";
import { useShop } from "../lib/store";
import { ArrowLink, Emblem, Lines, Reveal, SectionLabel } from "../components/ui";
import { IconArrow, IconCheck, IconChevron } from "../components/icons";

/* ================= Journal ================= */

export function JournalPage() {
  const { go } = useShop();
  const [lead, ...rest] = JOURNAL;

  return (
    <div className="bg-ivory px-6 pb-28 pt-32 text-obsidian md:px-14 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="border-b border-espresso/15 pb-10 text-center">
          <SectionLabel className="justify-center text-espresso/60">Stories from the House</SectionLabel>
          <h1 className="display mt-6 text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[1.02]">
            <Lines lines={["The LA VARSA", "Journal"]} stagger={150} />
          </h1>
          <Reveal delay={200}>
            <p className="serif-it mx-auto mt-6 max-w-lg text-xl text-espresso/70">Essays, atelier notes and observations on the quiet discipline of elegance.</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="group">
              <button type="button" onClick={() => go(`/journal/${lead.slug}`)} className="img-zoom block aspect-[4/3] w-full overflow-hidden" data-cursor="Read">
                <img src={lead.image} alt={lead.title} className="h-full w-full object-cover object-top" />
              </button>
              <p className="micro mt-7 text-espresso/55">{lead.category} — {lead.date} · {lead.readTime}</p>
              <h2 className="display mt-4 text-3xl leading-tight md:text-5xl">
                <button type="button" onClick={() => go(`/journal/${lead.slug}`)} className="text-left transition-colors hover:text-espresso/70">{lead.title}</button>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-espresso/65">{lead.excerpt}</p>
              <ArrowLink href={`#/journal/${lead.slug}`} className="mt-7">Read Story</ArrowLink>
            </article>
          </Reveal>

          <div className="flex flex-col gap-16 lg:col-span-5">
            {rest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 120}>
                <article>
                  <button type="button" onClick={() => go(`/journal/${a.slug}`)} className="img-zoom block aspect-[16/10] w-full overflow-hidden" data-cursor="Read">
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover object-top" loading="lazy" style={a.imagePos ? { objectPosition: a.imagePos } : undefined} />
                  </button>
                  <p className="micro mt-6 text-espresso/55">{a.category} — {a.date} · {a.readTime}</p>
                  <h2 className="display mt-3 text-2xl leading-tight md:text-3xl">
                    <button type="button" onClick={() => go(`/journal/${a.slug}`)} className="text-left transition-colors hover:text-espresso/70">{a.title}</button>
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-espresso/65">{a.excerpt}</p>
                  <ArrowLink href={`#/journal/${a.slug}`} className="mt-5">Read Story</ArrowLink>
                </article>
              </Reveal>
            ))}
            <Reveal delay={240} className="border border-espresso/15 p-8">
              <Emblem size={26} className="text-espresso/50" />
              <p className="serif-it mt-5 text-xl leading-relaxed text-espresso/75">
                A new essay arrives with each season — written slowly, like everything else we make.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArticlePage() {
  const { route, go } = useShop();
  const slug = route.parts[1];
  const article = JOURNAL.find((a) => a.slug === slug);
  const idx = JOURNAL.findIndex((a) => a.slug === slug);
  const next = JOURNAL[(idx + 1) % JOURNAL.length];

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center text-obsidian">
        <p className="serif-it text-3xl">This story is still being written.</p>
        <ArrowLink href="#/journal" className="mt-8">The Journal</ArrowLink>
      </div>
    );
  }

  return (
    <article className="bg-ivory pb-28 pt-32 text-obsidian md:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <p className="micro text-center text-espresso/55">{article.category} — {article.date} · {article.readTime}</p>
        <h1 className="display mt-6 text-center text-[clamp(2.4rem,5.5vw,4.2rem)] uppercase leading-[1.05]">
          <Lines lines={[article.title]} />
        </h1>
        <Reveal delay={150}>
          <p className="serif-it mx-auto mt-7 max-w-xl text-center text-xl leading-relaxed text-espresso/70">{article.excerpt}</p>
        </Reveal>
      </div>

      <Reveal variant="reveal-scale" className="mx-auto mt-14 max-w-5xl px-6">
        <div className="img-zoom aspect-[16/9] overflow-hidden" data-cursor="View">
          <img src={article.image} alt={article.title} className="h-full w-full object-cover object-top" style={article.imagePos ? { objectPosition: article.imagePos } : undefined} />
        </div>
      </Reveal>

      <div className="mx-auto mt-14 max-w-2xl px-6">
        {article.body.map((para, i) => (
          <Reveal key={i} delay={i * 60}>
            <p className="mb-7 text-[16px] leading-[1.9] text-espresso/80">
              {i === 0 ? (
                <>
                  <span className="display float-left mr-3 mt-1 text-[3.2em] leading-[0.78] text-obsidian">{para.charAt(0)}</span>
                  {para.slice(1)}
                </>
              ) : (
                para
              )}
            </p>
          </Reveal>
        ))}
        <Reveal className="mt-12 flex justify-center">
          <Emblem size={26} className="text-espresso/40" />
        </Reveal>
      </div>

      <div className="mx-auto mt-20 max-w-5xl border-t border-espresso/15 px-6 pt-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="micro text-espresso/55">Next Story</p>
            <h2 className="display mt-2 text-2xl uppercase md:text-3xl">{next.title}</h2>
          </div>
          <button type="button" onClick={() => go(`/journal/${next.slug}`)} className="group flex items-center gap-4">
            <span className="link-lux micro">Continue Reading</span>
            <IconArrow size={17} className="transition-transform duration-500 group-hover:translate-x-1.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ================= The House ================= */

export function HousePage() {
  const { go } = useShop();
  return (
    <div className="bg-obsidian pt-32 text-ivory md:pt-40">
      {/* Statement */}
      <section className="px-6 text-center md:px-14">
        <SectionLabel className="justify-center text-champagne/80">Est. MMXVI — Delhi · Milano</SectionLabel>
        <h1 className="display mx-auto mt-8 max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] uppercase leading-[1.03]">
          <Lines lines={["The House of", "LA VARSA"]} stagger={160} />
        </h1>
        <Reveal delay={220}>
          <p className="serif-it mx-auto mt-9 max-w-2xl text-[clamp(1.2rem,2.2vw,1.6rem)] leading-relaxed text-ivory/85">
            Born from a desire to redefine modern elegance, LA VARSA brings together timeless design, exceptional
            craftsmanship and a distinctly contemporary spirit.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-taupe">
            The House was founded on a simple refusal: that nothing should be made quickly, loudly or carelessly. A
            decade later the refusal stands — one atelier, one collection at a time, and objects designed to outlive
            the seasons they were born into.
          </p>
        </Reveal>
      </section>

      {/* Image pair */}
      <section className="mt-20 grid grid-cols-1 gap-5 px-6 md:grid-cols-2 md:px-14">
        <Reveal variant="reveal-left">
          <div className="img-zoom aspect-[3/4] overflow-hidden" data-cursor="View">
            <img src={I.her} alt="The Aria silk dress — a study in movement" className="h-full w-full object-cover object-top" loading="lazy" />
          </div>
        </Reveal>
        <Reveal variant="reveal-right" className="md:mt-24">
          <div className="img-zoom aspect-[3/4] overflow-hidden" data-cursor="View">
            <img src={I.awSide2} alt="Light inside the maison" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </section>

      {/* Timeline */}
      <section className="mx-auto mt-28 max-w-[1600px] px-6 md:px-14" aria-label="The chapters of the House">
        <SectionLabel className="text-champagne/80">The Chapters</SectionLabel>
        <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.6rem)] uppercase">
          <Lines lines={["A Decade, in Five", "Quiet Chapters"]} stagger={150} />
        </h2>
        <ol className="mt-14">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.year} as="li" delay={i * 80}>
              <div className="group grid grid-cols-[70px_1fr] gap-6 border-t border-champagne/15 py-9 transition-all duration-500 hover:bg-charcoal/60 hover:pl-5 md:grid-cols-[120px_150px_1fr] md:gap-10">
                <span className="display text-3xl text-champagne/70 transition-colors duration-500 group-hover:text-champagne">{c.era}</span>
                <span className="micro self-center text-taupe">{c.year}</span>
                <div>
                  <h3 className="display text-2xl uppercase">{c.title}</h3>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-taupe">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
          <li className="border-t border-champagne/15" />
        </ol>
      </section>

      {/* Craft */}
      <section id="craft" className="mt-28 grid grid-cols-1 bg-charcoal lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-20 md:px-16">
          <SectionLabel className="text-champagne/80">Craftsmanship</SectionLabel>
          <h2 className="display mt-6 text-[clamp(2rem,4.5vw,3.6rem)] uppercase leading-[1.05]">
            <Lines lines={["The Hands", "Behind the House"]} stagger={150} />
          </h2>
          <Reveal delay={200}>
            <p className="mt-8 text-[15px] leading-relaxed text-taupe">
              Our atelier sits outside Florence, in a converted tobacco-drying house where the light falls the way it
              should on leather. Forty-two artisans work there. None of them is in a hurry.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {CRAFT_VALUES.slice(0, 4).map((v, i) => (
              <Reveal key={v.n} delay={i * 80}>
                <div className="border-t border-champagne/15 pt-5">
                  <p className="micro text-champagne">{v.n}</p>
                  <h3 className="display mt-2 text-lg uppercase">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-taupe">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-12">
            <ArrowLink href="#/journal/behind-the-craft" inverted>Behind the Craft — Journal</ArrowLink>
          </Reveal>
        </div>
        <Reveal variant="reveal-scale" className="relative min-h-[420px]">
          <div className="img-zoom absolute inset-0">
            <img src={I.craft} alt="An artisan saddle-stitching leather in the LA VARSA atelier" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
      </section>

      {/* Closing */}
      <section className="px-6 py-28 text-center md:py-36">
        <Reveal>
          <p className="serif-it mx-auto max-w-2xl text-[clamp(1.4rem,3vw,2.2rem)] leading-relaxed text-ivory/85">
            “We do not ask to be noticed immediately. We ask to be remembered eventually.”
          </p>
          <p className="micro mt-8 text-champagne">— The Founders</p>
        </Reveal>
        <Reveal delay={200} className="mt-14 flex flex-wrap justify-center gap-10">
          <ArrowLink href="#/shop" inverted>Explore the Collection</ArrowLink>
          <ArrowLink href="#/stores" inverted>Visit a Maison</ArrowLink>
        </Reveal>
      </section>
    </div>
  );
}

/* ================= Stores ================= */

export function StoresPage() {
  const { toast } = useShop();
  const [form, setForm] = useState({ name: "", email: "", city: STORES[0].city, date: "" });
  const [booked, setBooked] = useState(false);
  const [openService, setOpenService] = useState(0);

  const services = [
    { title: "Shipping & Delivery", body: "Complimentary worldwide express delivery on every order, three to five working days. Pieces leave the atelier in the signature matte black archive box, sealed by hand. Duties and taxes are settled by the House — the price you see is the price you pay." },
    { title: "Returns & Exchanges", body: "Returns are accepted within thirty days in original condition with wearing tags attached. Exchange a piece at any maison, at any time. Leather goods carry a lifetime guarantee and are repaired, free of charge, in our in-store ateliers." },
    { title: "Care Guide", body: "Leather: wipe with a dry cloth; condition twice a year; keep from prolonged sunlight. Cashmere: fold, never hang; rest a day between wears. Silk: dry clean only; iron cool, from the reverse. Every piece arrives with its own printed care card." },
    { title: "Frequently Asked", body: "Do you make to measure? Yes — select tailoring and all leather goods can be personalised at any maison. Do you restock? Icon pieces are made continuously; seasonal pieces are made once. Is the packaging gift-ready? Always — the archive box, tissue and ribbon are part of the object." },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      toast("Kindly complete your name and a valid email");
      return;
    }
    setBooked(true);
    toast("Appointment requested — our concierge will confirm");
  };

  return (
    <div className="bg-ivory px-6 pb-28 pt-32 text-obsidian md:px-14 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-end gap-10 border-b border-espresso/15 pb-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionLabel className="text-espresso/60">Maisons Worldwide</SectionLabel>
            <h1 className="display mt-6 text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[1.02]">
              <Lines lines={["The LA VARSA", "Experience"]} stagger={150} />
            </h1>
          </div>
          <Reveal delay={200}>
            <p className="max-w-sm text-[15px] leading-relaxed text-espresso/65">
              Discover LA VARSA in an environment designed around the art of personal service. Six maisons, one
              standard of attention.
            </p>
          </Reveal>
        </div>

        {/* Maison list */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-espresso/15 bg-espresso/15 sm:grid-cols-2 lg:grid-cols-3">
          {STORES.map((s, i) => (
            <Reveal key={s.city} delay={(i % 3) * 90} className="bg-ivory">
              <div className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-parchment md:p-10">
                <p className="micro text-champagne">0{i + 1}</p>
                <h2 className="display mt-4 text-3xl uppercase">{s.city}</h2>
                <p className="serif-it mt-1.5 text-lg text-espresso/70">{s.name}</p>
                <div className="mt-6 space-y-1.5 text-sm leading-relaxed text-espresso/65">
                  <p>{s.address}</p>
                  <p>{s.hours}</p>
                  <p>{s.phone}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForm((f) => ({ ...f, city: s.city }));
                    document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="link-lux micro mt-8 self-start text-espresso/80 group-hover:text-obsidian"
                >
                  Book an Appointment
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Appointment */}
        <section id="appointment" className="mt-24 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel className="text-espresso/60">Private Appointments</SectionLabel>
            <h2 className="display mt-6 text-[clamp(1.9rem,4vw,3.2rem)] uppercase leading-[1.05]">
              <Lines lines={["An Hour, Entirely", "Yours"]} stagger={150} />
            </h2>
            <Reveal delay={180}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-espresso/70">
                A private salon, a dedicated client advisor, and the complete collection — including pieces that never
                reach the floor. Appointments are unhurried, personal and without obligation.
              </p>
            </Reveal>
            <Reveal variant="reveal-scale" delay={260} className="mt-10 hidden lg:block">
              <div className="img-zoom aspect-[16/10] overflow-hidden" data-cursor="View">
                <img src={I.awSide2} alt="The private salon — travertine and light" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          </div>

          <Reveal variant="reveal-right">
            {booked ? (
              <div className="flex h-full flex-col items-start justify-center border border-espresso/15 p-10 md:p-14">
                <Emblem size={30} className="text-espresso/60" />
                <p className="display mt-7 text-3xl uppercase">Request Received</p>
                <p className="serif-it mt-4 text-xl leading-relaxed text-espresso/75">
                  Thank you, {form.name.split(" ")[0]}. Our concierge will write to you within one working day to
                  confirm your appointment at {form.city}.
                </p>
                <button type="button" onClick={() => setBooked(false)} className="link-lux micro mt-9">
                  Make Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="border border-espresso/15 p-10 md:p-14" noValidate>
                <p className="micro text-espresso/55">Book a Private Appointment</p>
                <div className="mt-8 space-y-8">
                  <div>
                    <label htmlFor="ap-name" className="micro block pb-1 text-espresso/55">Full Name</label>
                    <input id="ap-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian" placeholder="Your name" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="ap-email" className="micro block pb-1 text-espresso/55">Email</label>
                    <input id="ap-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian" placeholder="your@address.com" autoComplete="email" />
                  </div>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ap-city" className="micro block pb-1 text-espresso/55">Maison</label>
                      <select id="ap-city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian">
                        {STORES.map((s) => (
                          <option key={s.city} value={s.city}>{s.city} — {s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ap-date" className="micro block pb-1 text-espresso/55">Preferred Date</label>
                      <input id="ap-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-solid micro mt-10 w-full bg-obsidian py-4 text-ivory hover:text-obsidian">
                  Request Appointment
                </button>
                <p className="micro mt-5 text-center !tracking-[0.2em] text-espresso/40">Our concierge replies within one working day</p>
              </form>
            )}
          </Reveal>
        </section>

        {/* Client services */}
        <section id="services" className="mt-24">
          <SectionLabel className="text-espresso/60">Client Services</SectionLabel>
          <h2 className="display mt-6 text-[clamp(1.9rem,4vw,3rem)] uppercase">
            <Lines lines={["In Service of", "the Object"]} stagger={150} />
          </h2>
          <div className="mt-10">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="border-b border-espresso/15">
                  <button type="button" onClick={() => setOpenService(openService === i ? -1 : i)} aria-expanded={openService === i} className="group flex w-full items-center justify-between py-6 text-left">
                    <span className="display text-xl uppercase md:text-2xl">{s.title}</span>
                    <IconChevron size={15} className={`shrink-0 transition-transform duration-500 ${openService === i ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`grid transition-all duration-600 ease-[cubic-bezier(0.19,1,0.22,1)] ${openService === i ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl text-[15px] leading-relaxed text-espresso/70">{s.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================= Checkout ================= */

export function CheckoutPage() {
  const { cart, price, cartTotalINR, placeOrder, go, toast } = useShop();
  const [placed, setPlaced] = useState<ReturnType<typeof placeOrder> | null>(null);
  const [info, setInfo] = useState({ name: "", email: "", address: "", city: "", country: "India", card: "" });
  const [error, setError] = useState("");

  const items = useMemo(
    () =>
      cart.map((i) => ({ item: i, product: PRODUCTS.find((p) => p.id === i.productId)! })).filter((x) => x.product),
    [cart]
  );

  if (placed) {
    const steps = ["Confirmed", "In the Atelier", "In Transit", "Delivered"];
    return (
      <div className="flex min-h-screen flex-col items-center bg-ivory px-6 pb-28 pt-40 text-center text-obsidian">
        <Emblem size={36} className="text-espresso/60 rise-in" />
        <h1 className="display mt-8 text-[clamp(2.2rem,5vw,4rem)] uppercase rise-in" style={{ animationDelay: "120ms" }}>
          Merci — Order Confirmed
        </h1>
        <p className="serif-it mt-6 max-w-xl text-xl leading-relaxed text-espresso/75 rise-in" style={{ animationDelay: "240ms" }}>
          Your pieces are being prepared by hand. Order <span className="text-obsidian">{placed.id}</span> will leave
          the atelier within three working days, in the signature archive box.
        </p>
        <ol className="mt-12 flex flex-wrap items-center justify-center gap-0 rise-in" style={{ animationDelay: "360ms" }} aria-label="Order progress">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center">
              <div className="flex flex-col items-center gap-2.5 px-4 md:px-7">
                <span className={`flex h-8 w-8 items-center justify-center rounded-full border ${i === 0 ? "border-obsidian bg-obsidian text-champagne" : "border-espresso/25 text-espresso/40"}`}>
                  {i === 0 ? <IconCheck size={13} /> : <span className="micro !text-[0.55rem]">{i + 1}</span>}
                </span>
                <span className={`micro ${i === 0 ? "text-obsidian" : "text-espresso/40"}`}>{s}</span>
              </div>
              {i < steps.length - 1 && <span className="mb-7 h-px w-10 bg-espresso/20 md:w-16" />}
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap justify-center gap-10 rise-in" style={{ animationDelay: "480ms" }}>
          <ArrowLink href="#/shop">Continue Exploring</ArrowLink>
          <ArrowLink href="#/">Return Home</ArrowLink>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center text-obsidian">
        <Emblem size={34} className="text-espresso/40" />
        <p className="serif-it mt-7 text-3xl text-espresso/80">Your bag is empty.</p>
        <p className="micro mt-4 text-espresso/50">Perhaps begin with the signature collection.</p>
        <ArrowLink href="#/shop/bags" className="mt-9">Explore Leather Goods</ArrowLink>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.name.trim() || !/^\S+@\S+\.\S+$/.test(info.email) || !info.address.trim()) {
      setError("Kindly complete your name, email and delivery address.");
      return;
    }
    setError("");
    const order = placeOrder(cart);
    setPlaced(order);
    toast(`Order ${order.id} confirmed`);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="bg-ivory px-6 pb-28 pt-32 text-obsidian md:px-14 md:pt-40">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="display text-[clamp(2.2rem,5vw,4rem)] uppercase">
          <Lines lines={["Secure Checkout"]} />
        </h1>
        <p className="micro mt-4 text-espresso/50">Duties, taxes and express delivery — settled by the House.</p>

        <form onSubmit={submit} className="mt-14 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_400px]" noValidate>
          <div className="space-y-12">
            <fieldset>
              <legend className="micro text-espresso/55">01 — Contact</legend>
              <div className="mt-6 space-y-7">
                <div>
                  <label htmlFor="co-name" className="micro block pb-1 text-espresso/55">Full Name</label>
                  <input id="co-name" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian" autoComplete="name" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="co-email" className="micro block pb-1 text-espresso/55">Email</label>
                  <input id="co-email" type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian" autoComplete="email" placeholder="your@address.com" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="micro text-espresso/55">02 — Delivery</legend>
              <div className="mt-6 space-y-7">
                <div>
                  <label htmlFor="co-address" className="micro block pb-1 text-espresso/55">Address</label>
                  <input id="co-address" value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian" autoComplete="street-address" placeholder="Street address" />
                </div>
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="co-city" className="micro block pb-1 text-espresso/55">City</label>
                    <input id="co-city" value={info.city} onChange={(e) => setInfo({ ...info, city: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian" autoComplete="address-level2" placeholder="City" />
                  </div>
                  <div>
                    <label htmlFor="co-country" className="micro block pb-1 text-espresso/55">Country</label>
                    <select id="co-country" value={info.country} onChange={(e) => setInfo({ ...info, country: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian">
                      {["India", "France", "Italia", "United Kingdom", "United States", "United Arab Emirates"].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="micro text-espresso/55">03 — Payment</legend>
              <div className="mt-6">
                <label htmlFor="co-card" className="micro block pb-1 text-espresso/55">Card Number</label>
                <input id="co-card" inputMode="numeric" value={info.card} onChange={(e) => setInfo({ ...info, card: e.target.value })} className="field !text-obsidian !border-espresso/25 focus:!border-obsidian" placeholder="•••• •••• •••• ••••" />
                <p className="micro mt-4 !tracking-[0.2em] text-espresso/40">
                  A private payment salon — nothing is charged in this demonstration of the House.
                </p>
              </div>
            </fieldset>

            {error && <p className="micro !tracking-[0.2em] text-espresso">{error}</p>}
          </div>

          {/* Summary */}
          <aside className="h-fit border border-espresso/15 bg-parchment/60 p-8 lg:sticky lg:top-32">
            <h2 className="micro text-espresso/55">Your Order</h2>
            <ul className="mt-6 divide-y divide-espresso/10">
              {items.map(({ item, product }) => (
                <li key={item.key} className="flex gap-4 py-4">
                  <span className="h-20 w-16 shrink-0 overflow-hidden bg-ivory">
                    <img src={product.image} alt="" className="h-full w-full object-cover" style={product.imagePos ? { objectPosition: product.imagePos } : undefined} loading="lazy" />
                  </span>
                  <div className="flex-1">
                    <p className="display text-[0.95rem] leading-tight">{product.name}</p>
                    <p className="micro mt-1 !tracking-[0.2em] text-espresso/50">{item.color} · {item.size} · ×{item.qty}</p>
                  </div>
                  <p className="text-sm tracking-[0.08em]">{price(product.priceINR * item.qty)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2.5 border-t border-espresso/15 pt-5 text-sm">
              <div className="flex justify-between text-espresso/65"><dt>Subtotal</dt><dd>{price(cartTotalINR)}</dd></div>
              <div className="flex justify-between text-espresso/65"><dt>Delivery</dt><dd>Complimentary</dd></div>
              <div className="flex justify-between pt-2"><dt className="micro">Total</dt><dd className="display text-xl">{price(cartTotalINR)}</dd></div>
            </dl>
            <button type="submit" className="btn-solid micro mt-7 w-full bg-obsidian py-4 text-ivory hover:text-obsidian">
              Place Order
            </button>
            <button type="button" onClick={() => go("/shop")} className="link-lux micro mx-auto mt-5 block">
              Continue Shopping
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
}
