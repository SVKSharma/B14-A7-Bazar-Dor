'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { TbArrowBack } from 'react-icons/tb';
import { Form, Input, Button } from '@heroui/react';
import { authClient, useSession } from '@/lib/auth-client';
import { capitalizeNameWords, getProfileInitials, MAX_NAME_LENGTH } from '@/lib/user-name';
import { ProfilePageSkeleton } from '@/components/ui/LoadingSkeletons';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const profileName = capitalizeNameWords(name ?? session?.user?.name ?? '');

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        console.error('Failed to sign out:', error);
        toast.error('সাইন আউট সফল হয়নি!', { id: 'signout-error' });
        return;
      }
      toast.success('সাইন আউট সফল হয়েছে!', { id: 'signout-success' });
      router.push('/signin');
      router.refresh();
    } catch (error) {
      console.error('Failed to sign out:', error);
      toast.error('সাইন আউট সফল হয়নি!', { id: 'signout-error' });
    }
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = capitalizeNameWords(profileName.trim());
    if (!trimmedName || trimmedName.length > MAX_NAME_LENGTH) {
      toast.error('প্রোফাইল আপডেট সফল হয়নি!', { id: 'profile-update-error' });
      return;
    }

    setUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error('প্রোফাইল আপডেট সফল হয়নি!', { id: 'profile-update-error' });
      } else {
        toast.success('প্রোফাইল আপডেট সফল হয়েছে!', { id: 'profile-update-success' });
      }
    } catch (error) {
      console.error('Failed to update profile name:', error);
      toast.error('প্রোফাইল আপডেট সফল হয়নি!', { id: 'profile-update-error' });
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return <ProfilePageSkeleton />;
  }

  const profileInitials = getProfileInitials(session?.user?.name);

  return (
    <div className="relative w-full flex-1 overflow-hidden bg-[#f8fbf7] py-6 sm:py-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-lime-100/70 blur-3xl" />
      </div>
      <div className="keep-content-center relative max-w-lg space-y-5">
        {/* Keep the profile heading compact, like the auth forms. */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Keep account details and profile editing within one compact card. */}
        <div className="w-full rounded-2xl border border-gray-200/80 bg-white/95 p-4 shadow-sm backdrop-blur sm:p-8">
          <div className="flex flex-col gap-3 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#008a45] text-2xl font-bold text-white shadow-sm">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user?.name || 'Profile Picture'}
                    width={56}
                    height={56}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{profileInitials}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h2
                  title={capitalizeNameWords(session?.user?.name || 'ইউজার')}
                  className="truncate whitespace-nowrap text-base font-bold leading-tight text-gray-900 sm:text-lg"
                >
                  {capitalizeNameWords(session?.user?.name || 'ইউজার')}
                </h2>
                <p className="mt-0.5 truncate text-xs text-gray-500">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleSignOut}
              className="flex shrink-0 items-center gap-1.5 self-end rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 sm:self-auto"
            >
              <TbArrowBack aria-hidden="true" />
              <span>সাইন আউট</span>
            </Button>
          </div>

          <div className="space-y-4 pt-5">
            <h3 className="text-base font-bold text-gray-900">তথ্য</h3>

            <Form onSubmit={handleUpdateName} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-700">নাম</label>
                <Input
                  required
                  type="text"
                  value={profileName}
                  maxLength={MAX_NAME_LENGTH}
                  onChange={(event) => setName(event.target.value)}
                  variant="secondary"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-[#f8fbf7] px-3 text-sm shadow-none outline-none transition-colors placeholder:text-gray-400 focus:border-[#008a45] focus:ring-2 focus:ring-[#008a45]/15"
                />
                <p className="text-right text-[11px] text-gray-400">
                  {profileName.length}/{MAX_NAME_LENGTH}
                </p>
              </div>

              <Button
                type="submit"
                isDisabled={updating}
                className="mt-1 h-11 w-full rounded-xl bg-[#008a45] font-semibold text-white shadow-sm transition-colors hover:bg-[#007339]"
              >
                {updating ? 'আপডেট হচ্ছে…' : 'আপডেট'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
