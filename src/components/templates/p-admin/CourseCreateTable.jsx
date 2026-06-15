import React from 'react'
import Swal from 'sweetalert2'

const CourseCreateTable = ({ allCourses, onEdit, onDelete, deleteCourse }) => {
  const handleEdit = async (course) => {
    const { value: formValues } = await Swal.fire({
      title: 'ویرایش دوره',
      html: `
        <input id="swal-name" class="swal2-input" placeholder="نام دوره" value="${
          course.name || ''
        }">
        <input id="swal-shortName" class="swal2-input" placeholder="shortName" value="${
          course.shortName || ''
        }">
        <input id="swal-level" class="swal2-input" placeholder="سطح" value="${
          course.level || ''
        }">
        <input id="swal-language" class="swal2-input" placeholder="زبان" value="${
          course.language || ''
        }">
        <input id="swal-price" type="number" class="swal2-input" placeholder="قیمت" value="${
          course.price || ''
        }">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'ذخیره',
      cancelButtonText: 'انصراف',
      preConfirm: () => {
        return {
          id: course._id,
          name: document.getElementById('swal-name').value,
          shortName: document.getElementById('swal-shortName').value,
          level: document.getElementById('swal-level').value,
          language: document.getElementById('swal-language').value,
          price: Number(document.getElementById('swal-price').value),
        }
      },
    })

    if (!formValues) return

    try {
      const formData = new FormData()
      formData.append('id', formValues.id)
      formData.append('name', formValues.name)
      formData.append('shortName', formValues.shortName)
      formData.append('level', formValues.level)
      formData.append('language', formValues.language)
      formData.append('price', formValues.price)

      const res = await fetch('/api/course', {
        method: 'PUT',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'خطا در ویرایش')

      Swal.fire('ویرایش شد!', 'دوره با موفقیت ویرایش شد.', 'success')
    } catch (err) {
      Swal.fire('خطا!', err.message, 'error')
    }
  }

  if (!Array.isArray(allCourses) || allCourses.length === 0) {
    return (
      <div className="m-auto py-10 w-[90%]">
        <p className="text-gray-500 text-center">هیچ دوره‌ای وجود ندارد.</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="m-auto mb-40 w-[90%] text-gray-500 dark:text-gray-400 text-xs text-left rtl:text-right">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
              {/* <th scope="col" className="px-6 py-3">تصویر</th> */}
              <th scope="col" className="px-6 py-3">
                نام دوره
              </th>
              <th scope="col" className="px-6 py-3">
                نام کوتاه (shortName)
              </th>
              <th scope="col" className="px-6 py-3">
                سطح
              </th>
              <th scope="col" className="px-6 py-3">
                نوع
              </th>
              <th scope="col" className="px-6 py-3">
                زبان
              </th>
              <th scope="col" className="px-6 py-3">
                مدت{' '}
              </th>
              <th scope="col" className="px-6 py-3">
                پیش‌نیاز
              </th>
              <th scope="col" className="px-6 py-3">
                تعداد جلسات
              </th>
              <th scope="col" className="px-6 py-3">
                مدت هر کلاس
              </th>
              <th scope="col" className="px-6 py-3">
                ساعات کل
              </th>
              <th scope="col" className="px-6 py-3">
                ضبط
              </th>
              <th scope="col" className="px-6 py-3">
                مدرک
              </th>
              <th scope="col" className="px-6 py-3">
                قیمت
              </th>
              <th scope="col" className="px-6 py-3">
                عملگر
              </th>
            </tr>
          </thead>
          <tbody>
            {allCourses.map((item) => {
              const id =
                item._id || item.id || Math.random().toString(36).slice(2, 9)
              return (
                <tr
                  key={id}
                  className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                >
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {item.img ? (
                      // تصویر بندانگشتی
                      // اگر آدرس کامل نیست، بگیر و نمایش بده — فرض می‌کنیم URL معتبره
                      <img
                        src={item.img}
                        alt={item.name || 'course image'}
                        className="rounded w-16 h-10 object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = '/fallback-course.png' // اگر خواستی فایل fallback بذار
                        }}
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded w-16 h-10 text-gray-500 text-xs">
                        بدون تصویر
                      </div>
                    )}
                  </td> */}

                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                  >
                    {item.name || '-'}
                  </th>

                  <td className="px-6 py-4">{item.shortName || '-'}</td>
                  <td className="px-6 py-4">{item.level || '-'}</td>
                  <td className="px-6 py-4">{item.courseType || '-'}</td>
                  <td className="px-6 py-4">{item.language || '-'}</td>
                  <td className="px-6 py-4">{item.courseDuration ?? '-'}</td>
                  <td className="px-6 py-4">{item.prerequisite || '-'}</td>
                  <td className="px-6 py-4">{item.NumberOfSessions ?? '-'}</td>
                  <td className="px-6 py-4">{item.ClassDuration ?? '-'}</td>
                  <td className="px-6 py-4">{item.totalHours ?? '-'}</td>
                  <td className="px-6 py-4">
                    {typeof item.recordedCourse === 'boolean'
                      ? item.recordedCourse
                        ? 'بله'
                        : 'خیر'
                      : item.recordedCourse || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {typeof item.certificate === 'boolean'
                      ? item.certificate
                        ? 'دارد'
                        : 'ندارد'
                      : item.certificate || '-'}
                  </td>
                  <td className="px-6 py-4">
                    {item.price != null ? item.price : '-'}
                  </td>

                  <td className="flex px-6 py-4 text-right">
                    <button
                      onClick={() => deleteCourse(item._id)}
                      className="bg-red-100 hover:bg-red-200 ml-3 px-3 py-1 rounded text-red-700 text-xs"
                      aria-label={`حذف ${item.name || 'دوره'}`}
                    >
                      حذف
                    </button>

                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-blue-700 text-xs"
                      aria-label={`ویرایش ${item.name || 'دوره'}`}
                    >
                      ویرایش
                    </button>
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

export default CourseCreateTable
