'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { TbArrowBack } from 'react-icons/tb';
import { Form, Input, Button } from '@heroui/react';
import { authClient, useSession } from '@/lib/auth-client';
import { capitalizeNameWords, getProfileInitials, MAX_NAME_LENGTH } from '@/lib/user-name';
import { ProfilePageSkeleton } from '@/components/LoadingSkeletons';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);

  const profileName = capitalizeNameWords(name ?? session?.user?.name ?? '');

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();
      if (error) {
        console.error('Failed to sign out:', error);
        return;
      }
      router.push('/signin');
      router.refresh();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateMessage(null);

    const trimmedName = capitalizeNameWords(profileName.trim());
    if (!trimmedName || trimmedName.length > MAX_NAME_LENGTH) {
      setUpdateMessage(`নাম সর্বোচ্চ ${MAX_NAME_LENGTH} অক্ষরের হতে হবে।`);
      return;
    }

    setUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        setUpdateMessage('নাম আপডেট করতে সমস্যা হয়েছে।');
      } else {
        setUpdateMessage('নাম সফলভাবে আপডেট করা হয়েছে!');
      }
    } catch (error) {
      console.error('Failed to update profile name:', error);
      setUpdateMessage('একটি সমস্যা দেখা দিয়েছে।');
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return <ProfilePageSkeleton />;
  }

  const profileInitials = getProfileInitials(session?.user?.name);

  return (
    <div className="w-full flex-1 bg-[#f8fbf7] px-4 py-6 sm:py-8">
      <div className="keep-content-center max-w-lg space-y-5">
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
        <div className="w-full rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-5">
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
              <div className="min-w-0">
                <h2 className="wrap-break-word text-base font-bold leading-tight text-gray-900 sm:text-lg">
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
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <TbArrowBack aria-hidden="true" />
              <span>সাইন আউট</span>
            </Button>
          </div>

          <div className="space-y-4 pt-5">
            <h3 className="text-base font-bold text-gray-900">তথ্য</h3>

            {updateMessage && (
              <div
                className={`rounded-xl border p-2.5 text-xs ${
                  updateMessage.includes('সফলভাবে')
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-red-200 bg-red-50 text-red-600'
                }`}
              >
                {updateMessage}
              </div>
            )}

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