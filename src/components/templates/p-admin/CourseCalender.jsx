'use client'

import { useState, Fragment, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  XMarkIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid'
import CourseCalendarTable from './CourseCalendarTable'

export default function CourseCalendar({
  courseRegisterations,
  courseOptions,
}) {
  const [courseCalendar, setCourseCalendar] = useState(null)
  const [query, setQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [message, setMessage] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [title, setTitle] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(courseRegisterations)

  useEffect(() => {
    let result = courseRegisterations

    if (selectedCourseId) {
      result = result.filter(
        (reg) =>
          reg.courseId && reg.courseId._id.toString() === selectedCourseId,
      )
    }

    if (query !== '') {
      result = result.filter(
        (reg) =>
          (reg.userId?.name || '')
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          (reg.userId?.email || '').toLowerCase().includes(query.toLowerCase()),
      )
    }

    setFilteredUsers(result)
  }, [query, selectedCourseId, courseRegisterations])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedCourseId) return setMessage('لطفاً یک دوره انتخاب کنید.')
    if (!courseCalendar.length) return setMessage('لطفاً فایل انتخاب کنید.')
    if (!selectedUsers.length)
      return setMessage('لطفاً کاربران را انتخاب کنید.')

    const formData = new FormData()
    formData.append('courseId', selectedCourseId)
    formData.append('title', title)

    selectedUsers.forEach((u) => formData.append('userIds', u.userId._id))
    courseCalendar.forEach((file) => formData.append('courseCalendar', file))

    const res = await fetch('/api/coursecalendar', {
      method: 'POST',
      body: formData,
    })
    const result = await res.json()
    setMessage(result.message)

    // ریست فرم
    setCourseCalendar([])
    setSelectedUsers([])
    setSelectedCourseId('')
  }

  return (
    <div className="bg-white m-auto py-10 rounded-lg w-[90%]">
      <div className="bg-white shadow mx-auto my-10 p-6 rounded-xl max-w-lg">
        <h2 className="mb-4 font-bold text-xl">آپلود تقویم آموزشی</h2>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-3 font-bold text-gray-900 text-sm">
              عنوان{' '}
            </label>
            <input
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="block bg-gray-50 p-2.5 border border-gray-300 rounded-lg w-full text-gray-900 text-sm"
              required
            />
          </div>

          {/* انتخاب فایل */}
          <div>
            <label className="block mb-3 font-bold text-gray-900 text-sm">
              انتخاب فایل
            </label>
            <input
              type="file"
              onChange={(e) => setCourseCalendar([...e.target.files])}
              className="block bg-gray-50 p-2.5 border border-gray-300 rounded-lg w-full text-gray-900 text-sm"
              required
            />
          </div>

          {/* انتخاب دوره */}
          <div>
            <label className="block mb-3 font-bold text-gray-900 text-sm">
              انتخاب دوره
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="block bg-gray-50 p-2.5 border border-gray-300 rounded-lg w-full text-gray-900 text-sm"
              required
            >
              <option value="">یک دوره انتخاب کنید</option>
              {courseOptions.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* انتخاب کاربران */}
          <div>
            <label className="block mb-3 font-bold text-gray-900 text-sm">
              کاربران مجاز
            </label>
            <Combobox
              value={selectedUsers}
              onChange={setSelectedUsers}
              multiple
            >
              <div className="relative mt-1">
                <div className="flex flex-wrap items-center gap-1 bg-gray-50 p-1 border border-gray-300 rounded-lg w-full text-gray-900 text-sm">
                  {selectedUsers.map((reg) => (
                    <span
                      key={reg._id}
                      className="flex items-center bg-blue-100 px-2 py-0.5 rounded text-blue-800 text-sm"
                    >
                      {reg.userId?.name || 'نام نامشخص'}
                      <XMarkIcon
                        className="ml-1 w-4 h-4 cursor-pointer"
                        onClick={() =>
                          setSelectedUsers(
                            selectedUsers.filter((u) => u._id !== reg._id),
                          )
                        }
                      />
                    </span>
                  ))}
                  <Combobox.Input
                    className="flex-1 p-1 pr-6 border-none focus:ring-0 text-sm"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="جستجو کاربران..."
                  />
                  <Combobox.Button className="right-0 absolute inset-y-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
                  </Combobox.Button>
                </div>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options className="z-10 absolute bg-white shadow-lg mt-1 rounded-md w-full max-h-60 overflow-auto text-sm">
                    {filteredUsers.length === 0 && query !== '' ? (
                      <div className="px-4 py-2 text-gray-700">
                        کاربری پیدا نشد
                      </div>
                    ) : (
                      filteredUsers.map((reg) => (
                        <Combobox.Option
                          key={reg._id}
                          value={reg}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {reg.userId?.name || 'نام نامشخص'} (
                                {reg.userId?.email || 'ایمیل نامشخص'})
                              </span>
                              {selected && (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-blue-600'
                                  }`}
                                >
                                  <CheckIcon className="w-5 h-5" />
                                </span>
                              )}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded text-white text-sm"
          >
            آپلود تقویم
          </button>
        </form>
      </div>

      <CourseCalendarTable courseRegisterations={courseRegisterations} />
    </div>
  )
}
