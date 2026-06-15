'use client'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert'
import CooperationTable from './CooperationTable'



const CooperationBox = ({ cooperations }) => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [img, setImg] = useState(null)
  const [all, setAll]= useState([])


  const getAll=async()=>{
    const res = await fetch('/api/cooperation')
     const data = await res.json()
     setAll(data)
  }

  useEffect(()=>{
    getAll()
  },[])
 




 const deleteUser = async (cooperationId) => {
  const result = await swal({
    title: 'آیا از حذف اطمینان دارید؟',
    icon: 'warning',
    buttons: ["خیر", "بله"]
  });

  if (result) {
    try {
      const res = await fetch('/api/cooperation', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cooperationId })
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
  }
}

const clickHandler=async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('desc', desc)
    formData.append('img', img)


    const res = await fetch ('/api/cooperation', {
        method:'POST',
        body:formData
    })
      if(res.ok){
        swal({
            title:'با موفقیت ثبت شد',
            icon:"success",
            buttons:'ok'
        }).then(()=> getAll())
      }
}


  return (
    <>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <form className="m-auto py-20 rounded-lg w-[90%]">
          <div className="gap-6 grid md:grid-cols-2 mb-6">
            <div>
              <label
                htmlFor="company"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                عنوان
              </label>
              <input
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
                type="text"
                id="company"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                for="phone"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                توضیحات
              </label>
              <input
               value={desc}
              onChange={(e)=>setDesc(e.target.value)}
                type="text"
                id="phone"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>

            <div>
              <label
                for="first_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                اپلود تصویر
              </label>
              <input
              
              onChange={(e)=>setImg(e.target.files[0])}
                type="file"
                id="first_name"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="John"
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

        <CooperationTable cooperations={all} deleteUser={deleteUser}  />
      </div>
    </>
  )
}

export default CooperationBox
