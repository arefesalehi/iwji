'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { i18n } from 'next-i18next'
const Automotive = () => {
  const { t , i18n } = useTranslation('automotive')
  return (
    <>
      <div className="container">
        <h1 className="mt-10 font-bold text-2xl md:text-3xl">
          {' '}
          {t('pageTitle')}{' '}
        </h1>
        <p className="mt-10 text-justify leading-[30px]">{t('intro')}</p>

        <div className="flex lg:flex-row flex-col">
          <div className="md:mt-5 lg:mt-20 w-full basis-1/2">
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
                src="/images/site/139510131357004891557383.jpg"
                className="rounded-[30px] w-full h-[350px]"
                width={800}
                height={400}
                alt="pic"
              />
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col">
          <div className="basis-1/2">
            <div className="mt-20 w-full h-[400px]">
              <Image
                src="/images/site/pereskari.png"
                className="rounded-[30px] w-full h-[350px]"
                width={800}
                height={400}
                alt="pic"
              />
            </div>
          </div>
          <div className="md:mt-1 lg:mt-20 mb-5 w-full basis-1/2">
            <p className={`font-bold text-red-800 leading-[30px] ${i18n.language==='fa'?"" :"pl-5"}`}>
              {t('section2Title')}
            </p>
            <p className={`  text-justify leading-[30px] ${i18n.language==='fa'?"sm:pr-5 pr-0" :"sm:pl-5"}`}>
              {t('section2Desc')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Automotive
