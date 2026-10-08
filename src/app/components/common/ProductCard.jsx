"use client";

import Link from "next/link";
import { addToCart } from "@/app/lib/cart";
import { getMarketplaceSearchLinks } from "@/app/lib/marketplace-links";
import ProductImage from "@/app/components/common/ProductImage";

const ProductCard = ({ id, title, price, category, rating, description, image }) => {
  const marketplaceLinks = getMarketplaceSearchLinks(title);

  const handleAddToCart = () => {
    addToCart({ id, title, price, category, rating, description, image });
  };

  return (
    <article className="store-interactive-card group w-full overflow-hidden rounded-2xl border bg-white shadow-md duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/Product/${id}`}>
        <div className="relative h-56 overflow-hidden bg-slate-100">
          <ProductImage
            src={image}
            alt={title}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-700 shadow-sm backdrop-blur">
            {category}
          </span>
        </div>
      </Link>

      <div className="flex min-h-52 flex-col p-4">
        <Link href={`/Product/${id}`}>
          <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-violet-700">
            {title}
          </h3>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{description}</p>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="text-amber-500">
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </span>
          <span className="text-xs text-slate-400">{rating}.0 rating</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">${Number(price).toFixed(2)}</span>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 hover:shadow-md active:scale-95"
          >
            Add to Cart
          </button>
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs">
          <span className="text-slate-500">Check listings:</span>
          {marketplaceLinks.map((marketplace) => (
            <a
              key={marketplace.name}
              href={marketplace.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-violet-700 underline-offset-4 hover:underline"
            >
              {marketplace.name}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;