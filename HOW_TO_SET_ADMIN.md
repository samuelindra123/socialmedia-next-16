# 🎯 Step-by-Step: Set Admin di Clerk Dashboard

## 📸 Berdasarkan Screenshot Anda

Anda sedang melihat halaman user detail di Clerk Dashboard. Berikut langkah tepatnya:

---

## 1️⃣ Lokasi yang Benar

Di screenshot Anda, scroll ke bagian **"Metadata"** (sudah terlihat).

Anda akan melihat 3 section:
```
Metadata
├─ 👁️ Public     [Edit] ← KLIK TOMBOL EDIT INI!
├─ 🔒 Private    [Edit]
└─ ⚠️ Unsafe     [Edit]
```

---

## 2️⃣ Klik "Edit" pada "Public"

**PENTING**: Klik tombol **"Edit"** di sebelah kanan tulisan **"Public"** (bukan Private atau Unsafe!)

Tombol Edit ada di sini:
```
👁️ Public                                    [Edit] ← KLIK INI!
     None
```

---

## 3️⃣ Masukkan JSON

Setelah klik Edit, akan muncul **text editor / input field**.

Ketik/paste JSON ini **PERSIS**:
```json
{
  "role": "admin"
}
```

**Format penting:**
- ✅ Pakai **double quotes** `"` (bukan single quotes `'`)
- ✅ Huruf kecil semua: `"admin"` (bukan `"Admin"` atau `"ADMIN"`)
- ✅ Ada **koma** jika ada field lain
- ✅ Tutup dengan **curly braces** `{}`

### Contoh Benar:
```json
{
  "role": "admin"
}
```

### Jika Ada Field Lain:
```json
{
  "role": "admin",
  "department": "IT"
}
```

---

## 4️⃣ Save

Setelah masukkan JSON:
1. Klik tombol **"Save"** (biasanya di bawah text editor)
2. Tunggu sampai tersimpan (biasanya ada notifikasi "Success")

---

## 5️⃣ User Harus Re-login

**PENTING!** Perubahan tidak langsung aktif!

User yang baru di-set admin **HARUS**:
1. **Logout** dari aplikasi
2. **Login** kembali
3. Setelah login ulang, role admin akan aktif ✅

---

## ✅ Verify Berhasil

### Di Clerk Dashboard:
Setelah save, bagian Public metadata akan berubah dari:
```
👁️ Public                [Edit]
     None
```

Menjadi:
```
👁️ Public                [Edit]
     {
       "role": "admin"
     }
```

### Di Aplikasi:
Setelah user re-login:
- Role badge akan show: **👑 Admin** (bukan 👤 User)
- User bisa akses halaman admin
- Admin-only features visible

---

## 🎨 Visual Reference

### SEBELUM (Screenshot Anda Sekarang):
```
╔════════════════════════════════════════╗
║ Metadata                               ║
╠════════════════════════════════════════╣
║                                        ║
║ 👁️ Public            [Edit] ← KLIK!   ║
║                                        ║
║    None  ← Kosong (belum ada role)    ║
║                                        ║
╚════════════════════════════════════════╝
```

### SETELAH Edit & Save:
```
╔════════════════════════════════════════╗
║ Metadata                               ║
╠════════════════════════════════════════╣
║                                        ║
║ 👁️ Public            [Edit]           ║
║                                        ║
║    {                                   ║
║      "role": "admin"  ← Role sudah set!║
║    }                                   ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## 🚨 Common Mistakes

### ❌ SALAH - Edit di "Private" atau "Unsafe"
```
🔒 Private    [Edit] ← JANGAN KLIK INI!
⚠️ Unsafe     [Edit] ← JANGAN KLIK INI!
```
**Harus** di **Public** metadata!

### ❌ SALAH - Format JSON
```json
{role: "admin"}           // ❌ No quotes on key
{'role': 'admin'}         // ❌ Single quotes
{"role": "Admin"}         // ❌ Capital A
{role: admin}             // ❌ No quotes at all
```

### ✅ BENAR - Format JSON
```json
{
  "role": "admin"
}
```

---

## 📋 Quick Checklist

Sebelum save, pastikan:
- [ ] Edit di section **"Public"** (bukan Private/Unsafe)
- [ ] Format JSON benar (ada quotes, lowercase)
- [ ] Tidak ada typo di `"role"` atau `"admin"`
- [ ] JSON valid (bisa test di jsonlint.com)

Setelah save:
- [ ] Lihat metadata berubah di dashboard
- [ ] User logout dari app
- [ ] User login kembali
- [ ] Check role badge = 👑 Admin
- [ ] Test akses admin features

---

## 🎯 TL;DR (Too Long; Didn't Read)

1. **Klik "Edit"** di **"Public"** metadata
2. **Ketik**: `{ "role": "admin" }`
3. **Save**
4. **User re-login**
5. **Done!** 👑

---

## 🆘 Troubleshooting

**Q: Button "Edit" tidak muncul?**
- Pastikan Anda admin Clerk Dashboard
- Coba refresh halaman

**Q: Error saat save?**
- Check format JSON (pakai validator)
- Pastikan tidak ada trailing comma

**Q: Sudah save tapi role tidak berubah?**
- User **HARUS** logout & login ulang!
- Clear browser cache
- Check di Clerk Dashboard apakah tersimpan

**Q: User tidak bisa akses admin page?**
- Verify metadata di dashboard
- Check code: `getUserRole()` dipanggil dengan benar
- Check `ProtectedRoute` setup

---

## 💡 Pro Tips

1. **Test dulu dengan 1 user** sebelum set banyak admin
2. **Simpan list admin** di tempat aman
3. **Audit regularly** - siapa saja yang admin
4. **Jangan set semua user jadi admin** - security risk!

---

## 📚 Related Docs

- Full guide: `SIMPLE_ROLE_SETUP.md`
- Visual guide: `VISUAL_GUIDE.md`
- Quick reference: `START_HERE.md`

---

**Ready!** Sekarang Anda bisa set admin dengan mudah! 🚀👑
