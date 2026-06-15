'use client'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowLeftLong } from 'react-icons/fa6'

const SideArticleBox = ({ title }) => {
  const { t, i18n } = useTranslation('article')
  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 mt-20 pb-5 rounded-[10px] w-[90%] h-auto">
        <div
          className={`flex ${
            i18n.language === 'fa' ? 'pr-10' : 'pl-5'
          } items-center bg-red-800  rounded-t-[10px] w-full h-[50px] text-lg`}
        >
          <p className="text-white"> {title}</p>
        </div>

        <div className="flex items-center bg-white hover:bg-red-800 mt-10 rounded-[5px] w-[90%] h-[90px] text-md hover:text-white">
          <span className="flex justify-start items-center">
      
            <div className="w-1/3">
              <Image
                src="/images/Picture2.jpg"
                width={200}
                height={300}
                alt="pic"
                className="mx-2 rounded-lg"
              />
            </div>
            <div className="items-center mx-5 w-2/3 text-sm leading-8">
              <p className="font-bold text-base">معماری چیست ؟</p>
              <p className="text-sm">3 مرداد 1404</p>
            </div>
          </span>
        </div>
      </div>
    </>
  )
}

export default SideArticleBox
