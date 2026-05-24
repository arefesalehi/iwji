'use client'
import React from 'react'
import { useState } from 'react'
const AccountDetail = ({ user }) => {
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState(user.password)
  return (
    <>
      <div className="px-10 text-gray-600 text-xs">
        <div className="flex w-full">
          <div className="m-2 w-1/2">
            <div className="mb-5">
              <label>
                <strong className="mt-2">نام :</strong>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="mt-2 pr-3 border border-gray-300 rounded-[5px] outline-none w-full h-[45px]"
              />
            </div>
          </div>
          <div className="m-2 w-1/2">
            <div className="mb-3">
              <label>
                <strong className="mt-2 mb-2">ایمیل :</strong>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-2 pr-3 border border-gray-300 rounded-[5px] outline-none w-full h-[45px]"
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label>
            <strong className="mt-2 mr-2 mb-2"> تلفن :</strong>
          </label>
          <input
            value={[phone]}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            className="m-2 pr-3 border border-gray-300 rounded-[5px] outline-none w-full h-[45px]"
          />
          <p className="p-3">
            به این ترتیب نام شما در بخش حساب کاربری و نقد و بررسی ها نمایش داده
            می شود
          </p>
        </div>

        <h1 className="mt-10 mb-10 font-bold text-xl">تغییر کلمه عبور</h1>

        <div className="mb-3">
          <label>
            <strong className="mt-2 mb-2">
              {' '}
              کلمه عبور پیشین (در صورتی که قصد تغییر ندارید خالی بگذارید) :
            </strong>
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            className="mt-2 pr-3 border border-gray-300 rounded-[5px] outline-none w-full h-[45px]"
          />
        </div>

        <div className="mb-3">
          <label>
            <strong className="mt-2 mb-2">
              {' '}
              کلمه عبور جدید (در صورتی که قصد تغییر ندارید خالی بگذارید) :
            </strong>
          </label>
          <input
            type="text"
            className="mt-2 pr-3 border border-gray-300 rounded-[5px] outline-none w-full h-[45px]"
          />
        </div>

        <div className="mb-3">
          <label>
            <strong className="mt-2 mb-2"> تکرار کلمه عبور :</strong>
          </label>
          <input
            type="text"
            className="mt-2 pr-3 border border-gray-300 rounded-[5px] outline-none w-full h-[45px]"
          />

          <button
            type="submit"
            className="bg-[#02693a] mt-10 px-10 rounded-[5px] h-[50px] text-white"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </>
  )
}

export default AccountDetail
