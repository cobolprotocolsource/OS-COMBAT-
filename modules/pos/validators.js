// modules/pos/validators.js
// Validation functions for Pos module

function validatePos(data) {
  const errors = [];

  if (!data.kode || typeof data.kode !== 'string') {
    errors.push({ field: 'kode', message: 'Kode is required and must be a string' });
  } else if (data.kode.trim().length < 2) {
    errors.push({ field: 'kode', message: 'Kode must be at least 2 characters' });
  }

  if (!data.nama || typeof data.nama !== 'string') {
    errors.push({ field: 'nama', message: 'Nama is required and must be a string' });
  } else if (data.nama.trim().length < 2) {
    errors.push({ field: 'nama', message: 'Nama must be at least 2 characters' });
  }

  if (data.lokasi && typeof data.lokasi !== 'string') {
    errors.push({ field: 'lokasi', message: 'Lokasi must be a string' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function sanitizePos(data) {
  return {
    kode: data.kode ? String(data.kode).trim() : '',
    nama: data.nama ? String(data.nama).trim() : '',
    lokasi: data.lokasi ? String(data.lokasi).trim() : ''
  };
}

module.exports = { validatePos, sanitizePos };
