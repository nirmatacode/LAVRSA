import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CURRENCY_CODES, Currency, PRODUCTS, Product, formatPrice } from "../data/catalog";

/* ---------------- Router ---------------- */

export interface Route {
  path: string;
  parts: string[];
  query: URLSearchParams;
  anchor: string | null;
}

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [pathPart, queryPart] = raw.split("?");
  const [cleanPath, anchor] = pathPart.split("#");
  const parts = cleanPath.split("/").filter(Boolean);
  return { path: "/" + parts.join("/"), parts, query: new URLSearchParams(queryPart || ""), anchor: anchor || null };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseHash());
  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigate(to: string) {
  const target = to.startsWith("#") ? to : `#${to.startsWith("/") ? to : "/" + to}`;
  if (window.location.hash === target) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  window.location.hash = target;
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Types ---------------- */

export interface CartItem {
  key: string;
  productId: string;
  color: string;
  size: string;
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  total: string;
  items: { name: string; color: string; qty: number }[];
  status: "Confirmed" | "In the Atelier" | "In Transit" | "Delivered";
}

interface Toast {
  id: number;
  text: string;
}

interface ShopState {
  route: Route;
  go: (to: string) => void;
  cart: CartItem[];
  addToBag: (p: Product, color: string, size: string, qty?: number, silent?: boolean) => void;
  removeFromBag: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  cartCount: number;
  cartTotalINR: number;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  orders: Order[];
  placeOrder: (items: CartItem[]) => Order;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  price: (p: number) => string;
  recent: string[];
  pushRecent: (id: string) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  accountOpen: boolean;
  setAccountOpen: (v: boolean) => void;
  quickView: string | null;
  setQuickView: (id: string | null) => void;
  toasts: Toast[];
  toast: (text: string) => void;
  ready: boolean;
  setReady: (v: boolean) => void;
}

const Ctx = createContext<ShopState | null>(null);

function usePersistent<T>(key: string, initial: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }, [key, value]);
  return [value, setValue];
}

/* ---------------- Provider ---------------- */

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const route = useRoute();
  const [cart, setCart] = usePersistent<CartItem[]>("lavarsa.cart", []);
  const [wishlist, setWishlist] = usePersistent<string[]>("lavarsa.wishlist", []);
  const [orders, setOrders] = usePersistent<Order[]>("lavarsa.orders", []);
  const [currency, setCurrencyState] = usePersistent<Currency>("lavarsa.currency", "INR");
  const [recent, setRecent] = usePersistent<string[]>("lavarsa.recent", []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [quickView, setQuickView] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [ready, setReady] = useState(false);
  const toastId = useRef(0);

  const go = useCallback((to: string) => {
    setMenuOpen(false);
    setSearchOpen(false);
    setCartOpen(false);
    setAccountOpen(false);
    setQuickView(null);
    navigate(to);
  }, []);

  const toast = useCallback((text: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, text }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const addToBag = useCallback(
    (p: Product, color: string, size: string, qty = 1, silent = false) => {
      const key = `${p.id}|${color}|${size}`;
      setCart((c) => {
        const existing = c.find((i) => i.key === key);
        if (existing) return c.map((i) => (i.key === key ? { ...i, qty: Math.min(9, i.qty + qty) } : i));
        return [...c, { key, productId: p.id, color, size, qty }];
      });
      if (!silent) {
        toast(`${p.name} — added to your bag`);
        setCartOpen(true);
      }
    },
    [setCart, toast]
  );

  const removeFromBag = useCallback((key: string) => setCart((c) => c.filter((i) => i.key !== key)), [setCart]);

  const setQty = useCallback(
    (key: string, qty: number) => {
      if (qty < 1) return removeFromBag(key);
      setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: Math.min(9, qty) } : i)));
    },
    [removeFromBag, setCart]
  );

  const toggleWishlist = useCallback(
    (id: string) => {
      setWishlist((w) => {
        const has = w.includes(id);
        toast(has ? "Removed from your wishlist" : "Saved to your wishlist");
        return has ? w.filter((x) => x !== id) : [...w, id];
      });
    },
    [setWishlist, toast]
  );

  const placeOrder = useCallback(
    (items: CartItem[]): Order => {
      const totalINR = items.reduce((sum, i) => {
        const p = PRODUCTS.find((x) => x.id === i.productId);
        return sum + (p ? p.priceINR * i.qty : 0);
      }, 0);
      const order: Order = {
        id: `LV-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`,
        date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
        total: formatPrice(totalINR, currency),
        items: items.map((i) => {
          const p = PRODUCTS.find((x) => x.id === i.productId);
          return { name: p ? p.name : i.productId, color: i.color, qty: i.qty };
        }),
        status: "Confirmed",
      };
      setOrders((o) => [order, ...o]);
      setCart([]);
      return order;
    },
    [currency, setOrders, setCart]
  );

  const price = useCallback((p: number) => formatPrice(p, currency), [currency]);

  const pushRecent = useCallback(
    (id: string) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)),
    [setRecent]
  );

  const setCurrency = useCallback((c: Currency) => setCurrencyState(c), [setCurrencyState]);

  /* Lock body scroll while an overlay is open */
  const overlayOpen = menuOpen || searchOpen || cartOpen || accountOpen || quickView !== null;
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [overlayOpen]);

  /* Close overlays with Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      setSearchOpen(false);
      setCartOpen(false);
      setAccountOpen(false);
      setQuickView(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* SEO titles per route */
  useEffect(() => {
    const [section, slug] = route.parts;
    let title = "LA VARSA — Contemporary Luxury Fashion";
    let desc =
      "LA VARSA is a contemporary luxury fashion house uniting timeless European elegance with modern Indian sophistication.";
    if (section === "shop") {
      const labels: Record<string, string> = {
        women: "Women", men: "Men", bags: "Bags", shoes: "Shoes",
        accessories: "Accessories", "new-arrivals": "New Arrivals", collections: "Collections",
        "ready-to-wear": "Ready-to-Wear",
      };
      const label = labels[slug || ""] || "The Collection";
      title = `${label} — LA VARSA`;
      desc = `Explore the ${label.toLowerCase()} collection from LA VARSA. Quiet luxury, crafted with intention.`;
    } else if (section === "product" && slug) {
      const p = PRODUCTS.find((x) => x.id === slug);
      if (p) {
        title = `${p.name} — LA VARSA`;
        desc = p.description;
      }
    } else if (section === "journal") title = "The LA VARSA Journal — Stories";
    else if (section === "house") title = "The House — LA VARSA";
    else if (section === "stores") title = "Maisons & Private Appointments — LA VARSA";
    else if (section === "checkout") title = "Secure Checkout — LA VARSA";
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", desc);
  }, [route]);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);
  const cartTotalINR = useMemo(
    () =>
      cart.reduce((sum, i) => {
        const p = PRODUCTS.find((x) => x.id === i.productId);
        return sum + (p ? p.priceINR * i.qty : 0);
      }, 0),
    [cart]
  );

  const value: ShopState = {
    route, go,
    cart, addToBag, removeFromBag, setQty, cartCount, cartTotalINR,
    wishlist, toggleWishlist,
    orders, placeOrder,
    currency, setCurrency, price,
    recent, pushRecent,
    menuOpen, setMenuOpen,
    searchOpen, setSearchOpen,
    cartOpen, setCartOpen,
    accountOpen, setAccountOpen,
    quickView, setQuickView,
    toasts, toast,
    ready, setReady,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShop(): ShopState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export { CURRENCY_CODES };
