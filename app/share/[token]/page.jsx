'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function SharePage() {
  const params = useParams()
  const token = params.token
  const [students, setStudents] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    if (token) {
      axios.get(`https://tnp-recruitment-challenge.manitvig.live/share?shareToken=${token}`)
        .then(res => setStudents(res.data))
        .catch(() => alert("Invalid or expired token"))
    }
  }, [token])

  const filtered = students.filter(d =>
    d.email.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-xl shadow-md mt-14 bg-stone-200">
  <h1 className="text-2xl font-semibold text-gray-800 mb-5">🎓 Student Data</h1>

  <input
    type="text"
    placeholder="Search by email..."
    className="w-full px-4 py-2 mb-6 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={(e) => setFilter(e.target.value)}
  />

  <div className="overflow-x-auto rounded-lg shadow">
    <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
      <thead className="bg-blue-50 text-gray-700 font-semibold">
        <tr>
          <th className="px-4 py-3 border-b">Roll No</th>
          <th className="px-4 py-3 border-b">Name</th>
          <th className="px-4 py-3 border-b">Email</th>
        </tr>
      </thead>
      <tbody>
        {filtered.length > 0 ? (
          filtered.map((d, i) => (
            <tr key={i} className="hover:bg-blue-50 transition">
              <td className="px-4 py-3 border-b text-gray-800">{d.roll_no}</td>
              <td className="px-4 py-3 border-b text-gray-800">
                {d.first_name} {d.last_name}
              </td>
              <td className="px-4 py-3 border-b text-blue-600">{d.email}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" className="px-4 py-5 text-center text-gray-500">
              No results found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  )
}
