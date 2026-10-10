import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'সাইন ইন',
};

export default function SignInLayout({ children }: { children: ReactNode }) {
  return children;
}
