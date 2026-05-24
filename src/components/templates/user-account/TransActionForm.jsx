'use client'
import React, { useEffect, useState } from 'react'

const RECEIPT_META = {
  receipt1: { label: 'تصویر پرداخت اول دی وی اس', amount: 950 },
  receipt2: { label: 'تصویر پرداخت اول موسسه', amount: 500 },
  receipt3: { label: 'تصویر پرداخت دوم موسسه', amount: 500 },
  receipt4: { label: 'تصویر پرداخت آخر دی وی اس', amount: 500 },
}

const isImageFile = (filename) => /\.(jpe?g|png|gif)$/i.test(filename || '')
const isPdfFile = (filename) => /\.(pdf)$/i.test(filename || '')

const TransActionForm = ({ userId }) => {
  const [courses, setCourses] = useState([])
  const [courseId, setCourseId] = useState('')
  const [existingReceipts, setExistingReceipts] = useState({})
  const [files, setFiles] = useState({})
  const [loadingKeys, setLoadingKeys] = useState({})
  const [globalLoading, setGlobalLoading] = useState(false)
  const [msg, setMsg] = useState('')

  // دریافت دوره‌های ثبت‌نام شده کاربر
  const fetchUserCourses = async () => {
    if (!userId) return
    setGlobalLoading(true)
    try {
      const res = await fetch(`/api/course/registration?userId=${userId}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'خطا در دریافت دوره‌ها')

      const userCourses = (data.data || [])
        .map((r) => r.courseId)
        .filter((c) => c?._id)
      setCourses(userCourses)
      if (userCourses.length > 0) setCourseId(userCourses[0]._id)
    } catch (err) {
      console.error(err)
      setMsg(err.message || 'خطا در دریافت دوره‌ها')
    } finally {
      setGlobalLoading(false)
    }
  }

  // دریافت رسیدهای دوره انتخابی
  const fetchRegistration = async () => {
    if (!userId || !courseId) return
    setGlobalLoading(true)
    try {
      const res = await fetch(
        `/api/course/registration?userId=${userId}&courseId=${courseId}`,
      )
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'خطا در دریافت اطلاعات')
      const reg = (data.data && data.data[0]) || null
      setExistingReceipts(reg?.receipts || {})
    } catch (err) {
      console.error(err)
      setMsg(err.message || 'خطا در دریافت اطلاعات')
    } finally {
      setGlobalLoading(false)
    }
  }

  useEffect(() => {
    fetchUserCourses()
  }, [userId])
  useEffect(() => {
    fetchRegistration()
  }, [userId, courseId])

  const handleFileChange = (e, key) => {
    const f = e.target.files?.[0]
    setFiles((p) => ({ ...p, [key]: f }))
  }

  const uploadSingle = async (key) => {
    const file = files[key]
    if (!file) {
      setMsg('ابتدا فایلی انتخاب کنید.')
      return
    }
    setLoadingKeys((p) => ({ ...p, [key]: true }))
    setMsg('')
    try {
      const formData = new FormData()
      formData.append('userId', userId)
      formData.append('courseId', courseId)
      formData.append(key, file)

      const res = await fetch('/api/course/registration', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'خطا در آپلود')
      await fetchRegistration()
      setFiles((p) => ({ ...p, [key]: null }))
      setMsg('فایل با موفقیت آپلود شد.')
    } catch (err) {
      console.error(err)
      setMsg(err.message || 'خطا در آپلود')
    } finally {
      setLoadingKeys((p) => ({ ...p, [key]: false }))
    }
  }

  const uploadAllSelected = async () => {
    const keys = Object.keys(files).filter((k) => files[k])
    if (!keys.length) {
      setMsg('فایلی برای ارسال انتخاب نشده.')
      return
    }
    setGlobalLoading(true)
    try {
      for (const key of keys) await uploadSingle(key)
    } finally {
      setGlobalLoading(false)
    }
  }

  return (
    
    <div className="bg-white mt-8 p-6 px-8 rounded-lg w-full">
      <h1 className="mt-10 mb-10 font-bold text-red-800 text-lg">آپلود رسیدهای پرداختی</h1>

      {/* انتخاب دوره */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-sm">انتخاب دوره:</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="p-2 border border-gray-400 rounded-xl w-full text-sm"
        >
          {(courses || []).map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* پیام‌ها */}
      {globalLoading && (
        <div className="mb-3 text-gray-600 text-sm">در حال بارگذاری...</div>
      )}
      {msg && <div className="mb-3 text-red-600 text-sm">{msg}</div>}

      {/* فرم رسیدها */}
      <div className="gap-6 grid md:grid-cols-2">
        {Object.keys(RECEIPT_META).map((key) => {
          const meta = RECEIPT_META[key]
          const existing = existingReceipts[key] || null
          const uploadedAt = existing?.uploadedAt
            ? new Date(existing.uploadedAt)
            : null

          return (
            <div key={key} className="p-4 border border-gray-400 rounded-xl">
              <div className="flex justify-between items-start">
                <div>
                  <div className="mb-2 font-bold text-red-800 text-sm">{meta.label}</div>
                  <div className="font-semibold text-gray-600 text-xs">
                    مبلغ: {meta.amount} یورو
                  </div>
                </div>
                <div className="text-gray-400 text-xs">{key}</div>
              </div>

              <div className="mt-3">
                {existing?.fileUrl ? (
                  <div className="flex items-center mb-3">
                    <div className="ml-3 text-green-700 text-sm">
                      فایل آپلود شده:
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                      {isImageFile(existing.fileName || existing.fileUrl) ? (
                        <img
                          src={existing.fileUrl}
                          alt={meta.label}
                          className="rounded max-h-28 object-contain"
                        />
                      ) : isPdfFile(existing.fileName || existing.fileUrl) ? (
                    

                        <a
                          href={existing.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={ '/images/Capture25.PNG'}
                            alt={meta.label}
                            className="rounded max-h-28 object-contain cursor-pointer"
                          />
                        </a>
                      ) : (
                        <a
                          href={existing.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline"
                        >
                          باز کردن فایل
                        </a>
                      )}
                      <div className="text-gray-700 text-xs">
                        {uploadedAt
                          ? new Date(uploadedAt).toLocaleDateString('fa-ir')
                          : ''}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="my-5 text-gray-500 text-sm">
                    هنوز فایلی آپلود نشده.
                  </div>
                )}

                <label className="block mt-8 mb-2 text-sm">
                  انتخاب فایل (تصویر یا PDF)
                </label>
                <input
                  name={key}
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => handleFileChange(e, key)}
                  
                                  className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"

                />

                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => uploadSingle(key)}
                    disabled={!!loadingKeys[key]}
                    className="bg-blue-700 disabled:opacity-60 px-3 py-1 rounded text-white text-sm"
                  >
                    {loadingKeys[key]
                      ? 'درحال آپلود...'
                      : existing?.fileUrl
                      ? 'جایگزین کن'
                      : 'آپلود'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFiles((p) => ({ ...p, [key]: null }))
                      const input = document.querySelector(
                        `input[name="${key}"]`,
                      )
                      if (input) input.value = ''
                    }}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    پاک کن
                  </button>


                </div>
              </div>
            </div>
          )
        })}
        
      </div>
    </div>
  )
}

export default TransActionForm
