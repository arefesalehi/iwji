'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import BreadCrumb from '@/components/modules/BreadCrumb'
import { useTranslation } from 'react-i18next'
const Catalouge = () => {
  const { t } = useTranslation('catalog')
  const [catalogs, setCatalogs] = useState([])

  // بارگذاری کاتالوگ‌ها
  useEffect(() => {
    fetch('/api/catalog/list')
      .then((res) => res.json())
      .then((data) => setCatalogs(data))
      .catch((err) => console.error('Error fetching catalogs:', err))
  }, [])

  // دانلود فایل از API
  const handleDownload = async (id, title) => {
    try {
      const res = await fetch(`/api/catalog/download?id=${id}`)
      if (!res.ok) {
        alert('خطا در دانلود فایل')
        return
      }
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = title + '.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download error:', error)
      alert('خطا در دانلود فایل')
    }
  }

  return (
    <>
      <BreadCrumb title={t('breadcrumb')} />
      <div className="flex md:flex-row flex-col m-auto p-8 w-full max-w-6xl">
        {/* تصویر سمت چپ */}
        <div className="flex justify-center mb-8 md:mb-0 md:basis-1/2">
          <Image
            src="/images/catalouge.PNG"
            width={400}
            height={600}
            alt="Catalog Image"
            className="shadow rounded"
          />
        </div>

        {/* لیست کاتالوگ‌ها سمت راست */}
        <div className="md:mt-0 md:pl-8 md:basis-1/2">
          <ul className="space-y-4">
            {catalogs.length > 0 ? (
              catalogs.map((cat) => (
                <li key={cat._id} className="pb-2 text-blue-800">
                  <button
                    onClick={() => handleDownload(cat._id, cat.title)}
                    className="hover:text-blue-600 underline"
                  >
                    {cat.title}
                  </button>
                </li>
              ))
            ) : (
              <li>هیچ کاتالوگی موجود نیست.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Catalouge
