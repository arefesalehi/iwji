import Image from 'next/image'
import React from 'react'

const MembershipTable = ({ memberships }) => {
  return (
    <>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="m-auto mb-40 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                نام تصویر
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
            {memberships.map((member) => {
              return (
                <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {member.title}
                  </th>
                  <td className="px-6 py-4">
                      <Image src={member.membershipImg} alt='pic' className='border-2 border-gray-300 rounded-lg w-[100px] h-[120px]' width={200} height={100}/>

                  </td>

                  <td className="flex gap-2 px-6 py-4 text-right">
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
      </div>
    </>
  )
}

export default MembershipTable
