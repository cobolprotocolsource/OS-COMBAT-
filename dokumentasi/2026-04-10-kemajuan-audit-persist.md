# 2026-04-10 — Persistensi Audit ke File

Ringkasan:

- Tanggal: 2026-04-10
- Langkah: Menambahkan penyimpanan audit secara persistent ke file `data/audit.json`.
- Hasil saat ini:
  - `core/audit.js` sekarang menyimpan audit ke `data/audit.json` secara sinkron setelah setiap entry.
  - `data/` ditambahkan ke `.gitignore` agar log tidak ter-commit.

Catatan teknis:

- Implementasi saat ini bersifat sederhana dan sinkron (write per entry). Untuk beban tinggi, disarankan menggunakan buffer + flush async atau menyimpan ke DB.
- File JSON akan dimuat saat server start, sehingga audit bertahan saat restart (selama file `data/audit.json` tidak dihapus).

Langkah berikutnya:

- Migrasi ke penyimpanan terpersisten (Postgres/Mongo) untuk skala dan query audit.
- Tambah mekanisme rotasi file atau retention policy.
