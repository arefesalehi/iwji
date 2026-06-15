'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Sms from './Sms'
import swal from 'sweetalert'
import { showswal } from '@/utils/helper'
import { validateEmail, validatePassword, validatePhone } from '@/utils/auth'

const Register = ({ ShowLoginForm }) => {
  const [isLoginwithOtp, setIsLoginWithOtp] = useState(false)
  const [isregisterWithPass, setIsRegisterWithPass] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const hideOtp = () => setIsLoginWithOtp(false)

  const passwordHandler = async () => {
    if (!name.trim())
      return showswal('لطفا نام خود را وارد نمایید', 'error', 'تلاش مجدد')
    if (!validatePhone(phone))
      return showswal('شماره تلفن معتبر نمی باشد', 'error', 'تلاش مجدد')
    if (!validateEmail(email))
      return showswal('ایمیل وارد شده معتبر نمی باشد', 'error', 'تلاش مجدد')
    if (!validatePassword(password))
      return showswal('رمز عبور وارد شده قابل حدس است', 'error', 'تلاش مجدد')

    const newUser = { name, email, password, phone }
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })

    if (res.status === 201) {
      swal({
        title: 'ثبت نام با موفقیت انجام شد',
        icon: 'success',
        buttons: 'ورود به لاگین',
      }).then(() => ShowLoginForm())
    } else if (res.status === 422) {
      showswal('کاربری با این اطلاعات از قبل وجود دارد', 'error', 'تلاش مجدد')
    }
  }

  const sendOtp = async () => {
    if (!validatePhone(phone))
      return showswal(
        'شماره تلفن وارد شده معتبر نمی باشد',
        'error',
        'تلاش مجدد',
      )

    const res = await fetch('/api/auth/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, name, email }),
    })

    if (res.status === 201) {
      swal({
        title: 'کد با موفقیت پیامک شد',
        icon: 'success',
        buttons: 'ok',
      }).then(() => {
        setIsLoginWithOtp(true)
      })
    } else if (res.status === 422) {
      swal({
        title: 'شما قبلا با این شماره تلفن ثبت نام کردید',
        icon: 'error',
        buttons: 'لاگین',
      }).then(() => ShowLoginForm())
    }
  }

  return (
    <>
      {!isLoginwithOtp ? (
        <div className="mb-20 px-20 pt-20 w-full h-auto">
          <div className="flex bg-gray-100 rounded-[20px] h-[620px] container">
            <div className="flex flex-col rounded-[20px] h-full basis-1/2">
              <div className="flex flex-col justify-between p-10 h-full text-black">
                <h1 className="flex justify-center items-center mb-5 font-bold text-gray-600 text-xl">
                  فرم ثبت نام
                </h1>

                <form>
                  <div>
                    <label className="block mb-2 font-medium text-gray-600 text-sm">
                      نام و نام خانوادگی
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      className="block dark:bg-gray-700 mb-2 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                      placeholder="username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-600 text-sm">
                      تلفن
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                      className="block bg-gray-50 dark:bg-gray-700 mb-2 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                      placeholder="0912..."
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-gray-600 text-sm">
                      ایمیل
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                      placeholder="username@gmail.com"
                      required
                    />
                  </div>

                  {isregisterWithPass && (
                    <div className="mb-6">
                      <label className="block mb-2 font-medium text-gray-600 text-sm">
                        رمز عبور
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                        placeholder="•••••••••"
                        required
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      isregisterWithPass
                        ? passwordHandler()
                        : setIsRegisterWithPass(true)
                    }}
                    className="block dark:bg-gray-700 mb-6 p-2.5 border border-red-800 rounded-lg w-full text-red-800 dark:text-white text-sm"
                  >
                    ثبت نام با رمز عبور
                  </button>

                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="block bg-white dark:bg-gray-700 p-2.5 border border-red-800 rounded-lg w-full text-red-800 dark:text-white text-sm"
                    >
                      ثبت نام با کد تایید
                    </button>
                  </div>
                </form>

                <p className="flex justify-center items-center mt-2 text-sm">
                  قبلا ثبت نام کرده اید ؟
                  <span onClick={ShowLoginForm} className="pr-2 text-[#2cb571]">
                    ورود به صفحه لاگین
                  </span>
                </p>
              </div>
            </div>

            <div className="h-full basis-1/2">
              <Image
                src="/images/download_11zon.jpg"
                alt="pic"
                width={1000}
                height={600}
                className="p-3 rounded-[30px] h-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <Sms
          hideOtp={hideOtp}
          phone={phone}
          type="register"
          name={name}
          email={email}
        />
      )}
    </>
  )
}

export default Register
