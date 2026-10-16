# Panduan Pitch dan Demo

## Narasi 10–12 menit

### 1. Masalah — 60 detik

“Sekolah sering menyadari siswa membutuhkan bantuan ketika masalahnya sudah membesar. Data kehadiran, nilai, dan catatan guru tersebar, sementara Guru BK memiliki waktu terbatas. Langkah membantu sekolah bergerak lebih dini—tanpa memberi label kepada siswa.”

### 2. Solusi — 45 detik

“Langkah menghubungkan tiga hal: mengenali perubahan, memahami konteks secara transparan, dan memastikan tindak lanjut benar-benar berjalan.”

### 3. Demo utama — 4 menit

1. Buka `/dashboard`: tunjukkan prioritas hari ini, progres, dan jadwal.
2. Pilih **Nadia P.**: jelaskan bahwa sistem menampilkan alasan dan kekuatan, bukan hanya skor.
3. Tunjukkan rekomendasi pendampingan dan klik **Personalisasi dengan AI**.
4. Buka `/assessment`: ubah satu indikator dan tunjukkan hasil yang dapat dijelaskan.
5. Buka `/interventions`: tandai satu tindakan selesai dan perlihatkan perubahan progres.
6. Buka `/analytics`: tunjukkan dampak agregat tanpa identitas siswa.

### 4. Inovasi — 60 detik

- Deteksi tidak berhenti pada peringatan; alur berlanjut sampai intervensi dan evaluasi.
- Mesin prioritas transparan dan dapat diaudit.
- Kekuatan siswa menjadi bagian dari rekomendasi.
- AI bersifat opsional, terbatas, dan selalu ditinjau manusia.

### 5. Implementasi teknis — 60 detik

Jelaskan App Router, aturan domain terpisah, route AI dengan fallback, desain responsif, dan jalur migrasi PostgreSQL/RLS. Tunjukkan bahwa demo tetap berjalan tanpa koneksi atau API key.

### 6. Dampak dan kelayakan — 60 detik

Pilot tiga tahap:

1. 1 sekolah dan 2 kelas selama 8 minggu;
2. evaluasi waktu respons, penyelesaian intervensi, dan perubahan kehadiran;
3. perluasan dengan integrasi sistem informasi sekolah setelah aspek privasi tervalidasi.

## Jawaban singkat pertanyaan juri

**Apakah sistem dapat salah?** Bisa. Karena itu hasil disebut tingkat kebutuhan dukungan, semua faktor ditampilkan, dan guru wajib mengonfirmasi melalui percakapan.

**Mengapa memakai AI?** Hanya untuk merangkum opsi dengan bahasa yang relevan. Penentuan tingkat dukungan memakai aturan eksplisit dan sistem tetap berfungsi tanpa AI.

**Bagaimana menjaga data siswa?** Minimisasi data, akses berbasis peran, laporan agregat, audit akses, serta rencana RLS dan retensi untuk produksi.

**Apa metrik keberhasilan?** Waktu dari indikator ke tindakan, tingkat penyelesaian intervensi, perubahan kehadiran, dan pengalaman siswa—bukan sekadar jumlah siswa yang ditandai.
