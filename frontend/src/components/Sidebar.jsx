import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-6">
        <div className="text-xl font-bold">OS COMBAT</div>
        <div className="text-sm text-gray-500">Batalion Zeni</div>
      </div>
      <nav>
        <ul>
          <li className="py-2 text-sm"><Link to="/">Personel</Link></li>
          <li className="py-2 text-sm"><Link to="/pos">Pos</Link></li>
          <li className="py-2 text-sm"><a href="#">Log</a></li>
        </ul>
      </nav>
    </aside>
  )
}
