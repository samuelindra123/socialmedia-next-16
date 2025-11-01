import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ✝️ Selamat Datang Kembali
          </h1>
          <p className="text-gray-600">
            Masuk untuk melanjutkan perjalanan iman Anda
          </p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-xl',
            },
          }}
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 italic">
            "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."
            <br />
            <span className="font-semibold">— Mazmur 119:105</span>
          </p>
        </div>
      </div>
    </div>
  );
}
