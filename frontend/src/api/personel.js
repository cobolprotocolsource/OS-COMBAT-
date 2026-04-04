// frontend/src/api/personel.js
// Small client for personel API endpoints.

const base = '/api/personel'

export async function getPersonel() {
  const res = await fetch(base)
  if (!res.ok) throw new Error('Gagal mengambil data personel')
  const body = await res.json()
  return body.data || []
}

export async function createPersonel(payload) {
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Gagal membuat personel')
  const body = await res.json()
  return body.data
}

export async function updatePersonel(id, payload) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Gagal mengupdate personel')
  const body = await res.json()
  return body.data
}

export async function bulkCreatePersonel(items) {
  const res = await fetch(`${base}/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items)
  })
  if (!res.ok) throw new Error('Gagal upload massal')
  const body = await res.json()
  return body.data
}

export async function deletePersonel(id) {
  const res = await fetch(`${base}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Gagal menghapus personel')
  const body = await res.json()
  return body.data
}
