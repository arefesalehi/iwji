'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import swal from 'sweetalert'

export default function ScoreForm({ courses, students }) {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedPart, setSelectedPart] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [moduleScores, setModuleScores] = useState([0, 0, 0, 0])
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [filteredStudents, setFilteredStudents] = useState([])

  // helper: normalize score entry (some APIs store { score: number }, others plain numbers)
  const getScoreValue = (s) => {
    if (s == null) return 0
    if (typeof s === 'number') return s
    if (typeof s === 'object' && 'score' in s) return Number(s.score) || 0
    if (!isNaN(Number(s))) return Number(s)
    return 0
  }

  // فیلتر دانشجویان بر اساس دوره
  useEffect(() => {
    if (!selectedCourse) {
      setFilteredStudents([])
      setSelectedStudent('')
      return
    }
    const studentsInCourse = students.filter(
      (student) => student.courseId.toString() === selectedCourse,
    )
    setFilteredStudents(studentsInCourse)
    setSelectedStudent('')
  }, [selectedCourse, students])

  // گرفتن تاریخچه نمرات
  useEffect(() => {
    const fetchHistory = async () => {
      if (!selectedStudent || !selectedCourse || !selectedPart) {
        setHistory([])
        return
      }
      setLoading(true)
      try {
        const url = `/api/scores?student=${selectedStudent}&course=${selectedCourse}&part=${selectedPart}`
        const res = await fetch(url)
        const data = await res.json()
        if (res.ok) setHistory(data.data || [])
        else setMessage(`خطا در دریافت تاریخچه: ${data.error || data.message}`)
      } catch {
        setMessage('خطا در ارتباط با سرور')
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [selectedStudent, selectedCourse, selectedPart])

  const handleScoreChange = (index, value) => {
    const newScores = [...moduleScores]
    newScores[index] = Math.min(100, Math.max(0, Number(value)))
    setModuleScores(newScores)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedCourse || !selectedStudent) {
      setMessage('لطفاً دوره و دانشجو را انتخاب کنید')
      return
    }
    setSubmitLoading(true)
    setMessage('')
    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student: selectedStudent,
          course: selectedCourse,
          part: selectedPart,
          scores: moduleScores.map((s) => Number(s)),
        }),
      })
      const result = await res.json()
      if (res.ok) {
        setMessage('نمرات با موفقیت ثبت شد!')
        setModuleScores([0, 0, 0, 0])
        const historyRes = await fetch(
          `/api/scores?student=${selectedStudent}&course=${selectedCourse}&part=${selectedPart}`,
        )
        const historyData = await historyRes.json()
        setHistory(historyData.data || [])
      } else {
        setMessage(`خطا: ${result.message} | ${result.error || ''}`)
      }
    } catch {
      setMessage('خطا در ارتباط با سرور')
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDelete = async (recordId) => {
    const confirmDelete = await swal({
      title: 'آیا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    })
    if (!confirmDelete) return

    try {
      const res = await fetch(`/api/scores/${recordId}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok) {
        swal('حذف شد!', data.message, 'success')
        setHistory((prev) => prev.filter((r) => r._id !== recordId))
      } else {
        swal('خطا!', data.message || 'خطا در حذف', 'error')
      }
    } catch {
      swal('خطا!', 'ارتباط با سرور برقرار نشد', 'error')
    }
  }

  return (
    <div className="bg-white m-auto pb-20 rounded-lg w-[90%]">
      <h2 className="mb-4 p-5 font-bold text-xl">ثبت نمرات دانشجویان</h2>

      {message && (
        <p
          className={`mb-4 mx-16 p-3 rounded ${
            message.includes('موفقیت')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* انتخاب دوره، پارت و دانشجو */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3 m-auto w-[90%]">
          <div>
            <label className="block mb-3 font-bold text-gray-900 text-sm">
              دوره
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
              className="block bg-gray-50 p-2.5 border border-gray-300 rounded-lg w-full text-gray-900 text-sm"
            >
              <option value="">انتخاب دوره</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-3 font-bold text-gray-900 text-sm">
              پارت
            </label>
            <select
              value={selectedPart}
              onChange={(e) => setSelectedPart(Number(e.target.value))}
              required
              className="block bg-gray-50 p-2.5 border border-gray-300 rounded-lg w-full text-gray-900 text-sm"
            >
              <option value={1}>پارت 1</option>
              <option value={2}>پارت 2</option>
              <option value={3}>پارت 3</option>
            </select>
          </div>
          <div>
            <label className="block mb-3 font-bold text-gray-900 text-sm">
              دانشجو
            </label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
              className="block bg-gray-50 p-2.5 border border-gray-300 rounded-lg w-full text-gray-900 text-sm"
            >
              <option value="">انتخاب دانشجو</option>
              {filteredStudents.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.userId.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* نمرات ماژول‌ها */}
        <div className="space-y-2 m-auto w-[90%]">
          <label className="block mt-14 mb-5 font-bold text-gray-700">
            نمرات ماژول‌ها
          </label>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col">
                <label className="block mb-3 font-bold text-gray-900 text-sm">
                  ماژول {i + 1}
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={moduleScores[i]}
                  onChange={(e) => handleScoreChange(i, e.target.value)}
                  required
                  className="block bg-gray-50 p-2.5 border border-gray-300 rounded-lg w-full text-gray-900 text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitLoading}
          className={`px-4 py-2 mt-10 mx-16 rounded text-white ${
            submitLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {submitLoading ? 'در حال ثبت...' : 'ثبت نمرات'}
        </button>
      </form>

      {/* تاریخچه نمرات */}
      <div className="m-auto pb-20 w-[90%]">
        <h3 className="mb-2 font-bold text-gray-800 text-lg">تاریخچه نمرات</h3>
        {loading ? (
          <div className="py-4 text-center">در حال بارگیری تاریخچه...</div>
        ) : history.length === 0 ? (
          <div className="bg-gray-50 p-4 border border-gray-200 rounded">
            <p className="text-gray-500">
              تاریخچه‌ای برای این دانشجو در این دوره و پارت وجود ندارد.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="m-auto mb-40 w-[100%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
              <thead className="bg-gray-50 dark:bg-gray-700 border border-gray-100 text-gray-700 dark:text-gray-400 text-xs uppercase">
                <tr className="bg-gray-100">
                  <th className="p-2 border border-gray-300 text-right">
                    تاریخ ثبت{' '}
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    ماژول 1
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    ماژول 2
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    ماژول 3
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    ماژول 4
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    میانگین
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    وضعیت
                  </th>
                  <th className="p-2 border border-gray-300 text-center">
                    حذف
                  </th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  // sort history by createdAt ascending so we can compute "best so far" up to each attempt
                  const sorted = [...history].sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
                  )
                  return sorted.map((record, recIdx) => {
                    const scores = record.scores || []

                    // compute best scores up to this record (inclusive)
                    const maxModules = Math.max(
                      ...sorted.map((r) => (r.scores || []).length),
                      4,
                    )
                    const bestSoFar = new Array(maxModules).fill(-Infinity)
                    for (let k = 0; k <= recIdx; k++) {
                      const attempt = sorted[k]
                      ;(attempt.scores || []).forEach((s, j) => {
                        const v = getScoreValue(s)
                        bestSoFar[j] = Math.max(
                          bestSoFar[j] === -Infinity ? -Infinity : bestSoFar[j],
                          v,
                        )
                      })
                    }
                    // normalize -Infinity to 0
                    for (let j = 0; j < bestSoFar.length; j++)
                      if (bestSoFar[j] === -Infinity) bestSoFar[j] = 0

                    // rules based on bestSoFar
                    const part = record.part
                    const bs = bestSoFar // readable alias

                    // Pass for part 1: first 3 modules all > 60
                    const isPassPart1 =
                      part === 1 && bs.slice(0, 3).every((v) => v > 60)
                    // Part 3 DVS: all > 75
                    const isDVSPass =
                      part === 3 && bs.slice(0, 4).every((v) => v > 75)
                    // Part 3: all >=45 => some may need oral if <=75
                    const isAllAbove45 =
                      part === 3 && bs.slice(0, 4).every((v) => v >= 45)
                    const oralModules = isAllAbove45
                      ? bs
                          .map((v, idx) =>
                            v <= 75 ? `ماژول ${idx + 1}` : null,
                          )
                          .filter(Boolean)
                      : []

                    return (
                      <tr key={record._id}>
                        <td className="p-2 border border-gray-200 text-right">
                          {new Date(
                            record.createdAt,
                          ).toLocaleDateString('fa-IR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        {scores.map((s, idx) => {
                          const val = getScoreValue(s)
                          let cls = 'p-2 border border-gray-300 text-center'
                          if (record.part === 1 && idx < 3 && val > 60)
                            cls += ' bg-green-100 text-green-800'
                          if (record.part === 3) {
                            if (val < 45) cls += ' bg-red-100 text-red-800'
                            else if (val <= 75)
                              cls += ' bg-yellow-100 text-yellow-800'
                            else cls += ' bg-green-100 text-green-800'
                          }
                          return (
                            <td key={idx} className={cls}>
                              {val.toFixed(1)}
                            </td>
                          )
                        })}
                        <td className="p-2 border border-gray-300 font-medium text-center">
                          {(
                            scores.reduce(
                              (sum, s) => sum + getScoreValue(s),
                              0,
                            ) / (scores.length || 1)
                          ).toFixed(1)}
                        </td>
                        <td className="p-2 border border-gray-300 font-bold text-center">
                          {isPassPart1
                            ? 'پاس شده ✅'
                            : isDVSPass
                            ? 'امتحان شفاهی DVS 🎤'
                            : oralModules.length > 0
                            ? `شامل امتحان شفاهی: ${oralModules.join(' ، ')} 📘`
                            : '--'}
                        </td>
                        <td className="p-2 border border-gray-300 text-center">
                          <button
                            onClick={() => handleDelete(record._id)}
                            className="bg-red-800 hover:bg-red-600 px-3 py-1 rounded text-white"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    )
                  })
                })()}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Link
        href="/p-admin/scores/summary"
        className="bg-red-800 mx-16 mb-20 p-3 rounded-lg text-white"
      >
        نمایش لیست تمامی نمرات
      </Link>
    </div>
  )
}
