'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
const Energy = () => {
  const { t } = useTranslation('energy')
  return (
    <>
      <div className="container">
        <h1 className="mt-10 font-bold text-3xl"> {t('pageTitle')} </h1>
        <p className="mt-10 text-justify leading-[30px]">{t('intro')}</p>

        <div className="flex lg:flex-row flex-col">
          <div className="mt-20 w-full basis-1/2">
            <p className="font-bold text-red-800 leading-[30px]"></p>
            <p className={`mb-3  text-justify leading-[30px] ${i18n.language==='fa' ? "pl-5" :"pr-5"}`}>
              {t('hydroCapacity')}
            </p>
          </div>
          <div className="basis-1/2">
            <div className="mt-20 w-full h-[400px]">
              <Image
                src="/images/site/e48b2df3-6e2c-4b9e-881c-4c6048a04eae_1280_733.jpeg"
                className="rounded-[30px] w-full lg:h-[450px] xl:h-[350px]"
                width={800}
                height={600}
                alt="pic"
              />
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col">
          <div className="basis-1/2">
            <div className="mt-[-150px] sm:mt-3 md:mt-20 w-full h-[400px]">
              <Image
                src="/images/site/e371c5cd-0a74-4706-940a-e267c4205389.jpg"
                className="rounded-[30px] w-full h-[200px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[350px]"
                width={800}
                height={400}
                alt="pic"
              />
            </div>
          </div>
          <div className="mt-[-150px] sm:mt-5 md:mt-20 w-full basis-1/2">
            <p className="font-bold text-red-800 leading-[30px]"></p>
            <p className={`mb-3  text-justify leading-[30px] ${i18n.language==='fa' ? "pr-5" :"pl-5"}`}>
              {t('turbineDevelopment')}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Energy
