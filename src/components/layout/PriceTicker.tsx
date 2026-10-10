'use client';

import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { fetchBazaarApi } from '@/lib/bazaar-api';

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
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
  kg: 'কেজি',
  kilogram: 'কেজি',
  kilograms: 'কেজি',
  liter: 'লিটার',
  litre: 'লিটার',
  l: 'লিটার',
  lt: 'লিটার',
  ltr: 'লিটার',
  liters: 'লিটার',
  litres: 'লিটার',
  dozen: 'ডজন',
  piece: 'পিস',
  pcs: 'পিস',
};

export default function PriceTicker() {
  const [tickerProducts, setTickerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await fetchBazaarApi<Product[]>('/products');

        if (Array.isArray(data)) {
          const risers = data
            .filter((p) => p.change?.dir === 'up')
            .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
            .slice(0, 10);

          const fallers = data
            .filter((p) => p.change?.dir === 'down')
            .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
            .slice(0, 10);

          const combined = [...risers, ...fallers].sort(() => Math.random() - 0.5);
          setTickerProducts(combined);
        }
      } catch (error) {
        console.error('Failed to fetch ticker products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div
        role="status"
        aria-label="দামের তথ্য লোড হচ্ছে"
        className="w-full overflow-hidden border-b border-gray-200/80 bg-[#f8fbf7] py-2.5 text-sm"
      >
        <Marquee speed={40} gradient={false} pauseOnHover={false}>
          {Array.from({ length: 10 }, (_, item) => (
            <div
              key={item}
              aria-hidden="true"
              className="flex shrink-0 items-center gap-2 border-r border-emerald-900/10 px-6 py-0.5"
            >
              <span className="skeleton-shimmer h-5 w-5 rounded-full" />
              <span className="skeleton-shimmer h-4 w-20 rounded" />
              <span className="skeleton-shimmer h-4 w-24 rounded" />
              <span className="skeleton-shimmer h-4 w-12 rounded-full" />
            </div>
          ))}
        </Marquee>
      </div>
    );
  }

  if (tickerProducts.length === 0) return null;

  return (
    <div className="w-full bg-[#f8fbf7] border-b border-gray-200/80 py-2.5 overflow-hidden text-sm">
      <Marquee speed={40} gradient={false} pauseOnHover={true}>
        {tickerProducts.map((item) => {
          const isUp = item.change?.dir === 'up';
          const isFlat = item.change?.dir === 'flat';
          const unit = item.unit?.trim().toLowerCase() ?? '';
          const unitBn = UNIT_MAP[unit] || item.unit;
          const absPct = Math.abs(item.change?.pct || 0);

          return (
            <div
              key={item.id}
              className="flex items-center gap-2 px-6 border-r border-gray-200/80 whitespace-nowrap"
            >
              <span className="text-base leading-none flex items-center justify-center">
                {item.image || item.categoryIcon || '🛒'}
              </span>
              <span className="font-medium text-gray-800">{item.nameBn}</span>
              <span className="text-gray-600">
                {item.today} টাকা/{unitBn}
              </span>
              {!isFlat && (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold ${
                    isUp ? 'text-red-500' : 'text-emerald-600'
                  }`}
                >
                  <span>{isUp ? '▲' : '▼'}</span>
                  <span>{absPct}%</span>
                </span>
              )}
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}