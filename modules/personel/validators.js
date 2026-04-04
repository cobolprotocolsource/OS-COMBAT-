// modules/personel/validators.js
// Validation functions for Personel module

function validatePersonel(data) {
  const errors = [];

  if (!data.nrp || typeof data.nrp !== 'string') {
    errors.push({ field: 'nrp', message: 'NRP is required and must be a string' });
  } else {
    const nrp = data.nrp.trim();
    if (!/^\d{3,10}$/.test(nrp)) {
      errors.push({ field: 'nrp', message: 'NRP must be 3-10 digits' });
    }
  }

  if (!data.nama || typeof data.nama !== 'string') {
    errors.push({ field: 'nama', message: 'Nama is required and must be a string' });
  } else if (data.nama.trim().length < 2) {
    errors.push({ field: 'nama', message: 'Nama must be at least 2 characters' });
  }

  if (data.pangkat && typeof data.pangkat !== 'string') {
    errors.push({ field: 'pangkat', message: 'Pangkat must be a string' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

function sanitizePersonel(data) {
  return {
    nrp: data.nrp ? String(data.nrp).trim() : '',
    nama: data.nama ? String(data.nama).trim() : '',
    pangkat: data.pangkat ? String(data.pangkat).trim() : ''
  };
}

module.exports = { validatePersonel, sanitizePersonel };
