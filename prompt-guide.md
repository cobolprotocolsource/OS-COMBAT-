Prompt Guide OS COMBAT untuk GitHub Copilot Chat

Dokumen ini berisi panduan prompt siap pakai agar GitHub Copilot Chat Codespaces dapat membangun OS COMBAT dengan struktur teratur, modular, dan sesuai panduan pengembangan, sekaligus menulis dan membaca dokumentasi kemajuan.


---

1. Prinsip Umum Prompt

1. Sertakan tujuan kode secara jelas (misal modul, API, UI).


2. Sertakan referensi file panduan (panduan-pengembangan/*) untuk alur data dan UI/UX.


3. Sertakan struktur folder & file agar kode tertata.


4. Sertakan standar coding (ES6, async/await, error handling, logging, unit test).


5. Minta komentar inline agar mudah dibaca developer.


6. Modularisasi: buat komponen reusable untuk UI/UX agar bisa dipakai di modul lain.


7. Selalu update dokumentasi kemajuan di folder /dokumentasi setiap selesai generate kode atau modul.


8. Baca dokumentasi kemajuan sebelumnya sebelum memulai generate modul baru agar langkah berikutnya terkoordinasi.




---

2. Prompt Template untuk Modul Backend (Node.js / Express)

Buat modul [NAMA MODUL] untuk OS COMBAT.
- Gunakan Node.js + Express.
- Ikuti struktur folder repo: core/, modules/[NAMA MODUL]/.
- Alur data mengikuti panduan di panduan-pengembangan/alur-data.md.
- Tambahkan controller.js, routes.js, model.js, events.js.
- Sertakan komentar setiap fungsi: input, output, dan tujuan.
- Gunakan event-driven architecture untuk sinkronisasi dengan Core OS.
- Sertakan unit test menggunakan Jest di folder modules/[NAMA MODUL]/tests.
- Update dokumentasi kemajuan modul di folder /dokumentasi dengan tanggal dan ringkasan pekerjaan.
- Baca dokumentasi kemajuan sebelumnya untuk menyesuaikan langkah berikutnya dan integrasi dengan Core OS.

3. Prompt Template untuk Modul Frontend / Dashboard (React + Tailwind)

Buat UI modul [NAMA MODUL] untuk dashboard OS COMBAT.
- Gunakan React + Tailwind.
- Ikuti panduan UI/UX di panduan-pengembangan/ui-ux-guide.md.
- Sidebar kiri untuk navigasi modul.
- Topbar untuk profil user dan notifications.
- Main content menampilkan tabel, card, dan form sesuai modul.
- Komponen modular: Button, Card, Table, Modal, Input.
- Responsive layout grid 12 kolom, spacing 8px.
- Warna tombol, badge, dan card sesuai style guide.
- Sertakan komentar JSX untuk menjelaskan setiap komponen.
- Gunakan data dummy agar UI dapat langsung di-preview.
- Update dokumentasi kemajuan UI di folder /dokumentasi.
- Baca dokumentasi kemajuan sebelumnya untuk menyesuaikan fitur dan UI konsisten.

4. Prompt Template untuk Integrasi Modul

Integrasikan modul [NAMA MODUL] ke Core OS.
- Pastikan event listener terpasang dengan Core OS.
- Data dari modul harus tersinkronisasi ke Core OS sesuai alur di panduan-pengembangan/alur-data.md.
- Pastikan modul dapat diaktifkan/nonaktifkan melalui Module Manager.
- Sertakan logging untuk setiap event penting.
- Tambahkan unit test untuk endpoint integrasi.
- Update dokumentasi kemajuan integrasi di folder /dokumentasi.
- Baca dokumentasi kemajuan sebelumnya agar integrasi tidak konflik dan mengikuti langkah terakhir.

5. Tips Menggunakan Prompt

1. Selalu sertakan nama modul yang spesifik.


2. Gunakan copy-paste prompt template dari file ini agar konsisten.


3. Review hasil kode dan berikan feedback iteratif agar Copilot menyesuaikan style.


4. Letakkan prompt-guide.md di repo sehingga developer baru bisa langsung menggunakannya.


5. Pastikan setiap langkah generate kode selalu membaca dan menulis dokumentasi kemajuan di /dokumentasi.




---

Catatan: Semua prompt ini wajib dijadikan referensi setiap kali menggunakan GitHub Copilot Chat untuk membangun OS COMBAT agar kode tetap terstruktur, modular, konsisten, dan kemajuan selalu terdokumentasi.
