'use client'
import Pagination from '@/components/modules/p-admin/Pagination'
import React, { useEffect, useState } from 'react'

const accardionTable = ({ items,deleteAccardion }) => {

     const [currentPage, setCurrentPage] = useState(1)
     const accardionPerPage = 5
     const indexOfLastArticle = currentPage * accardionPerPage
     const indexOfFirstArticle = indexOfLastArticle - accardionPerPage
     const currentAccarion = items.slice(
       indexOfFirstArticle,
       indexOfLastArticle,
     )
  
  
  
  
  
  return (
    <>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="m-auto mb-40 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
                <th scope="col" className="px-6 py-3">
             ردیف
              </th>
              <th scope="col" className="px-6 py-3">
                سوالات
              </th>
              <th scope="col" className="px-6 py-3">
                پاسخ ها
              </th>
               <th scope="col" className="px-6 py-3">
                عملگر
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentAccarion.map((item, index) => {
              return (
                <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b">
                   <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index+1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {item.question}
                  </th>
                  <td className="px-6 py-4">{item.answer}</td>

                  <td className="flex px-6 py-4 text-right">
                    <a
                    onClick={()=>deleteAccardion(item._id)}
                      href="#"
                          className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                    >
                      حذف
                    </a>

                  
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
           <Pagination
             currentPage={currentPage}
            totalItems={items.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            label="سوال"
        />
      </div>
    </>
  )
}

export default accardionTable
