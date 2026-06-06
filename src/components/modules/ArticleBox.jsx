'use client'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoMdTime } from 'react-icons/io'

const ArticleBox = ({title , createdAt , _id,publish, creator }) => {
  const {t , i18n} = useTranslation('article')
  return (
    <>
      <div className="relative flex justify-center items-center mt-2 mb-10 rounded-[20px] w-full lg:w-[33%] h-[380px]">
        <div className="top-2 left-[15px] sm:left-[35px] md:left-[55px] lg:left-4 2xl:left-6 z-0 absolute bg-gray-400 rounded-[20px] w-[80%] h-[380px] xl"></div>

        <div className="z-10 relative bg-white mt-10 border border-gray-200 rounded-[20px] w-[82%] h-[380px]">
          <div className="flex justify-center">
            <Image
              src="/images/sad-300x176.jpg"
              width={320}
              height={150}
              alt="pic"
              className="mt-3 rounded-[20px] w-[95%] h-[180px]"
            />
          </div>
          <h1 className="mx-5 my-5 font-semibold text-md"> {title}</h1>
          <div className="flex flex-wrap justify-between ml-5">
            <span className="flex items-center mx-5">
              <IoMdTime className="text-gray-400" />{' '}
              <p className="text-gray-400 text-xs">{new Date(createdAt).toLocaleDateString('fa-ir')}  </p>
            </span>
            <span className="mr-5 text-gray-400 text-xs">
              {' '}
            {t('author')} : {creator?.name || 'نامشخص'}
            </span>
          </div>

          <div className="flex justify-center items-center h-[20%]">
            <Link href={`/articles/${_id}`} className="flex justify-center items-center hover:bg-red-800 mt-20 px-8 py-2 rounded-[10px] text-red-800 hover:text-white text-sm">
                {t('continue')} 
                {i18n.language === 'fa' && <ArrowLeftIcon className='mr-2' /> }

                {i18n.language === 'en' && <ArrowRightIcon className='ml-2' />}

            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleBox
