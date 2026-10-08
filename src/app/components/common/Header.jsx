"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductImage from "@/app/components/common/ProductImage";
import { usePathname } from "next/navigation";
import { CART_STORAGE_KEY, getCartCount, getCartItems, getCartTotal, removeFromCart, changeQuantity, clearCart } from "@/app/lib/cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/Product" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about-us" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact-us" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const syncCart = () => {
      const items = getCartItems();
      setCartItems(items);
      setCartCount(getCartCount());
      setCartTotal(getCartTotal());
    };

    onScroll();
    syncCart();

    const handleCartOpen = () => setCartOpen(true);

    window.addEventListener("scroll", onScroll);
    window.addEventListener("cart:update", syncCart);
    window.addEventListener("cart:open", handleCartOpen);
    window.addEventListener("storage", (event) => {
      if (event.key === CART_STORAGE_KEY) syncCart();
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("cart:update", syncCart);
      window.removeEventListener("cart:open", handleCartOpen);
    };
  }, []);

  return (
    <>
      <div className="w-full bg-[#f2c230] px-4 py-2 text-center text-xs font-medium text-[#17110d] sm:text-sm">
        Free delivery on orders over $50 <span className="mx-2 text-slate-700">·</span> Use code{" "}
        <span className="font-extrabold text-red-800">WELCOME10</span> for 10% off
      </div>

      <nav
        className={`sticky top-0 z-50 w-full border-b border-white/10 bg-[#171513]/95 text-slate-100 backdrop-blur-lg transition-all duration-300 ${
          scrolled ? "shadow-lg shadow-black/20" : "border-transparent"
        }`}
      >
        <div
          className={`max-w-screen-xl mx-auto flex items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3"
          >
            <span className="text-2xl font-extrabold tracking-tight text-slate-50">
              Pk<span className="text-red-400"> store</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1 font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 rounded-full transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-white/10 text-amber-300"
                      : "text-slate-300 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search"
              title="Search products"
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-200 transition hover:scale-110 hover:bg-white/10 hover:text-amber-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M21 21l-4.3-4.3M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>

            <button
              type="button"
              aria-label="Cart"
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-200 transition hover:scale-110 hover:bg-white/10 hover:text-amber-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h2l2.4 10.2a1 1 0 001 .8h8.9a1 1 0 001-.8L20 8H6M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/Product"
              className="ml-2 hidden rounded-full bg-violet-700 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:scale-105 hover:bg-violet-600 hover:shadow-md active:scale-95 sm:inline-flex"
            >
              Shop Now
            </Link>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-200 hover:bg-white/10 md:hidden"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  d={open ? "M6 6l12 12M18 6L6 18" : "M5 7h14M5 12h14M5 17h14"}
                />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-[#171513] px-6 py-4 md:hidden">
            <ul className="flex flex-col gap-1 font-medium">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition ${
                      isActive(link.href)
                        ? "bg-white/10 text-amber-300"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/Product"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded-lg bg-violet-700 py-3 text-center font-semibold text-white hover:bg-violet-600"
            >
              Shop Now
            </Link>
          </div>
        )}
      </nav>

      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="text-2xl text-gray-500 hover:text-gray-800"
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[60%] text-center">
                <p className="text-lg font-semibold text-gray-700">Your cart is empty</p>
                <p className="mt-2 text-sm text-gray-500">Add products to see them here.</p>
                <Link
                  href="/Product"
                  onClick={() => setCartOpen(false)}
                  className="mt-6 px-5 py-3 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                <div className="mt-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                        {item.image ? (
                          <ProductImage
                            src={item.image}
                            alt={item.title}
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-slate-100 text-xs font-medium text-slate-500">No image</div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                        <p className="text-sm text-gray-500">${item.price} each</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, -1)}
                          className="h-8 w-8 rounded-full bg-gray-100 text-lg text-gray-700"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(item.id, 1)}
                          className="h-8 w-8 rounded-full bg-gray-100 text-lg text-gray-700"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-medium text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => {
                      setCartOpen(false);
                    }}
                    className="mt-4 w-full rounded-full bg-violet-700 px-4 py-3 text-sm font-semibold text-white hover:bg-violet-800"
                  >
                    Continue to checkout
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      clearCart();
                      setCartOpen(false);
                    }}
                    className="mt-3 w-full rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;