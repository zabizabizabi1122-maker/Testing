import Link from "next/link";
import Image from "next/image";

const BannerSection = () => {
  return (
    <section className="store-hero relative isolate overflow-hidden">
      <div className="hero-orb hero-orb-one" aria-hidden="true" />
      <div className="hero-orb hero-orb-two" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[620px] max-w-screen-xl items-center gap-8 px-6 py-14 md:grid-cols-2 md:py-20">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-200 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-300" />
            Your happy place to shop
          </p>
          <h1 className="mt-7 max-w-xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Good finds.
            <span className="block text-amber-300">
              Great feeling.
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-200">
            Meet your new favorite things. Discover thoughtful picks for your
            everyday, all in one happy place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/Product"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-300 px-7 py-3.5 font-extrabold text-slate-950 shadow-lg shadow-slate-950/30 transition hover:-translate-y-1 hover:bg-amber-200 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Shop the collection
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/categories"
              className="rounded-full border border-white/50 bg-white/5 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:border-amber-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              Browse categories
            </Link>
          </div>
          <p className="mt-10 text-sm font-medium text-stone-300">
            Considered picks for the way you live.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] animate-[hero-float_6s_ease-in-out_infinite]">
          <div className="absolute inset-10 rounded-full bg-amber-300/20 blur-3xl" />
          <Image
            src="/images/pk-store-hero.svg"
            alt="Colorful shopping bags and parcels for PK Store"
            width={760}
            height={620}
            priority
            className="relative w-full drop-shadow-2xl"
          />
          <div className="absolute bottom-8 left-2 rounded-2xl border border-white/20 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur-md sm:left-0">
            <p className="text-xs font-semibold text-amber-200">A little joy is on the way</p>
            <p className="mt-1 text-sm font-bold text-white">Find something you love</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
