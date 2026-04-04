# Arsitektur OS COMBAT

Dokumen ini menjelaskan **struktur sistem OS COMBAT** dan bagaimana modul plug-in berinteraksi dengan Core OS.

---

## **1. Core OS**

Core OS adalah **pusat sistem** dan menyimpan **master data**. Semua modul terhubung melalui Core OS.  

**Fungsi Core OS:**
- **User Management:** autentikasi multi-level (Admin, Komandan, Operator, Prajurit)  
- **Module Manager:** aktif/nonaktif modul plug-in  
- **API Gateway:** pusat komunikasi antara core dan modul  
- **Dashboard Inti:** ringkasan semua modul aktif, laporan real-time  
- **Security & Audit:** enkripsi data, token modul, audit trail untuk semua aktivitas  

**Master Data Core OS:**
- Data anggota prajurit: NRP, nama, pangkat, unit, status  
- Data inventaris & kendaraan  
- Pos & operasi  
- Data latihan & evaluasi

---

## **2. Modul Plug-in**

Modul bersifat **plug-and-play**, dapat ditambahkan atau di-nonaktifkan tanpa mengganggu Core OS.  
Setiap modul menggunakan **referensi master data** dari Core OS.  

**Contoh Modul:**
1. **Personel:** absensi, riwayat tugas, pelatihan  
2. **Pos & Operasi:** QR code pos, log harian, monitoring real-time  
3. **Inventaris & Logistik:** tracking peralatan, kendaraan, stock logistik  
4. **Latihan & Evaluasi:** quiz, simulasi, laporan performa  

**Prinsip Modul:**
- Tidak menyimpan master data anggota → hanya referensi ke Core OS  
- Update data dikirim melalui Core OS (event-driven sync)  
- Registrasi modul via **Module Manager**

---

## **3. Diagram Arsitektur (Mermaid)**

```mermaid
flowchart TB
    subgraph CORE["Core OS"]
        A1[User Management]
        A2[Module Manager]
        A3[API Gateway]
        A4[Dashboard Inti]
        A5[Security & Audit]
    end

    subgraph MODULES["Modul Plug-in"]
        B1[Personel: Absensi & Riwayat]
        B2[Pos & Operasi: QR + GPS]
        B3[Inventaris & Logistik]
        B4[Latihan & Evaluasi]
    end

    CORE --> MODULES
    B1 -->|referensi data anggota| CORE
    B2 -->|update absensi & lokasi| CORE
    B3 -->|tracking alat & kendaraan| CORE
    B4 -->|update latihan & presensi| CORE
