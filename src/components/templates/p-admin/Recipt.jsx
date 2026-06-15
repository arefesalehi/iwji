'use client'

import Pagination from '@/components/modules/p-admin/Pagination'
import React, { useState } from 'react'

const RECEIPT_KEYS = ['receipt1', 'receipt2', 'receipt3', 'receipt4']

const isImageFile = (filename) => /\.(jpe?g|png|gif)$/i.test(filename || '')
const isPdfFile = (filename) => /\.(pdf)$/i.test(filename || '')

const Recipt = ({ courseRegister }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const transactionPerPage = 5
  const indexOfLastArticle = currentPage * transactionPerPage
  const indexOfFirstArticle = indexOfLastArticle - transactionPerPage
  const currentTransaction = courseRegister.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  )

  return (
    <div className="relative shadow-md mx-10 mt-40 sm:rounded-lg overflow-x-auto">
      <table className="w-full text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">ردیف</th>
            <th className="px-6 py-3">نام و نام خانوادگی</th>
            <th className="px-6 py-3">دوره</th>
            <th className="px-6 py-3">رسید 1</th>
            <th className="px-6 py-3">رسید 2</th>
            <th className="px-6 py-3">رسید 3</th>
            <th className="px-6 py-3">رسید 4</th>
          </tr>
        </thead>
        <tbody>
          {currentTransaction.map((user, index) => {
            const receipts = user.receipts || {}
            return (
              <tr
                key={user._id}
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
              >
                <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{user.userId?.name || 'نامشخص'}</td>
                <td className="px-6 py-4">{user.courseId?.name || 'نامشخص'}</td>

                {RECEIPT_KEYS.map((key) => {
                  const rec = receipts[key]
                  return (
                    <td key={key} className="px-6 py-4">
                      {rec?.fileUrl ? (
                        <a
                          href={rec.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {isImageFile(rec.fileName) ? (
                            <img
                              src={rec.fileUrl}
                              alt={key}
                              className="border rounded w-12 h-12 object-cover cursor-pointer"
                            />
                          ) : isPdfFile(rec.fileName) ? (
                            <img
                              src="/images/Capture25.PNG"
                              alt="PDF"
                              className="rounded w-12 h-12 object-cover cursor-pointer"
                            />
                          ) : (
                            <span className="text-gray-400 text-sm">
                              فرمت ناشناخته
                            </span>
                          )}
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">فاقد فایل</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalItems={courseRegister.length}
        itemsPerPage={5}
        onPageChange={setCurrentPage}
        label="رسید"
      />
    </div>
  )
}

export default Recipt
