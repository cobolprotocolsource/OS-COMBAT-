# 2026-04-08 — UI Audit Log untuk Modul Personel

Ringkasan:

- Tanggal: 2026-04-08
- Langkah: Menambahkan tampilan audit log di UI (modal) untuk melihat aktivitas `create`, `update`, `delete`, dan `bulk_create`.
- Hasil saat ini:
  - `frontend/src/api/audit.js` menambahkan client `getAudit()`.
  - `frontend/src/components/AuditList.jsx` menampilkan daftar audit dengan waktu, aksi, dan detil.
  - Tombol `Lihat Audit` ditambahkan di `Dashboard` untuk membuka modal dan mem-fetch data audit.

Catatan teknis:

- Audit saat ini bersifat in-memory di server (`core/audit.js`) — restart server akan mengosongkan log.
- Untuk produksi, simpan audit ke DB atau file dan tambahkan paging/filter pada UI.

- Fitur baru: export audit ke CSV tersedia melalui tombol `Export CSV` pada modal audit. Endpoint backend: `GET /api/personel/audit/export`.

Langkah berikutnya:

- Tambah paging/filtrasi pada UI Audit (by action, date range).
- Tambah endpoint export (CSV) untuk audit.
