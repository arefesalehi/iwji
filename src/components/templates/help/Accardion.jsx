'use client'
import React  from 'react'
import Image from 'next/image'

import AccardionBox from './AccardionBox'
import { useTranslation } from 'react-i18next'
import BreadCrumb from '@/components/modules/BreadCrumb'
const Accardion = ({ Accardions }) => {
const {t} =useTranslation('help')
  return (
    <>
         <BreadCrumb title={t('faqTitle')}/>
          <div className='flex pt-10 container'>
            <div className='pr-14 w-1/2'>
              <Image src='/images/Capture15.PNG' width={500} height={500} alt='pic' />
            </div>
            <div className='w-1/2'>
              <Image src='/images/welder-help.PNG' width={500} height={300} alt='pic' />
            </div>
    
          </div>
    
      <div className="mb-20 px-2 sm:px-10 xl:px-20 container">
        <h1 className="text-xl">
        {t('registerText')}
          <span className="font-bold text-red-800">{t('here')}</span>{t('click')}
        </h1>
        <h1 className="mt-5 mb-10 font-bold text-red-800 text-xl">
         {t('faqTitle')}
        </h1>

        {Accardions.map((accardion) => {
          return <AccardionBox key={accardion._id} {...accardion} />
        })}
      </div>
    </>
  )
}

export default Accardion
