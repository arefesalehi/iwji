'use client'
import Pagination from '@/components/modules/p-admin/Pagination'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import swal from 'sweetalert'
const IIWmembershipTable = ({ iiwmembership }) => {

  const [all, setAll] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const teamsPerPage = 5
  const indexOfLastArticle = currentPage * teamsPerPage
  const indexOfFirstArticle = indexOfLastArticle - teamsPerPage
  const currentmember = all.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  )

  const getAll = async () => {
    const res = await fetch('/api/IIWMembership')
    const data = await res.json()
    setAll(data.data)
  }

  useEffect(() => {
    getAll()
  }, [])


  const deleteHandler = (id) => {
    swal({
      title: 'آیا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/IIWMembership?id=${id}`, {
          method: 'DELETE',
        })

        const data = await res.json()
        if (res.ok) {
          swal({
            title: 'رکورد با موفقیت حذف شد',
            icon: 'success',
            buttons: 'ok',
          }).then(() => getAll())
        } else {
          swal('خطا', data.message, 'error')
        }
      }
    })
  }

  return (
    <>
      <div className="bg-white m-auto pt-20 rounded-lg w-[90%]">
        <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
          <table className="m-auto mb-10 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ردیف
                </th>
                <th scope="col" className="px-6 py-3">
                  نام و نام خانوادگی
                </th>
                <th scope="col" className="px-6 py-3">
                  کدملی
                </th>
                <th scope="col" className="px-6 py-3">
                  شماره تلفن
                </th>
                <th scope="col" className="px-6 py-3">
                  ایمیل
                </th>
                <th scope="col" className="px-6 py-3">
                  شرکت در دوره
                </th>
                <th scope="col" className="px-6 py-3">
                  عملگر
                </th>
              </tr>
            </thead>
            <tbody>
              {currentmember.map((member, index) => {
                return (
                  <tr key={member._id} className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{member.userId.name}</td>
                    <td className="px-6 py-4">{member.code}</td>
                    <td className="px-6 py-4">{member.userId.phone}</td>
                    <td className="px-6 py-4">{member.userId.email}</td>
                    <td className="px-6 py-4">
                      {member.courseId !== null ? <FaCheck  className='text-green-700'/> : <IoMdClose className='text-red-600' />}
                    </td>

                    <td
                      onClick={() => deleteHandler(member._id)}
                      className="flex px-6 py-4 text-right"
                    >
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
                      totalItems={all.length}
                      itemsPerPage={5}
                      onPageChange={setCurrentPage}
                      label=" عضو"
                  />
        </div>
      </div>
    </>
  )
}

export default IIWmembershipTable
