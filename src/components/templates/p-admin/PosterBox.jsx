'use client'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import PosterTable from '@/components/templates/p-admin/PosterTable'
const PosterBox = ({ posters }) => {
  const [posterImg_xl, setPosterImg_xl] = useState(null)
  const [posterImg_lg, setPosterImg_lg] = useState(null)
  const [posterImg_md, setPosterImg_md] = useState(null)
  const [posterImg_sm, setPosterImg_sm] = useState(null)
  const [title, setTitle] = useState('')
  const [all, setAll] = useState(posters)

  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    const res = await fetch('/api/poster')

    if (!res.ok) {
      const text = await res.text()
      console.error('خطای API:', res.status, text)
      return
    }

    const data = await res.json()
    console.log('data member', data)
    setAll(data)
   
  }

  const clickHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('posterImg_xl', posterImg_xl)
    formData.append('posterImg_lg', posterImg_lg)
    formData.append('posterImg_md', posterImg_md)
    formData.append('posterImg_sm', posterImg_sm)
    formData.append('title', title)

    const res = await fetch('/api/poster', {
      method: 'POST',
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'پوستر با موفقیت پست شد',
          icon: 'success',
          buttons: 'ok',
        }).then(() => getAll())
      }
    })
  }

  return (
    <>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <form className="m-auto py-20 rounded-lg w-[90%]">
          <div className="gap-6 grid md:grid-cols-2 mb-6">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                نام تصویر
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="title"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                تصویر پوستر سایز خیلی بزرگ:
              </label>
              <input
                onChange={(e) => setPosterImg_xl(e.target.files[0])}
                type="file"
                id="xl"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                تصویر پوستر سایز بزرگ:
              </label>
              <input
                onChange={(e) => setPosterImg_lg(e.target.files[0])}
                type="file"
                id="lg"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                تصویر پوستر سایز متوسط:
              </label>
              <input
                onChange={(e) => setPosterImg_md(e.target.files[0])}
                type="file"
                id="md"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                تصویر پوستر سایز کوچک:
              </label>
              <input
                onChange={(e) => setPosterImg_sm(e.target.files[0])}
                type="file"
                id="small"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>
          </div>
          <button
            onClick={clickHandler}
            className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 w-full sm:w-auto font-medium text-white text-sm text-center"
          >
            ثبت
          </button>
        </form>

        <PosterTable posters={all} />
      </div>
    </>
  )
}

export default PosterBox
