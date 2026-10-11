import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import SocialAuthIntentCleanup from '@/components/auth/SocialAuthIntentCleanup';

export const metadata: Metadata = {
  title: 'লগইন সমস্যা',
};

interface AuthErrorPageProps {
  searchParams: Promise<{ error?: string }>;
}

async function AuthErrorContent({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams;
  const accountAlreadyExists = error === 'account_not_linked';

  const title = accountAlreadyExists
    ? 'এই ইমেইল দিয়ে অ্যাকাউন্ট আগে থেকেই আছে'
    : 'সাইন ইন করা যায়নি';
  const message = accountAlreadyExists
    ? 'Google বা GitHub-এ ব্যবহৃত ইমেইলটি দিয়ে আগে থেকেই একটি বাজার দর অ্যাকাউন্ট আছে। নিরাপত্তার জন্য অন্য সাইন-ইন পদ্ধতির অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে যুক্ত করা হয় না। আগে যে পদ্ধতিতে অ্যাকাউন্ট খুলেছেন, সেটি দিয়ে সাইন ইন করুন।'
    : 'সাইন ইন করার সময় একটি সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।';

  return (
    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden bg-[#f8fbf7] px-4 py-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-lime-100/70 blur-3xl" />
      </div>
      <SocialAuthIntentCleanup />
      <section className="relative w-full max-w-md rounded-2xl border border-gray-200/80 bg-white/95 p-6 text-center shadow-sm backdrop-blur sm:p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-xl text-amber-600">
          !
        </div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">{message}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/signin"
            className="rounded-xl bg-[#008a45] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#007339]"
          >
            {accountAlreadyExists ? 'আগের পদ্ধতিতে সাইন ইন করুন' : 'ইমেইল দিয়ে সাইন ইন'}
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            সাইন আপ
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  return (
    <Suspense
      fallback={
        <div
          aria-label="তথ্য লোড হচ্ছে"
          className="min-h-64 w-full flex-1 animate-pulse bg-[#f8fbf7]"
        />
      }
    >
      <AuthErrorContent searchParams={searchParams} />
    </Suspense>
  );
}
