// frontend/src/api/audit.js
// Client for audit endpoints

const base = '/api/personel'

export async function getAudit() {
  const res = await fetch(`${base}/audit`)
  if (!res.ok) throw new Error('Gagal mengambil audit')
  const body = await res.json()
  return body.data || []
}

export async function downloadAuditCSV() {
  const res = await fetch(`${base}/audit/export`)
  if (!res.ok) throw new Error('Gagal men-download audit CSV')
  const blob = await res.blob()
  return blob
}
