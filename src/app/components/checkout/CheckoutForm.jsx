"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import ProductImage from "@/app/components/common/ProductImage";
import { clearCart, getCartItems } from "@/app/lib/cart";

const emptyCustomer = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
};

const inputClassName =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

const emptyCart = [];
let cachedCartText;
let cachedCartItems = emptyCart;

function getCartSnapshot() {
  if (typeof window === "undefined") return emptyCart;

  const serializedCart = localStorage.getItem("ecomapp-cart") || "[]";
  if (serializedCart !== cachedCartText) {
    cachedCartText = serializedCart;
    cachedCartItems = getCartItems();
  }
  return cachedCartItems;
}

function subscribeToCart(onChange) {
  window.addEventListener("cart:update", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("cart:update", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function OrderSummary({ items, total }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
      <ul className="mt-4 divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3 text-sm">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
              <ProductImage
                src={item.image}
                alt={item.title}
                sizes="56px"
                className="object-cover"
              />
            </div>
            <span className="min-w-0 flex-1 text-slate-700">
              {item.title} <span className="font-semibold text-slate-600">× {item.quantity}</span>
            </span>
            <span className="shrink-0 font-bold text-slate-950">
              ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-slate-200 pt-4 font-bold text-slate-900">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </section>
  );
}

export default function CheckoutForm() {
  const items = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => null);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [stage, setStage] = useState("details");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderReference, setOrderReference] = useState("");

  const total = useMemo(
    () =>
      (items || []).reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
        0
      ),
    [items]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
  };

  const reviewOrder = (event) => {
    event.preventDefault();
    setError("");
    setStage("review");
  };

  const submitOrder = async () => {
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer, items }),
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "We could not send your order. Please try again.");
        return;
      }

      setOrderReference(result.orderReference);
      clearCart();
      setStage("success");
    } catch (requestError) {
      console.error("Order request failed:", requestError);
      setError("We could not connect to the store. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items === null) {
    return <p className="mt-8 text-slate-600">Loading your cart…</p>;
  }

  if (items.length === 0 && stage !== "success") {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="mt-2 text-slate-600">Add a product before checking out.</p>
        <Link
          href="/Product"
          className="mt-6 inline-flex rounded-full bg-violet-700 px-6 py-3 font-semibold text-white hover:bg-violet-800"
        >
          Browse products
        </Link>
      </section>
    );
  }

  if (stage === "success") {
    return (
      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-green-800">
            Request received
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Thank you, {customer.name}.</h2>
          <p className="mt-3 leading-7 text-slate-700">
            Your order request was sent to the store. We’ll contact you at{" "}
            <strong>{customer.email}</strong> to confirm availability and payment.
            No payment has been taken.
          </p>
          <p className="mt-4 text-sm font-semibold text-slate-700">
            Reference: {orderReference}
          </p>
          <Link
            href="/Product"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-violet-800"
          >
            Continue shopping
          </Link>
        </div>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Delivery details submitted</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="font-semibold text-slate-500">Name</dt><dd className="text-slate-900">{customer.name}</dd></div>
            <div><dt className="font-semibold text-slate-500">Email</dt><dd className="text-slate-900">{customer.email}</dd></div>
            <div><dt className="font-semibold text-slate-500">Phone</dt><dd className="text-slate-900">{customer.phone}</dd></div>
            <div><dt className="font-semibold text-slate-500">Address</dt><dd className="text-slate-900">{customer.address}, {customer.city}</dd></div>
          </dl>
        </section>
      </section>
    );
  }

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      {stage === "details" ? (
        <form
          onSubmit={reviewOrder}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 className="text-xl font-bold text-slate-900">Your delivery information</h2>
          <p className="mt-2 text-sm text-slate-600">
            We’ll use these details to contact you about this order.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Full name
              <input className={inputClassName} name="name" autoComplete="name" value={customer.name} onChange={handleChange} required maxLength={100} />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Email
              <input className={inputClassName} type="email" name="email" autoComplete="email" value={customer.email} onChange={handleChange} required maxLength={254} />
            </label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
              Phone
              <input className={inputClassName} type="tel" name="phone" autoComplete="tel" value={customer.phone} onChange={handleChange} required maxLength={40} />
            </label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
              Delivery address
              <textarea className={inputClassName} name="address" autoComplete="street-address" value={customer.address} onChange={handleChange} required maxLength={300} rows={3} />
            </label>
            <label className="text-sm font-semibold text-slate-700 sm:col-span-2">
              City
              <input className={inputClassName} name="city" autoComplete="address-level2" value={customer.city} onChange={handleChange} required maxLength={100} />
            </label>
          </div>
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-violet-700 px-6 py-3 font-semibold text-white transition hover:bg-violet-800"
          >
            Review order
          </button>
        </form>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Confirm your information</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div><dt className="font-semibold text-slate-500">Name</dt><dd className="mt-1 text-slate-900">{customer.name}</dd></div>
            <div><dt className="font-semibold text-slate-500">Email</dt><dd className="mt-1 text-slate-900">{customer.email}</dd></div>
            <div><dt className="font-semibold text-slate-500">Phone</dt><dd className="mt-1 text-slate-900">{customer.phone}</dd></div>
            <div><dt className="font-semibold text-slate-500">Delivery address</dt><dd className="mt-1 text-slate-900">{customer.address}, {customer.city}</dd></div>
          </dl>
          <p className="mt-5 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-950">
            No payment is taken at this step. The store will contact you to confirm product availability and payment.
          </p>
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setStage("details")}
              disabled={submitting}
              className="flex-1 rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              Edit details
            </button>
            <button
              type="button"
              onClick={submitOrder}
              disabled={submitting}
              className="flex-1 rounded-full bg-violet-700 px-5 py-3 font-semibold text-white hover:bg-violet-800 disabled:cursor-wait disabled:opacity-60"
            >
              {submitting ? "Sending order…" : "Confirm order request"}
            </button>
          </div>
        </section>
      )}
      <OrderSummary items={items} total={total} />
    </div>
  );
}
