  
'use client'
import React, { useState, useEffect, useRef } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import swal from 'sweetalert';
import { FiSearch } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { FaUser } from "react-icons/fa";

const Topbar = ({admin}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const router =  useRouter()

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
          icon: 'success',
          buttons: 'ok',
        }).then(() => {
          router.replace('/')
        })
      }
    }
  })
}
  

  useEffect(() => {
    function handleClickOutside(event) {
      // اگر کلیک جایی غیر از dropdown یا avatar بود، منو رو ببند
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative flex items-center bg-white w-full h-[60px]">
      <div className="flex justify-between items-center w-full">


        <div className="flex items-center mx-3 w-1/2">
          <span ref={dropdownRef}>
            <img
              id="avatarButton"
              type="button"
              className="bg-gray-200 border-2 border-red-800 rounded-full w-10 h-10 cursor-pointer"
              src="/images/6957537_preview.png"
              alt="User dropdown"
              onClick={() => setIsOpen(prev => !prev)}
            />

            {isOpen && (
              <div
                id="userDropdown"
                className="right-0 z-10 absolute bg-white dark:bg-gray-700 shadow-sm mt-2 rounded-lg divide-y divide-gray-100 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-gray-900 dark:text-white text-sm">
                  <div>{admin.name}</div>
                  <div className="font-medium truncate">{admin.email}</div>
                </div>
                <ul
                  className="py-2 text-gray-700 dark:text-gray-200 text-sm"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                    >
                      پروفایل من
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                    >
                      اعلان ها
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 dark:hover:text-white"
                    >
                      جزئیات حساب
                    </a>
                  </li>
                </ul>
                <div className="py-1" onClick={logout}>
                  <a
                    href="#"
                    className="block hover:bg-gray-100 dark:hover:bg-gray-600 px-4 py-2 text-gray-700 dark:hover:text-white dark:text-gray-200 text-sm"
                  >
                    خروج
                  </a>
                </div>
              </div>
            )}
          </span>
          <span className='flex justify-center items-center bg-[#ecf2fe] mx-3 rounded-[50%] w-[40px] h-[40px]'><IoMdNotificationsOutline className='mx-3 w-[20px] h-[20px]'/></span>
        </div>


        <div className="flex justify-between items-center w-1/2">
        <div></div>
        <div className='flex justify-between items-center bg-[#ecf2fe] mx-3 rounded-2xl h-[35px]'>
          <input type="text" className='' />
           <FiSearch className='mx-2'/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
