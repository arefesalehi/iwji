'use client'
import React, { useState } from 'react'
import { IoIosSend } from 'react-icons/io'
import swal from 'sweetalert'
const CreateTicket = ({ departments }) => {
  const [title, setTitle] = useState('')
  const [department, setDepartment] = useState('')
  const [body, setBody] = useState('')
  const [file, setFile] = useState('')

  const sendTicket = async () => {
    
     if (!title || !department || !body) {
      alert('لطفاً همه فیلدها را پر کنید')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('department', department)
    formData.append('body', body)
    if (file) formData.append('file', file)

    const res = await fetch('/api/tickets', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    if(res.ok){
      swal({
        title:'تیکت شما با موفقیت ثبت شد',
        icon:'success',
        buttons:'ok'
      })
    }

  }

  return (
    <div className="px-10 text-sm">
      <div className="flex mt-10 mb-3 ml-10 w-full">
        <div className="w-1/2">
          <label htmlFor="" className="font-bold text-gray-600">
            {' '}
            موضوع تیکت
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="موضوع تیکت"
            className="bg-gray-100 m-auto mt-3 pr-2 border-1 border-gray-200 rounded w-[90%] h-[40px]"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="" className="font-bold text-gray-600">
            دپارتمان را انتخاب نمایید :
          </label>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="bg-gray-100 m-auto mt-3 mb-3 pr-2 border-1 border-gray-200 border-solid rounded w-[90%] h-[40px]"
          >
            <option className="bg-white text-black" value={-1}>
              دپارتمان مورد نظر را انتخاب نمایید
            </option>
            {departments.map((department) => {
              return (
                <option
                  key={department._id}
                  className="bg-white text-black"
                  value={department._id}
                >
                  {department.title}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      <div className="mt-3 mb-3 ml-10 w-full">
        <label htmlFor="" className="font-bold text-gray-600">
          محتوای تیکت را وارد نمایید:
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="bg-gray-100 mt-3 pr-2 border-1 border-gray-200 rounded w-[95%] h-[200px]"
        />
      </div>

      <div className="flex flex-col justify-center items-center bg-white mt-3 mb-3 ml-10 pr-2 border-2 border-gray-200 border-dotted rounded w-[95%] h-[120px]">
        <div className="flex flex-col justify-center items-center">
          <p>حداکثر اندازه :6 مگابایت</p>
          <p>فرمت های مجاز: jpg,jpeg, png,jpeg, rar, zip</p>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
      </div>

      <button
        onClick={sendTicket}
        className="flex justify-center items-center bg-[#02693a] p-2 rounded text-white"
      >
        <IoIosSend />
        <p className="mr-1">ارسال تیکت</p>
      </button>
    </div>
  )
}

export default CreateTicket
