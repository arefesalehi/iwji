'use client'

import Pagination from '@/components/modules/p-admin/Pagination'
import { showswal } from '@/utils/helper'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
const TicketTable = ({ tickets, user }) => {
  const [all, setAll] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemPerPage = 5
  const indexOfLastArticle = currentPage * itemPerPage
  const indexOfFirstArticle = indexOfLastArticle - itemPerPage
  const currentTickets = tickets.slice(indexOfFirstArticle, indexOfLastArticle)

  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    const res = await fetch('/api/tickets')
    const data = await res.json()
    setAll(data)
  }

  const showTicket = (body) => {
    showswal(body, undefined, 'ok')
  }

  const deleteTicket = (ticketID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید ؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/tickets/${ticketID}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          swal({
            title: 'کامنت با موفقیت حذف شد',
            icon: 'success',
            buttons: 'ok',
          }).then(() => getAll())
        }
      }
    })
  }

  const replyTicket = async (ticketId, departmentId) => {
    swal({
      title: 'پاسخ به کامنت',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'متن پاسخ خود را وارد کنید...',
          type: 'text',
        },
      },
      buttons: ['انصراف', 'ارسال'],
    }).then(async (text) => {
      if (!text) return
      const res = await fetch('/api/tickets/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: text,
          user: user._id,
          department: departmentId,
          mainTicket: ticketId,
        }),
      })
      if (res.ok) {
        swal({
          title: 'پاسخ با موفقیت ثبت شد',
          icon: 'success',
          buttons: 'باشه',
        })
        getAll()
      } else {
        swal({ title: 'خطا در ثبت پاسخ', icon: 'error', buttons: 'باشه' })
      }
    })
  }

  return (
    <>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
          <div className="flex md:flex-row flex-wrap flex-column justify-between items-center space-y-4 md:space-y-0 bg-white dark:bg-gray-900 px-5 py-10 pb-4">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 flex items-center ps-3 pointer-events-none start-0">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                // value={inputValue}
                // onChange={(e) => setInputValue(e.target.value)}
                type="text"
                id="table-search-users"
                className="block bg-gray-50 dark:bg-gray-700 p-2 ps-10 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-80 text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="Search for users"
              />
            </div>
          </div>
          <table className="m-auto w-[98%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ردیف
                </th>
                {/* <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800 dark:ring-offset-gray-800 w-4 h-4 text-blue-600"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th> */}
                <th scope="col" className="px-6 py-3">
                  نام و نام خانوادگی
                </th>
                <th scope="col" className="px-6 py-3">
                  موضوع تیکت
                </th>

                <th scope="col" className="px-6 py-3">
                  دپارتمان
                </th>
                <th scope="col" className="px-6 py-3">
                  تاریخ ثبت
                </th>
                <th scope="col" className="px-6 py-3">
                  مشاهده
                </th>

                <th scope="col" className="px-6 py-3">
                  حذف
                </th>

                <th scope="col" className="px-6 py-3">
                  پاسخ
                </th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.map((ticket, index) => {
                return (
                  <tr
                    key={ticket._id}
                    className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    {/* <td className="p-4 w-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800 dark:ring-offset-gray-800 w-4 h-4 text-blue-600"
                        />
                        <label
                          for="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td> */}
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      {/* <img
                        className="rounded-full w-10 h-10"
                        src="/uploads/1753176874984WhatsApp Image 2022-08-30 at 20.40.58.jpeg"
                        alt="Jese image"
                      /> */}
                      <div className="ps-3">
                        <div className="font-semibold text-sm">
                          {ticket?.user?.name}{' '}
                        </div>
                        {/* <div className="flex font-normal text-gray-500">
                          {new Array(comment.score)
                            .fill(0)
                            .map((item, index) => {
                              return (
                                <FaStar
                                  key={index}
                                  className="text-yellow-600"
                                />
                              )
                            })}
                          {new Array(5 - comment.score)
                            .fill(0)
                            .map((item, index) => {
                              return (
                                <AiOutlineStar
                                  key={index}
                                  className="text-yellow-500"
                                />
                              )
                            })}
                        </div> */}
                      </div>
                    </th>
                    <td className="px-6 py-4">{ticket.title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {ticket.department.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {new Date(
                          ticket.createdAt.slice(0, 10),
                        ).toLocaleDateString('fa-ir')}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        onClick={() => showTicket(ticket.body)}
                        href="#"
                        className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-blue-700 text-sm"
                      >
                        مشاهده
                      </a>
                    </td>

                    <td
                      onClick={() => deleteTicket(ticket._id)}
                      className="px-6 py-4"
                    >
                      <a
                        href="#"
                        className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                      >
                        حذف
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      <a
                        href="#"
                        onClick={() =>
                          replyTicket(ticket._id, ticket.department?._id)
                        }
                        className="bg-green-100 hover:bg-green-200 px-3 py-1 rounded text-green-700 text-sm"
                      >
                        پاسخ
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalItems={tickets.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            label="تیکت "
          />
        </div>
      </div>
    </>
  )
}

export default TicketTable
