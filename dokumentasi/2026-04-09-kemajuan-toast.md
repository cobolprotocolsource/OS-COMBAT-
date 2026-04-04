# 2026-04-09 — Notifikasi Toast di UI

Ringkasan:

- Tanggal: 2026-04-09
- Langkah: Menambahkan notifikasi toast untuk memberi umpan balik asinkron pengguna.
- Hasil saat ini:
  - `frontend/src/components/Toast.jsx` ditambahkan (auto-dismiss, tipe: info/success/error).
  - `frontend/src/pages/Dashboard.jsx` mengintegrasikan toast untuk aksi `create`, `update`, `delete`, `bulk_upload`, dan error saat parsing/fetch.

Catatan teknis:

- Toast sederhana berbasis state lokal di `Dashboard`. Untuk aplikasi lebih besar, pertimbangkan konteks global atau library notifikasi.

Langkah berikutnya:

- Tambah komponen toast global dan style konsisten, atau gunakan library seperti `react-toastify` untuk fitur lengkap.
