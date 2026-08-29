import React, { useEffect, useRef, useState } from "react";
import { ShopProvider, Route, prefersReducedMotion, useShop } from "./lib/store";
import Header from "./components/Header";
import Footer, { Newsletter } from "./components/Footer";
import { AccountDrawer, CartDrawer, Preloader, QuickView, SearchOverlay, Toasts } from "./components/Drawers";
import { Cursor } from "./components/ui";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/Product";
import { ArticlePage, CheckoutPage, HousePage, JournalPage, StoresPage } from "./pages/Editorial";

function resolvePage(route: Route): React.ReactNode {
  const [section] = route.parts;
  switch (section) {
    case "shop":
      return <Shop />;
    case "product":
      return <ProductPage />;
    case "journal":
      return route.parts[1] ? <ArticlePage /> : <JournalPage />;
    case "house":
      return <HousePage />;
    case "stores":
      return <StoresPage />;
    case "checkout":
      return <CheckoutPage />;
    default:
      return <Home />;
  }
}

function Shell() {
  const { route, ready } = useShop();
  const [displayed, setDisplayed] = useState(route);
  const [leaving, setLeaving] = useState(false);
  const prevPath = useRef(route.path);

  /* Page transitions + scroll management */
  useEffect(() => {
    if (route.path !== prevPath.current) {
      prevPath.current = route.path;
      const land = () => {
        if (route.anchor) {
          const el = document.getElementById(route.anchor);
          if (el) {
            el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
            return;
          }
        }
        window.scrollTo(0, 0);
      };
      if (prefersReducedMotion()) {
        setDisplayed(route);
        land();
        return;
      }
      setLeaving(true);
      const t = window.setTimeout(() => {
        setDisplayed(route);
        setLeaving(false);
        land();
      }, 420);
      return () => window.clearTimeout(t);
    }
    if (route.anchor) {
      const t = window.setTimeout(() => {
        document.getElementById(route.anchor!)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      }, 450);
      return () => window.clearTimeout(t);
    }
  }, [route]);

  const isHome = displayed.parts.length === 0;

  return (
    <div className="grain relative min-h-screen bg-obsidian font-body text-ivory">
      {!ready && <Preloader />}
      <Header />
      <main id="main" className={leaving ? "page-leave" : "page-enter"} key={displayed.path}>
        {resolvePage(displayed)}
        {isHome && <Newsletter />}
      </main>
      <Footer />
      <SearchOverlay />
      <CartDrawer />
      <AccountDrawer />
      <QuickView />
      <Toasts />
      <Cursor />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <Shell />
    </ShopProvider>
  );
}
