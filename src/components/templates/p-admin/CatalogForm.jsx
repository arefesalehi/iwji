'use client'

import { useState, useEffect } from 'react'

export default function CatalogForm() {
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [catalogs, setCatalogs] = useState([])

  // بارگذاری لیست کاتالوگ‌ها
  const fetchCatalogs = () => {
    fetch('/api/catalog/list')
      .then((res) => res.json())
      .then((data) => setCatalogs(data))
  }

  useEffect(() => {
    fetchCatalogs()
  }, [])

  // آپلود فایل
const handleUpload = async (e) => {
  e.preventDefault();
  if (!file) return setMessage('لطفاً یک فایل انتخاب کنید');

  setMessage('در حال آپلود...');
  const formData = new FormData();
  formData.append('file', file);
  // formData.append('language', language);
  formData.append('description', description);

  try {
    const res = await fetch('/api/catalog/uploads', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.error) setMessage('خطا: ' + data.error);
    else {
      setMessage('آپلود موفق');
      fetchCatalogs();
    }
  } catch {
    setMessage('خطا در آپلود');
  }
};


  // دانلود فایل
  const handleDownload = (filePath) => {
    const link = document.createElement('a')
    link.href = filePath
    link.download = filePath.split('/').pop()
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // حذف کاتالوگ
  const handleDelete = async (id) => {
    if (!confirm('آیا مطمئن هستید می‌خواهید حذف کنید؟')) return
    const res = await fetch(`/api/catalog/delete?id=${id}`, {
      method: 'DELETE',
    })
    const data = await res.json()
    if (data.error) setMessage('خطا: ' + data.error)
    else {
      setMessage(data.message)
      fetchCatalogs()
    }
  }

  return (
    <div className="bg-white m-auto py-10 rounded-lg w-[90%]">
      <div className="shadow mx-auto p-6 rounded max-w-2xl">
        <h2 className="mb-4 font-bold text-xl">پنل ادمین کاتالوگ</h2>
        <form onSubmit={handleUpload} className="flex flex-col gap-4 mb-6">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                          className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"

          />
      
          <input
            type="text"
            placeholder=" عنوان"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
                         className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"

          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            آپلود
          </button>
        </form>
        {message && <p className="mb-4">{message}</p>}

        <h3 className="mb-2 font-semibold text-lg">کاتالوگ‌های موجود</h3>
     <ul>
  {catalogs.map((cat) => (
    <li
      key={cat._id}
      className="flex justify-between items-center mb-2 pb-2 border-b"
    >
      <span>{cat.title}</span> {/* اضافه شد */}
      <div className="flex gap-2">
        {/* <button
          onClick={() => handleDownload(cat.file)}
          className="bg-green-500 px-2 py-1 rounded text-white"
        >
          دانلود
        </button> */}
        <button
          onClick={() => handleDelete(cat._id)}
          className="bg-red-500 px-2 py-1 rounded text-white"
        >
          حذف
        </button>
      </div>
    </li>
  ))}
</ul>

 

      </div>
    </div>
  )
}

