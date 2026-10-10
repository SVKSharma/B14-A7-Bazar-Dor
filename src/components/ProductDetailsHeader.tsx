import { formatBengaliNumber } from '@/lib/format-bengali-number';

interface ProductHeaderCardProps {
  nameBn: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  categoryIcon: string;
  todayPrice: number;
  yesterdayPrice: number;
  changeDir: 'up' | 'down' | 'flat';
  changePct: number;
}

const UNIT_MAP: Record<string, string> = {
  kg: 'কেজি',
  liter: 'লিটার',
  litre: 'লিটার',
  dozen: 'ডজন',
  piece: 'পিস',
  pcs: 'পিস',
};

export default function ProductDetailsCard({
  nameBn,
  categoryNameBn,
  unit,
  image,
  categoryIcon,
  todayPrice,
  yesterdayPrice,
  changeDir,
  changePct,
}: ProductHeaderCardProps) {
  const diff = todayPrice - yesterdayPrice;
  const diffText =
    diff > 0
      ? `গতকালকের তুলনায় আজ বেড়েছে +${formatBengaliNumber(diff)} টাকা`
      : diff < 0
      ? `গতকালকের তুলনায় আজ কমেছে ${formatBengaliNumber(Math.abs(diff))} টাকা`
      : 'গতকালকের তুলনায় আজ অপরিবর্তিত';

  const unitBn = UNIT_MAP[unit?.trim().toLowerCase()] || unit;
  const isUp = changeDir === 'up';
  const isDown = changeDir === 'down';
  const absPct = Math.abs(changePct || 0);

  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
      {/* Show the product name, category, unit, and daily price change. */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#f4f7f2] flex items-center justify-center text-3xl sm:text-4xl shrink-0">
          {image || categoryIcon || '🍚'}
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {nameBn}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {unitBn} • {categoryNameBn}
          </p>
          <p className="text-xs sm:text-sm font-medium text-gray-600 mt-2">
            {diffText}
          </p>
        </div>
      </div>

      {/* Highlight today's price and its unit. */}
      <div className="w-full sm:w-auto bg-[#fafcf9] border border-gray-200/60 rounded-xl p-4 text-center sm:text-right shrink-0">
        <span className="text-xs text-gray-400 block mb-1">আজকের দাম</span>
        <div className="text-2xl sm:text-3xl font-black text-gray-900 leading-none mb-2">
          {formatBengaliNumber(todayPrice)} <span className="text-sm font-bold text-gray-600">টাকা / {unitBn}</span>
        </div>

        {/* Indicate the direction and size of the percentage change. */}
        {isUp && (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
            <span>▲</span>
            <span>+{formatBengaliNumber(absPct, { maximumFractionDigits: 2 })}%</span>
          </span>
        )}
        {isDown && (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
            <span>▼</span>
            <span>-{formatBengaliNumber(absPct, { maximumFractionDigits: 2 })}%</span>
          </span>
        )}
        {!isUp && !isDown && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
            <span>—</span>
            <span>{formatBengaliNumber(0, { minimumFractionDigits: 1 })}%</span>
          </span>
        )}
      </div>
    </div>
  );
}