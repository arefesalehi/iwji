'use client'

import Link from 'next/link'
import React from 'react'
import swal from 'sweetalert'

const SideBar = () => {

 
const logout = () => {
  swal({
    title: 'ایا از خروج اطمینان دارید ؟',
    icon: 'warning',
    buttons: ['خیر', 'بله'],
  }).then(async (result) => {
    if (result) {
      const res = await fetch('/api/auth/signout', {
        method: 'POST',
      })
      if (res.status === 200) {
        swal({
          title: 'شما با موفقیت از اکانت خارج شدید',
          icon: 'sucees',
          buttons: 'ok',
        }).then(() => {
          router.replace('/')
        })
      }
    }
  })
}


  return (
    <>

    


      <div className="bg-white m-auto mt-20 pt-5 pb-3 rounded-[20px] w-full md:w-[90%] h-auto overflow-hidden text-sm lg:text-base">
        <ul className='flex md:flex-col justify-center md:justify-start items-center md:items-start text-xs md:text-base'>
         <div className='bg-red-800 mb-3 p-4 border-gray-300 rounded-tl-[30px] rounded-bl-[90px] w-[80%] text-white'>
             <Link href='/user-account' 
             className="">
            پیشخوان
          </Link>
         </div>

          <div className='hover:bg-red-800 mb-3 p-4 border-gray-300 border-r-6 hover:rounded-tl-[30px] hover:rounded-bl-[90px] w-[80%] hover:text-white'>
           <div>
             <Link
              href="/user-account/myCourses"
              // className="z-0 absolute inset-0 transition-transform translate-x-full group-hover:translate-x-0 duration-500 ease-in-out"
            >
              دوره های من
            </Link>
           </div>
          </div>

          <div className='hover:bg-red-800 mb-3 p-4 border-gray-300 border-r-6 hover:rounded-tl-[30px] hover:rounded-bl-[90px] w-[80%] hover:text-white'>
            {' '}
            <Link
              href="/user-account/transaction"
              className=""
            >
                تراکنش ها
            </Link>
          </div>{' '}

          <div className='hover:bg-red-800 mb-3 p-4 border-gray-300 border-r-6 hover:rounded-tl-[30px] hover:rounded-bl-[90px] w-[80%] hover:text-white'>
            <Link
              href="/user-account/tickets"
            >
              تیکت ها
            </Link>
          </div>

          <div className='hover:bg-red-800 mb-3 p-4 border-gray-300 border-r-6 hover:rounded-tl-[30px] hover:rounded-bl-[90px] w-[80%] hover:text-white'>
            {' '}
            <Link
              href="/user-account/myWebinars"
            >
              وبینارهای من
            </Link>
          </div>

          <div className='hover:bg-red-800 mb-3 p-4 border-gray-300 border-r-6 hover:rounded-tl-[30px] hover:rounded-bl-[90px] w-[80%] hover:text-white'>
            {' '}
            <Link
              href="/user-account/IIWmembership"
            >
              {' '}
              عضویت IIW
            </Link>
          </div>
          
           <div className='hover:bg-red-800 mb-3 p-4 border-gray-300 border-r-6 hover:rounded-tl-[30px] hover:rounded-bl-[90px] w-[80%] hover:text-white'>
            {' '}
            <Link
              href="/user-account/accountDetail"
            >
              {' '}
            جزئیات حساب
            </Link>
          </div>
           <div onClick={logout} className='hover:bg-red-800 mb-3 p-4 border-gray-300 border-r-6 hover:rounded-tl-[30px] hover:rounded-bl-[90px] w-[80%] hover:text-white'>
            {' '}
            <Link
              href=""
            >
              {' '}
             خروج
            </Link>
          </div>
        </ul>
      </div>
    </>
  )
}

export default SideBar
