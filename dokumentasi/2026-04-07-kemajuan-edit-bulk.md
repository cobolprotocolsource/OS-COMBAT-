# 2026-04-07 — Edit & Upload Massal Modul Personel

Ringkasan:

- Tanggal: 2026-04-07
- Langkah: Menambahkan fitur edit personel, validasi client-side, dan upload massal CSV.
- Hasil saat ini:
  - Backend: endpoint `POST /api/personel/bulk` ditambahkan untuk upload massal.
    - Backend: endpoint `POST /api/personel/bulk` ditambahkan untuk upload massal.
    - Validasi server-side ditambahkan: setiap item harus memiliki `nrp` dan `nama`; input disanitasi (trim).
      - Validasi server-side ditambahkan: setiap item harus memiliki `nrp` dan `nama`; input disanitasi (trim).
      - Validasi format `nrp` ditetapkan: 3-10 digit.
      - Deteksi duplikasi: payload duplikat `nrp` dan `nrp` yang sudah ada di sistem dilaporkan sebagai error.
        - Deteksi duplikasi: payload duplikat `nrp` dan `nrp` yang sudah ada di sistem dilaporkan sebagai error.
        - Audit logging: aksi `create`, `update`, `delete`, dan `bulk_create` sekarang dicatat di audit log internal (endpoint: `GET /api/personel/audit`).
  - Frontend: tombol `Edit` di tabel membuka modal pre-filled untuk update (PUT `/api/personel/:id`).
  - Frontend: fitur upload massal CSV dengan preview dan validasi sederhana sebelum submit.

Petunjuk CSV sederhana:

- File CSV harus memiliki header seperti `nrp,nama,pangkat` (case-insensitive pada pembacaan).
- Contoh baris: `12345,Budi,Sersan`

Perintah cepat untuk mencoba integrasi lokal:

1. Jalankan backend:

```bash
cd /workspaces/OS-COMBAT-
npm install
npm run dev
```

2. Jalankan frontend:

```bash
cd frontend
npm install
npm run dev
```

Catatan teknis & tindak lanjut:

- Parser CSV saat ini sangat sederhana (tidak mendukung tanda kutip atau koma dalam field). Untuk file kompleks, gunakan library parser seperti `papaparse`.
- Perlu validasi dan sanitasi server-side lebih lengkap sebelum produksi.
- Selanjutnya: tambahkan fitur hapus dari UI, edit lebih lengkap, serta otorisasi endpoints.
