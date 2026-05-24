'use client'
import React from 'react'
import { MdPerson } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

const SideConsulting = () => {
    const { t , i18n} = useTranslation('consultingservice')
  return (
    <>
      <div className="invisible md:visible flex flex-col items-center bg-gray-100 mt-20 mb-20 pb-5 rounded-[10px] w-[90%] h-auto">
        <div className={`flex ${i18n.language==='fa' ? "pr-10" :"pl-5"} items-center bg-red-800  rounded-t-[10px] w-full h-[50px] text-2xl`}>
          <p className="text-white text-base lg:text-lg"> {t('consulttitle')}</p>
        </div>

        <div className="pt-10 w-[80%]">
          <div className="">
            <div className="w-full">
              <label
                for="input-group-1"
                className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"
              >
              {t('name')}
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 flex items-center ps-3.5 pointer-events-none start-0">
               
                  <MdPerson className="text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  id="input-group-1"
                  className="block bg-white dark:bg-gray-700 p-2.5 ps-10 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                
                />
              </div>
            </div>
          </div>

          <div className="">
            <div className="w-full">
              <label
                for="input-group-1"
                className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"
              >
               {t('phone')}
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 flex items-center ps-3.5 pointer-events-none start-0">
        

                  <AiFillPhone className="text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="Number"
                  id="input-group-1"
                  className="block bg-white dark:bg-gray-700 p-2.5 ps-10 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
          
                />
              </div>
            </div>

            <div className="w-full">
              <label
                for="input-group-1"
                className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"
              >
                {t('email2')}
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 flex items-center ps-3.5 pointer-events-none start-0">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="input-group-1"
                  className="block bg-white dark:bg-gray-700 p-2.5 ps-10 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <label
              for="input-group-1"
              className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"
            >
             {t('comment')}
            </label>
            <textarea className="bg-white border border-gray-300 rounded-[10px] w-full h-[200px]" />
          </div>

          <button className="bg-red-800 px-5 py-3 rounded-[10px] text-white">
            {t('requestconsult')}
          </button>
        </div>
      </div>
    </>
  )
}

export default SideConsulting
