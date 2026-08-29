import React, { useState } from "react";
import { CURRENCY_CODES } from "../data/catalog";
import { useShop } from "../lib/store";
import { Emblem, Lines, Reveal } from "./ui";
import { IconArrow, IconGlobe } from "./icons";

const COUNTRIES = [
  { label: "India", code: "INR" },
  { label: "France", code: "EUR" },
  { label: "United States", code: "USD" },
  { label: "United Kingdom", code: "GBP" },
  { label: "Italia", code: "EUR" },
  { label: "United Arab Emirates", code: "USD" },
] as const;

export function Newsletter() {
  const { toast } = useShop();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setDone(true);
    toast("Welcome to the world of LA VARSA");
  };

  return (
    <section className="bg-ivory px-6 py-24 text-obsidian md:py-32" aria-labelledby="newsletter-title">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <Emblem size={34} className="mx-auto text-espresso/70" />
        </Reveal>
        <Lines
          lines={["Enter the world", "of LA VARSA"]}
          className="display mt-8 text-[clamp(1.9rem,4.5vw,3.2rem)] uppercase leading-[1.05]"
        />
        <Reveal delay={150}>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-espresso/70">
            Receive invitations to new collections, private events, stories and selected discoveries from the House.
          </p>
        </Reveal>

        {done ? (
          <Reveal className="mt-10">
            <div className="mx-auto flex max-w-md items-center justify-center gap-3 border-b border-espresso/30 pb-4">
              <span className="serif-it text-xl text-espresso">Welcome to the House.</span>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={250}>
            <form onSubmit={submit} className="mx-auto mt-10 flex max-w-md items-end gap-5" noValidate>
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="micro block pb-1 text-left text-espresso/55">
                  Email Address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="your@address.com"
                  className="field !border-espresso/30 !text-obsidian focus:!border-espresso"
                  aria-invalid={!!error}
                />
                {error && <p className="micro mt-2 !tracking-[0.2em] text-espresso/70">{error}</p>}
              </div>
              <button type="submit" className="btn-solid micro bg-obsidian px-8 py-4 text-ivory hover:text-obsidian">
                Subscribe
              </button>
            </form>
          </Reveal>
        )}

        <Reveal delay={350}>
          <p className="micro mt-8 text-espresso/40">By subscribing you accept the privacy policy of the House</p>
        </Reveal>
      </div>
    </section>
  );
}

export default function Footer() {
  const { go, currency, setCurrency, toast } = useShop();
  const [country, setCountry] = useState("India");

  const onCountry = (label: string) => {
    setCountry(label);
    const c = COUNTRIES.find((x) => x.label === label);
    if (c) setCurrency(c.code as (typeof CURRENCY_CODES)[number]);
    toast(`Boutique region — ${label}`);
  };

  const legal = (topic: string) => () => toast(`${topic} — available from concierge@lavarsa.com`);

  const col = (title: string, links: { label: string; act: () => void }[]) => (
    <div>
      <h3 className="micro text-champagne">{title}</h3>
      <ul className="mt-6 space-y-3.5">
        {links.map((l) => (
          <li key={l.label}>
            <button type="button" onClick={l.act} className="text-sm tracking-[0.14em] text-taupe uppercase transition-all duration-300 hover:pl-1.5 hover:text-ivory">
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-obsidian" aria-label="Footer">
      <div className="mx-auto max-w-[1600px] px-6 pb-10 pt-20 md:px-14">
        {/* Wordmark */}
        <Reveal>
          <div className="flex items-end justify-between gap-8 border-b border-champagne/10 pb-14">
            <p className="display text-[clamp(2.6rem,8vw,6.5rem)] leading-none tracking-[0.18em] text-ivory">
              LA&nbsp;VARSA
            </p>
            <Emblem size={64} className="mb-3 hidden shrink-0 text-champagne/40 md:block" />
          </div>
        </Reveal>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-b border-champagne/10 py-14 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="micro text-champagne">The Maison</h3>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-taupe">
              A contemporary luxury house uniting timeless European elegance with modern Indian sophistication. One atelier, one collection at a time.
            </p>
            <div className="mt-8 flex items-center gap-3 text-taupe">
              <IconGlobe size={16} />
              <label htmlFor="country-select" className="micro">Region</label>
            </div>
            <select id="country-select" className="field mt-2 max-w-[240px] !text-taupe" value={country} onChange={(e) => onCountry(e.target.value)}>
              {COUNTRIES.map((c) => (
                <option key={c.label} value={c.label}>
                  {c.label} — {c.code}
                </option>
              ))}
            </select>
          </div>

          {col("Client Services", [
            { label: "Contact Us", act: () => go("/stores") },
            { label: "Shipping & Delivery", act: () => go("/stores#services") },
            { label: "Returns", act: () => go("/stores#services") },
            { label: "FAQ", act: () => go("/stores#services") },
            { label: "Care Guide", act: () => go("/stores#services") },
          ])}
          {col("About LA VARSA", [
            { label: "Our Story", act: () => go("/house") },
            { label: "Craftsmanship", act: () => go("/house#craft") },
            { label: "Journal", act: () => go("/journal") },
            { label: "Careers", act: () => go("/house") },
            { label: "Stores", act: () => go("/stores") },
          ])}
          {col("Legal · Follow", [
            { label: "Privacy", act: legal("Privacy") },
            { label: "Terms", act: legal("Terms") },
            { label: "Cookies", act: legal("Cookie policy") },
          ])}
        </div>

        {/* Follow + bottom */}
        <div className="flex flex-col gap-8 pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {[
              { label: "Instagram", href: "https://instagram.com" },
              { label: "Pinterest", href: "https://pinterest.com" },
              { label: "YouTube", href: "https://youtube.com" },
              { label: "Facebook", href: "https://facebook.com" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-lux micro text-taupe transition-colors hover:text-ivory">
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <p className="micro text-taupe/70">© 2026 LA VARSA — The Art of Timeless Elegance</p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-3 text-champagne transition-colors hover:text-ivory"
            >
              <span className="micro">Back to Top</span>
              <IconArrow size={15} className="-rotate-90 transition-transform duration-500 group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
