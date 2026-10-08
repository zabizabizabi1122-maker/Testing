import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us | Pk store",
  description: "Discover the thinking behind Pk store and how we make shopping simple.",
};

const values = [
  {
    number: "01",
    title: "Useful finds",
    description: "Explore products across everyday categories, all in one place.",
  },
  {
    number: "02",
    title: "Simple browsing",
    description: "Clear categories and product details help you find what you need.",
  },
  {
    number: "03",
    title: "Here to help",
    description: "Reach out to our team when you have a question about your order.",
  },
];

const questions = [
  {
    question: "What can I find at Pk store?",
    answer:
      "Browse a growing mix of products across technology, fashion, home, beauty, and more from our categories page.",
  },
  {
    question: "How do I get help with an order?",
    answer:
      "Visit our contact page and send us a message with your question. Include your order details if you have them.",
  },
  {
    question: "Where can I explore the products?",
    answer:
      "Start with all products or choose a category to narrow down the collection to the things you are interested in.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      <section className="store-hero relative isolate">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="mx-auto grid max-w-screen-xl items-center gap-8 px-6 py-14 sm:py-20 md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10">
            <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-amber-300">
              A little about us
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
              Shopping should feel
              <span className="block text-amber-300">simple and personal.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-200 sm:text-lg">
              Pk store brings useful finds across everyday categories together
              in one easy place, so you can spend less time searching and more
              time finding what fits your life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/Product"
                className="rounded-full bg-amber-300 px-6 py-3 font-extrabold text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Browse products <span className="ml-1" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact-us"
                className="rounded-full border border-white/50 px-6 py-3 font-bold text-white transition hover:border-amber-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
              >
                Talk to us
              </Link>
            </div>
          </div>
          <div className="store-art-panel relative mx-auto h-64 w-full max-w-lg border-amber-300 sm:h-80">
            <Image
              src="/images/pk-store-hero.svg"
              alt="Pk store shopping bags and parcels"
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
              className="object-contain p-4 transition-transform duration-500 hover:scale-105"
            />
            <span className="absolute bottom-4 right-4 rounded-full bg-slate-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              Good finds, made easy
            </span>
          </div>
        </div>
      </section>

      <section id="our-story" className="mx-auto grid max-w-screen-xl gap-10 px-6 py-16 sm:py-20 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-800">
            Our story
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            A better way to find everyday favorites.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-slate-700 sm:text-lg">
          <p>
            Pk store started with a simple idea: shopping online should be easy,
            safe, and affordable. We bring a range of products together and make
            them easier to browse, so discovering something useful feels
            straightforward.
          </p>
          <p>
            From technology and accessories to home and personal care, our
            collections are organized around the things people look for every
            day. We want every visit to feel clear, welcoming, and worth your
            time.
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 font-extrabold text-red-800 underline decoration-2 underline-offset-4 transition hover:gap-3"
          >
            Find your category <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section className="border-y border-amber-300 bg-amber-100">
        <div className="mx-auto max-w-screen-xl px-6 py-16 sm:py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-800">
              What matters to us
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              The little things make shopping better.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.number}
                className="store-interactive-card group rounded-2xl border-2 p-6 transition-transform hover:-translate-y-1"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-amber-300 transition group-hover:rotate-6">
                  {value.number}
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-slate-950">
                  {value.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-700">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-xl gap-10 px-6 py-16 sm:py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-red-800">
            Good to know
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            A few quick answers.
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            Need more help? Our team is just a message away.
          </p>
          <Link
            href="/contact-us"
            className="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-800"
          >
            Contact our team
          </Link>
        </div>
        <div className="space-y-3">
          {questions.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-2xl border border-slate-300 bg-white p-5 shadow-sm transition open:border-red-700 open:bg-amber-50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-950 marker:hidden focus-visible:outline-2 focus-visible:outline-red-800">
                {question}
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-lg transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-2xl leading-7 text-slate-700">{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
