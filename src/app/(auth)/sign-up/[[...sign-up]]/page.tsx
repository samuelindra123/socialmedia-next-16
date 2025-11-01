import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🌿 Bergabunglah Bersama Kami
          </h1>
          <p className="text-gray-600">
            Mulai perjalanan iman baru bersama komunitas Kristen
          </p>
        </div>
        
        <SignUp 
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'shadow-xl',
            },
          }}
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 italic">
            "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu."
            <br />
            <span className="font-semibold">— Yeremia 29:11</span>
          </p>
        </div>
      </div>
    </div>
  );
}
