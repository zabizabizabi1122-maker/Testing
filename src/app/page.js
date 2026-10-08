import Link from "next/link";
import BannerSection from "./components/home-components/BannerSection";
import ProductCard from "./components/common/ProductCard";
import { getFeaturedProducts } from "./lib/product-api";

const popularCategories = [
  { label: "Smartphones", slug: "smartphones", color: "bg-red-100" },
  { label: "Beauty", slug: "beauty", color: "bg-amber-100" },
  { label: "Home decor", slug: "home-decoration", color: "bg-emerald-100" },
  { label: "Fashion", slug: "womens-dresses", color: "bg-rose-100" },
];

export default async function Home() {
  let products = [];
  let productError = "";

  try {
    products = await getFeaturedProducts(8);
  } catch (error) {
    console.error("Could not load home page products:", error);
    productError = "Featured products are temporarily unavailable. Please try again later.";
  }

  return (
    <main>
      <BannerSection />

      <section className="mx-auto max-w-screen-xl px-6 py-14 sm:py-18">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-800">
              Find your corner
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
              Browse by category
            </h2>
          </div>
          <Link
            href="/categories"
            className="font-bold text-red-800 underline decoration-2 underline-offset-4 transition hover:text-red-950"
          >
            All categories <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {popularCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`group rounded-2xl border border-slate-300 ${category.color} p-5 transition hover:-translate-y-1 hover:border-red-800 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800`}
            >
              <span className="text-lg font-extrabold text-slate-950">
                {category.label}
              </span>
              <span className="mt-3 block text-sm font-semibold text-slate-700 transition group-hover:text-red-900">
                Explore <span aria-hidden="true">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-14 sm:py-18">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-800">
                A little something for you
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Picks worth a closer look
              </h2>
              <p className="mt-2 max-w-xl text-slate-700">
                A mix of well-rated finds from across the store, refreshed from our product collection.
              </p>
            </div>
            <Link
              href="/Product"
              className="font-bold text-red-800 underline decoration-2 underline-offset-4 transition hover:text-red-950"
            >
              Shop all products <span aria-hidden="true">→</span>
            </Link>
          </div>

          {productError ? (
            <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-5 font-medium text-red-900">
              {productError}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-xl gap-4 px-6 py-14 sm:grid-cols-3 sm:py-16">
        {[
          ["Easy discovery", "Browse useful finds across a range of categories."],
          ["Clear product details", "Compare descriptions, ratings, and photos before you choose."],
          ["Help when you need it", "Our contact page is ready when you have a question."],
        ].map(([title, description], index) => (
          <article
            key={title}
            className="store-interactive-card rounded-2xl border p-6"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-amber-300">
              0{index + 1}
            </span>
            <h2 className="mt-4 text-lg font-extrabold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}