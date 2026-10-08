import ProductGrid from "@/app/components/products/ProductGrid";
import Image from "next/image";

export const metadata = {
  title: "Search Products | Pk store",
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="store-page-hero">
        <div className="mx-auto grid max-w-screen-xl items-center gap-8 px-6 py-10 sm:py-14 md:grid-cols-[1fr_0.7fr]">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-800">
              Search the store
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Find your next favorite.
            </h1>
            <form action="/search" className="mt-8 flex max-w-2xl gap-3">
              <label className="sr-only" htmlFor="product-search">Search products</label>
              <input
                id="product-search"
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Try headphones, skincare, decor..."
                className="min-w-0 flex-1 rounded-full border-2 border-slate-500 bg-white px-5 py-3.5 text-slate-950 outline-none placeholder:text-slate-500 focus:border-red-700 focus:ring-2 focus:ring-red-200"
              />
              <button
                type="submit"
                className="rounded-full bg-red-800 px-6 py-3.5 font-bold text-white transition hover:bg-red-900"
              >
                Search
              </button>
            </form>
          </div>
          <div className="store-art-panel relative mx-auto hidden h-56 w-full max-w-md md:block">
            <Image
              src="/images/shopping-discovery.svg"
              alt="A selection of products ready to discover"
              fill
              sizes="(max-width: 768px) 0px, 40vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            {query ? `Results for “${query}”` : "Popular products"}
          </h2>
          <p className="mt-1 text-sm text-slate-700">
            {query ? "Showing matching products. Scroll to load more if available." : "Enter a product name, brand, or keyword to get started."}
          </p>
        </div>
        {query ? (
          <ProductGrid key={query} query={query} />
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-slate-600">Search by product name, category, or keyword.</p>
          </div>
        )}
      </section>
    </main>
  );
}
