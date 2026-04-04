import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Button from '../components/Button'
import Toast from '../components/Toast'
import { getPos, createPos, updatePos, deletePos } from '../api/pos'

export default function PosPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nama: '', lokasi: '', kode: '' })
  const [mode, setMode] = useState('create')
  const [editingId, setEditingId] = useState(null)
  const [toast, setToast] = useState({ message: '', type: 'info' })

  async function load() {
    setLoading(true)
    try {
      const data = await getPos()
      setRows(data)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setToast({ message: 'Gagal memuat pos', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSave() {
    if (!form.nama || !form.kode) return setToast({ message: 'Kode dan Nama wajib diisi', type: 'error' })
    try {
      if (mode === 'create') {
        const created = await createPos(form)
        setRows((s) => [created, ...s])
        setToast({ message: 'Pos berhasil dibuat', type: 'success' })
      } else {
        const updated = await updatePos(editingId, form)
        setRows((s) => s.map((r) => (r.id === updated.id ? updated : r)))
        setToast({ message: 'Pos berhasil diperbarui', type: 'success' })
      }
      setOpen(false)
      setForm({ nama: '', lokasi: '', kode: '' })
      setMode('create')
      setEditingId(null)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setToast({ message: 'Gagal menyimpan pos', type: 'error' })
    }
  }

  function handleEdit(r) {
    setMode('edit')
    setEditingId(r.id)
    setForm({ nama: r.nama || '', lokasi: r.lokasi || '', kode: r.kode || '' })
    setOpen(true)
  }

  async function handleDelete(r) {
    if (!confirm(`Hapus pos ${r.nama} (kode: ${r.kode})?`)) return
    try {
      await deletePos(r.id)
      setRows((s) => s.filter((x) => x.id !== r.id))
      setToast({ message: 'Pos dihapus', type: 'success' })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setToast({ message: 'Gagal menghapus pos', type: 'error' })
    }
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Topbar />
        <main className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              <Card title="Total Pos">{rows.length}</Card>
              <Card title="Aktif">{rows.length}</Card>
              <Card title="Peringatan">0</Card>
            </div>
            <div className="ml-4">
              <Button onClick={() => setOpen(true)}>Tambah Pos</Button>
            </div>
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-3">Daftar Pos</h2>
            {loading ? (
              <div>Memuat...</div>
            ) : (
              <Table
                data={rows}
                columns={["kode", "nama", "lokasi"]}
                actions={(r) => (
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(r)} className="text-sm text-blue-600">Edit</button>
                    <button onClick={() => handleDelete(r)} className="text-sm text-red-600">Hapus</button>
                  </div>
                )}
              />
            )}
          </section>
        </main>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">{mode === 'create' ? 'Tambah Pos' : 'Edit Pos'}</h3>
        <div className="space-y-2">
          <div>
            <label className="text-sm">Kode</label>
            <Input value={form.kode} onChange={(e) => setForm({ ...form, kode: e.target.value })} />
          </div>
          <div>
            <label className="text-sm">Nama</label>
            <Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
          </div>
          <div>
            <label className="text-sm">Lokasi</label>
            <Input value={form.lokasi} onChange={(e) => setForm({ ...form, lokasi: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>{mode === 'create' ? 'Simpan' : 'Update'}</Button>
          </div>
        </div>
      </Modal>

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />
    </div>
  )
}
