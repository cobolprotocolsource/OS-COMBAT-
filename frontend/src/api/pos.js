// frontend/src/api/pos.js
// Client for Pos API endpoints

const base = '/api/pos'

export async function getPos() {
  const res = await fetch(base)
  if (!res.ok) throw new Error('Gagal mengambil data pos')
  const body = await res.json()
  return body.data || []
}

export async function createPos(payload) {
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Gagal membuat pos')
  const body = await res.json()
  return body.data
}

export async function updatePos(id, payload) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error('Gagal mengupdate pos')
  const body = await res.json()
  return body.data
}

export async function deletePos(id) {
  const res = await fetch(`${base}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Gagal menghapus pos')
  const body = await res.json()
  return body.data
}
