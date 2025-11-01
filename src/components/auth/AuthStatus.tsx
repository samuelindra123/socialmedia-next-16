'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

/**
 * User Role Badge Component
 * Displays user's role with color coding
 */
export function UserRoleBadge() {
  const { user } = useUser();

  if (!user) return null;

  // @ts-ignore - Clerk metadata typing
  const role = user.publicMetadata?.role as string || 'user';

  const roleStyles = {
    admin: 'bg-purple-100 text-purple-800 border-purple-300',
    user: 'bg-blue-100 text-blue-800 border-blue-300',
  };

  const roleIcons = {
    admin: '👑',
    user: '👤',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${roleStyles[role as keyof typeof roleStyles]}`}>
      <span>{roleIcons[role as keyof typeof roleIcons]}</span>
      <span className="capitalize">{role}</span>
    </div>
  );
}

/**
 * Auth Status Component
 * Shows authentication status and quick actions
 */
export function AuthStatus() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="animate-pulse bg-gray-200 h-8 w-24 rounded-full"></div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex gap-2">
        <Link 
          href="/sign-in"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          Masuk
        </Link>
        <Link 
          href="/sign-up"
          className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
        >
          Daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="text-right hidden sm:block">
        <p className="text-sm font-medium text-gray-900">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
      </div>
      <UserRoleBadge />
    </div>
  );
}
