import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/components/common/AddToCartButton";
import ProductCard from "@/app/components/common/ProductCard";
import ProductImage from "@/app/components/common/ProductImage";
import { getProduct, getRelatedProducts } from "@/app/lib/product-api";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const product = await getProduct(id);
    return { title: `${product.title} | Pk store` };
  } catch (error) {
    if (error.status === 404) return { title: "Product Not Found | Pk store" };
    throw error;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  let product;

  try {
    product = await getProduct(id);
  } catch (error) {
    if (error.status === 404) notFound();
    throw error;
  }

  const related = await getRelatedProducts(product.category, product.id);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-screen-xl px-6 py-10">
        <div className="mb-7 text-sm text-slate-500">
          <Link href="/" className="hover:text-violet-700">Home</Link>
          {" / "}
          <Link href="/Product" className="hover:text-violet-700">Products</Link>
          {" / "}
          <Link
            href={`/categories/${encodeURIComponent(product.category)}`}
            className="capitalize hover:text-violet-700"
          >
            {product.category.replaceAll("-", " ")}
          </Link>
          {" / "}
          <span className="text-slate-900">{product.title}</span>
        </div>

        <section className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 md:grid-cols-2">
          <div className="relative min-h-80 overflow-hidden rounded-2xl bg-slate-100 md:min-h-[460px]">
            <ProductImage
              src={product.image}
              alt={product.title}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center py-2">
            <Link
              href={`/categories/${encodeURIComponent(product.category)}`}
              className="w-fit rounded-full bg-violet-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-violet-700"
            >
              {product.category.replaceAll("-", " ")}
            </Link>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-lg text-amber-500" aria-label={`${product.rating} out of 5 stars`}>
                {"★".repeat(product.rating)}
                {"☆".repeat(5 - product.rating)}
              </span>
              <span className="text-sm text-slate-500">{product.rating} / 5</span>
            </div>
            <p className="mt-5 leading-7 text-slate-600">{product.description}</p>
            <p className="mt-7 text-4xl font-black tracking-tight text-slate-900">
              ${Number(product.price).toFixed(2)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AddToCartButton product={product} />
              <Link
                href="/Product"
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
              >
                Back to products
              </Link>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-14">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-violet-700">
                  Keep exploring
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  More from this collection
                </h2>
              </div>
              <Link
                href={`/categories/${encodeURIComponent(product.category)}`}
                className="text-sm font-semibold text-violet-700 hover:text-violet-900"
              >
                View category →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
