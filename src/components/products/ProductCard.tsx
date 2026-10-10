import Link from 'next/link';

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
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
  markets: Market[];
}

const UNIT_MAP: Record<string, string> = {
  kg: 'প্রতি কেজি',
  liter: 'প্রতি লিটার',
  litre: 'প্রতি লিটার',
  dozen: 'প্রতি ডজন',
  piece: 'প্রতি পিস',
  pcs: 'প্রতি পিস',
};

export default function ProductCard({ product }: { product: Product }) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const isFlat = product.change?.dir === 'flat' || product.change?.pct === 0;

  const unitBn = UNIT_MAP[product.unit?.toLowerCase()] || `প্রতি ${product.unit}`;
  const absPct = Math.abs(product.change?.pct || 0);

  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-gray-300 transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* Show the product icon beside its name and unit. */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#f4f7f2] flex items-center justify-center text-xl sm:text-2xl shrink-0 group-hover:scale-105 transition-transform">
            {product.image || product.categoryIcon || '🍚'}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug group-hover:text-[#008a45] transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{unitBn}</p>
          </div>
        </div>
      </div>

      {/* Keep today's price and its change easy to compare. */}
      <div className="flex items-end justify-between mt-4">
        <div>
          <span className="text-[11px] text-gray-400 block mb-0.5">আজকের দাম</span>
          <span className="text-lg sm:text-xl font-extrabold text-gray-900 leading-none">
            {product.today} <span className="text-xs font-semibold text-gray-700">টাকা</span>
          </span>
        </div>

        {/* Use color and an arrow to show whether the price changed. */}
        <div>
          {isUp && (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
              <span>▲</span>
              <span>{absPct}%</span>
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <span>▼</span>
              <span>{absPct}%</span>
            </span>
          )}
          {isFlat && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
              <span>—</span>
              <span>0.0%</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}