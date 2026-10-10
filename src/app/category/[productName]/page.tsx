import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryProducts from './CategoryProducts';
import { fetchBazaarApi } from '@/lib/bazaar-api';

interface Category {
  slug: string;
  nameBn: string;
}

interface CategoryPageProps {
  params: Promise<{ productName: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { productName } = await params;
  const categories = await fetchBazaarApi<Category[]>('/categories');
  const category = categories.find((item) => item.slug === productName);

  return {
    title: category ? `ক্যাটাগরি: ${category.nameBn}` : 'ক্যাটাগরি',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { productName } = await params;
  const categories = await fetchBazaarApi<Category[]>('/categories');

  if (!Array.isArray(categories)) {
    throw new Error('The categories API returned an invalid response.');
  }

  if (!categories.some((category) => category.slug === productName)) {
    notFound();
  }

  return <CategoryProducts categorySlug={productName} />;
}
