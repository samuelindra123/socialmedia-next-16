# 🚨 Quick Fix: Clear Cache & Restart

## 🎯 Problem

Debug page shows **ADMIN** ✅ tapi dashboard masih redirect ke **USER** ❌

**Root Cause:** Next.js server cache belum refresh setelah code change!

---

## ✅ Solution: 3 Steps

### 1️⃣ Stop Server
```bash
# Press Ctrl+C di terminal yang running npm run dev
# Atau kill process:
lsof -ti:3000 | xargs kill -9
```

### 2️⃣ Clear Next.js Cache
```bash
cd /workspaces/socialmedia-next-16
rm -rf .next
```

### 3️⃣ Restart Server
```bash
npm run dev
```

---

## 🧪 After Restart, Test:

### 1. Check Terminal Logs
You should see console logs when accessing dashboard:
```
🔍 getUserRole called
  - publicMetadata: { role: 'admin' }
  - detected role: admin
  - returning: admin

🔍 Dashboard routing - User: user_xxxxx Role: admin
✅ Redirecting to ADMIN dashboard
```

### 2. Access Dashboard
```
http://localhost:3000/dashboard
```

Should redirect to: **`/dashboard/admin`** (purple theme 👑)

---

## 🔍 What I Changed

### 1. Added Force Dynamic Rendering
**File:** `src/app/dashboard/page.tsx`

```tsx
// Force dynamic rendering - no caching!
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

This prevents Next.js from caching the dashboard page.

### 2. Added Debug Logging
**Files:** 
- `src/app/dashboard/page.tsx` - Logs redirect decision
- `src/lib/utils/auth.ts` - Logs role detection

You'll see exact role detection in terminal when accessing dashboard.

---

## 📊 Expected vs Actual

### ✅ Expected (After Fix):
```
1. Go to http://localhost:3000/dashboard
2. Terminal shows: "✅ Redirecting to ADMIN dashboard"
3. Browser redirects to: /dashboard/admin
4. Page shows: Purple theme with 👑 crown
```

### ❌ Before (Cache Issue):
```
1. Go to http://localhost:3000/dashboard
2. No terminal logs (cached response)
3. Browser redirects to: /dashboard/user (wrong!)
4. Page shows: Blue theme (wrong!)
```

---

## 🎯 Complete Steps (Copy-Paste)

```bash
# 1. Stop any running server (Ctrl+C or kill)
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# 2. Clear Next.js cache
cd /workspaces/socialmedia-next-16
rm -rf .next

# 3. Start fresh server
npm run dev

# 4. Wait for "Ready" message, then test:
# Open: http://localhost:3000/dashboard
```

---

## 🔍 Debug Checklist

After restart, verify:

- [ ] Server started successfully (no errors)
- [ ] Terminal shows console logs when accessing `/dashboard`
- [ ] Logs show: `detected role: admin`
- [ ] Logs show: `✅ Redirecting to ADMIN dashboard`
- [ ] Browser redirects to `/dashboard/admin`
- [ ] Purple theme with crown icon visible
- [ ] Yellow "ADMIN" badge in header

---

## 💡 Why This Happened

**Next.js caching behavior:**

1. First load: Server renders page and caches result
2. Code change: Fixed `metadata` → `publicMetadata` 
3. Cache still old: Server returns OLD cached response
4. After clear cache: Server re-renders with NEW code ✅

**Solution:** Always clear `.next` folder after auth-related code changes!

---

## 🚀 After This Works

Once dashboard correctly shows admin page:

1. ✅ Test admin features (Manage Users, Posts, etc)
2. ✅ Test role guards in components
3. ✅ Commit the logging changes (helpful for debugging)
4. ⏭️ Ready to build CRUD features!

---

## 📝 Optional: Remove Logs Later

After confirming it works, you can remove console.log statements:

**File:** `src/lib/utils/auth.ts`
```typescript
// Remove these lines:
console.log('🔍 getUserRole called');
console.log('  - publicMetadata:', sessionClaims?.publicMetadata);
console.log('  - detected role:', role);
console.log('  - returning:', role || 'user');
```

**File:** `src/app/dashboard/page.tsx`
```typescript
// Remove these lines:
console.log('🔍 Dashboard routing - User:', user.id, 'Role:', role);
console.log('✅ Redirecting to ADMIN dashboard');
console.log('ℹ️ Redirecting to USER dashboard');
```

**BUT** keep the force-dynamic config:
```typescript
export const dynamic = 'force-dynamic'; // ← KEEP THIS!
export const revalidate = 0; // ← KEEP THIS!
```

---

## 🎯 TL;DR

```bash
# Quick fix (3 commands):
pkill -f "next dev"        # Stop server
rm -rf .next               # Clear cache
npm run dev                # Restart server

# Then test: http://localhost:3000/dashboard
# Should go to admin page! ✅
```

---

**🔥 Most Important:** Clear `.next` cache after auth code changes!
