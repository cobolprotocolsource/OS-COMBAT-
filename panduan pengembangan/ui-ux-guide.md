Panduan UI/UX OS COMBAT

Dokumen ini menjadi panduan resmi untuk developer dan AI (GitHub Copilot) agar membangun UI/UX OS COMBAT yang konsisten, modular, modern militer, dan mudah dipahami pengguna.


---

1. Prinsip Umum

Modern Militer: Tampilan profesional, bersih, dengan warna militer soft (hijau olive, biru tua, abu-abu netral), tidak taktis atau camouflage penuh.

Minimalis & Fokus: Dashboard menampilkan informasi kritikal.

Hierarchy Jelas: Dashboard → modul → submodul; status dan info utama mudah dibaca.

Tipografi Tegas: Font sans-serif modern, ukuran teks cukup untuk baca cepat.

Ikon Sederhana: Gunakan Lucide / FontAwesome, jangan terlalu banyak simbol kompleks.



---

2. Warna & Style Guide

Elemen	Warna / Style

Primary Button	#1E3A8A (biru tua)
Secondary Button	#FACC15 (kuning highlight)
Background Card	#F3F4F6 (abu-abu soft)
Text utama	#111827 (dark gray)
Text sekunder	#6B7280 (medium gray)
Badge / Status	Hijau (#10B981) aktif, Kuning (#F59E0B) peringatan, Merah (#EF4444) error


> Hindari warna camouflage gelap atau hijau pekat, fokus ke readability dan profesionalitas.




---

3. Komponen Standar

Komponen	Deskripsi / Behavior

Button	Primary, Secondary, Disabled, Hover effect, Tailwind classes px-4 py-2 rounded
Table	Sortable, Filterable, Paginated, Responsive, Highlight baris status dengan warna soft
Form Input	Text, Number, Date, QR Scan Input, GPS Picker; label & placeholder jelas
Modal	Konfirmasi, Warning, Info; simple pop-up, dismiss dengan tombol X atau background click
Dashboard Card	Menampilkan status absensi, pos, inventaris; warna status soft
Notification	Toast / Snackbar, fade out otomatis, simple dan mudah dipahami



---

4. Layout Dashboard

Sidebar Kiri: navigasi modul (Personel, Pos, Inventaris, Latihan, AI)

Top Bar: profil user, search, notifications

Main Content: dashboard modul aktif (card + tabel)

Footer: versi OS, tanggal update

Gunakan grid 12 kolom Tailwind dan spacing 8px


> Fokus pada readability, informasi cepat, dan navigasi intuitif.




---

5. Modular UI

Semua UI harus modular & reusable.

Buat komponen: Button, Card, Table, Modal, Input.

Copilot bisa menggunakan komponen ini untuk modul lain.



---

6. Prompt Contoh untuk Copilot Chat

> "Buat halaman dashboard untuk modul Personel sesuai panduan ui-ux-guide.md, gunakan React + Tailwind, sidebar kiri, topbar, main content dengan tabel absensi sortable, filterable, responsive, tombol primary #1E3A8A, secondary #FACC15, spacing 8px grid, style modern militer mudah dipahami, card status soft warna hijau/kuning/merah."




---

7. Tips Praktis

1. Simpan komponen di /dashboard/components.


2. Gunakan data dummy saat generate UI.


3. Review hasil Copilot dan berikan feedback iteratif.


4. Dashboard modul lain mengikuti pola ini untuk konsistensi.




---

Catatan: Dokumen ini wajib dijadikan referensi setiap kali men-generate UI/UX modul baru di OS COMBAT untuk memastikan tampilan modern militer, bersih, dan mudah dipahami.
