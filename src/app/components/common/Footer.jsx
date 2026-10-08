import React from "react";
import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/Product" },
  { name: "About", href: "/about-us" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact-us" },
];

const categories = ["Electronics", "Fashion", "Home & Living", "Accessories"];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/x.sh4zi.01" },
  { label: "X", href: "https://x.com/RajaR961" },
  { label: "Facebook", href: "https://m.facebook.com/shaziiii1/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav" },
];

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#17110d] text-slate-200">
      <div className="h-1 w-full bg-red-600" />

      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="text-2xl font-extrabold text-slate-50">
                Pk<span className="text-red-400"> store</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Quality products, fair prices and fast delivery. Shopping online,
              made simple.
            </p>

            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-300 underline-offset-4 transition hover:text-amber-300 hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-50">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block transition hover:text-amber-300 hover:translate-x-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-50">Categories</h3>
            <ul className="space-y-2 text-sm">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href="/categories"
                    className="inline-block transition hover:text-amber-300 hover:translate-x-1"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-50">Stay Updated</h3>
            <p className="text-sm text-slate-300">
              Get news about new products and offers.
            </p>
            <div className="flex mt-4">
              <input
                type="email"
                placeholder="Your email"
                className="w-full min-w-0 rounded-l-lg border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="button"
                className="rounded-r-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Join
              </button>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              <li>Rawalpindi, Pakistan</li>
              <li>support@ecomapp.com</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-300">
          <span>© {new Date().getFullYear()} Pk store. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white hover:underline">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;