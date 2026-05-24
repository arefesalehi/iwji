'use client'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import GalleryTable from './GalleryTable'

const Gallery = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [file, setFile] = useState(null)
  const [all, setAll] = useState([])

  // دریافت همه تصاویر از API
  const getAll = async () => {
    try {
      const res = await fetch('/api/gallery')
      const data = await res.json()
      setAll(data.images || []) // فقط آرایه تصاویر
    } catch (err) {
      console.error('Error fetching gallery:', err)
    }
  }

  useEffect(() => {
    getAll()
  }, [])

  // ارسال فرم
  const submitHandler = async (e) => {
    e.preventDefault()
    if (!file) return alert('لطفاً یک فایل انتخاب کنید')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('imageFile', file)

    try {
      const res = await fetch('/api/gallery', { method: 'POST', body: formData })
      const data = await res.json()
      if (res.ok) {
        swal('عکس با موفقیت ثبت شد', '', 'success').then(() => getAll())
        setTitle('')
        setDescription('')
        setCategory('')
        setFile(null)
      } else {
        swal('خطا', data.message, 'error')
      }
    } catch (err) {
      swal('خطا', 'ارسال فایل موفق نبود', 'error')
      console.error(err)
    }
  }

  return (
    <div className="bg-white m-auto rounded-lg w-[90%]">
      <form onSubmit={submitHandler} className="m-auto py-10 rounded-lg w-[90%]">
        <div className="gap-6 grid md:grid-cols-2 mb-6">
          <div>
            <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">عنوان</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="block bg-gray-50 dark:bg-gray-700 p-2.5 border rounded-lg w-full text-gray-900 dark:text-white text-sm"
              placeholder="عنوان تصویر"
              required
            />
          </div>
          <div>
            <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">توضیحات</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="block bg-gray-50 dark:bg-gray-700 p-2.5 border rounded-lg w-full text-gray-900 dark:text-white text-sm"
              placeholder="توضیحات تصویر"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">دسته بندی</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 p-2.5 border rounded-lg w-full"
              required
            >
              <option value="">انتخاب کنید</option>
              <option value="certificates">گواهی‌نامه‌ها</option>
              <option value="practical">عملی</option>
              <option value="other">سایر</option>
            </select>
          </div>
          <div>
            <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">آپلود تصویر</label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              accept="image/jpeg,image/png"
              className="block bg-gray-50 dark:bg-gray-700 p-2.5 border rounded-lg w-full text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg w-full sm:w-auto font-medium text-white text-sm text-center"
        >
          ثبت
        </button>
      </form>

      <GalleryTable gallery={all} getAll={getAll} />
    </div>
  )
}

export default Gallery
