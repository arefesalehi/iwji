'use client'
import React from 'react'
import SideComponent from '@/components/modules/SideComponent'
import SideGallery from '@/components/modules/SideGallery'
import Sidepromote from '@/components/modules/Sidepromote'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Technicalservices = ({ gallery }) => {
  const { t } = useTranslation('technicalservice')
  return (
    <>
      <div className="flex h-auto container">
        <div className="hidden md:block justify-center items-center md:basis-2/5">
          <SideComponent title={t('ourservice')} />
          <Sidepromote />
          <SideGallery gallery={JSON.parse(JSON.stringify(gallery))} />
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
          <h1 className="mt-10 font-bold text-2xl md:text-3xl">
            {' '}
            {t('servicesTitle')}
          </h1>
          <p className="mt-10 leading-[30px]">{t('servicesIntro')}</p>

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

                <ul>
                  <li>{t('ex1')}</li>
                  <li>{t('ex2')}</li>
                  <li> {t('ex3')}</li>
                  <li>{t('ex4')}</li>
                  <li>{t('ex5')}</li>
                  <li> {t('ex6')}</li>
                  <li> {t('ex7')}</li>
                  <li>{t('ex8')}</li>
                </ul>
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
                <ul>
                  <li>{t('fx1')}</li>
                  <li>{t('fx2')}</li>
                  <li>{t('fx3')}</li>
                  <li>{t('fx4')}</li>
                </ul>
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
                <ul>
                  <li>{t('gx1')}</li>
                  <li> {t('gx2')}</li>
                  <li>{t('gx3')}</li>
                  <li>{t('gx4')} </li>
                  <li>{t('gx5')}</li>
                  <li> {t('gx6')}</li>
                  <li> {t('gx7')}</li>
                </ul>
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
                <ul>
                  <li>{t('hx1')}</li>
                  <li>{t('hx2')}</li>
                  <li>{t('hx3')}</li>
                </ul>
              </p>
            </li>
          </ul>

          <div className="flex md:flex-row flex-col">
            <div className="mt-5 md:mt-20 w-full basis-2/5">
              <p className="font-bold text-red-800 leading-[30px]">
                {t('conclusionTitle')}
              </p>
              <p className="pt-5 pl-5 text-justify leading-[30px]">
                {t('conclusionDesc')}
              </p>
            </div>
            <div className="basis-3/5">
              <div className="mt-5 md:mt-20 w-full h-[300px]">
                <Image
                  src="/images/site/ousa-chea-gKUC4TMhOiY-unsplash.jpg"
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
            <p>📧{t('email')}</p>
          </p>
        </div>
      </div>
    </>
  )
}

export default Technicalservices
