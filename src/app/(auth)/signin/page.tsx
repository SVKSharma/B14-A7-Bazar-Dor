'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button } from '@heroui/react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import PasswordRequirements from '@/components/auth/PasswordRequirements';
import { clearSocialAuthIntent, setSocialAuthIntent, signIn } from '@/lib/auth-client';
import { isPasswordStrong, PASSWORD_POLICY } from '@/lib/password-policy';

export default function SignInPage() {
  const router = useRouter();

  const getReturnUrl = () => {
    const callbackURL = new URLSearchParams(window.location.search).get('callbackURL');
    return callbackURL?.startsWith('/') && !callbackURL.startsWith('//')
      ? callbackURL
      : '/';
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
    toast.error('সাইন ইন সফল হয়নি!', { id: 'signin-error' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isPasswordStrong(password)) {
      showError(
        `পাসওয়ার্ডে কমপক্ষে ${PASSWORD_POLICY.minLength} অক্ষর, ${PASSWORD_POLICY.minDigits}টি সংখ্যা এবং ${PASSWORD_POLICY.minSymbols}টি বিশেষ চিহ্ন থাকতে হবে!`,
      );
      return;
    }

    try {
      const { error: signInError } = await signIn.email({
        email,
        password,
        callbackURL: getReturnUrl(),
        rememberMe: true,
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success('সাইন ইন সফল হয়েছে!', { id: 'signin-success' });
          router.push(getReturnUrl());
        },
        onError: ({ error: authError }) => {
          showError(authError.message || 'সাইন ইন ব্যর্থ হয়েছে। তথ্যগুলো আবার পরীক্ষা করুন।');
        },
      });

      if (signInError) {
        showError(signInError.message || 'সাইন ইন ব্যর্থ হয়েছে। তথ্যগুলো আবার পরীক্ষা করুন।');
      }
    } catch (err: unknown) {
      console.error('Email sign in failed:', err);
      showError('একটি সমস্যা দেখা দিয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    setSocialAuthIntent('signin');

    try {
      await signIn.social({
        provider,
        callbackURL: getReturnUrl(),
        errorCallbackURL: '/auth/error',
      });
    } catch (err) {
      clearSocialAuthIntent();
      console.error(`${provider} sign in failed`, err);
      toast.error('সাইন ইন সফল হয়নি!', { id: `${provider}-signin-error` });
    }
  };

  return (
    <div className="w-full bg-[#f8fbf7] flex flex-col items-center justify-center px-4 py-6 sm:py-8">
      {/* Title Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
          সাইন ইন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Main Sign In Card */}
      <div className="w-full max-w-md bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-7 shadow-sm">
        {error && (
          <div className="mb-3 p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">ইমেইল</label>
            <Input
              required
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="secondary"
              className="h-11 w-full rounded-xl border border-gray-200 bg-[#f8fbf7] px-3 text-sm shadow-none outline-none transition-colors placeholder:text-gray-400 focus:border-[#008a45] focus:ring-2 focus:ring-[#008a45]/15"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">পাসওয়ার্ড</label>
            <Input
              required
              type="password"
              minLength={PASSWORD_POLICY.minLength}
              placeholder="৮+ অক্ষর, ১ সংখ্যা, ১ চিহ্ন"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              variant="secondary"
              className="h-11 w-full rounded-xl border border-gray-200 bg-[#f8fbf7] px-3 text-sm shadow-none outline-none transition-colors placeholder:text-gray-400 focus:border-[#008a45] focus:ring-2 focus:ring-[#008a45]/15"
            />
            <PasswordRequirements password={password} />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={loading || !isPasswordStrong(password)}
            className="w-full rounded-xl bg-[#008a45] hover:bg-[#007339] text-white font-semibold h-11 mt-1 transition-all shadow-sm"
          >
            {loading ? 'সাইন ইন হচ্ছে…' : 'সাইন ইন'}
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-full border-t border-gray-200/80"></div>
          <span className="absolute bg-white px-3 text-xs text-gray-400">অথবা</span>
        </div>

        {/* Social Auth Buttons with Light Gray Outer Border Box */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignIn('google')}
            className="w-full min-w-0 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center justify-center gap-2 px-2 py-2 bg-gray-50/30"
          >
            <FcGoogle className="text-base shrink-0" />
            <span className="min-w-0 text-center leading-tight">Google দিয়ে চালিয়ে যান</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignIn('github')}
            className="w-full min-w-0 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center justify-center gap-2 px-2 py-2 bg-gray-50/30"
          >
            <FaGithub className="text-base text-gray-900 shrink-0" />
            <span className="min-w-0 text-center leading-tight">GitHub দিয়ে চালিয়ে যান</span>
          </Button>
        </div>

        {/* Sign Up Redirect Link */}
        <div className="text-center mt-4 text-xs text-gray-600">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/signup" className="font-semibold text-[#008a45] hover:underline">
            সাইন আপ করুন
          </Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-4">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-800 transition-colors">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
