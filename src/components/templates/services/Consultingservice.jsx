'use client'
import Image from 'next/image'
import React from 'react'
import SideComponent from '@/components/modules/SideComponent'
import Sidepromote from '@/components/modules/Sidepromote'
import SideConsulting from '@/components/modules/SideConsulting'
import { useTranslation } from 'react-i18next'

const Consultingservice = () => {
  const { t } = useTranslation('consultingservice')
  return (
    <>
      <div className="flex h-auto container">
        <div className="hidden md:block justify-center items-center md:basis-2/5">
          <SideComponent title={t('ourservice')} />
          <Sidepromote />

          <SideConsulting />
        </div>

        <div className="w-full md:basis-4/5">
          <div className="mt-20 w-full h-[450px]">
            <Image
              src="/images/site/MIG, TIG ,OAW and Arc Welding.jpg"
              className="rounded-[30px] w-full h-[450px]"
              width={800}
              height={200}
              alt="pic"
            />
          </div>
          <h1 className="mt-10 font-bold text-2xl md:text-3xl">{t('title')}</h1>
          <p className="mt-10 text-justify leading-[30px]">{t('intro')}</p>

          <div className="justify-center items-center bg-gray-200 mt-5 w-full h-[200px] fex"></div>
          <ul className="mb-5 pt-10 text-md text-justify">
            <li>
              <p className="font-bold text-red-800 leading-[30px]">
                {t('li1Title')}
              </p>
            </li>
            <li>{t('li1Desc')}</li>
            <li>
              <p className="pt-5 font-bold text-red-800 leading-[30px]">
                {t('li2Title')}
              </p>
            </li>

            <li>
              <p className="pt-5 leading-[30px]">{t('li2Desc')}</p>
            </li>

            <li>
              <p className="pt-5 font-bold text-red-800 leading-[30px]">
                {t('li3Title')}
              </p>
            </li>

            <li>
              <p className="pt-5 leading-[30px]">{t('li3Desc')}</p>
            </li>

            <li>
              <p className="pt-5 font-bold text-red-800 leading-[30px]">
                {t('li4Title')}
              </p>
            </li>

            <li>
              <p className="pt-5 leading-[30px]">{t('li4Desc')}</p>
            </li>
          </ul>

     
        </div>
      </div>
    </>
  )
}

export default Consultingservice
