'use client'

import { useState, Fragment, useEffect } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import {
  CheckIcon,
  XMarkIcon,
  ChevronUpDownIcon,
} from '@heroicons/react/20/solid'
import ClassLinkTable from './ClassLinkTable'
import swal from 'sweetalert'

export default function ClassLinkBox({ courseRegisterations, courseOptions }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [query, setQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [message, setMessage] = useState('')
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(courseRegisterations)
    const [all, setAll] = useState([])
  
    const getAll = async () => {
      const res = await fetch('/api/classlink')
      const data = await res.json()
      setAll(data)
    }
  
    useEffect(() => {
      getAll()
    }, [])
  
   const deleteUser = async (registerId) => {
    const result = await swal({
      title: 'آیا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ["خیر", "بله"]
    });
  
    if (result) {
      try {
        const res = await fetch('/api/classlink', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: registerId })
        });
  
        if (res.ok) {
          await swal({
            title: 'با موفقیت حذف شد',
            icon: 'success',
            button: 'OK'
          });
      
          getAll();
        } else {
          const data = await res.json();
          swal({
            title: 'خطا',
            text: data.message,
            icon: 'error',
            button: 'OK'
          });
        }
      } catch (err) {
        console.error(err);
        swal({
          title: 'خطا',
          text: err.message,
          icon: 'error',
          button: 'OK'
        });
      }
    }
  }

  // Filter users based on selected course and search query
  useEffect(() => {
    let result = courseRegisterations

    // Filter by selected course
    if (selectedCourseId) {
      result = result.filter(
        (reg) =>
          reg.courseId && reg.courseId._id.toString() === selectedCourseId,
      )
    }

    // Filter by search query
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
    if (selectedUsers.length === 0)
      return setMessage('لطفاً حداقل یک کاربر انتخاب کنید.')

    try {
      const res = await fetch('/api/classlink', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          url,
          courseId: selectedCourseId,
          users: selectedUsers.map((reg) => ({
            userId: reg.userId._id,
            username: `user_${Math.floor(Math.random() * 10000)}`,
            password: Math.random().toString(36).slice(-8),
          })),
        }),
      })

      const result = await res.json()
      setMessage(result.message)

      // Reset form
      setTitle('')
      setUrl('')
      setSelectedUsers([])
      setQuery('')
      setSelectedCourseId('')
    } catch (err) {
      setMessage('خطا در ارسال اطلاعات')
      console.error(err)
    }
  }

  return (
    <div className="bg-white m-auto py-10 rounded-lg w-[90%]">
      <div className="bg-white shadow mx-auto my-10 p-6 rounded-xl max-w-lg">
        <h2 className="mb-4 font-bold text-xl">ایجاد لینک جدید</h2>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* عنوان لینک */}
          <div>
            <label
              htmlFor="link_title"
              className="block mb-3 font-bold text-gray-900 text-sm"
            >
              عنوان لینک
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="link_title"
              className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
              placeholder="مثلاً: لینک کلاس اصلی"
              required
            />
          </div>

          {/* آدرس لینک */}
          <div>
            <label
              htmlFor="link_url"
              className="block mb-3 font-bold text-gray-900 text-sm"
            >
              آدرس لینک
            </label>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="text"
              id="link_url"
              className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
              placeholder="https://..."
              required
            />
          </div>

          {/* انتخاب دوره */}
          <div>
            <label
              htmlFor="course_select"
              className="block mb-3 font-bold text-gray-900 text-sm"
            >
              انتخاب دوره
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              id="course_select"
              className="block bg-gray-50 p-2.5 border border-gray-300 focus:border-blue-500 rounded-lg focus:ring-blue-500 w-full text-gray-900 text-sm"
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
                <div className="block relative bg-gray-50 shadow-md p-1 border border-gray-300 rounded-lg w-full overflow-hidden text-gray-900 text-sm">
                  <div className="flex flex-wrap items-center gap-1 p-1">
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
                  </div>

                  <Combobox.Button className="right-0 absolute inset-y-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>

                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options className="z-10 absolute bg-white shadow-lg mt-1 py-1 rounded-md w-full max-h-60 overflow-auto text-sm">
                    {filteredUsers.length === 0 && query !== '' ? (
                      <div className="px-4 py-2 text-gray-700">
                        کاربری پیدا نشد
                      </div>
                    ) : (
                      filteredUsers.map((reg) => (
                        <Combobox.Option
                          key={reg._id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-900'
                            }`
                          }
                          value={reg}
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
                                  <CheckIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
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
            ایجاد لینک
          </button>
        </form>
      </div>

      <ClassLinkTable   courseRegisterations={all}  deleteUser={deleteUser}  />
    </div>
  )
}
