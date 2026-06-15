'use client'
import React from 'react'
import { useEffect, useState } from 'react'
const SummaryScore = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch('/api/scores/summary')
        const result = await res.json()
        if (res.ok) setData(result.data || [])
      } catch (err) {
        console.error('خطا در دریافت نمرات:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSummary()
  }, [])

  if (loading) return <p className="p-4">در حال بارگیری...</p>

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded max-w-6xl overflow-x-auto">
      <h2 className="mb-4 font-bold text-xl">تاریخچه امتحانات دانشجویان</h2>
      <table className="border border-gray-200 min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">دانشجو</th>
            <th className="p-2 border">دوره</th>
            <th className="p-2 border">پارت</th>
            <th className="p-2 border">ماژول 1</th>
            <th className="p-2 border">ماژول 2</th>
            <th className="p-2 border">ماژول 3</th>
            <th className="p-2 border">ماژول 4</th>
            <th className="p-2 border">میانگین</th>
            <th className="p-2 border">تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const prev = data[idx - 1]
            const currentName = `${row.student?.firstName} ${row.student?.lastName}`
            const prevName = prev
              ? `${prev.student?.firstName} ${prev.student?.lastName}`
              : null

            // اگه اسم فعلی با قبلی فرق داشت → فاصله اضافه کن
            const extraClass =
              currentName !== prevName ? 'border-t-10 border-gray-300' : ''

            return (
              <tr key={idx} className={`hover:bg-gray-50 ${extraClass}`}>
                <td className="p-2 border">{row.student?.userId.name}</td>
                <td className="p-2 border">{row.course?.name}</td>
                <td className="p-2 border text-center">{row.part}</td>
                {row.scores.map((s, i) => (
                  <td key={i} className="p-2 border text-center">
                    {s.score}
                  </td>
                ))}
                <td className="p-2 border font-semibold text-center">
                  {(
                    row.scores.reduce((sum, s) => sum + s.score, 0) /
                    row.scores.length
                  ).toFixed(1)}
                </td>
                <td className="p-2 border">
                  {new Date(row.examDate || row.createdAt).toLocaleDateString(
                    'fa-IR',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    },
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default SummaryScore
