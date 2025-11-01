import { auth } from '@clerk/nextjs/server';
import { UserRole } from '@/types';

/**
 * Get user role from Clerk metadata
 */
export async function getUserRole(): Promise<UserRole> {
  const { sessionClaims } = await auth();
  // @ts-ignore - Clerk metadata typing
  const role = sessionClaims?.publicMetadata?.role as UserRole;
  
  console.log('🔍 getUserRole called');
  console.log('  - publicMetadata:', sessionClaims?.publicMetadata);
  console.log('  - detected role:', role);
  console.log('  - returning:', role || 'user');
  
  return role || 'user'; // Default to 'user' role
}

/**
 * Check if user has admin role
 */
export async function isAdmin(): Promise<boolean> {
  const role = await getUserRole();
  return role === 'admin';
}

/**
 * Check if user has specific role
 */
export async function hasRole(requiredRole: UserRole): Promise<boolean> {
  const role = await getUserRole();
  return role === requiredRole;
}
