'use client';

import { useUser } from '@clerk/nextjs';
import { ReactNode } from 'react';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: ('admin' | 'user')[];
  fallback?: ReactNode;
}

/**
 * Role Guard Component
 * Shows content only if user has required role
 */
export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { user } = useUser();

  if (!user) {
    return fallback || null;
  }

  // @ts-ignore - Clerk metadata typing
  const userRole = user.publicMetadata?.role as string;

  if (!allowedRoles.includes(userRole as 'admin' | 'user')) {
    return fallback || null;
  }

  return <>{children}</>;
}

/**
 * Admin Only Component
 * Shorthand for RoleGuard with admin role
 */
export function AdminOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

/**
 * User Only Component
 * Shorthand for RoleGuard with user role
 */
export function UserOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  return (
    <RoleGuard allowedRoles={['user']} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}
