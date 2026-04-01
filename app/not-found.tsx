import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="max-w-xl rounded-3xl border border-[#e7e7e7] bg-white p-12 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-[#7c8594]">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-[#3c2c1b]">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-[#7c8594]">
          The page you were looking for does not exist. Try going back to the homepage.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#3c2c1b] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
