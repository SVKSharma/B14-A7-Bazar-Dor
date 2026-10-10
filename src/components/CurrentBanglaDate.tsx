'use client';

import { useEffect, useState } from 'react';
import { formatBengaliDate } from '@/lib/bengali-date';

interface CurrentBanglaDateProps {
  className?: string;
}

export default function CurrentBanglaDate({ className }: CurrentBanglaDateProps) {
  const [dateText, setDateText] = useState(() => formatBengaliDate());

  useEffect(() => {
    const updateDate = () => {
      setDateText(formatBengaliDate());
    };

    updateDate();
    const intervalId = window.setInterval(updateDate, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {dateText}
    </span>
  );
}
