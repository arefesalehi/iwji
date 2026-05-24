'use client'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import MembershipTable from './MembershipTable'
const Membership = ({ memberships }) => {
  const [title, setTitle] = useState('')
  const [membershipImg, setMembershipImg] = useState(null)
  const [all, setAll] = useState(memberships)
useEffect(() => {
getAll()
}, [])
  const getAll = async () => {
    const res = await fetch('/api/membership')
    const data = await res.json()
    console.log('data member', data)
    setAll(data)
  }

  const clickHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('membershipImg', membershipImg)

    const res = await fetch('/api/membership', {
      method: 'POST',
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'تصویر با موفقیت اپلود شد',
          icon: 'success',
          buttons: 'ok',
        }).then(() => {
          getAll()
          setTitle('')
          setMembershipImg(null)
        })
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
                نام تصویر:
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                id="first_name"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                اپلود تصویر
              </label>
              <input
                onChange={(e) => setMembershipImg(e.target.files[0])}
                type="file"
                id="last_name"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="Doe"
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

        <MembershipTable memberships={all} />
      </div>
    </>
  )
}

export default Membership
