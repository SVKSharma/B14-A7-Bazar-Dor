import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'প্রোফাইল',
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return children;
}
