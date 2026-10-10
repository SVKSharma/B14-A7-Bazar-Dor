'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Form, Input, Button } from '@heroui/react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import PasswordRequirements from '@/components/auth/PasswordRequirements';
import { clearSocialAuthIntent, setSocialAuthIntent, signIn, signUp } from '@/lib/auth-client';
import { isPasswordStrong, PASSWORD_POLICY } from '@/lib/password-policy';
import { capitalizeNameWords, MAX_NAME_LENGTH } from '@/lib/user-name';

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showError = (message: string) => {
    setError(message);
    toast.error('সাইন আপ সফল হয়নি!', { id: 'signup-error' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      showError('পাসওয়ার্ড মিলছে না!');
      return;
    }

    if (password.length < 8) {
      showError(
        `পাসওয়ার্ডে কমপক্ষে ${PASSWORD_POLICY.minLength} অক্ষর, ${PASSWORD_POLICY.minDigits}টি সংখ্যা এবং ${PASSWORD_POLICY.minSymbols}টি বিশেষ চিহ্ন থাকতে হবে!`,
      );
      return;
    }

    if (!isPasswordStrong(password)) {
      showError(
        `পাসওয়ার্ডে কমপক্ষে ${PASSWORD_POLICY.minLength} অক্ষর, ${PASSWORD_POLICY.minDigits}টি সংখ্যা এবং ${PASSWORD_POLICY.minSymbols}টি বিশেষ চিহ্ন থাকতে হবে!`,
      );
      return;
    }

    const trimmedName = capitalizeNameWords(name.trim());
    if (!trimmedName || trimmedName.length > MAX_NAME_LENGTH) {
      showError(`নাম সর্বোচ্চ ${MAX_NAME_LENGTH} অক্ষরের হতে হবে।`);
      return;
    }

    try {
      const { error: signUpError } = await signUp.email({
        name: trimmedName,
        email,
        password,
        callbackURL: '/',
      }, {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success('সাইন আপ সফল হয়েছে!', { id: 'signup-success' });
          router.push('/');
        },
        onError: ({ error: authError }) => {
          showError(authError.message || 'সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
        },
      });

      if (signUpError) {
        showError(signUpError.message || 'সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch (err: unknown) {
      console.error('Email sign up failed:', err);
      showError('একটি সমস্যা দেখা দিয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: 'google' | 'github') => {
    setSocialAuthIntent('signup');

    try {
      await signIn.social({
        provider,
        callbackURL: '/',
        errorCallbackURL: '/auth/error',
      });
    } catch (err) {
      clearSocialAuthIntent();
      console.error(`${provider} sign up failed`, err);
      toast.error('সাইন আপ সফল হয়নি!', { id: `${provider}-signup-error` });
    }
  };

  return (
    <div className="w-full bg-[#f8fbf7] flex flex-col items-center justify-center px-4 py-6 sm:py-8">
      {/* Title Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Main Sign Up Card */}
      <div className="w-full max-w-md bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-7 shadow-sm">
        {error && (
          <div className="mb-3 p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl">
            {error}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">নাম</label>
            <Input
              required
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              maxLength={MAX_NAME_LENGTH}
              value={name}
              onChange={(event) => setName(capitalizeNameWords(event.target.value))}
              variant="secondary"
              className="h-11 w-full rounded-xl border border-gray-200 bg-[#f8fbf7] px-3 text-sm shadow-none outline-none transition-colors placeholder:text-gray-400 focus:border-[#008a45] focus:ring-2 focus:ring-[#008a45]/15"
            />
            <p className="text-right text-[11px] text-gray-400">
              {name.length}/{MAX_NAME_LENGTH}
            </p>
          </div>

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

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</label>
            <Input
              required
              type="password"
              minLength={PASSWORD_POLICY.minLength}
              placeholder="আবার লিখুন"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              variant="secondary"
              className="h-11 w-full rounded-xl border border-gray-200 bg-[#f8fbf7] px-3 text-sm shadow-none outline-none transition-colors placeholder:text-gray-400 focus:border-[#008a45] focus:ring-2 focus:ring-[#008a45]/15"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-[11px] font-medium text-red-500">
                পাসওয়ার্ড দুটি এক নয়।
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isDisabled={loading || !isPasswordStrong(password) || password !== confirmPassword}
            className="w-full rounded-xl bg-[#008a45] hover:bg-[#007339] text-white font-semibold h-11 mt-1 transition-all shadow-sm"
          >
            {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে…' : 'অ্যাকাউন্ট তৈরি করুন'}
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative my-4 flex items-center justify-center">
          <div className="w-full border-t border-gray-200/80"></div>
          <span className="absolute bg-white px-3 text-xs text-gray-400">অথবা</span>
        </div>

        {/* Keep social sign-in buttons consistent with the sign-in page. */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignUp('google')}
            className="w-full min-w-0 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center justify-center gap-2 px-2 py-2 bg-gray-50/30"
          >
            <FcGoogle className="text-base shrink-0" />
            <span className="min-w-0 text-center leading-tight">Google দিয়ে চালিয়ে যান</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignUp('github')}
            className="w-full min-w-0 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs font-medium text-gray-700 flex items-center justify-center gap-2 px-2 py-2 bg-gray-50/30"
          >
            <FaGithub className="text-base text-gray-900 shrink-0" />
            <span className="min-w-0 text-center leading-tight">GitHub দিয়ে চালিয়ে যান</span>
          </Button>
        </div>

        {/* Sign In Redirect Link */}
        <div className="text-center mt-4 text-xs text-gray-600">
          অ্যাকাউন্ট আছে?{' '}
          <Link href="/signin" className="font-semibold text-[#008a45] hover:underline">
            সাইন ইন করুন
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
