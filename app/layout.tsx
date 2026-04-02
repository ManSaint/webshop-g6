import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { ToastListener } from "@/components/toast-listener";
import GeeSixHeader from "@/components/header";
import Footer from "@/components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { SyncProvider } from "@/components/sync-provider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "GEESIX",
    template: "%s | GEESIX",
  },
  description:
    "GEESIX offers a wide selection of electronics, fashion, beauty products, home essentials, and more. Shop smartphones, laptops, clothing, accessories, and everyday needs in one place.",
  keywords: [
    "online store",
    "ecommerce",
    "electronics",
    "fashion",
    "beauty",
    "home",
    "smartphones",
    "laptops",
    "clothing",
    "accessories",
    "shopping",
  ],

  metadataBase: new URL("https://our-project-on.vercel"), 
  // Replace with your actual Vercel project URL

  openGraph: {
    title: "GEESIX",
    description: "Shop electronics, fashion, beauty, and more",
    url: "https://geesix.vercel.app",
    siteName: "GEESIX",
    images: [
      {
        url: "https://picsum.photos/seed/geesix1/1200/630",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
        >
          <SyncProvider />
          <GeeSixHeader />
          <Toaster position="top-center" />
          <Suspense>
            <ToastListener />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}