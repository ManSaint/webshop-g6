import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 text-center p-6">
      <h1 className="text-5xl font-serif text-(--color-darkbrown)">
        Thank you for your order! 
      </h1>
      <p className="text-lg text-gray-600">
        Your payment was successful.
      </p>
      <Link
        href="/"
        className="text-xs tracking-widest border-b pb-1 transition hover:opacity-70"
        style={{
          color: "var(--color-charcoal)",
          borderColor: "var(--color-border-store)",
        }}
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
}