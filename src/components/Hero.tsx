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
        <div className="w-full bg-[#ffffff] border border-gray-200/70 rounded-2xl p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          {/* Left Text Content */}
          <div className="flex-1 max-w-xl text-left">
            <div className="inline-block bg-[#eef5eb] text-[#008a45] text-xs sm:text-sm font-semibold tracking-wide px-3 py-1 rounded-lg mb-4">
              শনিবার, ১০ অক্টোবর, ২০২৬
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-[1.45] mb-4">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-8 sm:leading-9 mb-7">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <a
              href="#sob-panno"
              onClick={handleScrollToProducts}
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm sm:text-base font-semibold text-white bg-[#008a45] hover:bg-[#007339] active:scale-95 rounded-lg shadow-md shadow-emerald-700/20 transition-all"
            >
              সব পণ্য দেখুন
            </a>
          </div>

          {/* Right Banner Image */}
          <div className="shrink-0 w-full max-w-65 sm:max-w-75 md:max-w-85 flex justify-center items-center">
            <Image
              src={bazarHeroImage}
              alt="Bazar Hero Banner"
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}