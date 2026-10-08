import Link from "next/link";
import ProductImage from "@/app/components/common/ProductImage";
import { getCategoryImages, getProductCategories } from "@/app/lib/product-api";

export const metadata = {
  title: "Product Categories | Pk store",
};

const categoryDetails = {
  beauty: "Daily care, beauty and wellness",
  fragrances: "Distinctive scents for every day",
  furniture: "Comfortable pieces for your space",
  groceries: "Everyday essentials and pantry picks",
  "home-decoration": "Small details that make a home",
  "kitchen-accessories": "Useful tools for the kitchen",
  laptops: "Powerful tech for work and play",
  "mens-shirts": "Everyday wardrobe essentials",
  "mens-shoes": "Footwear for wherever you’re headed",
  "mens-watches": "Timeless styles and modern design",
  "mobile-accessories": "Handy add-ons for your devices",
  motorcycle: "Gear and accessories for the road",
  "skin-care": "Simple skincare and self-care",
  smartphones: "Smart devices to keep you connected",
  "sports-accessories": "Get ready to move and play",
  sunglasses: "Sun-ready styles and accessories",
  tablets: "Portable screens for everyday use",
  tops: "Easy styles for your daily look",
  vehicle: "Useful picks for your vehicle",
  "womens-bags": "Carry your day in style",
  "womens-dresses": "Dresses for every occasion",
  "womens-jewellery": "Finishing touches that shine",
  "womens-shoes": "Find a pair for every plan",
  "womens-watches": "A little detail, right on time",
};

const imageSurfaces = ["#f2e7d7", "#e7eee7", "#f5e7e1", "#e9e8f0"];

function formatCategory(category) {
  return category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function CategoriesPage() {
  let categories = [];
  let categoryImages = {};
  let error = "";

  try {
    [categories, categoryImages] = await Promise.all([
      getProductCategories(),
      getCategoryImages(),
    ]);
  } catch (loadError) {
    console.error("Could not load categories:", loadError);
    error = "We couldn’t load categories right now. Please refresh to try again.";
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="store-page-hero">
        <div className="mx-auto max-w-screen-xl px-6 py-14 sm:py-18">
          <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-red-900">
            Browse by interest
          </p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Find your kind of good.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-800">
            Pick a category and explore products selected for the things you love.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-6 py-10 sm:py-14">
        {error ? (
          <p role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => {
              const tagline =
                categoryDetails[category] ||
                `Explore our ${formatCategory(category).toLowerCase()} collection`;

              return (
                <Link
                  key={category}
                  href={`/categories/${encodeURIComponent(category)}`}
                  className="store-interactive-card group overflow-hidden rounded-2xl border shadow-md duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="relative h-56 overflow-hidden"
                    style={{
                      backgroundColor: imageSurfaces[index % imageSurfaces.length],
                    }}
                  >
                    <ProductImage
                      src={categoryImages[category]}
                      alt={`${formatCategory(category)} products`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-5 transition duration-500 group-hover:scale-105 sm:p-7"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent" />
                    <p className="absolute left-4 top-4 rounded-full border border-slate-950/10 bg-white/90 px-3 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-900 shadow-sm">
                      Explore collection
                    </p>
                    <h2 className="absolute bottom-4 left-5 right-5 text-2xl font-black text-white drop-shadow-md">
                      {formatCategory(category)}
                    </h2>
                  </div>
                  <div className="bg-white p-5 transition-colors group-hover:bg-amber-50">
                    <p className="text-sm leading-6 text-slate-700">{tagline}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-extrabold text-red-800">
                      Explore collection <span className="ml-2 transition group-hover:translate-x-1" aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
