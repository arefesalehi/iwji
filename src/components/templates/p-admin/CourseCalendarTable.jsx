import React from 'react'
import Image from 'next/image'
import swal from 'sweetalert'
import { useRouter } from 'next/navigation'

const CourseCalendarTable = ({ courseRegisterations }) => {
  const router = useRouter()

  return (
    <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
      <table className="m-auto mb-40 w-[90%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">تصویر</th>
            <th className="px-6 py-3">عنوان</th>
            <th className="px-6 py-3">نام دوره</th>
            <th className="px-6 py-3">نام دانشجویان</th>

            <th className="px-6 py-3">عملگر</th>
          </tr>
        </thead>
        <tbody>
          {courseRegisterations.map((reg) =>
            reg.courseCalendar?.map((item) => {
              const fileUrl = item.fileUrl?.trim()
              if (!fileUrl) return null
              const isImage = fileUrl.match(/\.(jpeg|jpg|png|gif)$/i)

              return (
                <tr
                  key={item._id}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                >
                  <td className="px-6 py-4">
                    {isImage ? (
                      <Image
                        src={fileUrl}
                        width={150}
                        height={100}
                        alt={item.title}
                        className="object-contain"
                      />
                    ) : (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {fileUrl.split('/').pop()}
                      </a>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {reg.courseId.name}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {reg.userId.name}
                  </td>
                  <td className="flex px-6 py-16 text-right">
                    <a
                      href="#"
                      className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                      onClick={() =>
                        swal(
                          'هشدار',
                          'اینجا میتونی حذف رو اضافه کنی',
                          'warning',
                        )
                      }
                    >
                      حذف
                    </a>
                  </td>
                </tr>
              )
            }),
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CourseCalendarTable
