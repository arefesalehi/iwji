
'use client'
import React, { useEffect, useState } from 'react'

export default function WebinarBox() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [webinarName, setWebinarName] = useState('')
  const [link, setLink] = useState('')
  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')
  const [price, setPrice] = useState('0')
  const [img, setImg] = useState(null) // فایل یا base64
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [refreshFlag, setRefreshFlag] = useState(0)

  // helper: تبدیل فایل به base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // helper: تبدیل ISO -> datetime-local (yyyy-MM-ddTHH:mm)
  const isoToLocalDatetime = (iso) => {
    if (!iso) return ''
    const dt = new Date(iso)
    if (isNaN(dt)) return ''
    const pad = (n) => String(n).padStart(2, '0')
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
      dt.getDate(),
    )}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`
  }

  // helper: استخراج شناسه از رکورد (پشتیبانی از _id یا id)
  const getId = (it) => it._id || it.id || null

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshFlag])

  async function fetchItems() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/webinarRegistration')
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'خطا در دریافت داده‌ها')
      // اطمینان از آرایه بودن داده
      const list = Array.isArray(json.data) ? json.data : []
      setItems(list)
    } catch (err) {
      console.error(err)
      setError(err.message || 'خطای ناشناخته')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setWebinarName('')
    setLink('')
    setDate('')
    setHour('')
    setPrice('0')
    setImg(null)
    setEditingId(null)
  }

  function validateForm() {
    if (!webinarName.trim()) return 'عنوان وبینار وارد نشده است.'
    if (!link.trim()) return 'لینک وارد نشده است.'
    // تاریخ اختیاری نیست — اگر خواستی میتونی منع کنی
    if (!date) return 'تاریخ و زمان را انتخاب کنید.'
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    const validationError = validateForm()
    if (validationError) {
      alert(validationError)
      return
    }

    setSubmitting(true)
    try {
      let imgBase64 = null
      if (img instanceof File) {
        imgBase64 = await fileToBase64(img) // فایل → base64
      } else if (typeof img === 'string') {
        imgBase64 = img.trim()
      }

      const payload = {
        webinarName: webinarName.trim(),
        link: link.trim(),
        // date را از datetime-local به ISO تبدیل می‌کنیم
        date: date ? new Date(date).toISOString() : new Date().toISOString(),
        hour: hour.trim(),
        price: Number(price) || 0,
        img: imgBase64 || undefined,
      }

      let res, json
      if (editingId) {
        payload.id = editingId
        res = await fetch('/api/webinarRegistration', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        json = await res.json()
        if (!res.ok) throw new Error(json.message || 'خطا در بروزرسانی وبینار')
        // بروزرسانی در لیست محلی
        setItems((prev) =>
          prev.map((it) => (getId(it) === getId(json.data) ? json.data : it)),
        )
        alert('وبینار با موفقیت به‌روزرسانی شد.')
      } else {
        res = await fetch('/api/webinarRegistration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        json = await res.json()
        if (!res.ok) throw new Error(json.message || 'خطا در ایجاد وبینار')
        // اضافه کردن به لیست محلی در صدر
        setItems((prev) => [json.data, ...prev])
        alert('وبینار با موفقیت ایجاد شد.')
      }
      resetForm()
      // یا می‌توانیم fetchItems() بزنیم؛ در اینجا با refreshFlag رفرش می‌کنیم
      setRefreshFlag((f) => f + 1)
    } catch (err) {
      console.error(err)
      alert(err.message || 'خطا در عملیات')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleEdit(item) {
    setEditingId(getId(item))
    setWebinarName(item.webinarName || '')
    setLink(item.link || '')
    setDate(isoToLocalDatetime(item.date))
    setHour(item.hour || '')
    setPrice(item.price != null ? String(item.price) : '0')
    setImg(item.img || null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(item) {
    const id = getId(item)
    if (!id) return alert('شناسه نامعتبر')
    const ok = confirm(
      'آیا از حذف این وبینار مطمئن هستید؟ این عمل غیرقابل بازگشت است.',
    )
    if (!ok) return
    try {
      const res = await fetch(
        `/api/webinarRegistration?id=${encodeURIComponent(id)}`,
        {
          method: 'DELETE',
        },
      )
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'خطا در حذف')
      // حذف از لیست محلی
      setItems((prev) => prev.filter((it) => getId(it) !== id))
      alert('وبینار حذف شد.')
    } catch (err) {
      console.error(err)
      alert(err.message || 'خطا در حذف')
    }
  }

  return (
    <div className="bg-white m-auto rounded-lg w-[90%]">
      <div className="mx-auto p-6 max-w-5xl">
        <h2 className="mb-4 font-bold text-2xl">مدیریت وبینارها</h2>

        {/* فرم ایجاد/ویرایش */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow mb-6 p-6 rounded"
        >
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label className="block mb-3 font-bold text-gray-900 text-sm">
                عنوان وبینار
              </label>
              <input
                value={webinarName}
                onChange={(e) => setWebinarName(e.target.value)}
                required
                className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
                placeholder="مثال: مباحث پیشرفته در فول‌استک"
              />
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 text-sm">
                لینک (Zoom / Stream)
              </label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 text-sm">
                تاریخ و زمان
              </label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                type="datetime-local"
                className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
                required
              />
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 text-sm">
                ساعت (نمایشی)
              </label>
              <input
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
                placeholder="مثال: 10:00 - 12:00"
              />
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 text-sm">
                قیمت (تومان)
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="0"
                className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
              />
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 text-sm">
                عکس وبینار
              </label>
              <input
                onChange={(e) => setImg(e.target.files[0] || null)}
                type="file"
                accept="image/*"
                className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
              />
              {img && typeof img === 'string' && (
                <img
                  src={img}
                  alt="preview"
                  className="mt-2 border rounded max-h-32"
                />
              )}
            </div>

            <div className="flex items-end gap-3">
              <button
                type="submit"
                disabled={submitting}
                className={`bg-blue-600 text-sm text-white px-4 py-2 rounded mr-2 ${
                  submitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {submitting
                  ? editingId
                    ? 'در حال بروزرسانی...'
                    : 'در حال ایجاد...'
                  : editingId
                  ? 'به‌روزرسانی'
                  : 'ایجاد وبینار'}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-200 px-4 py-2 rounded text-sm"
              >
                پاک کردن
              </button>
            </div>
          </div>
        </form>

        {/* لیست وبینارها */}
        <div>
          <h3 className="mt-10 mb-3 font-semibold text-lg">لیست وبینارها</h3>

          {loading ? (
            <div className="p-4 text-center">در حال بارگذاری...</div>
          ) : error ? (
            <div className="p-4 text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="p-4">هیچ وبیناری یافت نشد.</div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const id = getId(item)
                return (
                  <div
                    key={id || Math.random()}
                    className="flex md:flex-row flex-col justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-bold text-red-800 text-base">
                        {item.webinarName}
                      </div>
                      {item.img && (
                        <img
                          src={item.img}
                          alt="وبینار"
                          className="mt-2 border rounded max-h-32"
                        />
                      )}
                      <div className="text-blue-600 text-sm underline break-words cursor-pointer">
                        لینک: {item.link}
                      </div>
                      <div className="mt-1 font-bold text-sm">
                        تاریخ:{' '}
                        {item.date
                          ? new Date(item.date).toLocaleString('fa-IR')
                          : '-'}
                      </div>
                      <div className="text-green-700 text-sm">
                        ساعت: {item.hour || '-'}
                      </div>
                      <div className="text-blue-700 text-sm">
                        قیمت: {item.price != null ? item.price + ' تومان' : '-'}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3 md:mt-0 md:ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-200 hover:bg-yellow-200 px-3 py-1 rounded text-yellow-700 text-sm"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
