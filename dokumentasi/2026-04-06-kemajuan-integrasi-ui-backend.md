# 2026-04-06 — Integrasi UI & Backend Modul Personel

Ringkasan:

- Tanggal: 2026-04-06
- Langkah: Menghubungkan frontend ke endpoint `/api/personel` dan menambahkan form tambah personel.
- Hasil saat ini:
  - `frontend/src/api/personel.js` ditambahkan untuk komunikasi API.
  - `frontend/src/pages/Dashboard.jsx` diupdate untuk mem-fetch daftar personel dan menampilkan modal form untuk menambah personel.
  - `frontend/vite.config.js` diupdate dengan proxy `/api` → `http://localhost:3000` agar pengembangan lokal dapat memanggil backend.

Catatan teknis:

- Panggilan API menggunakan `fetch`. Error sederhana ditangani melalui alert dan console logging.
- Setelah membuat personel baru, item ditambahkan di UI tanpa perlu refresh penuh.
- Untuk produksi, pertimbangkan menambah error handling yang lebih baik, validasi sisi-klien, dan otorisasi pada endpoint.

Langkah berikutnya:

- Tambah form edit personel (modal edit) dan validasi input.
- Jalankan unit test backend (`npm test`) dan perbaiki bila ada kegagalan.
- Integrasikan autentikasi nyata dan hak akses.
