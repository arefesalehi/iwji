

'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import swal from 'sweetalert'
import Pagination from '@/components/modules/p-admin/Pagination'

const GalleryTable = ({ gallery, getAll }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const teamsPerPage = 5
  const indexOfLastArticle = currentPage * teamsPerPage
  const indexOfFirstArticle = indexOfLastArticle - teamsPerPage
  const currentgallery = gallery.slice(indexOfFirstArticle, indexOfLastArticle)

  const deleteHandler = async (id) => {
    const confirm = await swal({
      title: 'آیا مطمئن هستید؟',
      text: 'این عملیات غیرقابل بازگشت است!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })

    if (confirm) {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (res.ok) {
        swal('تصویر حذف شد', '', 'success').then(() => getAll())
      } else {
        swal('خطا', data.message, 'error')
      }
    }
  }

  return (
    <div className="relative shadow-md mt-10 sm:rounded-lg overflow-x-auto">
      <table className="m-auto mb-10 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">ردیف</th>
            <th className="px-6 py-3">عنوان</th>
            <th className="px-6 py-3">توضیحات</th>
            <th className="px-6 py-3">دسته بندی</th>
            <th className="px-6 py-3">تصویر</th>
            <th className="px-6 py-3">عملگر</th>
          </tr>
        </thead>
        <tbody>
          {currentgallery?.map((item, index) => (
            <tr
              key={item._id}
              className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {item.title}
              </td>
              <td className="px-6 py-4">{item.description}</td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">
                {item.src && (
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={100}
                    height={100}
                    unoptimized
                  />
                )}
              </td>
              <td className="flex px-6 py-16 text-right">
                <button
                  onClick={() => deleteHandler(item._id)}
                  className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalItems={gallery.length}
        itemsPerPage={5}
        onPageChange={setCurrentPage}
        label="عکس "
      />
    </div>
  )
}

export default GalleryTable
