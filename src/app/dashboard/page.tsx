import { redirect } from 'next/navigation';
import { getUserRole } from '@/lib/utils/auth';
import { currentUser } from '@clerk/nextjs/server';

// Force dynamic rendering - no caching!
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  const role = await getUserRole();

  console.log('🔍 Dashboard routing - User:', user.id, 'Role:', role);

  // Redirect based on role
  if (role === 'admin') {
    console.log('✅ Redirecting to ADMIN dashboard');
    redirect('/dashboard/admin');
  } else {
    console.log('ℹ️ Redirecting to USER dashboard');
    redirect('/dashboard/user');
  }
}
