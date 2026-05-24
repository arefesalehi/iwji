'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Sms from './Sms'
import swal from 'sweetalert'
import { showswal } from '@/utils/helper'
import { validateEmail, validatePassword, validatePhone } from '@/utils/auth'
import { useRouter } from 'next/navigation'

const Login = ({ ShowRegisterForm }) => {
  const [isLoginwithOtp, setIsLoginWithOtp] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const router = useRouter()

  const hideOtp = () => setIsLoginWithOtp(false)

  const signin = async (e) => {
    e.preventDefault()
    if (!identifier) return showswal('لطفا ایمیل یا شماره همراه را وارد نمایید', 'error', 'تلاش مجدد')
    if (!password) return showswal('لطفا رمزعبور را وارد نمایید', 'error', 'تلاش مجدد')

    const isValidEmail = validateEmail(identifier)
    const isValidPhone = validatePhone(identifier)
    if (!isValidEmail && !isValidPhone) return showswal('ایمیل یا شماره تلفن معتبر نمی باشد', 'error', 'تلاش مجدد')
    if (!validatePassword(password)) return showswal('رمز عبور معتبر نمی باشد', 'error', 'تلاش مجدد')

    const loginUser = { email: identifier, password }
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginUser),
    })

    const data = await res.json()
    if (res.status === 200) {
      swal({ title: 'شما با موفقیت وارد شدید', icon: 'success', buttons: 'ورود به پنل کاربری' })
        .then(() => router.replace('/user-account'))
    } else if (res.status === 419) {
      return showswal('ایمیل یا رمز عبور معتبر نمی باشد', 'error', 'تلاش مجدد')
    } else if (res.status === 422 || res.status === 401) {
      return showswal('کاربری با این مشخصات یافت نشد', 'error', 'تلاش مجدد')
    }
  }

  const sendOtp = async () => {
    if (!validatePhone(identifier)) return showswal('شماره تلفن وارد شده معتبر نمی باشد', 'error', 'تلاش مجدد')

    const res = await fetch('/api/auth/sms/loginsend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: identifier }),
    })

    if (res.status === 201) {
      swal({ title: 'کد با موفقیت پیامک شد', icon: 'success', buttons: 'ok' })
        .then(() => {
          setPhone(identifier)
          setIsLoginWithOtp(true)
        })
    } else {
      const data = await res.json().catch(() => ({}))
      showswal(data.message || 'خطا در ارسال کد', 'error', 'تلاش مجدد')
    }
  }

  return (
    <>
      {!isLoginwithOtp ? (
        <div className="px-1 sm:px-20 pt-20 w-full h-[800px]">
          <div className="flex bg-gray-100 rounded-[20px] h-auto container">
            <div className="h-full basis-full lg:basis-1/2">
              <div className="flex flex-col justify-between p-16 h-full text-white">
                <h1 className="flex justify-center items-center mb-5 font-bold text-gray-600 text-xl">
                  فرم ورود
                </h1>

                <form className="mt-5">
                  <div className="gap-6 md:grid-cols-2 mb-6">
                    <div>
                      <label htmlFor="identifier" className="block mb-2 font-medium text-gray-600 dark:text-white text-sm">
                        ایمیل/شماره همراه
                      </label>
                      <input
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        type="text"
                        id="identifier"
                        className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                        placeholder="Email or Phone"
                        required
                      />
                    </div>

                    <div className="mt-3 mb-6">
                      <label htmlFor="password" className="block mb-2 font-medium text-gray-600 dark:text-white text-sm">
                        رمز عبور
                      </label>
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                        placeholder="•••••••••"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={sendOtp}
                    className="block bg-green-300 dark:bg-gray-700 mt-16 mb-6 p-2.5 border border-green-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-white dark:text-white text-sm dark:placeholder-gray-400"
                  >
                    ورود با کد تایید
                  </button>

                  <div className="mb-6">
                    <button
                      type="submit"
                      onClick={signin}
                      className="block bg-green-300 dark:bg-green-800 p-2.5 border border-green-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-white dark:text-white text-sm dark:placeholder-gray-400"
                    >
                      ورود
                    </button>
                  </div>
                </form>

                <p className="block sm:flex justify-center items-center mt-10 text-gray-600 text-sm">
                  رمز عبور را فراموش کرده اید؟
                </p>
                <p className="block sm:flex justify-center items-center mt-3 text-gray-600 text-sm">
                  حساب کاربری ندارید؟{' '}
                  <Link href="" onClick={ShowRegisterForm} className="pr-2 text-[#2cb571]">
                    ورود به صفحه ثبت نام
                  </Link>
                </p>
              </div>
            </div>

            <div className="hidden lg:block h-[620px] basis-1/2">
              <Image
                src="/images/welder-help.PNG"
                alt=""
                width={1000}
                height={600}
                className="p-3 rounded-[30px] h-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <Sms hideOtp={hideOtp} phone={phone} type="login" />
      )}
    </>
  )
}

export default Login
