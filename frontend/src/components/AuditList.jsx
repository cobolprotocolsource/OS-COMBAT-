import React from 'react'

export default function AuditList({ logs = [] }) {
  return (
    <div className="max-h-72 overflow-auto">
      <table className="min-w-full text-sm bg-white">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-2">Waktu</th>
            <th className="p-2">Aksi</th>
            <th className="p-2">Detil</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id} className="border-t">
              <td className="p-2 align-top">{new Date(l.when).toLocaleString()}</td>
              <td className="p-2 align-top">{l.action}</td>
              <td className="p-2 align-top"><pre className="whitespace-pre-wrap text-xs">{JSON.stringify(l.details, null, 2)}</pre></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
