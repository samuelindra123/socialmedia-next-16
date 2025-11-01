# 🚀 Quick Guide: Auto Role "User" + Manual Admin

## TL;DR
- ✅ **User Baru**: Otomatis role "user" (via webhook atau fallback)
- 👑 **Admin**: Set manual di Clerk Dashboard

---

## 🎯 Setup Cepat (2 Cara)

### Cara 1: Pakai Webhook (Recommended) ✅

#### 1. Install Dependency
```bash
npm install svix
```
✅ **Sudah di-install**

#### 2. Webhook Endpoint
✅ **Sudah dibuat**: `src/app/api/webhooks/clerk/route.ts`

#### 3. Setup di Clerk Dashboard

**A. Buat Webhook Endpoint**
1. Login [Clerk Dashboard](https://dashboard.clerk.com/)
2. Pilih app: **careful-asp-35**
3. Sidebar → **Webhooks** → **+ Add Endpoint**
4. Endpoint URL:
   - Production: `https://your-domain.com/api/webhooks/clerk`
   - Development: Pakai [ngrok](https://ngrok.com/) atau [localtunnel](https://localtunnel.github.io/www/)
   
**B. Subscribe Event**
5. Centang event: **✅ user.created**
6. Save endpoint

**C. Copy Secret**
7. Copy **Signing Secret** (format: `whsec_xxx...`)
8. Paste di `.env`:
   ```env
   CLERK_WEBHOOK_SECRET=whsec_your_secret_here
   ```

**D. Test**
9. Sign up user baru
10. Cek Clerk Dashboard → Users → Public Metadata
11. Should have: `{ "role": "user" }` ✅

---

### Cara 2: Tanpa Webhook (Fallback) ⚡

Sudah otomatis ter-handle di code!

File `lib/utils/auth.ts` sudah set default:
```typescript
return role || 'user'; // Default ke 'user'
```

**Pro**: 
- ✅ No setup needed
- ✅ Works immediately

**Con**:
- ⚠️ Metadata di Clerk kosong (tapi app tetap work)

---

## 👑 Set Admin (Manual)

### Step by Step:

1. **Login Clerk Dashboard**
   - [https://dashboard.clerk.com/](https://dashboard.clerk.com/)

2. **Buka Users**
   - Sidebar → **Users**

3. **Pilih User**
   - Click user yang mau dijadikan admin

4. **Edit Metadata**
   - Scroll ke **Public metadata**
   - Click **Edit** (icon pensil)

5. **Set Role Admin**
   ```json
   {
     "role": "admin"
   }
   ```

6. **Save**
   - User jadi admin! 👑

7. **User Re-login**
   - User harus logout & login ulang
   - Role baru akan aktif

---

## ✅ Testing

### Test User Baru
```bash
1. Buka http://localhost:3000/sign-up
2. Sign up dengan email baru
3. Login
4. Role badge should show: 👤 User
```

### Test Admin
```bash
1. Set user ke admin di Clerk Dashboard
2. User logout dari app
3. Login kembali
4. Role badge should show: 👑 Admin
```

---

## 🔍 Verify Role

### Di Clerk Dashboard
- Users → Pilih user → Lihat **Public metadata**
- Should have: `{ "role": "user" }` atau `{ "role": "admin" }`

### Di Application
```tsx
// Server Component
import { getUserRole } from '@/lib/utils/auth';
const role = await getUserRole(); // 'user' or 'admin'

// Client Component
'use client';
import { useUser } from '@clerk/nextjs';
const { user } = useUser();
const role = user?.publicMetadata?.role || 'user';
```

---

## 🎨 Usage in Code

### Protect Page (Admin Only)
```tsx
import { ProtectedRoute } from '@/components/auth';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <h1>Admin Dashboard</h1>
    </ProtectedRoute>
  );
}
```

### Show/Hide by Role
```tsx
import { AdminOnly, UserOnly } from '@/components/auth';

<AdminOnly>
  <button>Admin Feature</button>
</AdminOnly>

<UserOnly>
  <p>User Content</p>
</UserOnly>
```

---

## 📋 Workflow Summary

```
New User Signs Up
       ↓
Webhook Triggered (user.created)
       ↓
Auto Set: { "role": "user" }
       ↓
User has "user" role ✅
       ↓
Admin wants to promote?
       ↓
Manual set in Clerk Dashboard: { "role": "admin" }
       ↓
User re-login
       ↓
User now has "admin" role 👑
```

---

## 🐛 Troubleshooting

**Q: Webhook tidak jalan?**
- Cek Clerk Dashboard → Webhooks → Logs
- Pastikan `CLERK_WEBHOOK_SECRET` di `.env` benar
- Development: pakai ngrok untuk expose localhost

**Q: Role tidak update?**
- User **HARUS** logout & login ulang
- Clear browser cookies
- Verify metadata di Clerk Dashboard

**Q: User tidak punya role?**
- Fallback sudah handle: default ke "user"
- App tetap jalan normal
- Untuk clean metadata: setup webhook

---

## 📖 Full Documentation

Lihat file lengkap: **`CLERK_ROLES_SETUP.md`**

---

**Ready to go! 🚀**
