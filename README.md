<div align="center">

# ✝️ SocialMedia Renungan Kristen

### _Platform Sosial untuk Berbagi Renungan Kristen Harian_

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

---

🌿 _"Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku."_ — Mazmur 119:105

</div>

---

## 📖 Tentang Proyek

**SocialMedia Renungan Kristen** adalah platform sosial modern yang dirancang untuk membantu jemaat Kristen berbagi dan membaca renungan harian. Dengan desain minimalis dan performa tinggi, aplikasi ini memfasilitasi komunitas iman untuk saling menguatkan melalui firman Tuhan.

### ✨ Fitur Utama

- 🔐 **Autentikasi Aman** — Login dan registrasi menggunakan Clerk Authentication
- 📝 **Berbagi Renungan** — Posting renungan harian dengan mudah
- 💬 **Interaksi Sosial** — Like, comment, dan share renungan dengan komunitas
- 🌙 **Modern UI/UX** — Desain minimalis dengan TailwindCSS v4
- ⚡ **Performa Tinggi** — Dibangun dengan Next.js 16 App Router dan React 19
- 📱 **Responsive Design** — Tampilan optimal di semua perangkat
- 🔍 **SEO Optimized** — Metadata lengkap untuk pencarian yang lebih baik

---

## 🛠️ Tech Stack

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| [Next.js](https://nextjs.org/) | 16 | React framework dengan App Router |
| [React](https://react.dev/) | 19 | Library untuk membangun UI |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type-safe JavaScript |
| [TailwindCSS](https://tailwindcss.com/) | v4 | Utility-first CSS framework |
| [Clerk](https://clerk.com/) | Latest | Authentication & user management |

---

## 📁 Struktur Folder

```
socialmedia-next-16/
├── public/                 # Static assets
├── src/
│   ├── app/               # App Router pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page
│   ├── components/        # Reusable components
│   ├── lib/              # Utilities & helpers
│   └── types/            # TypeScript types
├── eslint.config.mjs     # ESLint configuration
├── next.config.ts        # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** 18.x atau lebih tinggi
- **npm**, **yarn**, **pnpm**, atau **bun**

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/samuelindra123/socialmedia-next-16.git
   cd socialmedia-next-16
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   # atau
   bun install
   ```

3. **Setup Environment Variables**
   
   Buat file `.env.local` di root folder dan tambahkan:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   
   # Clerk Redirect URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

   > 💡 Dapatkan API keys dari [Clerk Dashboard](https://dashboard.clerk.com/)

4. **Run Development Server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   # atau
   bun dev
   ```

5. **Buka Browser**
   
   Akses [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

---

## 🌐 Deployment

### Deploy di Vercel (Recommended)

Cara tercepat untuk deploy aplikasi Next.js adalah menggunakan [Vercel Platform](https://vercel.com):

1. Push code ke GitHub repository
2. Import project di [Vercel Dashboard](https://vercel.com/new)
3. Tambahkan environment variables di Vercel
4. Deploy! 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samuelindra123/socialmedia-next-16)

> 📚 Lihat [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) untuk opsi deployment lainnya.

---

## 📚 Resources

- 📘 [Next.js Documentation](https://nextjs.org/docs) — Pelajari fitur dan API Next.js
- ⚛️ [React Documentation](https://react.dev/) — Panduan lengkap React 19
- 🎨 [TailwindCSS Docs](https://tailwindcss.com/docs) — Utility classes dan customization
- 🔐 [Clerk Documentation](https://clerk.com/docs) — Setup authentication
- 📖 [Learn Next.js](https://nextjs.org/learn) — Tutorial interaktif Next.js

---

## 👨‍💻 Author

**Samuel Indra**  
Software Engineer  
[@samuelindra123](https://github.com/samuelindra123)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 💖 Kontribusi

Kontribusi selalu diterima dengan tangan terbuka! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

<div align="center">

### 🙏 Dibuat dengan Kasih untuk Kemuliaan Tuhan

_"Segala sesuatu yang kamu lakukan, lakukanlah dengan segenap hatimu seperti untuk Tuhan dan bukan untuk manusia."_  
**— Kolose 3:23**

---

⭐ Jika proyek ini bermanfaat, jangan lupa beri **star**!

</div>
