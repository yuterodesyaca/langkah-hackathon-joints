# Langkah

**Setiap siswa layak melangkah lebih jauh.**

Langkah adalah prototipe platform pendampingan dini untuk JOINTS 2026 Hackathon—subtema Education. Produk membantu guru dan Guru BK mengenali perubahan kondisi siswa, memahami alasannya secara transparan, merencanakan intervensi, dan memantau perkembangan tanpa memberi label atau menyerahkan keputusan kepada AI.

## Fitur utama

- Landing page dan login demonstrasi yang siap pitching
- Dashboard prioritas harian, progres, tren, dan jadwal
- Direktori siswa dengan pencarian dan filter
- Profil siswa 360°: kebutuhan, kekuatan, catatan, dan riwayat
- Asesmen tiga langkah dengan mesin prioritas transparan
- Papan tindak lanjut interaktif dengan progres dan status
- Analitik agregat tanpa identitas siswa
- Rekomendasi AI opsional dengan fallback berbasis aturan
- Pengaturan privasi, notifikasi, dan human-in-the-loop
- Responsif untuk desktop, tablet, dan ponsel

## Menjalankan aplikasi

Persyaratan: Node.js 20+ dan npm.

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Akun demonstrasi sudah terisi pada halaman login:

- Email: `guru@demo.langkah.id`
- Kata sandi: `langkah2026`

Untuk build produksi:

```bash
npm run typecheck
npm run build
npm start
```

> Sandbox pembuatan proyek ini memblokir akses npm registry, sehingga instalasi dependency tidak dapat dilakukan di sini. Source dibuat agar dapat dipasang pada lingkungan Node.js standar atau Vercel.

## Rute aplikasi

| Rute | Fungsi |
|---|---|
| `/` | Landing page dan narasi produk |
| `/login` | Login demonstrasi |
| `/dashboard` | Ringkasan pendampingan |
| `/students` | Direktori siswa |
| `/students/nadiap` | Profil siswa demonstrasi utama |
| `/assessment` | Asesmen kebutuhan dukungan |
| `/interventions` | Manajemen tindak lanjut |
| `/analytics` | Laporan agregat |
| `/settings` | AI, privasi, notifikasi, dan profil |

## Penggunaan AI

Endpoint `POST /api/ai/recommend` bekerja dalam dua mode:

1. **Fallback lokal (default):** rekomendasi deterministik dan dapat dijelaskan; tidak membutuhkan API key.
2. **Provider kompatibel OpenAI:** aktif bila `AI_API_URL`, `AI_API_KEY`, dan opsional `AI_MODEL` dikonfigurasi.

Salin `.env.example` menjadi `.env.local`. Endpoint hanya menerima faktor dan kekuatan yang relevan, bukan nama lengkap atau catatan mentah. AI tidak menghitung tingkat dukungan dan tidak mengambil keputusan.

## Prinsip keselamatan

- Istilah yang digunakan adalah **tingkat kebutuhan dukungan**, bukan label risiko.
- Skor tidak merepresentasikan nilai, karakter, atau diagnosis siswa.
- Rekomendasi wajib dikonfirmasi melalui percakapan empatik.
- Data pada prototipe sepenuhnya fiktif.
- Analitik ditampilkan secara agregat.
- Guru dan Guru BK tetap menjadi pengambil keputusan.

## Struktur

```text
app/
  (workspace)/        # Area aplikasi terautentikasi
  api/ai/recommend/   # Endpoint AI + fallback
  login/              # Login demonstrasi
components/           # Komponen UI dan fitur interaktif
lib/                  # Model data, seed, analitik, mesin dukungan
docs/                 # Arsitektur, skema produksi, dan panduan pitch
public/               # Manifest dan identitas visual
```

Lihat [`docs/architecture.md`](docs/architecture.md) untuk keputusan teknis dan [`docs/pitch-guide.md`](docs/pitch-guide.md) untuk alur demonstrasi.
