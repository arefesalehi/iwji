'use client'

import React, { useEffect, useState } from 'react'
import CourseCreateTable from './CourseCreateTable'

const CreateCourse = ({ categories = [], allCourses }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState(null)
  const [support, setSupport] = useState('')
  const [shortName, setShortName] = useState('')
  const [price, setPrice] = useState('')
  const [isComplete, setIsComplete] = useState('') // will send as 'true'/'false'
  const [status, setStatus] = useState('')
  const [discount, setDiscount] = useState('')
  const [startTime, setStartTime] = useState('')
  const [ScheduledTime, setScheduledTime] = useState('')
  const [EventFormat, setEventFormat] = useState('')
  const [level, setLevel] = useState('')
  const [courseType, setCourseType] = useState('')
  const [courseDuration, setCourseDuration] = useState('')
  const [prerequisite, setPrerequisite] = useState('')
  const [NumberOfSessions, setNumberOfSessions] = useState('')
  const [ClassDuration, setClassDuration] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [recordedCourse, setRecordedCourse] = useState('') // 'true' or 'false'
  const [certificate, setCertificate] = useState('') // 'true' or 'false'
  const [language, setLanguage] = useState('')
  const [categoryID, setCategoryID] = useState(categories?.[0]?._id || '')
  const [href, setHref] = useState('') // new field because your server expects href
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [all, setAll] = useState([])

  const getAll = async () => {
    const res = await fetch('/api/course')
    const data = await res.json()
    setAll(data)
  }

  useEffect(() => {
    getAll()
  }, [])

  const deleteCourse = async (courseId) => {
    // تایید حذف
    const result = await swal({
      title: 'آیا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    })

    if (result) {
      try {
        const res = await fetch('/api/course', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: courseId }),
        })

        if (res.ok) {
          await swal({
            title: 'با موفقیت حذف شد',
            icon: 'success',
            button: 'OK',
          })
          // بروزرسانی جدول
          getAll()
        } else {
          const data = await res.json()
          swal({
            title: 'خطا',
            text: data.message,
            icon: 'error',
            button: 'OK',
          })
        }
      } catch (err) {
        console.error(err)
        swal({
          title: 'خطا',
          text: err.message,
          icon: 'error',
          button: 'OK',
        })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('description', description)
      if (img) formData.append('img', img)
      formData.append('support', support)
      formData.append('shortName', shortName)
      formData.append('price', price) // server does Number(...)
      // convert boolean-like selects to definite 'true'/'false' strings (no empty string)
      const isCompleteValue = isComplete === 'true' ? 'true' : 'false'
      const recordedCourseValue = recordedCourse === 'true' ? 'true' : 'false'
      const certificateValue = certificate === 'true' ? 'true' : 'false'

      formData.append('isComplete', isCompleteValue)
      formData.append('status', status)
      formData.append('discount', discount)
      formData.append('href', href) // IMPORTANT: server expected href
      formData.append('categoryID', categoryID)
      formData.append('startTime', startTime)
      formData.append('ScheduledTime', ScheduledTime)
      formData.append('EventFormat', EventFormat)
      formData.append('level', level)
      formData.append('courseType', courseType)
      formData.append('courseDuration', courseDuration)
      formData.append('prerequisite', prerequisite)
      formData.append('NumberOfSessions', NumberOfSessions)
      formData.append('ClassDuration', ClassDuration)
      formData.append('totalHours', totalHours)
      formData.append('recordedCourse', recordedCourseValue)
      formData.append('certificate', certificateValue)
      formData.append('language', language)
      formData.append('img', img)
      const res = await fetch('/api/course', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        // try to get json or text
        let detail = ''
        try {
          const j = await res.json()
          detail = JSON.stringify(j)
        } catch (_) {
          detail = await res.text().catch(() => `status ${res.status}`)
        }
        throw new Error(detail)
      }

      const data = await res.json()
      console.log('new course created:', data)
      setSuccessMessage('دوره با موفقیت ایجاد شد.')
      // reset form (اختیاری)
      setName('')
      setDescription('')
      setImg(null)
      setSupport('')
      setShortName('')
      setPrice('')
      setIsComplete('')
      setStatus('')
      setDiscount('')
      setHref('')
      setStartTime('')
      setScheduledTime('')
      setEventFormat('')
      setLevel('')
      setCourseType('')
      setCourseDuration('')
      setPrerequisite('')
      setNumberOfSessions('')
      setClassDuration('')
      setTotalHours('')
      setRecordedCourse('')
      setCertificate('')
      setLanguage('')
      setImg('')
      setCategoryID(categories?.[0]?._id || '')
    } catch (err) {
      console.error('Submit error:', err)
      setError(err.message || 'خطای نامشخص')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <form
          onSubmit={handleSubmit}
          className="m-auto py-20 rounded-lg w-[90%]"
        >
          <div className="gap-6 grid md:grid-cols-3 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                نام دوره
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                id="name"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                توضیح کوتاه در خصوص دوره
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                id="description"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="img"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                عکس دوره
              </label>
              <input
                onChange={(e) => setImg(e.target.files[0] || null)}
                type="file"
                accept="image/*"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="support"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                پشتیبانی دوره
              </label>
              <select
                value={support}
                onChange={(e) => setSupport(e.target.value)}
                id="support"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              >
                <option value=""> پشتیانی را انتخاب کنید</option>
                <option value="تلگرام">تلگرام</option>
                <option value="واتس اپ">واتس اپ</option>
                <option value="سایت">سایت </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="shortName"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                shortName
              </label>
              <input
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                type="text"
                id="shortName"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                قیمت دوره
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                id="price"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="isComplete"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                آیا دوره کامل شده؟
              </label>
              <select
                value={isComplete}
                onChange={(e) => setIsComplete(e.target.value)}
                id="isComplete"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              >
                <option value="">انتخاب کنید</option>
                <option value="true">بله</option>
                <option value="false">خیر</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                وضعیت دوره
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                id="status"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              >
                <option value=""> انتخاب کنید </option>
                <option value="در حال برگزاری">در حال برگزاری</option>
                <option value="شروع نشده">شروع نشده</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="startTime"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                شروع دوره
              </label>
              <input
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                type="text"
                id="startTime"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="ScheduledTime"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                ساعت برگزاری دوره
              </label>
              <input
                value={ScheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                type="text"
                id="ScheduledTime"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="discount"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                تخفیف
              </label>
              <input
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                type="text"
                id="discount"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="EventFormat"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                فرمت برگزاری دوره
              </label>
              <input
                value={EventFormat}
                onChange={(e) => setEventFormat(e.target.value)}
                type="text"
                id="EventFormat"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="level"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                سطح دوره
              </label>
              <input
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                type="text"
                id="level"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="courseType"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                نوع دوره
              </label>
              <input
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                type="text"
                id="courseType"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="courseDuration"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                مدت زمان دوره
              </label>
              <input
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                type="text"
                id="courseDuration"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="prerequisite"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                پیش نیاز دوره
              </label>
              <input
                value={prerequisite}
                onChange={(e) => setPrerequisite(e.target.value)}
                type="text"
                id="prerequisite"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="NumberOfSessions"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                تعداد جلسات دوره
              </label>
              <input
                value={NumberOfSessions}
                onChange={(e) => setNumberOfSessions(e.target.value)}
                type="text"
                id="NumberOfSessions"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="ClassDuration"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                مدت زمان هر کلاس
              </label>
              <input
                value={ClassDuration}
                onChange={(e) => setClassDuration(e.target.value)}
                type="text"
                id="ClassDuration"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="totalHours"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                ساعات کل دوره
              </label>
              <input
                value={totalHours}
                onChange={(e) => setTotalHours(e.target.value)}
                type="text"
                id="totalHours"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="recordedCourse"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                ضبط دوره
              </label>
              <select
                value={recordedCourse}
                onChange={(e) => setRecordedCourse(e.target.value)}
                id="recordedCourse"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              >
                <option value=""> آیا ضبط دوره دارد؟</option>
                <option value="true">دارد</option>
                <option value="false">ندارد</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="certificate"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                مدرک دوره
              </label>
              <select
                value={certificate}
                onChange={(e) => setCertificate(e.target.value)}
                id="certificate"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              >
                <option value=""> آیا مدرک دوره دارد؟</option>
                <option value="true">دارد</option>
                <option value="false">ندارد</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="language"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                زبان دوره
              </label>
              <input
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                type="text"
                id="language"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="categoryID"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                دسته بندی دوره
              </label>
              <select
                value={categoryID}
                onChange={(e) => setCategoryID(e.target.value)}
                id="categoryID"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              >
                <option value="">انتخاب کنید</option>
                {categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  )
                })}
              </select>
            </div>

            <div>
              <label
                htmlFor="href"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                لینک (href) دوره
              </label>
              <input
                value={href}
                onChange={(e) => setHref(e.target.value)}
                type="text"
                id="href"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>

            {/* <div>
              <label
                htmlFor="href"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                عکس دوره
              </label>
              <input
              
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
                id="img"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div> */}
          </div>

          {error && <p className="mb-3 text-red-600">{error}</p>}
          {successMessage && (
            <p className="mb-3 text-green-600">{successMessage}</p>
          )}

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 w-full sm:w-auto font-medium text-white text-sm text-center"
            disabled={submitting}
          >
            {submitting ? 'در حال ارسال...' : 'ثبت'}
          </button>
        </form>
        <CourseCreateTable allCourses={all} deleteCourse={deleteCourse} />
      </div>
    </>
  )
}

export default CreateCourse
