"use client";

import React, { useState } from "react";
import Image from "next/image";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* Top section */}
      <section className="store-page-hero px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">We’re here to help</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-base text-slate-600">We would love to hear from you.</p>
      </section>

      <section className="max-w-screen-xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            Have a question about an order or a product? Send us a message and
            we will reply as soon as we can.
          </p>

          <div className="space-y-4">
            <div className="border-t border-gray-200 pt-4 text-gray-700">
              Rawalpindi, Pakistan
            </div>
            <div className="store-art-panel relative mt-8 h-60 max-w-lg">
              <Image
                src="/images/customer-support.svg"
                alt="Customer support is ready to help"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="border-t border-gray-200 pt-4 text-gray-700">
              <a className="hover:text-violet-700" href="mailto:zabizabizabi1122@gmail.com">
                zabizabizabi1122@gmail.com
              </a>
            </div>
            <div className="border-t border-gray-200 pt-4 text-gray-700">
              +92 300 0000000
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          {sent && (
            <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg">
              Thank you! Your message has been sent successfully.
            </div>
          )}

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ContactPage;