import Link from "next/link";
import Image from "next/image";
import ProductGrid from "@/app/components/products/ProductGrid";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="store-page-hero relative overflow-hidden">
        <div className="relative mx-auto grid max-w-screen-xl items-center gap-8 px-6 py-12 md:grid-cols-[1fr_0.65fr] sm:py-16">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.25em] text-red-800">
              The everyday edit
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
              Good finds.
              <span className="block text-red-800">Better everyday.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-800 sm:text-lg">
              Discover useful picks across tech, fashion, home and more.
              Scroll to keep exploring.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-800 bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Explore categories <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Thoughtful picks", "Fresh discoveries", "Easy browsing"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-slate-700 bg-amber-100 px-4 py-2 text-sm font-semibold text-slate-800"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="store-art-panel relative mx-auto hidden h-64 w-full max-w-md md:block">
            <Image
              src="/images/shopping-discovery.svg"
              alt="A colorful collection of products"
              fill
              sizes="(max-width: 768px) 0px, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-10 sm:py-14">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-700">Curated for you</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Browse the collection
            </h2>
          </div>
          <Link
            href="/search"
            className="text-sm font-semibold text-violet-700 hover:text-violet-900"
          >
            Looking for something specific? Search products →
          </Link>
        </div>
        <ProductGrid />
      </section>
    </main>
  );
}
