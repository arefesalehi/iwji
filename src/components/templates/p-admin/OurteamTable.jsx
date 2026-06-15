'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import swal from 'sweetalert'
import { useRouter } from 'next/navigation'
import Pagination from '@/components/modules/p-admin/Pagination'

const OurteamTable = ({ ourteams, deleteUser }) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)
  const teamsPerPage = 5
  const indexOfLastArticle = currentPage * teamsPerPage
  const indexOfFirstArticle = indexOfLastArticle - teamsPerPage
  const currentteam = ourteams.slice(indexOfFirstArticle, indexOfLastArticle)

  return (
    <>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="m-auto mb-10 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
          <thead className="bg-red-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                تصویر
              </th>
              <th scope="col" className="px-6 py-3">
                نام و نام خانوادگی
              </th>
              <th scope="col" className="px-6 py-3">
                ایمیل
              </th>
              <th scope="col" className="px-6 py-3">
                تلفن
              </th>
              <th scope="col" className="px-6 py-3">
                سمت
              </th>
              {/* <th scope="col" className="px-6 py-3">
                توضیح کوتاه
              </th> */}
              {/* <th scope="col" className="px-6 py-3">
                توضیح بلند
              </th> */}
              <th scope="col" className="px-6 py-3">
                عملگر
              </th>
            </tr>
          </thead>
          <tbody>
            {currentteam.map((team) => {
              return (
                <tr
                  key={team._id}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                >
                  <td className="px-6 py-4">
                    {team.img ? (
                      <Image
                        src={team.img}
                        alt="pic"
                        className="border-3 border-red-800 rounded-[50%] w-[100px] h-[100px]"
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
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {team.username}
                  </th>
                  <td> {team.email}</td>
                  <td> {team.phone}</td>
                  <td> {team.position}</td>
                  {/* <td> {team.shortDesc}</td> */}
                  {/* <td  ><div className='w-[100px] h-auto overflow-hidden'> {team.longDesc}</div></td> */}

                  <td className="flex px-6 py-16 text-right">
                    <span
                      onClick={() => deleteUser(team._id)}
                      className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                    >
                      حذف
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalItems={ourteams.length}
          itemsPerPage={5}
          onPageChange={setCurrentPage}
          label="هم تیمی"
        />
      </div>
    </>
  )
}

export default OurteamTable
