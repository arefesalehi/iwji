
'use client'
import Pagination from '@/components/modules/p-admin/Pagination'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import swal from 'sweetalert'

const UserTable = ({ users }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortLabel, setSortLabel] = useState('مرتب سازی')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const indexOfLastUser = currentPage * itemsPerPage
  const indexOfFirstUser = indexOfLastUser - itemsPerPage
  const router = useRouter()

  console.debug('UserTable users count:', users?.length)

  let filteredUsers = users.filter(user => {
    const searchText = inputValue.toLowerCase()
    const roleMap = {
      ADMIN: 'مدیر',
      USER: 'کاربر سایت',
    
    }
    const roleFa = roleMap[user.role] || user.role || ''
    return (
      (user.fullName && user.fullName.toLowerCase().includes(searchText)) ||
      (user.email && user.email.toLowerCase().includes(searchText)) ||
      (user.phoneNumber && user.phoneNumber.includes(searchText)) ||
      (roleFa && roleFa.toLowerCase().includes(searchText)) ||
      (user.role && user.role.toLowerCase().includes(searchText)) ||
      (user.courseNamesDisplay && user.courseNamesDisplay.toLowerCase().includes(searchText)) ||
      (user.iiwNamesDisplay && user.iiwNamesDisplay.toLowerCase().includes(searchText))
    )
  })

  if (sortKey) {
    if (sortKey === 'course') {
      filteredUsers = filteredUsers
        .filter(user => user.courseNames && user.courseNames.length > 0)
        .sort((a, b) => (a.courseNamesDisplay || '').localeCompare(b.courseNamesDisplay || ''))
    } else if (sortKey === 'webinar') {
      filteredUsers = filteredUsers
        .filter(user => user.webinarName)
        .sort((a, b) => (a.webinarName || '').localeCompare(b.webinarName || ''))
    } else if (sortKey === 'site') {
      filteredUsers = filteredUsers
        .filter(user => user.role === 'USER' || user.role === 'کاربر ')
        .sort((a, b) => (a.fullName || '').localeCompare(b.fullName || ''))
    } else if (sortKey === 'ozv') {
      filteredUsers = filteredUsers
        .filter(user => user.iiwNames && user.iiwNames.length > 0)
        .sort((a, b) => (a.iiwNamesDisplay || '').localeCompare(b.iiwNamesDisplay || ''))
    
    } else if (sortKey === 'all') {
      filteredUsers = [...users].sort((a, b) =>
        (a.fullName || '').localeCompare(b.fullName || '')
      )
    }
  }

  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

  const changeRole = async (userID) => {
    try {
      const res = await fetch('/api/user/roles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: userID }),
      })

      const data = await res.json()

      if (res.status === 200) {
        swal({
          title: 'نقش کاربر با موفقیت تغییر یافت',
          icon: 'success',
          buttons: 'ok',
        }).then(() => {
          router.refresh()
        })
      } else {
        swal({
          title: 'خطا در تغییر نقش',
          text: data.message || 'خطای ناشناخته',
          icon: 'error',
          buttons: 'ok',
        })
      }
    } catch (error) {
      console.error('Error changing role:', error)
      swal({
        title: 'خطای شبکه',
        text: 'مشکلی در ارتباط با سرور رخ داده است',
        icon: 'error',
        buttons: 'ok',
      })
    }
  }

  return (
    <>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
          <div className="flex md:flex-row flex-wrap flex-column justify-between items-center space-y-4 md:space-y-0 bg-white dark:bg-gray-900 px-5 py-10 pb-4">
            <div className="relative">
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 py-1.5 border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 w-[260px] font-medium text-gray-500 dark:text-gray-400 text-sm"
                type="button"
              >
                <span className="sr-only">Action button</span>
                {sortLabel}
                <svg
                  className="ms-20 w-2.5 h-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isOpen && (
                <>
                  <div
                    id="dropdownAction"
                    className="top-full absolute bg-white dark:bg-gray-700 shadow-sm mt-2 rounded-lg divide-y divide-gray-100 dark:divide-gray-600 w-44 lutez-50"
                  >
                    <ul
                      className="py-1 text-gray-700 dark:text-gray-200 text-sm"
                      aria-labelledby="dropdownActionButton"
                    >
                      <li
                        onClick={() => {
                          setSortKey('course')
                          setIsOpen(false)
                          setSortLabel('براساس کاربران دوره')
                        }}
                      >
                        <a
                          href="#"
                          className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                        >
                          براساس کاربران دوره
                        </a>
                      </li>
                      {/* <li
                        onClick={() => {
                          setSortKey('webinar')
                          setIsOpen(false)
                          setSortLabel('براساس کاربران وبینار')
                        }}
                      >
                        <a
                          href="#"
                          className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                        >
                          بر اساس کاربران وبینار
                        </a>
                      </li> */}
                      <li
                        onClick={() => {
                          setSortKey('site')
                          setIsOpen(false)
                          setSortLabel('براساس کاربران سایت')
                        }}
                      >
                        <a
                          href="#"
                          className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                        >
                          بر اساس کاربران سایت{' '}
                        </a>
                      </li>

                      <li
                        onClick={() => {
                          setSortKey('ozv')
                          setIsOpen(false)
                          setSortLabel('براساس کاربران عضویت')
                        }}
                      >
                        <a
                          href="#"
                          className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                        >
                          بر اساس کاربران عضویت{' '}
                        </a>
                      </li>
                    </ul>
                    <div
                      className="py-1"
                      onClick={() => {
                        setSortKey('all')
                        setIsOpen(false)
                        setSortLabel('براساس کل کاربران ')
                      }}
                    >
                      <a
                        href="#"
                        className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 text-gray-700 dark:hover:text-white dark:text-gray-200 text-sm"
                      >
                        بر اساس کل کاربران
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
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
                <th scope="col" className="px-6 py-3">ردیف</th>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3">نام و نام خانوادگی</th>
                <th scope="col" className="px-6 py-3">تلفن</th>
                <th scope="col" className="px-6 py-3"> تغییر نقش</th>
                <th scope="col" className="px-6 py-3">ثبت نام دوره</th>
                <th scope="col" className="px-6 py-3">نام دوره</th>
                <th scope="col" className="px-6 py-3">ثبت نام عضویت</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                >
                  <td className="px-6 py-4">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td className="p-4 w-4"></td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    <div className="ps-3">
                      <div className="font-semibold text-sm">{user.fullName}</div>
                      <div className="font-normal text-gray-500">{user.email}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center" onClick={() => changeRole(user.id)}>
                      {user.role === 'ADMIN' ? (
                        <div className="bg-green-500 me-2 rounded-full w-2.5 h-2.5"></div>
                      ) : (
                        <div className="bg-red-500 me-2 rounded-full w-2.5 h-2.5"></div>
                      )}

                      {user.role === 'USER'
                        ? 'کاربر '
                        : user.role === 'ADMIN'
                        ? 'مدیر'
                        : user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.isCourseRegistered ? (
                      <FaRegThumbsUp className="text-green-600" />
                    ) : (
                      <FaRegThumbsDown className="text-red-800" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.courseNamesDisplay || 'بدون ثبت نام'}
                  </td>
                  <td className="px-6 py-4">
                    {user.isiiwRegistered ? (
                      <FaRegThumbsUp className="text-green-600" />
                    ) : (
                      <FaRegThumbsDown className="text-red-800" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(p) => {
              setCurrentPage(p)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            label="کاربر"
          />
        </div>
      </div>
    </>
  )
}

export default UserTable

