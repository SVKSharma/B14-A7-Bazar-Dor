'use client';
import React from 'react';
import Image from 'next/image';
import bazarHeroImage from '@/assets/bazar-hero.png'; 

export default function Hero() {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById('sob-panno');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#f8fbf7] py-6 sm:py-8">
      <div className="keep-content-center">
        <div className="relative flex w-full flex-col items-center gap-7 overflow-hidden rounded-2xl border border-emerald-900/10 bg-white p-5 text-center shadow-[0_20px_60px_-40px_rgba(0,80,40,0.35)] sm:gap-8 sm:p-10 md:flex-row md:justify-between md:p-12 md:text-left">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-50/80 blur-3xl"
          />
          {/* Left Text Content */}
          <div className="relative z-10 flex w-full max-w-xl flex-col items-center md:flex-1 md:items-start">
            <div className="mb-4 inline-flex items-center rounded-full border border-emerald-900/5 bg-[#eef5eb] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#008a45] sm:text-sm">
              শনিবার, ১০ অক্টোবর, ২০২৬
            </div>

            <h1 className="mb-3 max-w-xl text-2xl font-bold leading-[1.4] tracking-tight text-gray-900 sm:mb-4 sm:text-3xl md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mb-6 max-w-lg text-sm leading-7 text-gray-600 sm:mb-7 sm:text-base sm:leading-8 md:leading-9">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#sob-panno"
              onClick={handleScrollToProducts}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#008a45] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-[#007339] active:scale-[0.98] sm:w-auto sm:text-base"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Right Banner Image */}
          <div className="relative flex h-40 w-full max-w-64 shrink-0 items-center justify-center sm:h-52 sm:max-w-80 md:h-auto md:max-w-85">
            <div
              aria-hidden="true"
              className="absolute h-36 w-36 rounded-full bg-[#eef5eb] sm:h-48 sm:w-48"
            />
            <div
              aria-hidden="true"
              className="absolute h-44 w-44 rounded-full border border-dashed border-emerald-200/80 sm:h-56 sm:w-56"
            />
            <Image
              src={bazarHeroImage}
              alt="Bazar Hero Banner"
              priority
              className="relative z-10 h-full w-full object-contain drop-shadow-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}