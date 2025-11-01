# 🚀 Simple Role Setup - Development & Production

## ✅ Metode Simple (Tanpa Webhook)

Cara ini **SAMA** untuk development dan production. Tidak ribet, tidak perlu setup webhook!

---

## 🎯 Cara Kerja

### Default Role "User" (Otomatis)
```
User Sign Up
    ↓
Clerk creates account (metadata kosong)
    ↓
User login ke app
    ↓
App code cek: role || 'user'
    ↓
✅ User dianggap role "user" (otomatis)
```

**Keuntungan**:
- ✅ No setup needed
- ✅ Works immediately
- ✅ Sama di dev & production
- ✅ Zero configuration

**Cara kerjanya**: Code kita sudah handle default role di `lib/utils/auth.ts`:
```typescript
return role || 'user'; // Kalau kosong = 'user'
```

### Admin Role (Manual)
Set manual di Clerk Dashboard (1x aja per user)

---

## 👑 Set User Sebagai Admin

### Step-by-Step (2 Menit):

**1. Login Clerk Dashboard**
- Buka: [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
- Pilih app: **careful-asp-35**

**2. Buka Users**
- Sidebar → **Users**
- Lihat list semua users

**3. Pilih User untuk Jadi Admin**
- Click user yang ingin dijadikan admin

**4. Edit Public Metadata**
- Scroll ke section **Metadata**
- Cari **Public metadata**
- Click tombol **Edit** (icon pensil ✏️)

**5. Set Role Admin**
Masukkan JSON:
```json
{
  "role": "admin"
}
```

**6. Save**
- Click **Save**
- Done! ✅

**7. User Re-login**
- User harus **logout** dari app
- Kemudian **login** kembali
- Role admin langsung aktif 👑

---

## 🧪 Testing

### Test 1: Sign Up User Baru (Role "User")

```bash
1. Buka http://localhost:3000/sign-up
2. Sign up dengan email baru
3. Login
4. Lihat header → Role badge: 👤 User
5. Try akses admin page → Will be redirected ✅
```

### Test 2: Set User Jadi Admin

```bash
1. Login Clerk Dashboard
2. Users → Pilih user
3. Edit Public Metadata → { "role": "admin" }
4. Save
5. User logout dari app
6. User login kembali
7. Lihat header → Role badge: 👑 Admin ✅
8. Can access admin pages ✅
```

---

## 🔍 Verify Role

### Via Clerk Dashboard
1. Login [dashboard.clerk.com](https://dashboard.clerk.com/)
2. Users → Pilih user
3. Lihat **Public metadata**
   - Kosong = user (otomatis dari code)
   - `{ "role": "admin" }` = admin

### Via Application (Client Component)
```tsx
'use client';
import { useUser } from '@clerk/nextjs';

export default function RoleChecker() {
  const { user } = useUser();
  const role = (user?.publicMetadata?.role as string) || 'user';

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <p className="font-semibold">Your Role: {role}</p>
      {role === 'admin' && <p className="text-purple-600">✅ You are an admin!</p>}
    </div>
  );
}
```

### Via Application (Server Component)
```tsx
import { getUserRole, isAdmin } from '@/lib/utils/auth';

export default async function Page() {
  const role = await getUserRole();
  const adminStatus = await isAdmin();

  return (
    <div>
      <p>Role: {role}</p>
      <p>Is Admin: {adminStatus ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

---

## 💡 Usage Examples

### 1. Protect Admin Page
```tsx
// app/admin/page.tsx
import { ProtectedRoute } from '@/components/auth';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Only admins can see this page</p>
      </div>
    </ProtectedRoute>
  );
}
```

### 2. Show/Hide Content by Role
```tsx
import { AdminOnly, UserOnly } from '@/components/auth';

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1>Dashboard</h1>
      
      {/* Only admin can see */}
      <AdminOnly>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2>Admin Controls</h2>
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Delete All Users
          </button>
        </div>
      </AdminOnly>

      {/* Only regular user can see */}
      <UserOnly>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p>Welcome, user! Upgrade to admin for more features.</p>
        </div>
      </UserOnly>

      {/* Everyone can see */}
      <div className="mt-4">
        <p>Public content for all roles</p>
      </div>
    </div>
  );
}
```

### 3. Check Role in Component
```tsx
'use client';
import { useUser } from '@clerk/nextjs';

export default function MyComponent() {
  const { user } = useUser();
  const role = (user?.publicMetadata?.role as string) || 'user';

  return (
    <div>
      {role === 'admin' ? (
        <button>Admin Action</button>
      ) : (
        <button>User Action</button>
      )}
    </div>
  );
}
```

### 4. Protect API Route
```tsx
// app/api/admin/route.ts
import { auth } from '@clerk/nextjs/server';
import { getUserRole } from '@/lib/utils/auth';

export async function GET() {
  // Check if user is authenticated
  const { userId } = await auth();
  
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if user is admin
  const role = await getUserRole();
  
  if (role !== 'admin') {
    return Response.json({ error: 'Forbidden - Admin only' }, { status: 403 });
  }

  // Admin logic here
  return Response.json({ 
    message: 'Admin data',
    data: ['secret', 'admin', 'info']
  });
}
```

---

## 📊 Role System Flow

```
┌─────────────────────────────────────────┐
│         User Signs Up                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Clerk Creates Account                 │
│    (Public Metadata: empty)              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    User Logs In to App                   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    App Code: role || 'user'              │
│    Result: User = "user" ✅              │
└──────────────┬──────────────────────────┘
               │
               │  Admin wants to promote?
               │
               ▼
┌─────────────────────────────────────────┐
│  Admin Manually Sets in Dashboard:       │
│  Public Metadata: { "role": "admin" }    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    User Re-login                         │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Role = "admin" ✅                     │
│    Admin Access Granted                  │
└─────────────────────────────────────────┘
```

---

## 🛡️ Security Best Practices

### 1. Always Check on Server
```tsx
// ❌ BAD - Client-side only (can be bypassed)
'use client';
export default function AdminPage() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  
  if (role !== 'admin') return <div>Access Denied</div>;
  return <div>Admin Content</div>;
}

// ✅ GOOD - Server-side protection
import { ProtectedRoute } from '@/components/auth';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin Content</div>
    </ProtectedRoute>
  );
}
```

### 2. Protect All API Routes
Selalu validate role di API endpoints:
```tsx
const role = await getUserRole();
if (role !== 'admin') {
  return Response.json({ error: 'Forbidden' }, { status: 403 });
}
```

### 3. Default to Lowest Privilege
- Default role selalu "user" (lowest privilege)
- Admin require explicit manual assignment
- Never auto-assign admin role

### 4. Audit Admin Actions
Log semua admin actions untuk security:
```tsx
console.log(`[AUDIT] ${new Date().toISOString()} - Admin ${userId} performed ${action}`);
```

---

## 🐛 Troubleshooting

### Q: User baru tidak punya role badge?
**A**: Normal! Default role "user" handled di code. Badge akan show "👤 User".

### Q: Set admin tapi tidak work?
**A**: User **HARUS** logout dan login ulang setelah role diubah.

### Q: Metadata di Clerk Dashboard kosong?
**A**: Normal untuk user biasa. App tetap treat sebagai "user". Hanya admin yang perlu set metadata.

### Q: Admin bisa di-bypass?
**A**: TIDAK, selama Anda:
- ✅ Pakai `ProtectedRoute` untuk protect pages
- ✅ Validate role di server-side
- ✅ Check role di API routes

### Q: Development vs Production beda?
**A**: TIDAK! Metode ini **SAMA PERSIS** di development dan production. Zero config!

---

## ✅ Checklist Setup

- [x] Install dependencies (✅ Sudah)
- [x] Auth components created (✅ Sudah)
- [x] Role utilities created (✅ Sudah)
- [x] Default role fallback (✅ Sudah)
- [ ] Set first admin user di Clerk Dashboard
- [ ] Test sign up user baru
- [ ] Test promote to admin
- [ ] Test protected routes

---

## 🎯 Quick Commands

### Check Your Role
```tsx
// Server component
import { getUserRole } from '@/lib/utils/auth';
const role = await getUserRole();

// Client component
import { useUser } from '@clerk/nextjs';
const { user } = useUser();
const role = user?.publicMetadata?.role || 'user';
```

### Protect Route
```tsx
import { ProtectedRoute } from '@/components/auth';
<ProtectedRoute requiredRole="admin">
  {children}
</ProtectedRoute>
```

### Conditional Render
```tsx
import { AdminOnly, UserOnly } from '@/components/auth';
<AdminOnly>{adminContent}</AdminOnly>
<UserOnly>{userContent}</UserOnly>
```

---

## 📝 Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Default Role | ✅ Auto | "user" for all new signups |
| Admin Role | ✅ Manual | Set in Clerk Dashboard |
| Development | ✅ Ready | No config needed |
| Production | ✅ Ready | Same as development |
| Protected Routes | ✅ Ready | Use `<ProtectedRoute>` |
| Role Guards | ✅ Ready | Use `<AdminOnly>`, `<UserOnly>` |

---

## 🚀 Ready to Use!

**Setup time**: 0 minutes ⚡  
**Configuration**: None needed ✅  
**Works in**: Dev & Production 🎯  
**Maintenance**: Minimal 🌟  

Just set your first admin user di Clerk Dashboard dan mulai coding!

---

**Selamat coding! 🎉✝️**
