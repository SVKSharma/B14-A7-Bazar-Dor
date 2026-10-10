'use client';

import { useEffect } from 'react';
import { clearSocialAuthIntent } from '@/lib/auth-client';

export default function SocialAuthIntentCleanup() {
  useEffect(() => {
    clearSocialAuthIntent();
  }, []);

  return null;
}
