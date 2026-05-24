'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import swal from 'sweetalert'
import OurteamTable from './OurteamTable'
const OurTeamBox = ({ ourteams }) => {
  const [username, setUsername] = useState('')
  const [position, setPosition] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [img, setImg] = useState(null)
  const [shortDesc, setShortDesc] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [all, setAll] = useState([])

  const getAll = async () => {
    const res = await fetch('/api/ourteam')
    const data = await res.json()
    setAll(data)
  }

  useEffect(() => {
    getAll()
  }, [])

 const deleteUser = async (teamId) => {
  // تایید حذف
  const result = await swal({
    title: 'آیا از حذف اطمینان دارید؟',
    icon: 'warning',
    buttons: ["خیر", "بله"]
  });

  if (result) {
    try {
      const res = await fetch('/api/ourteam', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: teamId })
      });

      if (res.ok) {
        await swal({
          title: 'با موفقیت حذف شد',
          icon: 'success',
          button: 'OK'
        });
        // بروزرسانی جدول
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

  const clickHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('username', username)
    formData.append('phone', phone)
    formData.append('email', email)
    formData.append('shortDesc', shortDesc)
    formData.append('longDesc', longDesc)
    formData.append('img', img)
    formData.append('position', position)

    const res = await fetch('/api/ourteam', {
      method: 'POST',
      body: formData,
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'فرد با موفقیت پست شد',
          icon: 'success',
          buttons: 'ok',
        }).then(()=>getAll())
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
                نام
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                سمت
              </label>
              <input
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                type="text"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                تلفن
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                توضیحات کوتاه
              </label>
              <input
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                type="text"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                ایمیل
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                تصویر :
              </label>
              <input
                onChange={(e) => setImg(e.target.files[0])}
                type="file"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                توضیحات بلند
              </label>
              <textarea
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
                type="text"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
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
        <OurteamTable ourteams={all} deleteUser={deleteUser}  />
      </div>
    </>
  )
}

export default OurTeamBox
