'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import swal from 'sweetalert'
import BreadCrumb from '@/components/modules/BreadCrumb'

const MembershipForm = ({ user, courseRegister }) => {
  const { t } = useTranslation('membership')
  const [code, setCode] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [RegisterData, setRegisterData] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('userId', user._id)
      formData.append(
        'courseId',
        courseRegister ? courseRegister.courseId : null,
      )

      formData.append('code', code)

      const res = await fetch('/api/IIWMembership', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        swal({
          title: 'ثبت‌نام با موفقیت انجام شد',
          icon: 'success',
          buttons: 'ok',
        }).then(() => {
          setIsRegister(true)
          setRegisterData(data.data)
        })
      }
    } catch (err) {
      console.error(err)
      alert('خطا در ارتباط با سرور')
    }
  }

  return (
    <>
      <BreadCrumb title={t('breadcrumb')} />
      <form
        onSubmit={submitHandler}
        className="m-auto py-20 rounded-lg w-[70%]"
      >
        <div className="gap-6 grid md:grid-cols-2 mb-6">
          <div>
            <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">
              {t('nationalId')}
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              type="text"
              className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 rounded-lg w-full text-gray-900 dark:text-white text-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg focus:outline-none w-full sm:w-auto font-medium text-white text-sm"
        >
          {t('register')}
        </button>
      </form>

      {isRegister && RegisterData && (
        <div className="bg-gray-100 m-auto mt-10 mb-20 p-5 rounded-[10px] w-[80%] h-auto">
          <div className="flex flex-col justify-center items-center bg-green-600 rounded-[10px] h-[100px] text-white">
            <p>{t('successTitle')}</p>
            <p>{t('successDesc')}</p>
            <p>{t('successDesc2')}</p>
          </div>
          <h1 className="mt-5 mb-3 font-bold text-red-800 text-xl">
            {t('registeredInfo')}
          </h1>
          <p>
            {t('name')}: {user.name}
          </p>
          <p>
            {t('phone')}: {user.phone}
          </p>
          <p>
            {t('email')}: {user.email}
          </p>
          <p>
            {t('nationalid')}: {RegisterData.code}
          </p>
        </div>
      )}
    </>
  )
}

export default MembershipForm
