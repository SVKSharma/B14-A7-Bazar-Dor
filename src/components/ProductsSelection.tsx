'use client';

import React, { useEffect, useState } from 'react';
import ProductCard, { Product } from './ProductCard';
import { fetchBazaarApi } from '@/lib/bazaar-api';

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetchBazaarApi<Product[]>('/products');
        if (Array.isArray(data)) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Show the six products with the largest price increases.
  const priceIncreased = products
    .filter((p) => p.change?.dir === 'up')
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  // Show the six products with the largest price drops.
  const priceDropped = products
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  if (loading) {
    return (
      <section className="w-full bg-[#f8fbf7] py-8">
        <div className="keep-content-center space-y-8">
          <div className="h-8 bg-gray-200/60 rounded-md w-48 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200/50 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sob-panno" className="w-full bg-[#f8fbf7] py-8 sm:py-12 space-y-10 sm:space-y-12">
      <div className="keep-content-center space-y-10 sm:space-y-12">
        {/* Highlight products whose prices went up. */}
        {priceIncreased.length > 0 && (
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-sm sm:text-base">▲</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                আজ দাম বেড়েছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {priceIncreased.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Highlight products whose prices went down. */}
        {priceDropped.length > 0 && (
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-emerald-600 text-sm sm:text-base">▼</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                আজ দাম কমেছে
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {priceDropped.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* List every product after the price highlights. */}
        <div className="space-y-4 sm:space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              সব পণ্য
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              মোট {products.length}টি পণ্য দেখানো হচ্ছে
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}