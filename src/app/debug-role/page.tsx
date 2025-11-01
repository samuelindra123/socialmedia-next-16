'use client';

import { useUser } from '@clerk/nextjs';

export default function DebugRole() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="p-8 bg-yellow-100">Loading...</div>;
  }

  if (!user) {
    return <div className="p-8 bg-red-100">Not logged in</div>;
  }

  // @ts-ignore
  const role = user.publicMetadata?.role as string | undefined;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">🔍 Debug Role</h1>

        {/* User Info */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">👤 User Info</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">ID:</span> {user.id}</p>
            <p><span className="font-semibold">Email:</span> {user.primaryEmailAddress?.emailAddress}</p>
            <p><span className="font-semibold">Username:</span> {user.username}</p>
            <p><span className="font-semibold">First Name:</span> {user.firstName}</p>
            <p><span className="font-semibold">Last Name:</span> {user.lastName}</p>
          </div>
        </div>

        {/* Metadata */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">📦 Public Metadata</h2>
          <pre className="bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto">
            {JSON.stringify(user.publicMetadata, null, 2)}
          </pre>
        </div>

        {/* Role Detection */}
        <div className={`rounded-xl p-6 border-4 ${
          role === 'admin' 
            ? 'bg-purple-100 border-purple-600' 
            : role === 'user'
            ? 'bg-blue-100 border-blue-600'
            : 'bg-red-100 border-red-600'
        }`}>
          <h2 className="text-xl font-bold mb-4">🎯 Detected Role</h2>
          <div className="space-y-3">
            <p className="text-2xl font-bold">
              {role ? (
                <>
                  {role === 'admin' ? '👑' : '👤'} {role.toUpperCase()}
                </>
              ) : (
                '❌ NO ROLE (will default to "user")'
              )}
            </p>
            
            <div className="bg-white/50 p-4 rounded-lg">
              <p className="font-mono text-sm">
                <span className="font-semibold">Raw value:</span> {role ? `"${role}"` : 'undefined'}
              </p>
              <p className="font-mono text-sm">
                <span className="font-semibold">Type:</span> {typeof role}
              </p>
              <p className="font-mono text-sm">
                <span className="font-semibold">Is admin?</span> {role === 'admin' ? '✅ YES' : '❌ NO'}
              </p>
              <p className="font-mono text-sm">
                <span className="font-semibold">Is user?</span> {role === 'user' ? '✅ YES' : '❌ NO'}
              </p>
            </div>
          </div>
        </div>

        {/* Expected Redirect */}
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">🔄 Expected Redirect</h2>
          <p className="text-lg">
            Based on role <span className="font-bold">{role || '(none)'}</span>, 
            you should be redirected to:
          </p>
          <p className="text-2xl font-bold mt-2">
            {role === 'admin' ? (
              <span className="text-purple-600">👑 /dashboard/admin</span>
            ) : (
              <span className="text-blue-600">👤 /dashboard/user</span>
            )}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">⚠️ If Role is Wrong</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Check Clerk Dashboard → Users → Your user</li>
            <li>Look at <strong>Public metadata</strong> section</li>
            <li>Should show: <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">{"{ \"role\": \"admin\" }"}</code></li>
            <li>If empty or wrong, click Edit and set it</li>
            <li><strong>IMPORTANT:</strong> After changing, LOGOUT and LOGIN again!</li>
            <li>Clear browser cache if needed</li>
            <li>Refresh this page to see updated role</li>
          </ol>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <a 
            href="/dashboard" 
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-lg font-bold text-center transition-colors"
          >
            Go to Dashboard
          </a>
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-lg font-bold text-center transition-colors"
          >
            🔄 Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
