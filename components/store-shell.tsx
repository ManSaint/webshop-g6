"use client";

import { usePathname } from "next/navigation";
import GeeSixHeader from "@/components/header";
import Footer from "@/components/footer";

export default function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <GeeSixHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
