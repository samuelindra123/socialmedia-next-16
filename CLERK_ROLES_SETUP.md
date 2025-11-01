# 🔐 Setup Clerk Roles: Admin & User

Panduan lengkap untuk mengatur 2 role (Admin dan User) di Clerk Dashboard dengan **default role "user"** untuk setiap sign up baru, dan **manual assignment** untuk admin.

---

## 🎯 Konsep Role System

- ✅ **User (Default)**: Semua user baru yang sign up otomatis dapat role "user"
- 👑 **Admin**: Harus di-set manual oleh admin di Clerk Dashboard
- 🔒 **Security**: Default role adalah privilege terendah (user), admin require manual action

---

## 📋 Part 1: Setup Default Role "User" (Otomatis)

### Metode 1: Via Clerk Webhooks (Recommended - Otomatis 100%)

#### Step 1: Install Dependencies
```bash
npm install svix
```

#### Step 2: Buat Webhook Endpoint

Buat file `/src/app/api/webhooks/clerk/route.ts`:

```typescript
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  // Get webhook secret from environment
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env');
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', { status: 400 });
  }

  // Handle user.created event
  if (evt.type === 'user.created') {
    const { id } = evt.data;

    try {
      // Set default role to "user"
      await fetch(`https://api.clerk.com/v1/users/${id}/metadata`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_metadata: {
            role: 'user',
          },
        }),
      });

      console.log(`✅ Set default role "user" for user: ${id}`);
    } catch (error) {
      console.error('Error setting default role:', error);
    }
  }

  return new Response('Success', { status: 200 });
}
```

#### Step 3: Setup Webhook di Clerk Dashboard

1. **Login ke Clerk Dashboard**
   - Buka [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
   - Pilih aplikasi Anda: **careful-asp-35**

2. **Buka Webhooks**
   - Di sidebar kiri, klik **Webhooks**
   - Klik **+ Add Endpoint**

3. **Configure Endpoint**
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
     - Untuk development: gunakan ngrok atau webhook testing service
     - Contoh: `https://abc123.ngrok.io/api/webhooks/clerk`
   
4. **Subscribe to Events**
   - Centang **user.created** event
   - Ini akan trigger webhook setiap ada user baru sign up

5. **Copy Signing Secret**
   - Setelah webhook dibuat, copy **Signing Secret**
   - Tambahkan ke `.env`:
     ```env
     CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
     ```

6. **Test Webhook**
   - Klik **Test** untuk test webhook
   - Atau sign up user baru untuk test real event

#### Step 4: Update .env

Tambahkan di file `.env`:
```env
# Clerk Webhook (for auto-assign role)
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

---

### Metode 2: Via Client-Side (Fallback - Sudah Implemented)

Kode kita sudah handle default role di client-side:

```typescript
// lib/utils/auth.ts
export async function getUserRole(): Promise<UserRole> {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role as UserRole;
  return role || 'user'; // ✅ Default ke 'user' jika role tidak ada
}
```

Ini artinya:
- ✅ Jika user baru sign up tanpa role, otomatis dianggap role "user"
- ✅ Tidak perlu webhook untuk basic functionality
- ⚠️ Tapi metadata di Clerk masih kosong (tidak ada `role` field)

**Recommendation**: Gunakan **Metode 1 (Webhook)** untuk consistency dan cleaner metadata.

---

## 👑 Part 2: Set User Sebagai Admin (Manual)

### Step-by-Step: Promote User ke Admin

#### 1. Login ke Clerk Dashboard
- Buka [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
- Pilih aplikasi: **careful-asp-35**

#### 2. Buka User Management
- Di sidebar, klik **Users**
- Anda akan melihat list semua users

#### 3. Pilih User yang Akan Dijadikan Admin
- Klik pada user yang ingin di-promote
- Atau search by email/name

#### 4. Edit Public Metadata
- Scroll ke section **Metadata**
- Cari **Public metadata**
- Klik tombol **Edit** (icon pensil)

#### 5. Set Role Admin
Ubah metadata menjadi:
```json
{
  "role": "admin"
}
```

Jika sudah ada metadata lain, tambahkan saja:
```json
{
  "role": "admin",
  "otherField": "value"
}
```

#### 6. Save Changes
- Klik **Save**
- User sekarang memiliki role "admin"

#### 7. User Perlu Re-login
- User harus **logout** dan **login** kembali
- Atau refresh token untuk apply role baru
- Setelah login ulang, role "admin" akan aktif

---

## 🔍 Cara Verify Role Berhasil Di-Set

### Via Clerk Dashboard
1. Buka **Users**
2. Klik user yang baru di-update
3. Lihat **Public metadata** → harus ada `"role": "admin"` atau `"role": "user"`

### Via Application (Client Side)
```tsx
'use client';
import { useUser } from '@clerk/nextjs';

export default function RoleChecker() {
  const { user } = useUser();
  // @ts-ignore
  const role = user?.publicMetadata?.role as string;

  return (
    <div>
      <p>Current Role: {role || 'user'}</p>
      {role === 'admin' && <p>✅ You are an admin!</p>}
    </div>
  );
}
```

### Via Application (Server Side)
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

## 📊 Role Assignment Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                   User Sign Up                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
         ┌─────────────────────────────┐
         │  Clerk Creates User Account  │
         └──────────┬──────────────────┘
                    │
                    ▼
    ┌───────────────────────────────────────┐
    │  Webhook Triggered (user.created)     │
    │  OR                                    │
    │  Client-side default to "user"        │
    └──────────┬────────────────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │  Role = "user" (DEFAULT)  │
    └──────────┬─────────────────┘
               │
               │  Admin wants to promote?
               │
               ▼
    ┌────────────────────────────────┐
    │  Admin manually sets role via   │
    │  Clerk Dashboard                │
    │  { "role": "admin" }            │
    └──────────┬─────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │  User Re-login        │
    └──────────┬───────────┘
               │
               ▼
    ┌──────────────────────┐
    │  Role = "admin" ✅    │
    └──────────────────────┘
```

---

## 🧪 Testing Role System

### Test 1: Sign Up User Baru (Default Role "user")

1. **Sign Up**
   - Buka `http://localhost:3000/sign-up`
   - Buat akun baru dengan email

2. **Verify Default Role**
   - Setelah sign up, cek di Clerk Dashboard → Users
   - Lihat Public Metadata → should have `"role": "user"`
   - Atau jika pakai webhook, akan otomatis terisi

3. **Test di Application**
   - Login dengan user baru
   - Cek role badge di header → Should show "👤 User"
   - Try akses admin page → Should be redirected

### Test 2: Promote User ke Admin

1. **Manual Set di Clerk Dashboard**
   - Login ke Clerk Dashboard
   - Users → Pilih user
   - Edit Public Metadata → `{ "role": "admin" }`
   - Save

2. **User Re-login**
   - User logout dari app
   - Login kembali

3. **Verify Admin Access**
   - Role badge should show "👑 Admin"
   - Admin-only features visible
   - Can access `/admin` routes

### Test 3: Role-Based Components

Buat test page di `app/test-roles/page.tsx`:

```tsx
import { AdminOnly, UserOnly } from '@/components/auth';
import { getUserRole } from '@/lib/utils/auth';

export default async function TestRolesPage() {
  const role = await getUserRole();

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Role Testing Page</h1>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="font-semibold">Current Role: {role}</p>
      </div>

      <AdminOnly>
        <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-300">
          <p className="font-semibold text-purple-800">
            👑 Admin Only Content - You can see this!
          </p>
        </div>
      </AdminOnly>

      <UserOnly>
        <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
          <p className="font-semibold text-blue-800">
            👤 User Only Content - You can see this!
          </p>
        </div>
      </UserOnly>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-semibold">Public Content - Everyone can see this</p>
      </div>
    </div>
  );
}
```

Akses: `http://localhost:3000/test-roles`

---

## ⚙️ Advanced: Customize Session Token (Optional)

Untuk performance, Anda bisa include role di session token:

### Step 1: Buka Clerk Dashboard
- Sessions → **Customize session token**

### Step 2: Add Custom Claims
```json
{
  "metadata": {
    "role": "{{user.public_metadata.role}}"
  }
}
```

### Step 3: Access in Code
```typescript
import { auth } from '@clerk/nextjs/server';

export async function getUserRole() {
  const { sessionClaims } = await auth();
  // Now role is in session token (faster access)
  const role = sessionClaims?.metadata?.role;
  return role || 'user';
}
```

**Benefits**:
- ✅ Faster access (no need to fetch user metadata)
- ✅ Role available in session claims
- ✅ Better performance

---

## 🔒 Security Best Practices

### 1. Always Verify on Server Side
```tsx
// ❌ BAD - Client-side only check
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

### 2. Protect API Routes
```typescript
// app/api/admin/route.ts
import { auth } from '@clerk/nextjs/server';
import { getUserRole } from '@/lib/utils/auth';

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const role = await getUserRole();
  
  if (role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Admin logic here
  return Response.json({ data: 'admin data' });
}
```

### 3. Audit Logging
Track siapa yang melakukan apa:
```typescript
async function logAdminAction(userId: string, action: string) {
  console.log(`[AUDIT] ${new Date().toISOString()} - User ${userId} - ${action}`);
  // Save to database
}
```

### 4. Principle of Least Privilege
- ✅ Default role: "user" (lowest privilege)
- ✅ Admin requires manual assignment
- ✅ Only grant admin to trusted users
- ✅ Regular audit of admin users

---

## 📝 Quick Reference

### Check Role (Server Component)
```tsx
import { getUserRole, isAdmin } from '@/lib/utils/auth';

const role = await getUserRole(); // 'admin' | 'user'
const isAdminUser = await isAdmin(); // boolean
```

### Check Role (Client Component)
```tsx
'use client';
import { useUser } from '@clerk/nextjs';

const { user } = useUser();
const role = user?.publicMetadata?.role || 'user';
```

### Protect Page
```tsx
import { ProtectedRoute } from '@/components/auth';

<ProtectedRoute requiredRole="admin">
  <AdminContent />
</ProtectedRoute>
```

### Conditional Render
```tsx
import { AdminOnly, UserOnly } from '@/components/auth';

<AdminOnly><AdminButton /></AdminOnly>
<UserOnly><UserContent /></UserOnly>
```

---

## 🐛 Troubleshooting

### Issue: User masih terlihat tidak punya role

**Solution**:
1. Cek Clerk Dashboard → User → Public Metadata
2. Pastikan ada `{ "role": "user" }` atau `{ "role": "admin" }`
3. User logout dan login kembali
4. Clear browser cache/cookies

### Issue: Webhook tidak trigger

**Solution**:
1. Cek Clerk Dashboard → Webhooks → Logs
2. Pastikan endpoint URL benar
3. Pastikan `CLERK_WEBHOOK_SECRET` di `.env` benar
4. Test dengan "Send test event"

### Issue: Admin role tidak work setelah di-set

**Solution**:
1. User **HARUS** logout dan login ulang
2. Check metadata di Clerk Dashboard benar
3. Check code menggunakan `getUserRole()` yang benar
4. Clear session cookies

### Issue: Default role tidak otomatis

**Solution**:
- Jika pakai webhook: cek webhook setup
- Jika tidak pakai webhook: code sudah handle default ke "user"
- Verify dengan test sign up user baru

---

## 📞 Support

Jika ada masalah:
1. Cek [Clerk Documentation](https://clerk.com/docs)
2. Lihat [Clerk Community](https://clerk.com/discord)
3. Check project files: `SETUP_COMPLETE.md`, `PROJECT_STRUCTURE.md`

### 4. Implementasi di Code

#### Protect Route dengan Role
```tsx
// app/admin/page.tsx
import { ProtectedRoute } from '@/components/auth';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div>Admin Only Content</div>
    </ProtectedRoute>
  );
}
```

#### Conditional Rendering berdasarkan Role
```tsx
import { AdminOnly, UserOnly } from '@/components/auth';

export default function Page() {
  return (
    <>
      <AdminOnly>
        <button>Admin Button</button>
      </AdminOnly>
      
      <UserOnly>
        <p>User Content</p>
      </UserOnly>
    </>
  );
}
```

#### Show Role Badge
```tsx
import { UserRoleBadge } from '@/components/auth';

export default function Header() {
  return (
    <header>
      <UserRoleBadge />
    </header>
  );
}
```

### 5. Role Permissions

| Feature | User | Admin |
|---------|------|-------|
| View Posts | ✅ | ✅ |
| Create Posts | ✅ | ✅ |
| Edit Own Posts | ✅ | ✅ |
| Delete Own Posts | ✅ | ✅ |
| Edit Any Posts | ❌ | ✅ |
| Delete Any Posts | ❌ | ✅ |
| User Management | ❌ | ✅ |
| Platform Settings | ❌ | ✅ |

## 🎯 Quick Commands

### Check User Role di Server Component
```tsx
import { getUserRole, isAdmin } from '@/lib/utils/auth';

export default async function Page() {
  const role = await getUserRole();
  const adminStatus = await isAdmin();
  
  return <div>Role: {role}</div>;
}
```

### Check User Role di Client Component
```tsx
'use client';
import { useUser } from '@clerk/nextjs';

export default function Component() {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as string;
  
  return <div>Role: {role}</div>;
}
```

## 🔒 Security Best Practices

1. **Always Verify on Server**
   - Client-side checks untuk UI saja
   - Server-side checks untuk security

2. **Default to Least Privilege**
   - Default role adalah "user"
   - Admin perlu explicitly assigned

3. **Validate Role di Middleware**
   - Gunakan middleware untuk protect routes
   - Cek role sebelum API calls

4. **Audit Log**
   - Track admin actions
   - Monitor role changes

## 📝 Notes

- Role disimpan di `publicMetadata` agar bisa diakses di client
- Untuk security lebih tinggi, bisa gunakan `privateMetadata` dan webhook
- Default role untuk semua user baru adalah "user"
- Hanya admin Clerk Dashboard yang bisa change role (untuk security)

## 🚀 Next Steps

1. ✅ Setup complete!
2. Create first admin user manually
3. Build admin dashboard
4. Implement role-based CRUD operations
5. Add audit logging

---

💡 **Pro Tip**: Untuk production, pertimbangkan untuk setup webhook yang automatically assign role berdasarkan email domain atau invitation code.
