import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/store";
import { IconArrow } from "./icons";

/* ---------------- Emblem: original Λ·V mark ---------------- */

export function Emblem({ size = 34, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M11 37 L21 11 L31 37 M17 11 L27 37 L37 11" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/* ---------------- IntersectionObserver reveal ---------------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "",
  as: Tag = "div",
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "" | "reveal-left" | "reveal-right" | "reveal-scale";
  as?: React.ElementType;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={`reveal ${variant} ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}

/* ---------------- Line-mask heading reveal ---------------- */

export function Lines({
  lines,
  className = "",
  lineClassName = "",
  baseDelay = 0,
  stagger = 140,
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${inView ? "is-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className={`line-mask ${lineClassName}`} style={{ transitionDelay: `${baseDelay + i * stagger}ms` }}>
          <span className="line-inner" style={{ transitionDelay: `${baseDelay + i * stagger}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ---------------- Magnetic wrapper ---------------- */

export function Magnetic({ children, strength = 0.25, className = "" }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate(0,0)";
    };
    el.style.transition = "transform 0.55s cubic-bezier(0.19,1,0.22,1)";
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}

/* ---------------- Arrow text link ---------------- */

export function ArrowLink({
  children,
  onClick,
  href,
  className = "",
  inverted = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  inverted?: boolean;
}) {
  const inner = (
    <>
      <span className={`link-lux micro transition-colors duration-500 ${inverted ? "hover:text-champagne" : "hover:text-espresso"}`}>
        {children}
      </span>
      <IconArrow size={17} className="group/al -translate-x-1 opacity-0 transition-all duration-500 group-hover/al:translate-x-0 group-hover/al:opacity-100" />
    </>
  );
  const cls = `group/al inline-flex items-center gap-3 ${className}`;
  if (href)
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ---------------- Section label ---------------- */

export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-10 bg-champagne/60" aria-hidden="true" />
      <span className="micro">{children}</span>
    </div>
  );
}

/* ---------------- Marquee ---------------- */

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const row = items.concat(items);
  return (
    <div className={`overflow-hidden border-y border-champagne/15 bg-obsidian py-4 ${className}`} aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="micro text-champagne/80">{item}</span>
            <Emblem size={12} className="text-champagne/50" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Parallax ---------------- */

export function useParallax<T extends HTMLElement>(speed = 0.08) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);
  return ref;
}

/* ---------------- Custom cursor ---------------- */

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;
    let mode = "";

    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      const next = t ? t.getAttribute("data-cursor") || "" : "";
      if (next !== mode) {
        mode = next;
        if (mode) {
          label.textContent = mode;
          ring.classList.add("cursor-active");
        } else {
          ring.classList.remove("cursor-active");
        }
      }
    };

    const onLeaveDoc = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnterDoc = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);
    document.documentElement.addEventListener("mouseenter", onEnterDoc);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", onEnterDoc);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <style>{`
        .cursor-ring { position: fixed; left:0; top:0; width:40px; height:40px; border:1px solid rgba(216,200,168,.75); border-radius:9999px; z-index:200; pointer-events:none; transition: width .45s cubic-bezier(.19,1,.22,1), height .45s cubic-bezier(.19,1,.22,1), background-color .45s, opacity .3s; display:flex; align-items:center; justify-content:center; }
        .cursor-ring.cursor-active { width:76px; height:76px; background: rgba(11,11,10,.55); }
        .cursor-label { font-family: var(--font-body); font-size:9px; letter-spacing:.32em; text-transform:uppercase; color:#F5F1E8; opacity:0; transition: opacity .3s; margin-left:.32em; }
        .cursor-ring.cursor-active .cursor-label { opacity:1; }
      `}</style>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{ position: "fixed", left: 0, top: 0, width: 6, height: 6, background: "#D8C8A8", borderRadius: 9999, zIndex: 201, pointerEvents: "none" }}
      />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
