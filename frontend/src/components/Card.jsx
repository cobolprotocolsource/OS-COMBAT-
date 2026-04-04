import React from 'react'

export default function Card({ title, children }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{children}</div>
    </div>
  )
}
