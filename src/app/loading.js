"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const messages = [
  "Getting things ready...",
  "Finding the best deals...",
  "Packing your products...",
  "Almost there...",
];

const Loading = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col items-center px-6 py-16 min-h-[70vh]">
      {/* Spinner with logo */}
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* Soft pulse behind */}
        <span className="absolute inset-0 animate-ping rounded-full bg-red-700 opacity-20" />

        {/* Spinning ring */}
        <span className="absolute inset-0 animate-spin rounded-full border-4 border-amber-100 border-r-amber-500 border-t-red-800" />

        {/* Logo */}
        <span className="flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-slate-950 text-lg font-bold text-amber-300 shadow-lg">
          PK
        </span>
      </div>

      {/* Brand */}
      <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-gray-900">
        Pk        <span className="text-red-800"> store</span>
      </h2>

      {/* Changing message */}
      <p
        key={index}
        className="mt-2 text-gray-700 transition-opacity duration-500"
      >
        {messages[index]}
      </p>

      <div className="store-art-panel relative mt-8 h-40 w-full max-w-xs">
        <Image
          src="/images/shopping-discovery.svg"
          alt="A selection of products from Pk store"
          fill
          sizes="(max-width: 640px) 100vw, 320px"
          className="object-cover"
        />
      </div>

      {/* Bouncing dots */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-3 w-3 animate-bounce rounded-full bg-amber-500"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      {/* Skeleton cards */}
      <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className="overflow-hidden bg-white border border-gray-200 rounded-xl animate-pulse"
          >
            <div className="h-44 bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="w-1/3 h-3 bg-gray-200 rounded" />
              <div className="w-3/4 h-5 bg-gray-200 rounded" />
              <div className="w-full h-3 bg-gray-200 rounded" />
              <div className="flex items-center justify-between pt-2">
                <div className="w-16 h-6 bg-gray-200 rounded" />
                <div className="w-24 h-9 bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loading;