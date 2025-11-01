import { currentUser } from '@clerk/nextjs/server';
import { getUserRole } from '@/lib/utils/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminDashboard() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  const role = await getUserRole();

  // Only admin can access
  if (role !== 'admin') {
    redirect('/dashboard/user');
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-blue-900">
        {/* Admin Header */}
        <div className="bg-purple-800/50 backdrop-blur-sm border-b border-purple-600">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                  👑
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-purple-200">Welcome back, {user?.firstName || 'Admin'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                  👑 ADMIN
                </div>
                <Link 
                  href="/"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">👥</div>
                <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">+12%</div>
              </div>
              <div className="text-white text-2xl font-bold">1,234</div>
              <div className="text-purple-200 text-sm">Total Users</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">📝</div>
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">+8%</div>
              </div>
              <div className="text-white text-2xl font-bold">567</div>
              <div className="text-purple-200 text-sm">Total Posts</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">💬</div>
                <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">+25%</div>
              </div>
              <div className="text-white text-2xl font-bold">3,456</div>
              <div className="text-purple-200 text-sm">Comments</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">⚠️</div>
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">3 new</div>
              </div>
              <div className="text-white text-2xl font-bold">12</div>
              <div className="text-purple-200 text-sm">Reports</div>
            </div>
          </div>

          {/* Admin Controls */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                🔧 Admin Controls
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-between">
                  <span>👥 Manage Users</span>
                  <span>→</span>
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-between">
                  <span>📝 Manage Posts</span>
                  <span>→</span>
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-between">
                  <span>⚙️ System Settings</span>
                  <span>→</span>
                </button>
                <button className="w-full bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-between">
                  <span>🗑️ Bulk Delete</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                ⚠️ Recent Reports
              </h2>
              <div className="space-y-3">
                <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-300 text-sm font-semibold">Spam Report</span>
                    <span className="text-red-200 text-xs">2 min ago</span>
                  </div>
                  <p className="text-white text-sm">User reported inappropriate content in post #123</p>
                  <div className="flex gap-2 mt-2">
                    <button className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded">View</button>
                    <button className="text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded">Resolve</button>
                  </div>
                </div>

                <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-300 text-sm font-semibold">Suspicious Activity</span>
                    <span className="text-yellow-200 text-xs">15 min ago</span>
                  </div>
                  <p className="text-white text-sm">Multiple failed login attempts detected</p>
                  <div className="flex gap-2 mt-2">
                    <button className="text-xs bg-yellow-600 hover:bg-yellow-500 text-white px-3 py-1 rounded">View</button>
                    <button className="text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded">Resolve</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">🚀 Quick Admin Actions</h2>
            <p className="text-purple-100 mb-6">Powerful tools at your fingertips</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                📊 Analytics
              </button>
              <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                📧 Send Newsletter
              </button>
              <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                🔒 Security Logs
              </button>
              <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
                💾 Backup Data
              </button>
            </div>
          </div>

          {/* Admin Info Banner */}
          <div className="mt-8 bg-yellow-400 text-purple-900 rounded-xl p-6 flex items-center gap-4">
            <div className="text-5xl">👑</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">You have FULL ADMIN ACCESS</h3>
              <p className="text-purple-800">You can manage all users, posts, and system settings. Use your power wisely! 🙏</p>
            </div>
          </div>
        </div>
      </div>
    );
}
