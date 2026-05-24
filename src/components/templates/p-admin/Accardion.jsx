'use client'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import AccardionTable from '@/components/templates/p-admin/AccardionTable'
const Accardion = ({ items }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [all, setAll] = useState([])

  const getAll = async () => {
    const res = await fetch('/api/accardion')
    const data = await res.json()
    setAll(data)
  }
  useEffect(() => {
    getAll()
  }, [])

  const clickHandler = async (e) => {
    e.preventDefault()

    const newAcardion = {
      question,
      answer,
    }

    const res = await fetch('/api/accardion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAcardion),
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'سوال و جواب جدید با موفقیت ثبت شد',
          icon: 'success',
          buttons: 'ok',
        }).then(()=>{getAll()})
      }
    })
  }

  
   const deleteAccardion = async (accardionId) => {
    const result = await swal({
      title: 'آیا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ["خیر", "بله"]
    });
  
    if (result) {
      try {
        const res = await fetch('/api/accardion', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: accardionId })
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
    }}

  return (
    <>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <form className="m-auto py-20 rounded-lg w-[90%]">
          <div className="gap-6 grid md:grid-cols-2 mb-6">
            <div>
              <label
                for="first_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                سوال
              </label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                type="text"
                id="first_name"
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
                پاسخ
              </label>
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
                id="last_name"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="Doe"
                required
              />
            </div>
          </div>
          <button
            onClick={clickHandler}
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 px-5 py-2.5 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 w-full sm:w-auto font-medium text-white text-sm text-center"
          >
            ثبت
          </button>
        </form>

        <AccardionTable items={all} deleteAccardion={deleteAccardion} />
      </div>
    </>
  )
}

export default Accardion
