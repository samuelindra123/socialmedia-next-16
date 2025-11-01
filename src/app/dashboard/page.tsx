import { redirect } from 'next/navigation';
import { getUserRole } from '@/lib/utils/auth';
import { currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  const role = await getUserRole();

  // Redirect based on role
  if (role === 'admin') {
    redirect('/dashboard/admin');
  } else {
    redirect('/dashboard/user');
  }
}
