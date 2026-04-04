# Panduan Modul OS COMBAT

Dokumen ini menjelaskan **cara membuat modul plug-in baru** untuk OS COMBAT agar bisa terintegrasi dengan Core OS dan modul lainnya.

---

## **1. Prinsip Modul Plug-in**
- Modul **tidak menyimpan master data anggota** → hanya referensi dari Core OS  
- Modul baru harus **plug-and-play**: bisa aktif/nonaktif via **Module Manager**  
- Update modul dilakukan melalui **event-driven sync** ke Core OS  
- Modul wajib mengikuti **standar API Core OS** untuk interoperabilitas  

---

## **2. Struktur Modul**
Setiap modul terdiri dari:
