import React from "react";
import { Product, CATEGORY_LABEL } from "../data/catalog";
import { useShop } from "../lib/store";
import { IconHeart } from "./icons";

export default function ProductCard({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { go, price, addToBag, wishlist, toggleWishlist, setQuickView } = useShop();
  const wished = wishlist.includes(product.id);

  return (
    <article className={`group flex flex-col ${className}`}>
      <div className="relative overflow-hidden bg-parchment" data-cursor="View">
        <button
          type="button"
          onClick={() => go(`/product/${product.id}`)}
          className="block aspect-[3/4] w-full overflow-hidden"
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] ${
              product.hoverFlip ? "group-hover:[transform:scaleX(-1)]" : ""
            }`}
            style={product.imagePos ? { objectPosition: product.imagePos } : undefined}
          />
        </button>

        {/* Badges */}
        <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2">
          {product.isNew && <span className="micro bg-obsidian/85 px-2.5 py-1 text-champagne">New</span>}
          {product.bestseller && <span className="micro bg-ivory/85 px-2.5 py-1 text-espresso">Bestseller</span>}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className={`absolute right-4 top-4 p-2 transition-all duration-500 ${
            wished ? "text-espresso opacity-100" : "text-espresso/40 opacity-0 hover:text-espresso group-hover:opacity-100 focus-visible:opacity-100"
          }`}
        >
          <IconHeart size={18} filled={wished} />
        </button>

        {/* Quick actions */}
        <div className="absolute inset-x-0 bottom-0 grid translate-y-full grid-cols-2 transition-transform duration-600 ease-out group-hover:translate-y-0 focus-within:translate-y-0">
          <button
            type="button"
            onClick={() => setQuickView(product.id)}
            className="micro bg-ivory/95 py-3.5 text-espresso backdrop-blur-sm transition-colors duration-300 hover:bg-champagne"
          >
            Quick View
          </button>
          <button
            type="button"
            onClick={() => addToBag(product, product.colors[0].name, product.sizes[0])}
            className="micro bg-obsidian/95 py-3.5 text-ivory backdrop-blur-sm transition-colors duration-300 hover:bg-espresso"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 pt-5">
        <p className="micro text-taupe">{product.collection}</p>
        <h3 className="display text-[1.15rem] leading-tight text-ivory">
          <button type="button" onClick={() => go(`/product/${product.id}`)} className="text-left transition-colors duration-300 hover:text-champagne">
            {product.name}
          </button>
        </h3>
        <p className="text-xs tracking-[0.18em] text-taupe uppercase">{product.material}</p>
        <p className="pt-1 text-sm tracking-[0.12em] text-champagne">{price(product.priceINR)}</p>
        <div className="flex items-center gap-1.5 pt-2" aria-label={`Available in ${product.colors.map((c) => c.name).join(", ")}`}>
          {product.colors.map((c) => (
            <span key={c.name} className="h-3 w-3 rounded-full border border-champagne/40" style={{ backgroundColor: c.hex }} title={c.name} />
          ))}
        </div>
      </div>
    </article>
  );
}
