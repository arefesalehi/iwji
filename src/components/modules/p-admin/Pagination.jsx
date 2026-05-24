
'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  label = 'آیتم', // 👈 پیش‌فرض، اگر چیزی نفرستی
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
const {t} =useTranslation('pagination')
  return (
    <nav
      className="flex md:flex-row flex-column flex-wrap justify-between items-center bg-white px-5 py-10 pt-4"
      aria-label="Table navigation"
    >
      <span className="px-5 text-gray-500 text-sm">
       {t('show')}{''}
        <span className="font-semibold">
          {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{' '}
        {t('of')} <span className="font-semibold">{totalItems}</span> {label}
      </span>

      <ul className="inline-flex -space-x-px rtl:space-x-reverse h-8 text-sm">
        {/* دکمه قبلی */}
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 ms-0 px-3 border border-gray-300 dark:border-gray-700 rounded-s-lg h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400"
          >
            قبلی
          </button>
        </li>

        {/* شماره صفحات */}
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex justify-center items-center px-3 border border-gray-300 dark:border-gray-700 h-8 leading-tight
                ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-white'
                }`}
            >
              {page}
            </button>
          </li>
        ))}

        {/* دکمه بعدی */}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 rounded-e-lg h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400"
          >
            بعدی
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
