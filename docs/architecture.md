# Arsitektur Langkah

## Tujuan desain

Langkah dirancang untuk demo hackathon yang stabil sekaligus memberi jalur migrasi menuju sistem produksi. UI menggunakan data fiktif lokal agar seluruh alur dapat dipresentasikan tanpa koneksi internet. Logika prioritas berada pada fungsi murni `lib/support.ts`, sehingga dapat diuji, diaudit, dan dipindahkan ke layanan backend tanpa mengubah aturan.

## Lapisan aplikasi

1. **Presentation** — Next.js App Router, React Server Components, dan komponen klien untuk formulir/filter.
2. **Domain** — tipe data pada `lib/types.ts` dan mesin kebutuhan dukungan pada `lib/support.ts`.
3. **Demo data** — data fiktif pada `lib/data.ts` dan `lib/analytics-data.ts`.
4. **Integration** — route handler `app/api/ai/recommend/route.ts` mengisolasi provider AI dan menyediakan fallback.

## Alur keputusan

```text
Data terstruktur → aturan transparan → tingkat kebutuhan + alasan
                                    ↓
Kekuatan siswa + faktor relevan → opsi rekomendasi
                                    ↓
                        tinjauan Guru/Guru BK
                                    ↓
                      tindak lanjut dan evaluasi
```

AI hanya dapat membantu menyusun bahasa rekomendasi. Tingkat kebutuhan dihitung oleh aturan eksplisit dan keputusan akhir tetap pada manusia.

## Migrasi produksi

Untuk produksi, ganti `lib/data.ts` dengan repository berbasis PostgreSQL sesuai `database-schema.sql`. Direkomendasikan:

- autentikasi SSO sekolah atau Auth.js;
- PostgreSQL dengan Row-Level Security;
- enkripsi koneksi dan backup terenkripsi;
- audit log immutable;
- pemisahan tenant berdasarkan sekolah;
- kebijakan retensi dan penghapusan data;
- persetujuan serta dasar pemrosesan data yang jelas;
- observability tanpa menulis data sensitif ke log.

## Batasan prototipe

- Login merupakan simulasi demonstrasi, bukan autentikasi produksi.
- Perubahan status pada papan tindak lanjut disimpan di state browser dan kembali ke seed setelah refresh.
- Data analitik merupakan dataset fiktif yang dirancang untuk demo.
- Integrasi AI generik mengasumsikan endpoint chat completion kompatibel OpenAI.
