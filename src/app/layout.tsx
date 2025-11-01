import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SocialMedia Renungan Kristen",
  description: "Platform sosial untuk berbagi dan membaca renungan Kristen harian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="id">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-white/50 backdrop-blur-sm border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✝️</span>
              <span className="font-bold text-gray-800 hidden sm:block">Renungan Kristen</span>
            </div>
            
            <div className="flex items-center gap-3">
              <SignedOut>
                <SignInButton>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-[#6c47ff] hover:bg-[#5639cc] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <a 
                  href="/dashboard" 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Dashboard
                </a>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

