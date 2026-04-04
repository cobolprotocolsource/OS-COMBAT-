# OS COMBAT - Sistem Manajemen Batalion

Sistem manajemen batalion modular dan interconnected untuk TNI AD.

## Arsitektur

OS COMBAT menggunakan arsitektur modular dengan Core OS sebagai pusat sistem dan modul plug-in yang dapat ditambahkan sesuai kebutuhan.

### Core OS
- User Management (autentikasi multi-level)
- Module Manager (aktivasi/deaktivasi modul)
- API Gateway (komunikasi antar modul)
- Dashboard Inti (ringkasan semua modul)
- Security & Audit (enkripsi, logging)

### Modul Aktif
1. **Personel**: Manajemen data personel, absensi, riwayat tugas
2. **Pos**: Manajemen pos dan operasi lapangan

## Teknologi

### Backend
- Node.js + Express
- Supabase (PostgreSQL) untuk database
- Event-driven architecture untuk sinkronisasi antar modul

### Frontend
- React 18
- Tailwind CSS
- Vite
- React Router

## Setup Development

### Prerequisites
- Node.js 18+
- npm atau yarn
- Akun Supabase

### Backend Setup

1. Clone repository:
```bash
git clone https://github.com/username/os-combat.git
cd os-combat
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
```

Edit `.env` dan isi dengan credentials Supabase Anda:
```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
PORT=3000
```

4. Jalankan migrations di Supabase:
- Buka Supabase Dashboard
- Jalankan SQL migrations dari dokumentasi migrasi

5. Jalankan server development:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### Frontend Setup

1. Masuk ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env
```

Edit `.env` dan isi dengan credentials Supabase:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Jalankan development server:
```bash
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

### Build Frontend

```bash
npm run build
```

## API Endpoints

### Personel
- `GET /api/personel` - List semua personel
- `GET /api/personel/:id` - Detail personel
- `POST /api/personel` - Buat personel baru
- `PUT /api/personel/:id` - Update personel
- `DELETE /api/personel/:id` - Hapus personel
- `POST /api/personel/bulk` - Upload massal personel
- `GET /api/personel/audit` - Lihat audit logs
- `GET /api/personel/audit/export` - Export audit ke CSV

### Pos
- `GET /api/pos` - List semua pos
- `GET /api/pos/:id` - Detail pos
- `POST /api/pos` - Buat pos baru
- `PUT /api/pos/:id` - Update pos
- `DELETE /api/pos/:id` - Hapus pos

### Health Check
- `GET /health` - Status server

## Testing

```bash
npm test
```

## Struktur Folder

```
os-combat/
├── core/                    # Core OS files
│   ├── db.js               # Database adapter (Supabase)
│   ├── audit.js            # Audit logging
│   ├── auth.js             # Authentication middleware
│   ├── eventHandler.js     # Event system
│   ├── server.js           # Express server
│   └── util.js             # Utility functions
├── modules/                 # Modular plugins
│   ├── personel/
│   │   ├── controller.js
│   │   ├── model.js
│   │   ├── routes.js
│   │   ├── events.js
│   │   ├── validators.js
│   │   └── tests/
│   └── pos/
│       ├── controller.js
│       ├── model.js
│       ├── routes.js
│       ├── events.js
│       ├── validators.js
│       └── tests/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── api/            # API clients
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── utils/          # Utilities
│   └── public/
├── dokumentasi/             # Progress documentation
├── panduan pengembangan/    # Developer guides
└── package.json
```

## Dokumentasi

Dokumentasi lengkap tersedia di folder:
- `/dokumentasi` - Progress harian pengembangan
- `/panduan pengembangan` - Panduan arsitektur dan development

## Roadmap

### Fase 1 - MVP Awal (COMPLETED)
- Core OS
- Modul Personel & Pos
- Dashboard admin minimal
- Migrasi ke Supabase

### Fase 2 - Modul Inventaris & Latihan
- Modul Inventaris & Logistik
- Modul Latihan & Evaluasi

### Fase 3 - AI & Insight Dashboard
- Modul AI prediktif & rekomendasi

### Fase 4 - Deployment & Training
- Deploy ke server batalion
- Training admin

## Kontribusi

Proyek ini dikembangkan untuk keperluan internal militer. Untuk kontribusi, hubungi tim developer OS COMBAT.

## Lisensi

Proprietary / Internal Military Use
