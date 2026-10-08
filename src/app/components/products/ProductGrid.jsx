"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "@/app/components/common/ProductCard";
import {
  getProductPageUrl,
  normalizeProduct,
} from "@/app/lib/product-api";

export default function ProductGrid({ category, query }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");
  const loaderRef = useRef(null);
  const loadMoreRef = useRef(null);

  const loadPage = useCallback(
    async (skip, signal) => {
      const response = await fetch(
        getProductPageUrl({ category, query, skip }),
        { signal }
      );

      if (!response.ok) {
        throw new Error("Products could not be loaded. Please try again.");
      }

      const data = await response.json();
      const items = (data.products || []).map(normalizeProduct);
      return {
        items,
        hasMore: skip + items.length < (data.total || 0),
      };
    },
    [category, query]
  );

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let offset = 0;
    let pending = false;
    let canLoadMore = true;

    const loadNextPage = async (initial = false) => {
      if (pending || (!initial && !canLoadMore)) return;
      pending = true;
      setLoading(true);
      setError("");

      try {
        const result = await loadPage(initial ? 0 : offset, controller.signal);
        if (!active) return;

        offset = initial ? result.items.length : offset + result.items.length;
        canLoadMore = result.hasMore;
        setProducts((current) =>
          initial ? result.items : [...current, ...result.items]
        );
        setHasMore(result.hasMore);
      } catch (loadError) {
        if (active && loadError.name !== "AbortError") {
          setError(loadError.message);
          setHasMore(false);
        }
      } finally {
        pending = false;
        if (active) setLoading(false);
      }
    };

    loadMoreRef.current = () => loadNextPage(false);
    loadNextPage(true);

    return () => {
      active = false;
      controller.abort();
    };
  }, [loadPage]);

  useEffect(() => {
    const element = loaderRef.current;
    if (!element || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMoreRef.current?.();
      },
      { rootMargin: "300px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  if (error && products.length === 0) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center">
        <p className="font-medium text-rose-800">{error}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!loading && !error && products.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <span className="text-5xl" aria-hidden="true">🔎</span>
        <h2 className="mt-4 text-xl font-bold text-slate-900">No products found</h2>
        <p className="mt-2 text-slate-500">Try another search or browse a different category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-5 flex items-center justify-between text-sm text-slate-500">
        <span>
          {products.length
            ? query && !hasMore
              ? `${products.length} matching products`
              : `${products.length}+ products loaded`
            : "Loading products"}
        </span>
        {hasMore && <span>New finds added as you scroll</span>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      <div ref={loaderRef} className="flex min-h-24 items-center justify-center py-8">
        {loading && (
          <p className="animate-pulse text-sm font-medium text-violet-700">
            Finding more products...
          </p>
        )}
        {!loading && error && (
          <button
            type="button"
            onClick={() => loadMoreRef.current?.()}
            className="rounded-full border border-violet-200 px-5 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50"
          >
            Couldn’t load more — try again
          </button>
        )}
        {!loading && !error && !hasMore && products.length > 0 && (
          <p className="text-sm text-slate-500">You’ve reached the end of the collection.</p>
        )}
      </div>
    </>
  );
}
