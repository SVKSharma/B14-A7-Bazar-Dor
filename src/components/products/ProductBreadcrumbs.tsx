import Link from 'next/link';

interface ProductBreadcrumbsProps {
  categoryNameBn: string;
  categorySlug: string;
  productNameBn: string;
}

export default function ProductBreadcrumbs({
  categoryNameBn,
  categorySlug,
  productNameBn,
}: ProductBreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 py-3">
      <Link href="/" className="hover:text-[#008a45] transition-colors">
        হোম
      </Link>
      {/* Chevrons separate each step in the path to this product. */}
      <span aria-hidden="true">&gt;</span>
      <Link href={`/category/${categorySlug}`} className="hover:text-[#008a45] transition-colors">
        {categoryNameBn}
      </Link>
      <span aria-hidden="true">&gt;</span>
      <span className="text-gray-900 font-medium">{productNameBn}</span>
    </nav>
  );
}