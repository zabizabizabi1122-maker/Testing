import React from "react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "Fast Delivery",
    description: "Your order is packed and shipped quickly, right to your door.",
  },
  {
    id: 2,
    title: "Secure Payments",
    description: "Pay safely with trusted payment methods and protected checkout.",
  },
  {
    id: 3,
    title: "Easy Returns",
    description: "Changed your mind? Return items in a few simple steps.",
  },
  {
    id: 4,
    title: "24/7 Support",
    description: "Our team is ready to answer your questions any time.",
  },
  {
    id: 5,
    title: "Gift Wrapping",
    description: "Send a present with neat wrapping and a personal note.",
  },
  {
    id: 6,
    title: "Order Tracking",
    description: "Follow your package from our store to your home.",
  },
];

const steps = [
  { id: 1, title: "Choose", text: "Pick the products you like." },
  { id: 2, title: "Order", text: "Add them to your cart and check out." },
  { id: 3, title: "Receive", text: "We deliver and you enjoy." },
];

const ServicesPage = () => {
  return (
    <main>
      {/* Top section */}
      <section className="store-page-hero px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-screen-xl items-center gap-8 md:grid-cols-[1fr_0.75fr]">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-red-800">Thoughtful service</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">The details that make shopping easier</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-800">Everything you need for a smoother, more confident shopping experience.</p>
          </div>
          <div className="store-art-panel relative mx-auto h-56 w-full max-w-md">
            <Image
              src="/images/delivery-scene.svg"
              alt="A delivery van carrying a carefully packed order"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-screen-xl px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="store-interactive-card rounded-2xl border p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-800 text-sm font-bold text-white">
                {String(service.id).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-300 bg-slate-100 py-12">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto text-xl font-bold text-slate-950 bg-amber-400 rounded-full">
                  {step.id}
                </div>
                <h3 className="mt-3 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;