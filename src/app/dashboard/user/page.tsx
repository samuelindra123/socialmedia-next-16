import { currentUser } from '@clerk/nextjs/server';
import { getUserRole } from '@/lib/utils/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function UserDashboard() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  const role = await getUserRole();

  // Redirect admin to admin dashboard
  if (role === 'admin') {
    redirect('/dashboard/admin');
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* User Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-md">
                  👤
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">My Dashboard</h1>
                  <p className="text-gray-600">Welcome back, {user?.firstName || 'User'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2">
                  👤 USER
                </div>
                <Link 
                  href="/"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">📝</div>
                <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">Active</div>
              </div>
              <div className="text-gray-800 text-2xl font-bold">12</div>
              <div className="text-gray-600 text-sm">My Posts</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">💖</div>
                <div className="bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">+5 today</div>
              </div>
              <div className="text-gray-800 text-2xl font-bold">234</div>
              <div className="text-gray-600 text-sm">Total Likes</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">💬</div>
                <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">3 new</div>
              </div>
              <div className="text-gray-800 text-2xl font-bold">89</div>
              <div className="text-gray-600 text-sm">Comments</div>
            </div>
          </div>

          {/* User Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                ✍️ Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-between">
                  <span>✍️ Create New Post</span>
                  <span>→</span>
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-between">
                  <span>📖 View My Posts</span>
                  <span>→</span>
                </button>
                <button className="w-full bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-between">
                  <span>⚙️ Account Settings</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                🌟 Recent Activity
              </h2>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 text-sm font-semibold">New Like</span>
                    <span className="text-blue-400 text-xs">5 min ago</span>
                  </div>
                  <p className="text-gray-700 text-sm">Someone liked your post "Morning Devotion"</p>
                </div>

                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-600 text-sm font-semibold">New Comment</span>
                    <span className="text-green-400 text-xs">1 hour ago</span>
                  </div>
                  <p className="text-gray-700 text-sm">John commented on your post: "Amen! 🙏"</p>
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-600 text-sm font-semibold">Post Published</span>
                    <span className="text-purple-400 text-xs">2 hours ago</span>
                  </div>
                  <p className="text-gray-700 text-sm">Your post "Daily Reflection" is now live!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Post CTA */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">✍️ Share Your Faith</h2>
            <p className="text-blue-100 mb-6">Write a devotional or reflection to inspire others</p>
            <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all">
              📝 Create New Post
            </button>
          </div>

          {/* User Info Card */}
          <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6 flex items-center gap-4">
            <div className="text-5xl">👤</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Regular User Account</h3>
              <p className="text-gray-600">You can create posts, comment, and interact with the community. Need more features? Contact admin!</p>
            </div>
          </div>

          {/* Limited Access Notice */}
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-gray-600 text-sm">
              ℹ️ Some features are restricted to admin users. If you need admin access, please contact the administrator.
            </p>
          </div>
        </div>
      </div>
    );
}
