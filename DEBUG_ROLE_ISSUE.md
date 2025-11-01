# 🔍 Debug: Admin Masuk ke User Dashboard

## ✅ SOLVED!

**Root Cause:** Code was accessing `sessionClaims?.metadata?.role` instead of `sessionClaims?.publicMetadata?.role`

**Fix Applied:** Changed `/src/lib/utils/auth.ts` to use correct path: `publicMetadata.role`

**Status:** ✅ Fixed! Refresh `/dashboard` to see admin page.

---

## ❌ Original Problem

User sudah set metadata `{ "role": "admin" }` di Clerk Dashboard, tapi masih masuk ke **User Dashboard** (blue theme) bukan **Admin Dashboard** (purple theme).

---

## 🧪 Debug Tool Dibuat

Saya sudah buat halaman debug untuk cek role Anda:

### 🔗 Akses Debug Page:
```
http://localhost:3000/debug-role
```

Halaman ini akan show:
- ✅ User info (email, username, dll)
- ✅ **Public Metadata** (JSON lengkap)
- ✅ **Detected Role** (admin/user/none)
- ✅ Expected redirect target
- ✅ Instructions jika role salah

---

## 🎯 Langkah Debug:

### 1. Akses Debug Page
```
1. Login ke aplikasi
2. Buka: http://localhost:3000/debug-role
3. Lihat bagian "Detected Role"
```

### 2. Check Role Detection

#### ✅ Kalau Benar (Role = admin):
```
🎯 Detected Role
👑 ADMIN

Raw value: "admin"
Type: string
Is admin? ✅ YES
Is user? ❌ NO
```

#### ❌ Kalau Salah (Role = user atau undefined):
```
🎯 Detected Role
👤 USER (atau ❌ NO ROLE)

Raw value: "user" (atau undefined)
Type: string
Is admin? ❌ NO
Is user? ✅ YES
```

---

## 🔧 Possible Causes & Solutions

### 1. ❌ Metadata Belum Disave di Clerk

**Check:**
- Login ke Clerk Dashboard
- Users → Pilih user
- Lihat Public Metadata

**Should see:**
```json
{
  "role": "admin"
}
```

**If NOT:**
- Click Edit
- Add: `{ "role": "admin" }`
- Click **SAVE** (penting!)

---

### 2. ❌ User Belum Re-login

**Problem**: Metadata di Clerk sudah benar, tapi user masih punya old session.

**Solution:**
```
1. LOGOUT dari aplikasi (click UserButton → Sign out)
2. Close browser (optional, recommended)
3. LOGIN kembali
4. Check lagi di /debug-role
```

**Why?** Clerk cache session di browser. Role baru tidak update sampai re-login!

---

### 3. ❌ Browser Cache

**Problem**: Browser cache old role.

**Solution:**
```
1. Hard refresh: Ctrl+Shift+R (Windows) atau Cmd+Shift+R (Mac)
2. Clear browser cache:
   - Chrome: Ctrl+Shift+Delete
   - Select "Cookies and other site data"
   - Select "Cached images and files"
   - Clear data
3. Reload aplikasi
```

---

### 4. ❌ Typo di Metadata

**Common mistakes:**
```json
❌ { "role": "Admin" }     // Capital A - WRONG!
❌ { "role": "ADMIN" }     // All caps - WRONG!
❌ { "Role": "admin" }     // Capital R on key - WRONG!
❌ { 'role': 'admin' }     // Single quotes - WRONG!
❌ {role: "admin"}         // No quotes on key - WRONG!

✅ { "role": "admin" }     // CORRECT! ✅
```

**Must be EXACTLY:**
- Key: `"role"` (lowercase, double quotes)
- Value: `"admin"` (lowercase, double quotes)

---

### 5. ❌ Code Issue (Check Auth Helper)

Debug di `/debug-role` page akan show **exact value** dari metadata.

**If shows admin but still redirects wrong:**

Check file: `src/lib/utils/auth.ts`
```tsx
export async function getUserRole(): Promise<UserRole> {
  const { sessionClaims } = await auth();
  // @ts-ignore - Clerk metadata typing
  const role = sessionClaims?.metadata?.role as UserRole;
  return role || 'user'; // Default to 'user'
}
```

Make sure no weird logic here!

---

## 🎯 Step-by-Step Fix

### ✅ Complete Fix Process:

```bash
# Step 1: Check Metadata di Clerk Dashboard
1. Go to: https://dashboard.clerk.com/
2. Apps → careful-asp-35 → Users
3. Click your user (comdonate9@gmail.com)
4. Scroll to "Public metadata"
5. Should see: { "role": "admin" }
6. If NOT, click Edit → Add → Save

# Step 2: Clear Session
1. Go to your app
2. Click UserButton (top right)
3. Click "Sign out"
4. Wait for redirect to homepage

# Step 3: Clear Cache (Optional but Recommended)
1. Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. Select "Cookies" and "Cached images"
3. Click "Clear data"

# Step 4: Login Again
1. Go to http://localhost:3000/sign-in
2. Login with your credentials
3. Wait for successful login

# Step 5: Check Debug Page
1. Go to: http://localhost:3000/debug-role
2. Look at "Detected Role"
3. Should show: 👑 ADMIN

# Step 6: Test Dashboard
1. Click "Go to Dashboard" button
2. Should redirect to /dashboard/admin
3. Should see PURPLE theme with crown 👑
```

---

## 🧪 Quick Test Commands

### Test Current Role:
```
1. Go to: http://localhost:3000/debug-role
2. Check "Detected Role" section
3. Compare with Clerk Dashboard metadata
```

### Test Dashboard Redirect:
```
1. Go to: http://localhost:3000/dashboard
2. Should auto-redirect based on role
3. Admin → /dashboard/admin (purple)
4. User → /dashboard/user (blue)
```

### Force Clear Everything:
```
1. Logout
2. Close ALL browser tabs
3. Clear cache (Ctrl+Shift+Delete)
4. Restart browser
5. Login fresh
6. Test again
```

---

## 📊 Debug Page Output Examples

### ✅ Correct (Admin):
```
📦 Public Metadata
{
  "role": "admin"
}

🎯 Detected Role
👑 ADMIN
Raw value: "admin"
Is admin? ✅ YES

🔄 Expected Redirect
👑 /dashboard/admin
```

### ❌ Wrong (User):
```
📦 Public Metadata
{
  "role": "user"
}
// OR
{}
// OR
null

🎯 Detected Role
👤 USER
Raw value: "user" (or undefined)
Is admin? ❌ NO

🔄 Expected Redirect
👤 /dashboard/user
```

---

## 🎯 Most Common Solution

**90% of the time, this fixes it:**

```bash
1. Verify metadata di Clerk: { "role": "admin" }
2. LOGOUT dari aplikasi
3. LOGIN kembali
4. DONE! ✅
```

**Why it works:** Clerk session is cached. Re-login forces refresh!

---

## 📝 Checklist

Jika masih ke user dashboard, check:

- [ ] Metadata di Clerk benar: `{ "role": "admin" }` (lowercase!)
- [ ] Sudah click "Save" di Clerk Dashboard
- [ ] Sudah logout dari aplikasi
- [ ] Sudah login kembali (fresh session)
- [ ] Browser cache cleared (if needed)
- [ ] Check `/debug-role` page - shows "admin"
- [ ] Try `/dashboard` - should redirect to `/dashboard/admin`

---

## 🚀 Quick Links

| Page | URL | Purpose |
|------|-----|---------|
| Debug Role | `/debug-role` | Check current role |
| Dashboard | `/dashboard` | Auto-redirect |
| Admin Dashboard | `/dashboard/admin` | Direct access (admin only) |
| User Dashboard | `/dashboard/user` | Direct access (user only) |

---

**🔍 Start Here:** http://localhost:3000/debug-role

**See your EXACT role and metadata in real-time!**
