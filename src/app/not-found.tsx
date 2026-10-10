import Link from 'next/link';
import { HiOutlineHome } from 'react-icons/hi2';

export default function NotFound() {
  return (
    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden bg-[#f8fbf7] px-4 py-12 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-lime-100/70 blur-3xl" />
      </div>

      <section className="relative w-full max-w-md rounded-2xl border border-gray-200/80 bg-white/95 p-5 text-center shadow-sm backdrop-blur sm:p-7">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl shadow-inner ring-1 ring-emerald-100">
          🛒
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-[#008a45]">
          পৃষ্ঠা খুঁজে পাওয়া যায়নি
        </p>
        <h1 className="mt-1 text-6xl font-extrabold tracking-tight text-gray-900 sm:text-7xl">
          404
        </h1>
        <h2 className="mt-2 text-lg font-bold text-gray-800 sm:text-xl">
          মনে হচ্ছে এই বাজারের ঠিকানাটি নেই
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-600">
          পৃষ্ঠাটি সরানো হয়ে থাকতে পারে, অথবা ঠিকানাটি ভুল হয়েছে। চলুন, আবার বাজারদরের
          মূল পাতায় ফিরে যাই।
        </p>

        <div className="mt-5">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#008a45] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-700/20 transition hover:bg-[#007339] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008a45]"
          >
            <HiOutlineHome aria-hidden="true" className="text-lg" />
            হোম পেজে ফিরুন
          </Link>
        </div>
      </section>
    </div>
  );
}
