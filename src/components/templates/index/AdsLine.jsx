'use client'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaPhoneVolume } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

const AdsLine = () => {
  const {t}=useTranslation('adsline')
  return (
    <div className="items-center bg-white w-full h-[120px]">
      <div className="flex items-center h-full container">


        <div  className="flex justify-between items-center h-full basis-1/3">
          <div className="flex items-center text-white hover:text-red-800">
            <div className="bg-red-800 hover:bg-white p-5 rounded-[10px]">
              <FaPhoneVolume className="w-[20px] h-[20px]" />
            </div>

            <div className="flex flex-col p-2 text-black">
              <p className="mb-2 font-bold text-md"> {t('phoneNumber')}</p>
              <p className="text-sm">{t('phoneDesc2')}</p>
            </div>
          </div>

          <div className="flex justify-center items-center text-white hover:text-red-800">
            <div className="bg-red-800 hover:bg-white p-5 rounded-[10px]">
              <MdEmail className="w-[22px] h-[22px]" />
            </div>

            <div className="flex flex-col p-2 text-black">
              <p className="mb-2 font-bold text-md"> {t('email')}</p>
              <p className="text-sm">{t('emailDesc')}</p>
            </div>
          </div>
        </div>



        <div data-aos="fade-up" data-aos-duration="1000" className="flex justify-between basis-2/3">
          <Image
            src="/images/https___logosource.ir_wp-content_uploads_2017_01_Amirkabir-e1625125874104.png"
            className="mx-30 h-[90px] basis-1/3"
            width={90}
            height={90}
            alt="pic"
          />
          <Image
            src="/images/1-e1625125849836.png"
            className="h-[90px] basis-1/3"
            width={190}
            height={90}
            alt="pic"
          />
          <Image
            src="/images/2560px-DVS_–_Deutscher_Verband_für_Schweißen_und_verwandte_Verfahren_Logo.svg.png"
            className="mx-30 mt-[30px] h-[30px] basis-1/3"
            width={90}
            height={90}
            alt="pic"
          />
        </div>


      </div>
    </div>
  )
}

export default AdsLine
