import Link from 'next/link'
import React from 'react'

const ClassInfoTable2 = ({ iweRegistration }) => {
  return (
    <>
      <div className="relative shadow-md my-10 sm:rounded-lg overflow-x-auto">
        <table className="w-full text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
             
              <th scope="col" className="px-6 py-3">
                نام دوره
              </th>
              <th scope="col" className="px-6 py-3">
                پارت
              </th>
              <th scope="col" className="px-6 py-3">
                لینک ورود
              </th>
              <th scope="col" className="px-6 py-3">
                یوزر نیم
              </th>
              <th scope="col" className="px-6 py-3">
                پسورد
              </th>
            </tr>
          </thead>
          {/* <tbody>
        
                <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b">
                
                  <td className="px-6 py-4">{iweRegistration?.courseId?.name}</td>
                  {iweRegistration.classAccounts?.map((course2) => {
                    return (
                      <>
                        <td className="px-6 py-4">{course2.title}</td>
                        <td className="px-6 py-4"><Link href={course2.url} className='bg-blue-700 p-2 rounded-lg text-white'>ورود به لینک</Link></td>
                        <td className="px-6 py-4 font-semibold text-green-600" >{course2.username}</td>
                          <td className="px-6 py-4 font-semibold text-green-600">{course2.password}</td>
                      
                      </>
                    )
                  })}
                </tr>
         
          </tbody> */}

          <tbody>
  {iweRegistration.classAccounts?.map((course2, index) => (
    <tr
      key={index}
      className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
    >
      {index === 0 && (
        <td className="px-6 py-4" rowSpan={iweRegistration.classAccounts.length}>
          {iweRegistration?.courseId?.name}
        </td>
      )}
      <td className="px-6 py-4">{course2.title}</td>
      <td className="px-6 py-4">
        <Link href={course2.url} className="bg-blue-700 p-2 rounded-lg text-white">
          ورود به لینک
        </Link>
      </td>
      <td className="px-6 py-4 font-semibold text-green-600">{course2.username}</td>
      <td className="px-6 py-4 font-semibold text-green-600">{course2.password}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </>
  )
}

export default ClassInfoTable2
