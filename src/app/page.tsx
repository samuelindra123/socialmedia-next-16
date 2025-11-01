import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <main className="max-w-4xl w-full">
        <div className="text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-5xl">✝️</span>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 tracking-tight">
              SocialMedia
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Renungan Kristen
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform sosial untuk berbagi dan membaca renungan Kristen harian
            </p>
          </div>

          {/* Maintenance Notice */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  🚧 Sedang Dalam Tahap Pengembangan
                </h2>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                Kami sedang membangun sesuatu yang luar biasa untuk Anda. 
                Platform ini akan segera hadir dengan fitur-fitur menarik untuk 
                berbagi renungan dan membangun komunitas iman yang kuat.
              </p>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl mb-2">📝</div>
                  <h3 className="font-semibold text-gray-800">Berbagi Renungan</h3>
                  <p className="text-sm text-gray-600 mt-1">Post renungan harian Anda</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">💬</div>
                  <h3 className="font-semibold text-gray-800">Komunitas</h3>
                  <p className="text-sm text-gray-600 mt-1">Berinteraksi dengan sesama</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🔐</div>
                  <h3 className="font-semibold text-gray-800">Aman & Privasi</h3>
                  <p className="text-sm text-gray-600 mt-1">Login dengan Clerk Auth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Actions */}
          <div className="space-y-4">
            <SignedOut>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/sign-up"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Daftar Sekarang 🚀
                </Link>
                <Link 
                  href="/sign-in"
                  className="px-8 py-4 bg-white text-gray-800 rounded-full font-semibold text-lg border-2 border-gray-200 hover:border-purple-600 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Masuk
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-green-800 font-semibold">
                  ✅ Anda sudah login! Platform akan segera siap untuk digunakan.
                </p>
              </div>
            </SignedIn>
          </div>

          {/* Bible Verse */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 italic text-lg">
              "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."
            </p>
            <p className="text-gray-600 font-semibold mt-2">— Mazmur 119:105</p>
          </div>

          {/* Tech Stack Badge */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <span className="px-3 py-1 bg-black text-white rounded-full text-sm">Next.js 16</span>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">React 19</span>
            <span className="px-3 py-1 bg-cyan-600 text-white rounded-full text-sm">TailwindCSS v4</span>
            <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">Clerk Auth</span>
            <span className="px-3 py-1 bg-blue-700 text-white rounded-full text-sm">TypeScript</span>
          </div>
        </div>
      </main>
    </div>
  );
}

