"use client";

import { addToCart } from "@/app/lib/cart";

export default function AddToCartButton({ product }) {
  const handleClick = () => {
    addToCart(product);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-8 py-3 font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-md transition hover:shadow-lg hover:scale-105 active:scale-95"
    >
      Add to Cart
    </button>
  );
}
