import CheckoutForm from "@/app/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout | Pk store",
  description: "Review your cart and provide delivery details.",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700">
          Checkout
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
          Delivery and order details
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Enter your details, review the items, and send your order request.
        </p>
        <CheckoutForm />
      </div>
    </main>
  );
}
