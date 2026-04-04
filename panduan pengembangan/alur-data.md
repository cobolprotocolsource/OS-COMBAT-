# Alur Data OS COMBAT

Dokumen ini menjelaskan **flow data anggota prajurit, inventaris, pos, dan latihan** di OS COMBAT.  
Fokus: bagaimana **modul plug-in interconnected** melalui Core OS dan menjaga data konsisten.

---

## **1. Data Anggota (Master Data)**
- Semua **data anggota** tersimpan di **Core OS**.  
- Modul hanya menggunakan **referensi**:
  - `nrp` → ID prajurit  
  - `unit_id` → unit atau batalion  
  - `status` → aktif/tugas/absen  

**Alasan Master Data di Core OS:**
1. Single Source of Truth  
2. Konsistensi antar modul  
3. Mudah integrasi modul baru  
4. Keamanan & kontrol akses terpusat

---

## **2. Alur Data Antar Modul**

```mermaid
sequenceDiagram
    participant Prajurit
    participant Core
    participant ModulPersonel as Personel
    participant ModulPos as Pos
    participant ModulInv as Inventaris
    participant ModulLat as Latihan
    participant Dashboard as DashboardAdmin

    Prajurit->>Core: Scan QR code + input data
    Core->>ModulPersonel: Update absensi & riwayat tugas
    Core->>ModulPos: Update log pos & lokasi GPS
    Core->>ModulInv: Update status inventaris & kendaraan
    Core->>ModulLat: Update latihan & evaluasi
    Core->>Dashboard: Refresh data real-time

flowchart TB
    PRAJURIT[Input Data: QR, GPS, Form] --> CORE[Core OS]
    CORE --> PERSONEL[Modul Personel]
    CORE --> POS[Modul Pos & Operasi]
    CORE --> INVENT[Modul Inventaris & Logistik]
    CORE --> LATIH[Modul Latihan & Evaluasi]
    CORE --> DASHBOARD[Dashboard Admin]

    %% Event Driven Feedback
    PERSONEL -->|Update status| CORE
    POS -->|Update log| CORE
    INVENT -->|Update inventaris| CORE
    LATIH -->|Update evaluasi| CORE
