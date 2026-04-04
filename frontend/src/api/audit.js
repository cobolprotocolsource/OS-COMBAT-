
export async function downloadAuditCSV() {
  const res = await fetch(`${base}/audit/export`)
  if (!res.ok) throw new Error('Gagal men-download audit CSV')
  const blob = await res.blob()
  return blob
}
