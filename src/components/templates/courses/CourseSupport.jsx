'use client'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CourseSupport = () => {
  const {t, i18n} = useTranslation('coursesupport')
  return (
    <>
      <h1 className="flex mt-8">
        <div className="border-red-800 border-b-8 rounded-[10px] w-[40px] h-[15px]"></div>
        <p className={` ${i18n.language ==='fa' ? "mr-3" :"ml-3"} text-xl`}>  {t('title')} </p>
      </h1>
      <div className="bg-white [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] mt-10 mb-20 p-10 rounded-[20px] w-full h-auto text-md text-justify">
        <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
         {t('supportLearningTitle')}
        </h1>
        <p className="py-2">
         {t('supportLearningText')}
        </p>

        <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
          {t('whichSupportTitle')}
        </h1>

        <ul>
          <li>- {t('supportList1')}</li>
          <li>- {t('supportList2')}</li>
          <li>- {t('supportList3')}</li>
          <li>- {t('supportList4')}</li>

        </ul>
        <Image src='/images/Capture.PNG' width={800} height={200}  className='' />

      </div>
    </>
  )
}

export default CourseSupport
