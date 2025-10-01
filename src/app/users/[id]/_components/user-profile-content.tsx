'use client'

import { useParams } from 'next/navigation';
import { useUsers } from '@/lib/context/users-context';
import { UserProfileHeader } from './user-profile-header';
import { UserProfileCard } from './user-profile-card';
import { UserNotFound } from './user-not-found';

export default function UserProfilePage() {
  const params = useParams();
  const { getUserById } = useUsers();
  const user = getUserById(params.id as string);

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <UserProfileHeader />
        <UserProfileCard user={user} />
      </div>
    </div>
  );
}