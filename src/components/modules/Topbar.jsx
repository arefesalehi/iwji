'use client'

import React from 'react'
import Image from 'next/image'
import { FaLocationDot } from "react-icons/fa6";
import { AiFillPhone } from "react-icons/ai";
import { IoTimeSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const Topbar = () => {

  const {t} = useTranslation('topbar')
  return (
    <div className='flex justify-center items-center bg-gray-200 py-5 w-full h-auto'>
      <div className='md:flex md:flex-row flex-col justify-between items-center h-auto container'>

        
        <div className='flex justify-center md:justify-start items-center md:items-start py-2 md:py-0'>
          <Image alt='logo' src='/images/Untitled-2-2-e1625120043428.png' width='200' height='300' />
        </div>

        <div className='flex'>
          <div className='flex justify-center items-center hover:bg-red-800 ml-2 border border-red-900 border-solid rounded-[10px] w-[52px] h-[60px] text-red-800 hover:text-white transition-all duration-600 ease-in-out' ><FaLocationDot className='w-[25px] h-[25px]' /></div>
          <div className='flex flex-col ml-2 basis-[300px] md:basis-[200px] lg:basis-[300px]'>
            <p className='mb-3 font-bold text-md'>{t('addressTitle')}</p>
            <p className='text-xs lg:text-sm'>{t('addressDesc')}</p>
          </div>
        </div>

        <div className='flex mt-2'>
          <div className='flex justify-center items-center hover:bg-red-800 ml-2 border border-red-900 border-solid rounded-[10px] w-[52px] h-[60px] text-red-800 hover:text-white transition-all duration-600 ease-in-out' ><AiFillPhone className='w-[25px] h-[25px]' /></div>
          <div className='flex flex-col ml-2'>
            <p className='mb-3 font-bold text-md'> {t('phoneTitle')}</p>
            <p className='text-xs lg:text-sm'>{t('phoneDesc')}</p>
          </div>
        </div>

        <div className='flex mt-2'>
          <div className='flex justify-center items-center hover:bg-red-800 ml-2 border border-red-900 border-solid rounded-[10px] w-[52px] h-[60px] text-red-800 hover:text-white transition-all duration-600 ease-in-out' ><IoTimeSharp className='w-[25px] h-[25px]' /></div>
          <div className='flex flex-col ml-2'>
            <p className='mb-3 font-bold text-md'>{t('workingHoursTitle')}  </p>
            <p className='text-xs lg:text-sm'>{t('workingHoursDesc')}   </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Topbar
