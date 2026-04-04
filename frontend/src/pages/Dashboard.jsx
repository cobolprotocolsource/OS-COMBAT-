import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Card from '../components/Card'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Button from '../components/Button'
import { getPersonel, createPersonel } from '../api/personel'
import { updatePersonel, bulkCreatePersonel } from '../api/personel'
import { parseCSV } from '../utils/csv'
import { getAudit } from '../api/audit'
import AuditList from '../components/AuditList'
import { downloadAuditCSV } from '../api/audit'
import Toast from '../components/Toast'

export default function Dashboard() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ nama: '', pangkat: '', nrp: '' })
  const [mode, setMode] = useState('create')
  const [editingId, setEditingId] = useState(null)
  const [bulkOpen, setBulkOpen] = useState(false)
  const [bulkPreview, setBulkPreview] = useState([])
  const [auditOpen, setAuditOpen] = useState(false)
  const [auditLogs, setAuditLogs] = useState([])
  const [toast, setToast] = useState({ message: '', type: 'info' })

  async function load() {
    setLoading(true)
    try {
      const data = await getPersonel()
      setPeople(data)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleCreate() {
    // simple client-side validation
    if (!form.nrp || !form.nama) return setToast({ message: 'NRP dan Nama wajib diisi', type: 'error' })
    try {
      if (mode === 'create') {
        const created = await createPersonel(form)
        setPeople((s) => [created, ...s])
        setToast({ message: 'Personel berhasil dibuat', type: 'success' })
      } else if (mode === 'edit' && editingId) {
        const updated = await updatePersonel(editingId, form)
        setPeople((s) => s.map((p) => (p.id === updated.id ? updated : p)))
        setToast({ message: 'Personel berhasil diperbarui', type: 'success' })
      }
      setOpen(false)
      setForm({ nama: '', pangkat: '', nrp: '' })
      setMode('create')
      setEditingId(null)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setToast({ message: 'Gagal menyimpan personel', type: 'error' })
    }
  }

  function handleEdit(row) {
    setMode('edit')
    setEditingId(row.id)
    setForm({ nama: row.nama || '', pangkat: row.pangkat || '', nrp: row.nrp || '' })
    setOpen(true)
  }

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [toDelete, setToDelete] = useState(null)

  function promptDelete(row) {
    setToDelete(row)
    setConfirmOpen(true)
  }

  async function handleDelete() {
    if (!toDelete) return
    try {
      await deletePersonel(toDelete.id)
      setPeople((s) => s.filter((p) => p.id !== toDelete.id))
      setConfirmOpen(false)
      setToDelete(null)
      setToast({ message: 'Personel berhasil dihapus', type: 'success' })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setToast({ message: 'Gagal menghapus personel', type: 'error' })
    }
  }

  async function handleBulkUploadSend() {
    if (!bulkPreview.length) return alert('Tidak ada data untuk diupload')
    try {
      const created = await bulkCreatePersonel(bulkPreview)
      setPeople((s) => [...created, ...s])
      setBulkOpen(false)
      setBulkPreview([])
      setToast({ message: `Upload massal berhasil: ${created.length} item`, type: 'success' })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setToast({ message: 'Gagal upload massal', type: 'error' })
    }
  }

  function handleFileChange(file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const items = parseCSV(e.target.result)
        // basic validation preview: require nrp and nama
        const valid = items.map((it) => ({ nrp: it.nrp || it.NRP || '', nama: it.nama || it.Nama || it.nama_lengkap || '', pangkat: it.pangkat || it.Pangkat || '' }))
        setBulkPreview(valid)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        setToast({ message: 'Gagal membaca file CSV', type: 'error' })
      }
    }
    reader.readAsText(file)
  }

  async function loadAudit() {
    try {
      const logs = await getAudit()
      setAuditLogs(logs)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setToast({ message: 'Gagal memuat audit', type: 'error' })
    }
  }

  async function handleExportAudit() {
    try {
      const blob = await downloadAuditCSV()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'audit_personel.csv'
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
      setToast({ message: 'Export audit dimulai', type: 'success' })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
      setToast({ message: 'Gagal export audit', type: 'error' })
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
              <Card title="Total Personel">{people.length}</Card>
              <Card title="Unit Aktif">2</Card>
              <Card title="Peringatan">0</Card>
            </div>
            <div className="ml-4">
              <Button onClick={() => setOpen(true)}>Tambah Personel</Button>
            </div>
          </div>

          <section>
            <h2 className="text-lg font-semibold mb-3">Daftar Personel</h2>
            {loading ? (
              <div>Memuat...</div>
            ) : (
              <Table
                data={people}
                columns={["nrp", "nama", "pangkat"]}
                actions={(r) => (
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(r)} className="text-sm text-blue-600">Edit</button>
                    <button onClick={() => promptDelete(r)} className="text-sm text-red-600">Hapus</button>
                  </div>
                )}
              />
            )}
            <div className="mt-4 flex gap-2">
              <Button onClick={() => setBulkOpen(true)} className="mr-2">Upload Massal (CSV)</Button>
              <Button onClick={() => { setAuditOpen(true); loadAudit() }}>Lihat Audit</Button>
            </div>
          </section>
        </main>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">Tambah Personel</h3>
        <div className="space-y-2">
          <div>
            <label className="text-sm">NRP</label>
            <Input value={form.nrp} onChange={(e) => setForm({ ...form, nrp: e.target.value })} />
          </div>
          <div>
            <label className="text-sm">Nama</label>
            <Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
          </div>
          <div>
            <label className="text-sm">Pangkat</label>
            <Input value={form.pangkat} onChange={(e) => setForm({ ...form, pangkat: e.target.value })} />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreate}>{mode === 'create' ? 'Simpan' : 'Update'}</Button>
          </div>
        </div>
      </Modal>

      <Modal open={bulkOpen} onClose={() => setBulkOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">Upload Massal Personel (CSV)</h3>
        <div className="space-y-3">
          <div>
            <input type="file" accept="text/csv" onChange={(e) => e.target.files[0] && handleFileChange(e.target.files[0])} />
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Preview:</div>
            <div className="max-h-40 overflow-auto border p-2 bg-gray-50">
              {bulkPreview.length ? (
                <table className="min-w-full text-sm">
                  <thead>
                    <tr><th className="p-1">NRP</th><th className="p-1">Nama</th><th className="p-1">Pangkat</th></tr>
                  </thead>
                  <tbody>
                    {bulkPreview.map((b, i) => (
                      <tr key={i}><td className="p-1">{b.nrp}</td><td className="p-1">{b.nama}</td><td className="p-1">{b.pangkat}</td></tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-sm text-gray-500">Belum ada file diunggah.</div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleBulkUploadSend}>Upload</Button>
          </div>
        </div>
      </Modal>

      <Modal open={auditOpen} onClose={() => setAuditOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">Audit Logs</h3>
        <div className="flex justify-between items-center mb-2">
          <div />
          <div>
            <Button onClick={handleExportAudit} className="mr-2">Export CSV</Button>
            <Button onClick={loadAudit}>Refresh</Button>
          </div>
        </div>
        <AuditList logs={auditLogs} />
      </Modal>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <h3 className="text-lg font-semibold mb-2">Konfirmasi Hapus</h3>
        <div>
          <p>Anda yakin ingin menghapus personel <strong>{toDelete?.nama}</strong> (NRP: {toDelete?.nrp})?</p>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setConfirmOpen(false)} className="mr-2">Batal</Button>
            <Button onClick={handleDelete} className="bg-red-600">Hapus</Button>
          </div>
        </div>
      </Modal>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'info' })} />
    </div>
  )
}
