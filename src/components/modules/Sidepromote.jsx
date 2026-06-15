'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaPhoneVolume } from 'react-icons/fa6'

const Sidepromote = () => {
  const { t } = useTranslation('certificates')
  return (
    <>
      <div className="invisible md:visible relative flex flex-col items-center bg-gray-100 mt-10 pb-5 rounded-[10px] w-[90%] h-[500px] overflow-hidden">
        <div
          className="relative rounded-[10px] w-[90%] h-[500px]"
          style={{
            backgroundImage:
              "url('/images/russ-ward-18MJRuL4tUE-unsplash.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* لایه قرمز نیمه شفاف */}
          <div className="absolute inset-0 flex flex-col justify-start items-center bg-red-800 opacity-70 rounded-[10px]">
            <h1 className="p-8 text-white text-2xl text-center leading-[50px]">
              {' '}
              {t('certificatePage.title')}
            </h1>
            <div className="flex justify-center items-center bg-white rounded-[50%] w-[120px] h-[120px]">
              <FaPhoneVolume className="w-[45px] h-[45px] text-red-800" />
            </div>
            <p className="flex justify-center items-cednter mt-16 text-white text-3xl">
              {t('certificatePage.phone')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidepromote
