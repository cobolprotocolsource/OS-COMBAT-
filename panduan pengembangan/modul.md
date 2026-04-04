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
**Keterangan:**
- `index.js` → registrasi modul di Core OS  
- `routes.js` → endpoint modul untuk Core OS dan frontend  
- `controller.js` → semua logic modul (input, validasi, output)  
- `model.js` → schema data internal modul (tidak master data anggota)  
- `events.js` → menghubungkan modul ke event-driven Core OS  
- `config.json` → metadata modul: nama, versi, status aktif/nonaktif

---

## **3. Standar API Modul**

### **Endpoint Wajib**
| Endpoint | Method | Fungsi |
|----------|--------|--------|
| `/api/modul/data` | GET | Mengambil data modul |
| `/api/modul/data` | POST | Input/Update data modul ke Core OS |
| `/api/modul/register` | POST | Registrasi modul ke Core OS |
| `/api/modul/status` | PUT | Aktif/nonaktif modul via Module Manager |

### **Format Data JSON Standar**
```json
{
  "modul_id": "inventaris",
  "nrp": "123456",
  "unit_id": "unit-01",
  "data": {
    "alat_id": "alat-001",
    "status": "aktif",
    "lokasi": "Gudang A"
  },
  "timestamp": "2026-04-04T12:00:00Z"
}


sequenceDiagram
    participant ModulBaru
    participant Core
    participant DashboardAdmin

    ModulBaru->>Core: Registrasi modul
    Core-->>DashboardAdmin: Tampilkan modul baru
    DashboardAdmin->>Core: Aktifkan modul
    Core-->>ModulBaru: Kirim master data & event
    ModulBaru->>Core: Update data internal & sync event
