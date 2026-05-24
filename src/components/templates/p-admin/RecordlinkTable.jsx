// import React from 'react'

// const RecordlinkTable = ({ courseRegisterations, deleteUser }) => {
//   return (
//     <>
//       <div className="bg-white m-auto py-10 rounded-lg w-[90%]">
//         <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
//           <table className="m-auto mb-40 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
//             <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
//               <tr>
//                 <th className="px-6 py-3">ردیف</th>
//                 <th className="px-6 py-3">نام و نام خانوادگی</th>
//                 <th className="px-6 py-3">دوره</th>
//                 <th className="px-6 py-3">پارت</th>
//                 <th className="px-6 py-3">تایتل</th>
//                 <th className="px-6 py-3">لینک ضبط</th>
//                 <th className="px-6 py-3">عملگر</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courseRegisterations.map((register, index) =>
//                 register.recordings?.map((item, accIndex) => (
//                   <tr
//                     key={`${register._id}-${accIndex}`}
//                     className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
//                   >
//                     {/* ستون‌های ثابت فقط در اولین ردیف نمایش داده می‌شوند */}
//                     {accIndex === 0 && (
//                       <>
//                         <td
//                         //   rowSpan={register.classAccounts.length}
//                           className="px-6 py-4"
//                         >
//                           {index + 1}
//                         </td>
//                         <td
//                         //   rowSpan={register.classAccounts.length}
//                           className="px-6 py-4"
//                         >
//                           {register.userId?.name}
//                         </td>
//                         <td
//                         //   rowSpan={register.classAccounts.length}
//                           className="px-6 py-4"
//                         >
//                           {register.courseId?.name}
//                         </td>
//                       </>
//                     )}

//                     {/* ستون‌های مربوط به هر اکانت */}
//                     <td className="px-6 py-4">{item.part}</td>
//                     <td className="px-6 py-4 font-semibold text-green-600">
//                       {item.title}
//                     </td>
                  
//                     <td className="px-6 py-4">
//                       <a
//                         href={item.url || register.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="bg-blue-700 p-2 rounded-lg text-white"
//                       >
//                         ورود به لینک
//                       </a>
//                     </td>
//                     <td
//                       // rowSpan={register.classAccounts.length}
//                       className="px-6 py-4 text-right"
//                       onClick={() => deleteUser(item._id)}
//                     >
//                       <a
//                         href="#"
//                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                       >
//                         حذف
//                       </a>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
    
//       </div>
//     </>
//   )
// }

// export default RecordlinkTable

'use client'
import Pagination from '@/components/modules/p-admin/Pagination'
import React, { useState } from 'react'

const RecordlinkTable = ({ courseRegisterations, deleteUser }) => {

    const [currentPage, setCurrentPage] = useState(1)
    
    const itemsPerPage = 3
    const indexOfLastArticle = currentPage * itemsPerPage
    const indexOfFirstArticle = indexOfLastArticle - itemsPerPage
    const currentRecordLink = courseRegisterations.slice(
      indexOfFirstArticle,
      indexOfLastArticle,
    )
  return (
    <>
 
        <div className="relative shadow-md mt-20 sm:rounded-lg overflow-x-auto">
          <table className="m-auto mb-10 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
              <tr>
                <th className="px-6 py-3">ردیف</th>
                <th className="px-6 py-3">نام و نام خانوادگی</th>
                <th className="px-6 py-3">دوره</th>
                <th className="px-6 py-3">پارت</th>
                <th className="px-6 py-3">تایتل</th>
                <th className="px-6 py-3">لینک ضبط</th>
                <th className="px-6 py-3">عملگر</th>
              </tr>
            </thead>
            <tbody>
              {currentRecordLink.map((register, index) =>
                register.recordings?.map((item, accIndex) => {
                  const recordingsCount = register.recordings ? register.recordings.length : 0

                  return (
                    <tr
                      key={`${register._id}-${item._id || accIndex}`}
                      className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                    >
                      {/* ستون‌های ثابت فقط در اولین ردیف نمایش داده می‌شوند */}
                      {accIndex === 0 && recordingsCount > 0 && (
                        <>
                          <td rowSpan={recordingsCount} className="px-6 py-4">
                            {index + 1}
                          </td>
                          <td rowSpan={recordingsCount} className="px-6 py-4">
                            {register.userId?.name || '-'}
                          </td>
                          <td rowSpan={recordingsCount} className="px-6 py-4">
                            {register.courseId?.name || '-'}
                          </td>
                        </>
                      )}

                      {/* ستون‌های مربوط به هر ضبط */}
                      <td className="px-6 py-4">{item.part || '-'}</td>
                      <td className="px-6 py-4 font-semibold text-orange-600">
                        {item.title || '-'}
                      </td>

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

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            // برای حذف ضبط فعلی؛ item._id باید id ضبط باشه
                            deleteUser(item._id)
                          }}
                          className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                        >
                          حذف
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
            <Pagination
             currentPage={currentPage}
            totalItems={courseRegisterations.length}
            itemsPerPage={3}
            onPageChange={setCurrentPage}
            label="لینک ضبط "
        />
        </div>
    
    </>
  )
}

export default RecordlinkTable
