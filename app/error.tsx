"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <div className="max-w-xl rounded-3xl border border-[#e7e7e7] bg-white p-12 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-[#7c8594]">Something went wrong</p>
        <h1 className="mt-4 text-4xl font-semibold text-[#3c2c1b]">Oops!</h1>
        <p className="mt-3 text-sm leading-6 text-[#7c8594]">
          {error?.message ?? "An unexpected error occurred."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex rounded-full bg-[#3c2c1b] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
