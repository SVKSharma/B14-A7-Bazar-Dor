'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiMenu, HiX } from 'react-icons/hi';
import { authClient, useSession } from '@/lib/auth-client';

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories');
        const data: Category[] = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const firstLetter = session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U';

  return (
    <header className="w-full bg-[#f8fbf7]">
      {/* Top Header Row wrapped in keep-content-center */}
      <div className="keep-content-center flex items-center justify-between py-3.5">
        {/* Brand Logo & Date (Left) */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-[#008a45] rounded-xl flex items-center justify-center text-white text-xl shadow-sm shrink-0">
            🛒
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              শনিবার, ১০ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        {/* Auth Buttons / Profile (Right) */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="w-24 h-9 bg-gray-200/60 animate-pulse rounded-lg"></div>
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-gray-100/85 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#008a45] text-white flex items-center justify-center font-bold overflow-hidden border border-gray-200 text-xs shadow-sm">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user?.name || 'User Profile'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{firstLetter}</span>
                  )}
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                  {session.user?.name}
                </span>
                <span className="text-xs text-gray-500">▼</span>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[50] menu p-2 shadow-xl bg-white rounded-xl w-52 mt-2 border border-gray-100"
              >
                <li>
                  <Link href="/profile" className="text-sm font-medium text-gray-700 py-2">
                    মাই প্রোফাইল
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="text-sm font-medium text-red-600 hover:bg-red-50 py-2"
                  >
                    সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/signin"
                className="text-sm font-semibold text-gray-800 hover:text-[#008a45] transition-colors px-2 py-1.5"
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
            {categories.map((cat) => {
              const href = `/category/${cat.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={cat.id}
                  href={href}
                  className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#008a45] text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100/80 hover:text-gray-900'
                  }`}
                >
                  <span className="text-base leading-none flex items-center justify-center">
                    {cat.icon || '🍚'}
                  </span>
                  <span className="leading-none">{cat.nameBn}</span>
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
              <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#008a45] text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user?.name || 'User Profile'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{firstLetter}</span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {session.user?.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-semibold text-[#008a45]"
                  >
                    মাই প্রোফাইল
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="text-xs font-semibold text-red-600"
                  >
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
                {categories.map((cat) => {
                  const href = `/category/${cat.slug}`;
                  const isActive = pathname === href;

                  return (
                    <Link
                      key={cat.id}
                      href={href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#008a45] text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/60'
                      }`}
                    >
                      <span className="text-sm leading-none">{cat.icon || '🍚'}</span>
                      <span className="leading-none">{cat.nameBn}</span>
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