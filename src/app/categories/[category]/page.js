import Link from "next/link";
import Image from "next/image";
import ProductGrid from "@/app/components/products/ProductGrid";
import { getProductCategories } from "@/app/lib/product-api";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Shop Category | Pk store",
};

function formatCategory(category) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  let categories;

  try {
    categories = await getProductCategories();
  } catch (error) {
    console.error("Could not verify product category:", error);
    throw error;
  }

  if (!categories.includes(category)) {
    notFound();
  }

  const title = formatCategory(category);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="store-page-hero">
        <div className="mx-auto grid max-w-screen-xl items-center gap-8 px-6 py-10 sm:py-14 md:grid-cols-[1fr_0.55fr]">
          <div>
            <Link href="/categories" className="text-sm font-bold text-red-900 underline-offset-4 hover:underline">
              ← All categories
            </Link>
            <p className="mt-7 text-sm font-extrabold uppercase tracking-[0.22em] text-red-900">
              Shop collection
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-slate-800">
              Explore the latest products in {title.toLowerCase()}. Keep scrolling for more.
            </p>
          </div>
          <div className="store-art-panel relative mx-auto hidden h-48 w-full max-w-sm md:block">
            <Image
              src="/images/shopping-discovery.svg"
              alt={`Explore the ${title} collection`}
              fill
              sizes="(max-width: 768px) 0px, 32vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-10">
        <ProductGrid key={category} category={category} />
      </section>
    </main>
  );
}
