import React from 'react'

export default function Table({ data = [], columns = [], actions }) {
  return (
    <div className="bg-white rounded shadow-sm overflow-auto">
      <table className="min-w-full">
        <thead className="text-left bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c} className="p-3 text-sm text-gray-600">{c}</th>
            ))}
            {actions ? <th className="p-3 text-sm text-gray-600">Aksi</th> : null}
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.id} className="border-t">
              {columns.map((c) => (
                <td key={c} className="p-3 text-sm">{r[c]}</td>
              ))}
              {actions ? <td className="p-3 text-sm">{actions(r)}</td> : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
