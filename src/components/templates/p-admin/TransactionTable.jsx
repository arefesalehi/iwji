'use client'
import React, { useState } from 'react'
import Recipt from './Recipt'
import Pagination from '@/components/modules/p-admin/Pagination'

const TransactionTable = ({courseRegister}) => {
      const [currentPage, setCurrentPage] = useState(1)
      const transactionPerPage = 5
      const indexOfLastArticle = currentPage * transactionPerPage
      const indexOfFirstArticle = indexOfLastArticle - transactionPerPage
      const currentTransaction = courseRegister.slice(
        indexOfFirstArticle,
        indexOfLastArticle,
      )
  return (
    <>
      <div className="bg-white m-auto py-20 rounded-lg w-[90%]">
        <div className="relative shadow-md mx-10 sm:rounded-lg overflow-x-auto">
          <table className="w-full text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  شناسه
                </th>
                <th scope="col" className="px-6 py-3">
                  شرح تراکنش
                </th>

                <th scope="col" className="px-6 py-3">
                  تاریخ
                </th>
                <th scope="col" className="px-6 py-3">
                  مبلغ
                </th>
                <th scope="col" className="px-6 py-3">
                  وضعیت
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
              </tr>
            </tbody>
          </table>
          <Pagination currentPage={currentPage}
            totalItems={courseRegister.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            label="تراکنش"/>
       
        </div>
           <Recipt courseRegister={courseRegister}/>
      </div>
    </>
  )
}

export default TransactionTable
