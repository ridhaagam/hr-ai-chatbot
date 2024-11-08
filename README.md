# HR-GenAI: Asisten Hukum Ketenagakerjaan Indonesia

<p align="center">
  <img src="app/(chat)/opengraph-image.png" alt="Asisten Hukum Ketenagakerjaan Indonesia" width="200"/>
</p>

<p align="center">
  Asisten AI Pintar untuk Membantu Memahami dan Menerapkan Hukum Ketenagakerjaan Indonesia
</p>

<p align="center">
  <a href="#fitur"><strong>Fitur</strong></a> ·
  <a href="#dataset"><strong>Dataset</strong></a> ·
  <a href="#instalasi"><strong>Instalasi</strong></a> ·
  <a href="#penggunaan-lokal"><strong>Penggunaan Lokal</strong></a>
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT">
  </a>
  <a href="https://github.com/yourusername/hr-genai/issues">
    <img src="https://img.shields.io/github/issues/yourusername/hr-genai" alt="GitHub issues">
  </a>
  <a href="https://github.com/yourusername/hr-genai/network">
    <img src="https://img.shields.io/github/forks/yourusername/hr-genai" alt="GitHub forks">
  </a>
</p>

## 🚀 Demo

Kunjungi [hr-genai.vercel.app](https://hr-genai.vercel.app) untuk mencoba aplikasi secara langsung.

## 🔄 Alur Kerja Sistem

```mermaid
[![](https://mermaid.ink/img/pako:eNqVVk1z2zYQ_SsYZqYnazpT91IdOkNTku0ktmV92EmgHCByKWEEASwAxlZl__cuAJKCEsWT6gRq3y72Pb1dap_kqoCkn5RCPeVrpi2ZDRaS4MfUy5Vm1ZoMmGVjDRV1BwOWuAemmeVKfg1Y90lppoSA3JKPsGKCDFReb0Fa85X0en-TCzp8tppheAICvjFpyRTBWMNERS48NqOZBmaBzDTjkssVGTOuY1zmcQM6UnrLLCmVJiMuoWdrB4-AAw8c-t7JAxO88H2T30gmgEVgkMVCfsf8BrURnro__YT4iE7B875AdUIOuRzPen_2tth8YH9JQy7EbZJprnllo1KXHnyFBS252lWg3XVbsNCRP9VmqxI9yKVVDiYW7JrOK6FYQdof0SpyV4FMr0OD7-m15JajQP_CT6R874EfUAtEouDxbSt9fN0Hj_1IG8VbWcagS_eLyRze4JOtmb2WSLpkOVD3RLrH6I4bOjegSeBlSKak99fv9zXoXWB1u29YkVQysTPcvB7ybx3kpU1r6ryQO9o6t5XxWIaQNoNnS_xNL2RM_eE0_HC68y3dd3PQ3TwUEAblgL332Mk-cmy2hnwTtT_xfdxwfyEKVKoXMqWp2aCzmeblzn2NjZnvZ2zqa8-CetjzN16AIWlRcIdErVytCD8LvZyiNGkk3FYCTdo0MadhAbSSR6XGvtT8VKm5Dz3QS5CgnWOmVte5rTUUuDFMhRze8kwLoe2BNIWOZ_XB3_LY7o0rYAXoKP7o45-oo8TkjgzAMi5Mu6oi5CeP_EyHyF3tIJB3RY9hnz3sC31UenNKkS8-nqaNZhMoQQOOR4xJ0wC6QHK52qJXgiXMSZulYYemGcUxxpJ3ta1qSwLjuGrYoenArSbj7I4rwXnidNWwSNPh3ttmhKtePfXqKjJkOvRuuIWnznY4Gz_EJ_CPizYu5TkLwHREGy_GVmz0j9seBaP8YIX2NeXD3eYOse4xWL9ZXCHWrTH_5olXT4g3RrM7AYc7Si5E_135V3lmrFYb6L87Pz9vzr0nXth1_4_qOU49tBByl8tfz-1abFLL5S-nHhFq2_4f-d04NanLt1OTs2QLaDRe4H-KvSu0SOwa19si6eOxYHqzSBbyFXGstmq6k3nSx0GHs0SrerVO-iUTBp_qyr02BpzheG8D5PU_VfS6vA?type=png)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqVVk1z2zYQ_SsYZqYnazpT91IdOkNTku0ktmV92EmgHCByKWEEASwAxlZl__cuAJKCEsWT6gRq3y72Pb1dap_kqoCkn5RCPeVrpi2ZDRaS4MfUy5Vm1ZoMmGVjDRV1BwOWuAemmeVKfg1Y90lppoSA3JKPsGKCDFReb0Fa85X0en-TCzp8tppheAICvjFpyRTBWMNERS48NqOZBmaBzDTjkssVGTOuY1zmcQM6UnrLLCmVJiMuoWdrB4-AAw8c-t7JAxO88H2T30gmgEVgkMVCfsf8BrURnro__YT4iE7B875AdUIOuRzPen_2tth8YH9JQy7EbZJprnllo1KXHnyFBS252lWg3XVbsNCRP9VmqxI9yKVVDiYW7JrOK6FYQdof0SpyV4FMr0OD7-m15JajQP_CT6R874EfUAtEouDxbSt9fN0Hj_1IG8VbWcagS_eLyRze4JOtmb2WSLpkOVD3RLrH6I4bOjegSeBlSKak99fv9zXoXWB1u29YkVQysTPcvB7ybx3kpU1r6ryQO9o6t5XxWIaQNoNnS_xNL2RM_eE0_HC68y3dd3PQ3TwUEAblgL332Mk-cmy2hnwTtT_xfdxwfyEKVKoXMqWp2aCzmeblzn2NjZnvZ2zqa8-CetjzN16AIWlRcIdErVytCD8LvZyiNGkk3FYCTdo0MadhAbSSR6XGvtT8VKm5Dz3QS5CgnWOmVte5rTUUuDFMhRze8kwLoe2BNIWOZ_XB3_LY7o0rYAXoKP7o45-oo8TkjgzAMi5Mu6oi5CeP_EyHyF3tIJB3RY9hnz3sC31UenNKkS8-nqaNZhMoQQOOR4xJ0wC6QHK52qJXgiXMSZulYYemGcUxxpJ3ta1qSwLjuGrYoenArSbj7I4rwXnidNWwSNPh3ttmhKtePfXqKjJkOvRuuIWnznY4Gz_EJ_CPizYu5TkLwHREGy_GVmz0j9seBaP8YIX2NeXD3eYOse4xWL9ZXCHWrTH_5olXT4g3RrM7AYc7Si5E_135V3lmrFYb6L87Pz9vzr0nXth1_4_qOU49tBByl8tfz-1abFLL5S-nHhFq2_4f-d04NanLt1OTs2QLaDRe4H-KvSu0SOwa19si6eOxYHqzSBbyFXGstmq6k3nSx0GHs0SrerVO-iUTBp_qyr02BpzheG8D5PU_VfS6vA)
```

## ✨ Fitur

### 📋 Analisis Hukum Ketenagakerjaan

- 📝 Analisis kontrak kerja (PKWT/PKWTT)
- 🧮 Perhitungan pesangon otomatis sesuai UU
- 📊 Evaluasi kebijakan perusahaan
- 📚 Referensi UU yang relevan

### 💻 Teknologi Modern

- ⚡️ [Next.js](https://nextjs.org) App Router untuk performa optimal
- 🤖 [AI SDK](https://sdk.vercel.ai/docs) untuk generasi teks dan analisis
- 🧠 [OpenAI GPT-4](https://openai.com) untuk pemahaman konteks yang mendalam
- 🎨 Antarmuka responsif dengan [Tailwind CSS](https://tailwindcss.com)

### 🔒 Fitur Keamanan & Penyimpanan

- 🔑 Autentikasi aman dengan [NextAuth.js](https://github.com/nextauthjs/next-auth)
- 💾 Penyimpanan data dengan [Vercel Postgres](https://vercel.com/storage/postgres)
- 📁 Pengelolaan dokumen dengan [Vercel Blob](https://vercel.com/storage/blob)

## 📊 Dataset

Dataset lengkap yang digunakan dalam proyek ini dapat diakses di:
[drive.com](https://drive.com)

Dataset mencakup:

- 📜 Undang-Undang Ketenagakerjaan Indonesia
- 📋 Peraturan Pemerintah terkait
- 📝 Contoh kasus dan penyelesaiannya
- 📄 Templat dokumen HR standar

## 🛠️ Instalasi

1. Clone repositori

```bash
git clone https://github.com/yourusername/hr-genai.git
```

2. Install dependensi

```bash
pnpm install
```

3. Siapkan environment variables

```bash
cp .env.example .env.local
```

## 🔑 Environment Variables

```env
# Authentication
AUTH_SECRET=your-auth-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Database
POSTGRES_URL=your-postgres-url

# Storage
BLOB_READ_WRITE_TOKEN=your-blob-token
```

## 🤝 Kontribusi

Kami sangat menghargai kontribusi Anda! Silakan buat pull request atau laporkan issues jika menemukan bug atau memiliki saran peningkatan.

1. Fork repositori ini
2. Buat branch baru (`git checkout -b feature/..`)
3. Commit perubahan Anda (`git commit -m 'New Fix'`)
4. Push ke branch (`git push origin feature/..`)
5. Buat Pull Request

## 📝 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## 👥 Tim

- Ir. Galih Wasis Wicaksono, S.Kom, M.Cs
- Nur Putri Hidayah, A.Md., SH., MH.
- Muh. Ridha Agam

## 🙏 All softwares used:

- [Next.js](https://nextjs.org)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [NextAuth.js](https://next-auth.js.org)
