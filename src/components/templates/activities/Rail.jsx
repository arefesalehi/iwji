'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Rail = () => {
  const { t , i18n } = useTranslation('rail')
  return (

    <>
      <div className="container">
        <h1 className="mt-10 font-bold text-2xl md:text-3xl">
          {' '}
          {t('pageTitle')}{' '}
        </h1>
        <p className="mt-10 text-justify leading-[30px]">{t('intro')}</p>

        <div className="flex md:flex-row flex-col">
          <div className="md:mt-20 sm:pt-5 w-full basis-1/2">
            <p className="font-bold text-red-800 leading-[30px]">
              {t('section1Title')}
            </p>
            <p className={`  text-justify leading-[30px] ${i18n.language==='fa'?"sm:pl-5 pr-0" :"sm:pr-5"}`}>
              {t('section1Desc')}
            </p>
          </div>
          <div className="basis-1/2">
            <div className="mt-20 w-full h-[400px]">
              <Image
                src="/images/site/Iran-Railway-Map-medium-quality2-tir98-1536x945.jpg"
                className="rounded-[30px] w-full h-[350px]"
                width={800}
                height={400}
                alt="pic"
              />
            </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col">
          <div className="basis-1/2">
            <div className="mt-20 w-full h-[400px]">
              <Image
                src="/images/site/49062c82-ffed-4c2d-ac63-a5fb92662769_1280_733.jpeg"
                className="rounded-[30px] w-full h-[350px]"
                width={800}
                height={400}
                alt="pic"
              />
            </div>
          </div>
          <div className="sm:mt-3 md:mt-20 mb-5 w-full basis-1/2">
            <p className={`font-bold text-red-800 leading-[30px] ${i18n.language==='fa'?"pr-5" :"pl-5"}`}>
              {t('section2Title')}
            </p>
            <p className={`  text-justify leading-[30px] ${i18n.language==='fa'? " sm:pr-5 pr-0" :"sm:pl-5"}`}>
              {t('section2Desc')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Rail
