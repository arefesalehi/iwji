import Link from 'next/link'
import React from 'react'

const ClassInfoTable = ({ registerCourse }) => {
  return (
    <>
 
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="w-full text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                شناسه
              </th>
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
          <tbody>
            {registerCourse.map((course, index) => {
              return (
                <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{course.courseId.name}</td>
                  {course.classAccounts.map((course2) => {
                    return (
                      <>
                        <td className="px-6 py-4">{course2.title}</td>
                        <td className="px-6 py-4"><Link href={course2.url} className='bg-blue-700 p-2 rounded-lg text-white'> لینک ورود </Link></td>
                        <td className="px-6 py-4 font-semibold text-green-600" >{course2.username}</td>
                          <td className="px-6 py-4 font-semibold text-green-600">{course2.password}</td>
                      
                      </>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ClassInfoTable
