import React, { useEffect } from 'react'

export default function Toast({ message, type = 'info', onClose }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(() => onClose && onClose(), 3500)
    return () => clearTimeout(t)
  }, [message, onClose])

  if (!message) return null

  const colors = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    error: 'bg-red-600'
  }

  return (
    <div className={`fixed right-4 bottom-6 z-50 ${colors[type] || colors.info} text-white px-4 py-2 rounded shadow-lg`}> 
      {message}
    </div>
  )
}
