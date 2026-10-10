import { notFound } from 'next/navigation';
import CategoryProducts from './CategoryProducts';
import { fetchBazaarApi } from '@/lib/bazaar-api';

interface Category {
  slug: string;
}

interface CategoryPageProps {
  params: Promise<{ productName: string }>;
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
