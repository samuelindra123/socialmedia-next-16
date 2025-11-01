# 📁 Project Structure Overview

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── sign-in/             # Sign in page
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx
│   │   ├── sign-up/             # Sign up page
│   │   │   └── [[...sign-up]]/
│   │   │       └── page.tsx
│   │   └── layout.tsx           # Auth layout
│   │
│   ├── api/                     # API routes (TODO)
│   │   └── renungan/           # Renungan CRUD endpoints
│   │       ├── route.ts        # GET (all), POST (create)
│   │       ├── [id]/
│   │       │   └── route.ts    # GET (single), PUT, DELETE
│   │       └── my-posts/
│   │           └── route.ts    # GET user's posts
│   │
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout with ClerkProvider
│   └── page.tsx                # Homepage (maintenance mode)
│
├── components/                  # React components
│   ├── auth/                   # Authentication components
│   │   ├── AuthStatus.tsx      # Auth status & role badge
│   │   ├── ProtectedRoute.tsx  # Route protection HOC
│   │   ├── RoleGuard.tsx       # Role-based rendering
│   │   └── index.ts            # Barrel export
│   │
│   ├── layout/                 # Layout components (TODO)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   │
│   └── ui/                     # UI components
│       ├── Button.tsx          # Reusable button
│       ├── Card.tsx            # Card components
│       └── index.ts            # Barrel export
│
├── lib/                        # Utilities & helpers
│   ├── api/                    # API client functions
│   │   └── renungan.ts         # Renungan CRUD client
│   │
│   └── utils/                  # Utility functions
│       ├── auth.ts             # Auth helpers (role checking)
│       └── index.ts            # General utilities (cn, formatDate)
│
├── types/                      # TypeScript types
│   ├── index.ts               # User & Auth types
│   └── renungan.ts            # Renungan types & interfaces
│
└── middleware.ts              # Clerk middleware

```

## 🎯 Key Features Implemented

### ✅ Authentication & Authorization
- **Clerk Integration**: Full auth setup with SignIn/SignUp pages
- **Role-Based Access**: Admin & User roles with guards
- **Protected Routes**: Component-level route protection
- **Auth Components**: Reusable auth UI components

### ✅ UI Components
- **Button**: Multiple variants (primary, secondary, outline, danger)
- **Card**: Flexible card system with header/content/footer
- **Responsive**: Mobile-first design with Tailwind

### ✅ Type Safety
- **Full TypeScript**: Complete type definitions
- **Type Exports**: Centralized type management
- **API Types**: Request/Response typing

### ✅ Utilities
- **Class Merging**: `cn()` utility for Tailwind
- **Auth Helpers**: Server-side role checking
- **API Client**: Ready-to-use CRUD functions

## 🚀 Next Steps

### 1. Database Setup
- [ ] Choose DB (Prisma + PostgreSQL recommended)
- [ ] Design schema for Renungan, Comments, Likes
- [ ] Setup Prisma Client
- [ ] Create migrations

### 2. API Routes Implementation
- [ ] `POST /api/renungan` - Create renungan
- [ ] `GET /api/renungan` - List all renungans
- [ ] `GET /api/renungan/[id]` - Get single renungan
- [ ] `PUT /api/renungan/[id]` - Update renungan
- [ ] `DELETE /api/renungan/[id]` - Delete renungan
- [ ] `POST /api/renungan/[id]/like` - Toggle like
- [ ] `POST /api/renungan/[id]/comment` - Add comment

### 3. Frontend Pages
- [ ] `/dashboard` - User dashboard
- [ ] `/admin` - Admin panel
- [ ] `/renungan` - List all renungans
- [ ] `/renungan/[id]` - Single renungan view
- [ ] `/renungan/create` - Create new renungan
- [ ] `/renungan/[id]/edit` - Edit renungan
- [ ] `/profile` - User profile

### 4. Components
- [ ] RenunganCard - Display renungan in card
- [ ] RenunganList - List of renungans
- [ ] RenunganForm - Create/Edit form
- [ ] CommentSection - Comments UI
- [ ] LikeButton - Like functionality
- [ ] Header - Navigation header
- [ ] Footer - Site footer

## 📚 Usage Examples

### Protect a Page (Admin Only)
```tsx
// app/admin/page.tsx
import { ProtectedRoute } from '@/components/auth';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <h1>Admin Dashboard</h1>
    </ProtectedRoute>
  );
}
```

### Conditional Rendering by Role
```tsx
import { AdminOnly, UserOnly } from '@/components/auth';

export default function Page() {
  return (
    <>
      <AdminOnly>
        <button>Delete All Posts</button>
      </AdminOnly>
      <UserOnly>
        <p>You are a regular user</p>
      </UserOnly>
    </>
  );
}
```

### Use API Client
```tsx
'use client';
import { getRenungans, createRenungan } from '@/lib/api/renungan';

export default function RenunganList() {
  const [renungans, setRenungans] = useState([]);

  useEffect(() => {
    getRenungans(1, 10).then(data => setRenungans(data.data));
  }, []);

  return <div>{/* Render renungans */}</div>;
}
```

## 🔐 Role Setup

See [CLERK_ROLES_SETUP.md](./CLERK_ROLES_SETUP.md) for complete Clerk role configuration.

## 🎨 Design System

- **Colors**: Purple & Blue gradient (brand)
- **Font**: Geist Sans & Geist Mono
- **Components**: TailwindCSS v4
- **Icons**: Emoji-based (✝️, 🌿, 💬, etc.)

## 📄 Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

---

**Author**: @samuelindra123  
**Last Updated**: November 1, 2025
