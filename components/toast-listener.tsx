"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

// This is just a small demo on how to make a make toasts from searchParams
// maybe not the most useful thing, but could be fun to test
// could probably be written cleaner too...
export function ToastListener() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const status = searchParams.get("status");

    const cleanUpUrl = () => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("status");
      const qs = newParams.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    };

    if (status === "success") {
      toast.success("Product added successfuly!");
      cleanUpUrl();
    } else if (status === "updated") {
      toast.success("Product updated successfully!");
      cleanUpUrl();
    } else if (status === "deleted") {
      toast.success("Product deleted successfully!");
      cleanUpUrl();
    }
  }, [searchParams, router, pathname]);

  return null;
}