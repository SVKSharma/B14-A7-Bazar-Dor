import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import BrandTrolleyIcon from "@/components/BrandTrolleyIcon";

function NavigationLoading() {
  return (
    <header aria-hidden="true" className="sticky top-0 z-40 w-full border-b-2 border-gray-200 bg-[#f8fbf7]">
      <div className="keep-content-center flex items-center justify-between py-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008a45] text-xl text-white shadow-sm">
            <BrandTrolleyIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-bold leading-tight text-gray-900 sm:text-xl">বাজার দর</p>
            <div className="skeleton-shimmer mt-1.5 h-3 w-28 rounded" />
          </div>
        </div>
        <div className="skeleton-shimmer hidden h-9 w-24 rounded-lg md:block" />
      </div>
      <div className="hidden border-t border-gray-200/60 md:block">
        <div className="keep-content-center flex justify-center gap-5 py-2.5">
          {[0, 1, 2, 3, 4].map((item) => (
            <div key={item} className="flex items-center gap-2 px-3 py-1.5">
              <div className="skeleton-shimmer h-5 w-5 rounded-full" />
              <div className={`skeleton-shimmer h-3 rounded ${item % 2 === 0 ? "w-14" : "w-20"}`} />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "হোম | বাজার দর",
    template: "%s | বাজার দর",
  },
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<NavigationLoading />}>
          <Navbar />
        </Suspense>
        <PriceTicker></PriceTicker>
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
