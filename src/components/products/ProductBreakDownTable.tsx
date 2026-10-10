import { formatBengaliNumber } from '@/lib/format-bengali-number';

export interface MarketItem {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface MarketBreakdownTableProps {
  markets: MarketItem[];
  unit: string;
}

const UNIT_MAP: Record<string, string> = {
  kg: 'কেজি',
  liter: 'লিটার',
  litre: 'লিটার',
  dozen: 'ডজন',
  piece: 'পিস',
  pcs: 'পিস',
};

export default function ProductBreakdownTable({ markets, unit }: MarketBreakdownTableProps) {
  if (!markets || markets.length === 0) return null;

  const unitBn = UNIT_MAP[unit.trim().toLowerCase()] || unit;

  // Summarize the lowest, highest, and average prices across markets.
  const allMins = markets.map((m) => m.min);
  const allMaxs = markets.map((m) => m.max);
  const overallMin = Math.min(...allMins);
  const overallMax = Math.max(...allMaxs);
  const overallAvg = Math.round(
    markets.reduce((acc, curr) => acc + (curr.min + curr.max) / 2, 0) / markets.length
  );

  return (
    <div className="w-full bg-white border border-gray-200/80 rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
      {/* Compare the overall market price range at a glance. */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">বাজার বিশ্লেষণ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#fafdf8] border border-gray-200/60 rounded-xl p-4">
            <span className="text-xs text-gray-500 block mb-1">সর্বনিম্ন দাম</span>
            <div className="text-2xl font-bold text-emerald-600">
              {formatBengaliNumber(overallMin)} <span className="text-xs text-gray-600 font-normal">টাকা / {unitBn}</span>
            </div>
            <span className="text-[11px] text-gray-400">সবচেয়ে কম মূল্যের বাজার</span>
          </div>

          <div className="bg-[#fafdf8] border border-gray-200/60 rounded-xl p-4">
            <span className="text-xs text-gray-500 block mb-1">গড় দাম</span>
            <div className="text-2xl font-bold text-red-500">
              {formatBengaliNumber(overallAvg)} <span className="text-xs text-gray-600 font-normal">টাকা / {unitBn}</span>
            </div>
            <span className="text-[11px] text-gray-400">সকল বাজারের গড় মূল্য</span>
          </div>

          <div className="bg-[#fafdf8] border border-gray-200/60 rounded-xl p-4">
            <span className="text-xs text-gray-500 block mb-1">সর্বোচ্চ দাম</span>
            <div className="text-2xl font-bold text-emerald-600">
              {formatBengaliNumber(overallMax)} <span className="text-xs text-gray-600 font-normal">টাকা / {unitBn}</span>
            </div>
            <span className="text-[11px] text-gray-400">সবচেয়ে বেশি মূল্যের বাজার</span>
          </div>
        </div>
      </div>

      {/* Show today's minimum, maximum, and average price in each market. */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          বাজারভিত্তিক আজকের দর (টাকা / {unitBn})
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200/80">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#f8fbf7] border-b border-gray-200/80 text-gray-600 font-semibold">
                <th className="py-3 px-4">বাজার</th>
                <th className="py-3 px-4">বিভাগ</th>
                <th className="py-3 px-4">সর্বনিম্ন</th>
                <th className="py-3 px-4">সর্বোচ্চ</th>
                <th className="py-3 px-4 text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {markets.map((item, index) => {
                const avg = formatBengaliNumber((item.min + item.max) / 2, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });
                return (
                  <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-medium">{item.market}</td>
                    <td className="py-3 px-4 text-gray-500">{item.division}</td>
                    <td className="py-3 px-4">{formatBengaliNumber(item.min)} টাকা</td>
                    <td className="py-3 px-4">{formatBengaliNumber(item.max)} টাকা</td>
                    <td className="py-3 px-4 text-right font-semibold">{avg} টাকা</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}