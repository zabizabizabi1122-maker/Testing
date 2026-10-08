import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <main className="flex items-center justify-center px-6 py-20 min-h-[60vh]">
      <div className="max-w-xl text-center">
        <div className="store-art-panel relative mx-auto mb-8 h-48 max-w-sm">
          <Image
            src="/images/shopping-discovery.svg"
            alt="A colorful selection of products from Pk store"
            fill
            sizes="(max-width: 640px) 100vw, 384px"
            className="object-cover"
          />
        </div>
        <h1 className="text-8xl font-black text-red-800 sm:text-9xl">
          404
        </h1>

        <h2 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
          Oops! This page is not here
        </h2>

        <p className="mt-3 text-gray-700">
          The page you are looking for may have been moved, renamed or never
          existed. Let&apos;s get you back to shopping.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            href="/"
            className="w-full rounded-full bg-red-800 px-6 py-3 font-bold text-white shadow-md transition hover:scale-105 hover:bg-red-900 hover:shadow-lg active:scale-95 sm:w-auto"
          >
            Go to Home
          </Link>

          <Link
            href="/Product"
            className="w-full rounded-full border-2 border-slate-800 bg-amber-100 px-6 py-3 font-bold text-slate-950 transition hover:scale-105 hover:bg-amber-200 active:scale-95 sm:w-auto"
          >
            Browse Products
          </Link>
        </div>

        <div className="mt-10 text-sm text-gray-700">
          Or try:{" "}
          <Link href="/about-us" className="font-semibold text-red-800 hover:underline">
            About
          </Link>
          {" · "}
          <Link href="/services" className="font-semibold text-red-800 hover:underline">
            Services
          </Link>
          {" · "}
          <Link href="/contact-us" className="font-semibold text-red-800 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;