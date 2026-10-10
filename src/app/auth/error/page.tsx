import Link from 'next/link';

interface AuthErrorPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const { error } = await searchParams;
  const accountAlreadyExists = error === 'account_not_linked';

  const title = accountAlreadyExists
    ? 'এই ইমেইল দিয়ে অ্যাকাউন্ট আগে থেকেই আছে'
    : 'সাইন ইন করা যায়নি';
  const message = accountAlreadyExists
    ? 'এই ইমেইল ঠিকানায় আগে থেকেই একটি অ্যাকাউন্ট আছে। আপনার অ্যাকাউন্টে প্রবেশ করতে ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।'
    : 'সাইন ইন করার সময় একটি সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা ইমেইল ও পাসওয়ার্ড দিয়ে সাইন ইন করুন।';

  return (
    <div className="flex w-full flex-1 items-center justify-center bg-[#f8fbf7] px-4 py-8">
      <section className="w-full max-w-md rounded-2xl border border-gray-200/80 bg-white p-6 text-center shadow-sm sm:p-8">
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
            ইমেইল দিয়ে সাইন ইন
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
