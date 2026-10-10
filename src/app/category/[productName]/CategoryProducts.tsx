'use client';

import React, { useEffect, useRef, useState } from 'react';
import ProductCard, { Product } from '@/components/products/ProductCard';
import { formatBengaliNumber } from '@/lib/format-bengali-number';
import { fetchBazaarApi } from '@/lib/bazaar-api';
import { CategoryPageSkeleton } from '@/components/ui/LoadingSkeletons';

type SortOption = 'default' | 'price-low' | 'price-high';

export default function CategoryProducts({ categorySlug }: { categorySlug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        setLoading(true);
        const data = await fetchBazaarApi<Product[]>(
          `/products?category=${encodeURIComponent(categorySlug)}`
        );
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch category products:', error);
      } finally {
        setLoading(false);
      }
    }

    if (categorySlug) {
      fetchCategoryProducts();
    }
  }, [categorySlug]);

  useEffect(() => {
    if (!isSortMenuOpen) return;

    function handleOutsideClick(event: MouseEvent) {
      if (!sortMenuRef.current?.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsSortMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSortMenuOpen]);

  // Handle Client-Side Sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.today - b.today;
    if (sortBy === 'price-high') return b.today - a.today;
    return 0;
  });

  const categoryName = products[0]?.categoryNameBn || 'ক্যাটাগরি';
  const categoryIcon = products[0]?.categoryIcon || products[0]?.image || '🍚';
  const sortLabels: Record<SortOption, string> = {
    default: 'ডিফল্ট',
    'price-low': 'কম থেকে বেশি',
    'price-high': 'বেশি থেকে কম',
  };

  if (loading) {
    return <CategoryPageSkeleton />;
  }

  return (
    <div className="w-full bg-[#f8fbf7] min-h-screen py-6 sm:py-8">
      <div className="keep-content-center space-y-6">
        {/* 1. Category Header Card */}
        <div className="w-full bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#f4f7f2] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
              {categoryIcon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {categoryName}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                প্রতি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>

        </div>

        {/* Keep the product count and sorting control on one line. */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-500">
            মোট {formatBengaliNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
          <div className="relative" ref={sortMenuRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isSortMenuOpen}
              aria-label={`পণ্যের দাম অনুযায়ী সাজান: ${sortLabels[sortBy]}`}
              onClick={() => setIsSortMenuOpen((isOpen) => !isOpen)}
              className="flex min-w-48 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 text-left shadow-sm transition-all hover:border-[#008a45]/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#008a45]/20"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-xs sm:text-sm font-medium text-gray-500">সাজান:</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-800">
                  {sortLabels[sortBy]}
                </span>
              </span>
              <span
                className={`text-xs text-[#008a45] transition-transform duration-200 ${
                  isSortMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                ▼
              </span>
            </button>
            {isSortMenuOpen && (
              <div
                role="listbox"
                aria-label="পণ্যের দাম অনুযায়ী সাজান"
                className="absolute right-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-lg"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={sortBy === option}
                    onClick={() => {
                      setSortBy(option);
                      setIsSortMenuOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      sortBy === option
                        ? 'bg-[#eef5eb] font-semibold text-[#008a45]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {sortLabels[option]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
