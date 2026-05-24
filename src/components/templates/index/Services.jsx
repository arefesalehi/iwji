'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaPhoneVolume } from 'react-icons/fa'

const Services = () => {
  const { t } = useTranslation('services')
  return (
    <>
      <div className="relative bg-red-500 w-full h-[500px] text-justify">
        {/* <Image width={800} height={400}
          className='w-full h-full object-cover'
          src='/images/picography-business-man-laptop-wireframes-small-2-768x512.jpg' /> */}

        <div
          className="relative bg-cover bg-center bg-fixed w-full h-[500px]"
          style={{
            backgroundImage:
              "url('/images/russ-ward-18MJRuL4tUE-unsplash.jpg')",
          }}
        ></div>

        {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-500/50 to-red-500/60"></div> */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900/70 to-red-800/70"></div>
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(239,68,68,0.4),_transparent_90%)] bg-gray-500/30 pointer-events-none"></div> */}

        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="absolute inset-0 flex flex-col justify-center items-center text-white"
        >
          <h2 className="mb-10 font-bold text-white text-xl md:text-3xl">
            {' '}
            {t('servicesTitle')}{' '}
          </h2>
          <p className="text-base md:text-lg container">
        {t('servicesDesc1')}
   
            <span>
             
              {t('servicesDesc2')}
            </span>
            <span>
         
            {t('servicesDesc3')}
            </span>
          </p>
          <button className="flex items-center hover:bg-gray-200 mt-10 px-4 py-3 border border-white border-solid rounded-xl text-white hover:text-red-800 text-xl transition">
             {t('servicesButton')} <FaPhoneVolume />
          </button>
        </div>
      </div>
    </>
  )
}

export default Services
