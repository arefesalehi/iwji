'use client'
import Pagination from '@/components/modules/p-admin/Pagination'
import Image from 'next/image'
import React, { useState } from 'react'

const PosterTable = ({ posters }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const teamsPerPage = 5
    const indexOfLastArticle = currentPage * teamsPerPage
    const indexOfFirstArticle = indexOfLastArticle - teamsPerPage
    const currentPoster = posters.slice(
      indexOfFirstArticle,
      indexOfLastArticle,
    )
  return (
    <>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="m-auto mb-10 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام تصویر
              </th>
              <th scope="col" className="px-6 py-3">
                xlتصویر
              </th>
              <th scope="col" className="px-6 py-3">
                تصویر lg
              </th>
              <th scope="col" className="px-6 py-3">
                تصویر md
              </th>
              <th scope="col" className="px-6 py-3">
                تصویر sm
              </th>
              <th scope="col" className="px-6 py-3">
                عملگر
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPoster.map((poster) => {
              return (
                <tr
                  key={poster._id}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {poster.title}
                  </th>
                  <td className="px-6 py-4">
                    {poster.posterImg_xl ? (
                      <Image
                        src={poster.posterImg_xl}
                        alt="pic"
                        className="rounded-lg w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    ) : (
                      <Image
                        src="/images/Capture30.PNG"
                        alt="pic"
                        className="rounded-lg w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                     {poster.posterImg_lg ? (
                      <Image
                        src={poster.posterImg_lg}
                        alt="pic"
                        className="rounded-lg w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    ) : (
                      <Image
                        src="/images/Capture30.PNG"
                        alt="pic"
                        className="rounded-lg w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {poster.posterImg_md ? (
                      <Image
                        src={poster.posterImg_md}
                        alt="pic"
                        className="rounded-lg w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    ) : (
                      <Image
                        src="/images/Capture30.PNG"
                        alt="pic"
                        className="rounded-lg w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {poster.posterImg_sm ? (
                      <Image
                        src={poster.posterImg_sm}
                        alt="pic"
                        className="rounded-lg w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    ) : (
                      <Image
                        src="/images/Capture30.PNG"
                        alt="pic"
                        className="rounded-lg w-[150px] h-[100px]"
                        width={300}
                        height={100}
                      />
                    )}
                  </td>

                  <td className="flex px-6 py-16 text-right">
                    <a
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
            totalItems={posters.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            label="پوستر "
        />
      </div>
    </>
  )
}

export default PosterTable
