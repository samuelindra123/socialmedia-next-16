'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'user';
  fallbackUrl?: string;
}

/**
 * Protected Route Component
 * Protects routes based on authentication and role
 */
export function ProtectedRoute({ 
  children, 
  requiredRole,
  fallbackUrl = '/' 
}: ProtectedRouteProps) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
      return;
    }

    if (isLoaded && isSignedIn && requiredRole) {
      // @ts-ignore - Clerk metadata typing
      const userRole = user?.publicMetadata?.role as string;
      
      if (userRole !== requiredRole) {
        router.push(fallbackUrl);
      }
    }
  }, [isLoaded, isSignedIn, user, requiredRole, fallbackUrl, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  if (requiredRole) {
    // @ts-ignore - Clerk metadata typing
    const userRole = user?.publicMetadata?.role as string;
    if (userRole !== requiredRole) {
      return null;
    }
  }

  return <>{children}</>;
}
