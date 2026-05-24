'use client'
import Pagination from '@/components/modules/p-admin/Pagination'
import React, { useState } from 'react'

const ClassLinkTable = ({ courseRegisterations , deleteUser}) => {
    const [currentPage, setCurrentPage] = useState(1)
    const classlinkPerPage = 5
    const indexOfLastArticle = currentPage * classlinkPerPage
    const indexOfFirstArticle = indexOfLastArticle - classlinkPerPage
    const currentclasslink = courseRegisterations.slice(
      indexOfFirstArticle,
      indexOfLastArticle,
    )
  return (
    <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
      <table className="m-auto mb-10 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">ردیف</th>
            <th className="px-6 py-3">نام و نام خانوادگی</th>
            <th className="px-6 py-3">دوره</th>
            <th className="px-6 py-3">پارت</th>
            <th className="px-6 py-3">یوزرنیم</th>
            <th className="px-6 py-3">پسورد</th>
            <th className="px-6 py-3">لینک کلاس</th>
            <th className="px-6 py-3">عملگر</th>
          </tr>
        </thead>
        <tbody>
          {currentclasslink.map((register, index) =>
            register.classAccounts?.map((item, accIndex) => (
              <tr
                key={`${register._id}-${accIndex}`}
                className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
              >
                {/* ستون‌های ثابت فقط در اولین ردیف نمایش داده می‌شوند */}
                {accIndex === 0 && (
                  <>
                    <td rowSpan={register.classAccounts.length} className="px-6 py-4">
                      {index + 1}
                    </td>
                    <td rowSpan={register.classAccounts.length} className="px-6 py-4">
                      {register.userId?.name}
                    </td>
                    <td rowSpan={register.classAccounts.length} className="px-6 py-4">
                      {register.courseId?.name}
                    </td>
                    
                  </>
                )}

                {/* ستون‌های مربوط به هر اکانت */}
                <td className="px-6 py-4">{item.title}</td>
                <td className="px-6 py-4 font-semibold text-orange-600">{item.username}</td>
                <td className="px-6 py-4 font-semibold text-orange-600">{item.password}</td>
                <td className="px-6 py-4">
                  <a
                    href={item.url || register.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 p-2 rounded-lg text-white"
                  >
                    ورود به لینک
                  </a>
                </td>
                 <td
                    // rowSpan={register.classAccounts.length}
                    className="px-6 py-4 text-right"
                     onClick={()=>deleteUser(item._id)}
                  >
                    <a
                      href="#"
                          className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                    >
                      حذف
                    </a>
                  </td>
                

               
              
                 
               
              </tr>
            ))
          )}
        </tbody>
      </table>
         <Pagination
             currentPage={currentPage}
            totalItems={courseRegisterations.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            label="لینک کلاس "
        />
    </div>
  )
}

export default ClassLinkTable
