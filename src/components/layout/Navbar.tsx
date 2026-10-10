'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link, { useLinkStatus } from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiMenu, HiX } from 'react-icons/hi';
import { GoPerson } from 'react-icons/go';
import { TbArrowBack } from 'react-icons/tb';
import { authClient, consumeSocialAuthIntent, useSession } from '@/lib/auth-client';
import { fetchBazaarApi } from '@/lib/bazaar-api';
import { getProfileDisplayName, getProfileInitials } from '@/lib/user-name';
import BrandTrolleyIcon from '@/components/ui/BrandTrolleyIcon';
import CurrentBanglaDate from '@/components/ui/CurrentBanglaDate';

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

function LinkLoadingSkeleton() {
  const { pending } = useLinkStatus();

  if (!pending) return null;

  return (
    <span
      aria-hidden="true"
      className="skeleton-shimmer pointer-events-none absolute inset-0 z-10 rounded-md"
    />
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isPending || !session) return;

    const intent = consumeSocialAuthIntent();
    if (intent === 'signin') {
      toast.success('সাইন ইন সফল হয়েছে!', { id: 'social-signin-success' });
    } else if (intent === 'signup') {
      toast.success('সাইন আপ সফল হয়েছে!', { id: 'social-signup-success' });
    }
  }, [isPending, session]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await fetchBazaarApi<Category[]>('/categories');
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        console.error('Failed to sign out:', error);
        toast.error('সাইন আউট সফল হয়নি!', { id: 'signout-error' });
        return;
      }
      toast.success('সাইন আউট সফল হয়েছে!', { id: 'signout-success' });
      window.setTimeout(() => {
        window.location.reload();
      }, 850);
    } catch (error) {
      console.error('Failed to sign out:', error);
      toast.error('সাইন আউট সফল হয়নি!', { id: 'signout-error' });
    }
  };

  const profileInitials = getProfileInitials(session?.user?.name);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f8fbf7]">
      {/* Top Header Row wrapped in keep-content-center */}
      <div className="keep-content-center flex items-center justify-between py-3.5">
        {/* Brand Logo & Date (Left) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#008a45] text-xl text-white shadow-sm">
            <BrandTrolleyIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <CurrentBanglaDate className="mt-0.5 block text-[11px] text-gray-500 sm:text-xs" />
          </div>
        </Link>

        {/* Auth Buttons / Profile (Right) */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div aria-label="অ্যাকাউন্ট লোড হচ্ছে" className="flex items-center gap-2 rounded-full border border-emerald-900/5 bg-white px-3 py-1.5">
              <span aria-hidden="true" className="skeleton-shimmer h-8 w-8 rounded-full" />
              <span aria-hidden="true" className="skeleton-shimmer h-4 w-20 rounded" />
            </div>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-gray-100/85 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#008a45] text-white flex items-center justify-center font-bold overflow-hidden border border-gray-200 text-xs shadow-sm">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user?.name || 'User Profile'}
                      width={32}
                      height={32}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{profileInitials}</span>
                  )}
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                  {getProfileDisplayName(session.user?.name)}
                </span>
                <span className="text-xs text-gray-500">▼</span>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-50 menu w-72 gap-1 rounded-2xl border border-gray-100 bg-white p-2.5 shadow-xl shadow-gray-900/10 mt-2"
              >
                <li className="pointer-events-none mb-1 border-b border-gray-100 px-3 py-2.5">
                  <span className="block truncate text-sm font-semibold text-gray-900">
                    {getProfileDisplayName(session.user?.name)}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-gray-500">
                    {session.user?.email}
                  </span>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-[#f4f7f2] hover:text-[#008a45]"
                  >
                    <GoPerson aria-hidden="true" className="text-base" />
                    আমার প্রোফাইল
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <TbArrowBack aria-hidden="true" className="text-base" />
                    সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="px-2 py-1.5 text-sm font-semibold text-gray-800 transition-colors hover:text-[#008a45]"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 text-sm font-semibold text-white bg-[#008a45] hover:bg-[#007339] active:scale-95 rounded-lg shadow-md shadow-emerald-700/20 transition-all"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100/80 rounded-lg text-2xl transition-colors"
          aria-label="Toggle Navigation Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation-menu"
        >
          {isMobileMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Category Links Row with Top Divider */}
      <div className="hidden w-full border-t border-gray-200/60 md:block">
        <div className="keep-content-center py-2.5">
          <nav className="flex items-center justify-center gap-5 overflow-x-auto no-scrollbar">
            {categoriesLoading
              ? [0, 1, 2, 3, 4].map((item) => (
                  <div key={item} aria-hidden="true" className="flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5">
                    <span className="skeleton-shimmer h-5 w-5 rounded-full" />
                    <span className={`skeleton-shimmer h-3 rounded ${item % 2 === 0 ? 'w-14' : 'w-20'}`} />
                  </div>
                ))
              : categories.map((cat) => {
              const href = `/category/${cat.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`relative inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#008a45] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                  }`}
                >
                  <span className="text-base leading-none flex items-center justify-center">
                    {cat.icon || '🍚'}
                  </span>
                  <span className="leading-none">{cat.nameBn}</span>
                  <LinkLoadingSkeleton />
                </Link>
              );
              })}
          </nav>
        </div>
      </div>

      {/* Bottom Divider Line */}
      <div className="w-full border-b-2 border-gray-200"></div>

      {/* Mobile Dropdown Menu wrapped in keep-content-center */}
      <div
        id="mobile-navigation-menu"
        aria-hidden={!isMobileMenuOpen}
        inert={!isMobileMenuOpen}
        className={`md:hidden overflow-y-auto border-t border-gray-200 bg-white shadow-lg transition-[max-height,opacity] duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-[80vh] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="keep-content-center py-4 space-y-4">
            {!session ? (
              <div className="flex flex-col gap-2 pb-3 border-b border-gray-100">
                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-white bg-[#008a45] hover:bg-[#007339] rounded-lg shadow-sm transition-all"
                >
                  সাইন আপ
                </Link>
                <Link
                  href="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-gray-800 border border-gray-200 hover:bg-gray-50 rounded-lg transition-all"
                >
                  সাইন ইন
                </Link>
              </div>
            ) : (
              <div className="rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50 to-white p-3.5 shadow-sm">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#008a45] text-xs font-bold text-white shadow-sm">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user?.name || 'User Profile'}
                        width={44}
                        height={44}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{profileInitials}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {getProfileDisplayName(session.user?.name)}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {session.user?.email}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-emerald-100 pt-3">
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-[#008a45] shadow-sm ring-1 ring-emerald-100 transition-colors hover:bg-emerald-50"
                  >
                    <GoPerson aria-hidden="true" className="text-sm" />
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-100 transition-colors hover:bg-red-50"
                  >
                    <TbArrowBack aria-hidden="true" className="text-sm" />
                    সাইন আউট
                  </button>
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                ক্যাটাগরি সমূহ
              </p>
              <nav className="flex flex-wrap gap-2">
                {categoriesLoading
                  ? [0, 1, 2, 3, 4, 5].map((item) => (
                      <span key={item} aria-hidden="true" className="inline-flex items-center gap-1.5 rounded-md border border-emerald-900/5 bg-white px-2.5 py-1.5">
                        <span className="skeleton-shimmer h-4 w-4 rounded-full" />
                        <span className={`skeleton-shimmer h-3 rounded ${item % 2 === 0 ? 'w-10' : 'w-14'}`} />
                      </span>
                    ))
                  : categories.map((cat) => {
                  const href = `/category/${cat.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={cat.id}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#008a45] text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/60'
                      }`}
                    >
                      <span className="text-sm leading-none">{cat.icon || '🍚'}</span>
                      <span className="leading-none">{cat.nameBn}</span>
                    <LinkLoadingSkeleton />
                    </Link>
                  );
                  })}
              </nav>
            </div>
          </div>
      </div>
    </header>
  );
}
