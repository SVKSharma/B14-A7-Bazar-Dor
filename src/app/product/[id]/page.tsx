import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductBreadcrumb from '@/components/ProductBreadcrumbs';
import ProductDetailsCard from '@/components/ProductDetailsHeader';
import ProductBreakdownTable from '@/components/ProductBreakDownTable';
import { fetchBazaarApi } from '@/lib/bazaar-api';

interface ProductDetails {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
  markets: React.ComponentProps<typeof ProductBreakdownTable>['markets'];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product ? `পণ্যের বিস্তারিত: ${product.nameBn}` : 'পণ্যের বিস্তারিত',
  };
}

async function getProduct(id: string): Promise<ProductDetails | null> {
  try {
    return await fetchBazaarApi<ProductDetails>(`/products/${encodeURIComponent(id)}`, {
      cache: 'no-store',
    });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full bg-[#f8fbf7] min-h-screen py-6 sm:py-8">
      <div className="keep-content-center space-y-6">
        {/* Show the route from the home page to this product. */}
        <ProductBreadcrumb
          categoryNameBn={product.categoryNameBn}
          categorySlug={product.category}
          productNameBn={product.nameBn}
        />

        {/* Summarize the product and its current price. */}
        <ProductDetailsCard
          nameBn={product.nameBn}
          categoryNameBn={product.categoryNameBn}
          unit={product.unit}
          image={product.image}
          categoryIcon={product.categoryIcon}
          todayPrice={product.today}
          yesterdayPrice={product.yesterday}
          changeDir={product.change?.dir}
          changePct={product.change?.pct}
        />

        {/* Compare prices across the listed markets. */}
        <ProductBreakdownTable markets={product.markets} unit={product.unit} />
      </div>
    </div>
  );
}