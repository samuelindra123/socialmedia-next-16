#!/bin/bash

# 🚀 Quick Start Script for SocialMedia Renungan Kristen
# Author: @samuelindra123

echo "======================================"
echo "✝️ SocialMedia Renungan Kristen"
echo "======================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with Clerk credentials"
    echo ""
    echo "Required variables:"
    echo "  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=..."
    echo "  CLERK_SECRET_KEY=..."
    exit 1
fi

echo "✅ .env file found"
echo ""

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
    echo ""
fi

# Display project info
echo "======================================"
echo "📋 Project Information"
echo "======================================"
echo "Framework: Next.js 16 (App Router)"
echo "Library: React 19"
echo "Styling: TailwindCSS v4"
echo "Auth: Clerk Authentication"
echo "Language: TypeScript"
echo ""

echo "======================================"
echo "🎯 Quick Commands"
echo "======================================"
echo "npm run dev       - Start development server"
echo "npm run build     - Build for production"
echo "npm run start     - Start production server"
echo "npm run lint      - Run ESLint"
echo ""

echo "======================================"
echo "🔗 Important Links"
echo "======================================"
echo "Local: http://localhost:3000"
echo "Sign In: http://localhost:3000/sign-in"
echo "Sign Up: http://localhost:3000/sign-up"
echo "Clerk Dashboard: https://dashboard.clerk.com"
echo ""

echo "======================================"
echo "📚 Documentation"
echo "======================================"
echo "README.md              - Project overview"
echo "SETUP_COMPLETE.md      - Setup completion status"
echo "CLERK_ROLES_SETUP.md   - Role configuration guide"
echo "PROJECT_STRUCTURE.md   - File structure details"
echo ""

echo "======================================"
echo "⚠️ Important: Setup Clerk Roles"
echo "======================================"
echo "Before starting development:"
echo "1. Login to Clerk Dashboard"
echo "2. Go to Users section"
echo "3. Edit user Public Metadata"
echo "4. Add: { \"role\": \"admin\" } or { \"role\": \"user\" }"
echo ""
echo "See CLERK_ROLES_SETUP.md for details"
echo ""

echo "======================================"
echo "🚀 Ready to Start!"
echo "======================================"
echo ""
read -p "Start development server now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "Starting development server..."
    npm run dev
fi
