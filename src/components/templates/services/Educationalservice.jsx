'use client'
import React from 'react'
import BreadCrumb from '@/components/modules/BreadCrumb'

import SideComponent from '@/components/modules/SideComponent'
import SideGallery from '@/components/modules/SideGallery'
import Sidepromote from '@/components/modules/Sidepromote'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
const Educationalservice = ({ gallery }) => {
  const { t } = useTranslation('educationalservice')
  return (
    <>
      <div className="flex h-auto container">
        <div className="hidden md:block justify-center items-center md:basis-2/5">
          <SideComponent title={t('ourservice')} />
          <Sidepromote />
          <SideGallery gallery={gallery} />
        </div>

        <div className="w-full md:basis-4/5">
          <div className="mt-20 w-full h-[450px]">
            <Image
              src="/images/jessie-greyson-8V0-mUmpxr8-unsplash-1024x768.jpg"
              className="rounded-[30px] w-full h-[450px]"
              width={800}
              height={200}
              alt="pic"
            />
          </div>
          <h1 className="mt-10 font-bold text-3xl"> {t('servicesTitle')}</h1>
          <p className="mt-10 text-justify leading-[30px]">
            {t('servicesIntro')}{' '}
          </p>

          <div className="justify-center items-center bg-gray-200 mt-5 w-full h-[200px] fex"></div>
          <ul className="pt-10 text-md text-justify">
            <li>
              <p className="font-bold text-red-800 leading-[30px]">
               {t('title1')}
              </p>
            </li>
            <li>
              <p className="pt-5 leading-[30px]">
                  {t('desc1')}
              </p>
            </li>
            <li>
              <p className="pt-5 font-bold text-red-800 leading-[30px]">
                    {t('title2')}
              </p>
            </li>

            <li>
              <p className="pt-5 leading-[30px]">
                    {t('desc2')}
              </p>
            </li>

            <li>
              <p className="pt-5 font-bold text-red-800 leading-[30px]">
                     {t('title3')}
              </p>
            </li>

            <li>
              <p className="pt-5 leading-[30px]">
                    {t('desc3')}
              </p>
            </li>

            <li>
              <p className="pt-5 font-bold text-red-800 leading-[30px]">
                   {t('title4')}
              </p>
            </li>

            <li>
              <p className="pt-5 leading-[30px]">
                              {t('desc4')}
              </p>
            </li>
          </ul>

          <div className="flex lg:flex-row flex-col">
            <div className="mt-5 lg:mt-20 w-full basis-2/5">
              <p className="font-bold text-red-800 leading-[30px]">
                    {t('title5')}
              </p>
              <p className="pt-5 pl-5 text-justify leading-[30px]">
                  {t('desc5')}
              </p>
            </div>
            <div className="basis-3/5">
              <div className="mt-5 lg:mt-20 w-full h-[300px]">
                <Image
                  src="/images/jessie-greyson-8V0-mUmpxr8-unsplash-1024x768.jpg"
                  className="rounded-[30px] w-full h-[300px]"
                  width={800}
                  height={200}
                  alt="pic"
                />
              </div>
            </div>
          </div>

          <p className="mb-20 pt-5 leading-[30px]">
          {t('contact')}
            <p>📧 {t('email')}</p>
          </p>
        </div>
      </div>
    </>
  )
}

export default Educationalservice
