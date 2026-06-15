'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import Pagination from '@/components/modules/p-admin/Pagination'
const CooperationTable = ({ cooperations, deleteUser }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const cooperationPerPage = 5
  const indexOfLastArticle = currentPage * cooperationPerPage
  const indexOfFirstArticle = indexOfLastArticle - cooperationPerPage
  const currentCooperation = cooperations.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  )
  return (
    <>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="m-auto mb-10 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
          <thead className="bg-red-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام تصویر
              </th>
              <th scope="col" className="px-6 py-3">
                توضیحات تصویر
              </th>
              <th scope="col" className="px-6 py-3">
                تصویر
              </th>

              <th scope="col" className="px-6 py-3">
                عملگر
              </th>
            </tr>
          </thead>
          <tbody>
            {currentCooperation.map((cooperation) => {
              return (
                <tr
                  key={cooperation._id}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cooperation.title}
                  </th>

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {cooperation.desc}
                  </th>
                  <td className="px-6 py-4">
                    {cooperation.img ? (
                      <Image
                        src={cooperation.img}
                        alt="pic"
                        className="w-[100px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    ) : (
                      <Image
                        src="/images/Capture30.PNG"
                        alt="pic"
                        className="w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    )}
                  </td>

                  <td className="flex px-6 py-16 text-right">
                    <a
                      onClick={() => deleteUser(cooperation._id)}
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
          totalItems={cooperations.length}
          itemsPerPage={5}
          onPageChange={setCurrentPage}
          label="همکاری"
        />
      </div>
    </>
  )
}

export default CooperationTable
