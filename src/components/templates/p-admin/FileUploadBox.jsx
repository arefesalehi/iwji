'use client'

import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'

export default function FileUploadBox({ courseOptions, userOptions }) {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!file || !title || !selectedCourseId || selectedUserIds.length === 0) {
      setMessage('لطفاً تمام فیلدها را پر کنید')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('courseId', selectedCourseId)
    formData.append('userIds', JSON.stringify(selectedUserIds))

    try {
      const res = await fetch('/api/coursefiles', {
        method: 'POST',
        body: formData,
      })

      const result = await res.json()

      if (res.ok) {
        setMessage('فایل با موفقیت آپلود شد!')
        setTitle('')
        setFile(null)
        setSelectedCourseId('')
        setSelectedUserIds([])
      } else {
        setMessage(`خطا: ${result.message || 'خطا در آپلود فایل'}`)
      }
    } catch (err) {
      setMessage('خطا در ارتباط با سرور')
      console.error('Network error:', err)
    }
  }

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded max-w-lg">
      <h2 className="mb-4 font-bold text-xl">آپلود فایل دوره</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.includes('موفقیت') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">عنوان فایل</label>
          <input
            type="text"
            className="p-2 border rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1">فایل</label>
          <input
            type="file"
            className="p-2 border rounded w-full"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        <div>
          <label className="block mb-1">دوره مربوطه</label>
          <select
            className="p-2 border rounded w-full"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            required
          >
            <option value="">انتخاب دوره</option>
            {courseOptions.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">کاربران مجاز</label>
          <Combobox
            value={selectedUserIds}
            onChange={setSelectedUserIds}
            multiple
          >
            <div className="relative mt-1">
              <div className="relative bg-white shadow-md border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 w-full overflow-hidden sm:text-sm text-left cursor-default">
                <div className="flex flex-wrap items-center gap-1 p-1">
                  {selectedUserIds.map((userId) => {
                    const user = userOptions.find((u) => u._id === userId)
                    return (
                      <span
                        key={userId}
                        className="flex items-center bg-blue-100 px-2 py-0.5 rounded text-blue-800 text-sm"
                      >
                        {user?.firstName} {user?.lastName}
                        <button
                          type="button"
                          className="ml-1 text-red-500"
                          onClick={() =>
                            setSelectedUserIds(
                              selectedUserIds.filter((id) => id !== userId),
                            )
                          }
                        >
                          ×
                        </button>
                      </span>
                    )
                  })}
                  <Combobox.Input
                    className="flex-1 p-1 border-none focus:ring-0 text-sm"
                    placeholder="جستجو کاربران..."
                    displayValue={() => ''}
                    onChange={() => {}}
                  />
                </div>
                <Combobox.Button className="right-0 absolute inset-y-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>

              <Combobox.Options className="z-10 absolute bg-white ring-opacity-5 shadow-lg mt-1 py-1 rounded-md focus:outline-none ring-1 ring-black w-full max-h-60 overflow-auto sm:text-sm">
                {userOptions.map((user) => (
                  <Combobox.Option
                    key={user._id}
                    value={user._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {user.firstName} {user.lastName} ({user.email})
                        </span>
                        {selected && (
                          <span className="left-0 absolute inset-y-0 flex items-center pl-3 text-blue-600">
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full text-white"
        >
          آپلود فایل
        </button>
      </form>
    </div>
  )
}
