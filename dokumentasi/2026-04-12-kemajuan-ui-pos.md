# 2026-04-12 — UI Modul Pos

Ringkasan:

- Tanggal: 2026-04-12
- Langkah: Menambahkan halaman UI untuk Modul Pos di frontend.
- Hasil saat ini:
  - `frontend/src/pages/Pos.jsx` dibuat: halaman daftar pos, modal tambah/edit, tombol hapus, dan notifikasi toast.
  - `frontend/src/api/pos.js` ditambahkan sebagai client API untuk `/api/pos`.
  - Sidebar diperbarui untuk menampilkan link `Pos`.

Catatan teknis:

- UI menggunakan komponen reusable (`Button`, `Card`, `Table`, `Modal`, `Input`, `Toast`).
- Halaman menggunakan `getPos`, `createPos`, `updatePos`, dan `deletePos` dari `frontend/src/api/pos.js`.

Langkah berikutnya:

- Tambah routing frontend (React Router) agar navigasi SPA bekerja, atau gunakan server-side routing saat development.
- Tambah validasi server-side (kode unik) dan test integrasi UI.
