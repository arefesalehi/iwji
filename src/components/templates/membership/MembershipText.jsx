'use client'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BreadCrumb from '@/components/modules/BreadCrumb'
const MembershipText = () => {
  const { t } = useTranslation('membership')
  return (
    <>
      <BreadCrumb title={t('breadcrumb')} />
      <div className="pb-20 h-auto text-sm md:text-base text-justify container">
        <h1 className="flex justify-center mb-10 font-bold text-red-800 text-lg md:text-xl">
          {t('title')}
        </h1>

        <h1 className="flex justify-center mb-20 font-bold">{t('subtitle')}</h1>

        <div className="flex md:flex-row flex-col w-full">
          <div className="bg-yellow basis-3/5">
            <div>
              <h2 className="mb-3">{t('benefitsTitle')}</h2>
              <ul>
                <li>
                  <p>{t('benefitsList1')}</p>
                </li>
                <li>
                  <p>{t('benefitsList2')}</p>
                </li>
                <li>
                  <p>{t('benefitsList3')}</p>
                </li>
                <li>
                  <p>{t('benefitsList4')}</p>
                </li>
                <li>
                  <p>{t('benefitsList5')}</p>
                </li>
                <li>
                  <p> {t('benefitsList6')} </p>
                </li>
                <li>
                  <p> {t('benefitsList7')}</p>
                </li>
              </ul>
            </div>

            <h1 className="mt-10 text-lg lg:text-xl">{t('fee')}</h1>
          </div>
          <div className="basis-2/5">
            <Image
              src="/images/Capture15.PNG"
              width={600}
              height={300}
              alt="pic"
              className="w-[400px]"
            />
          </div>
        </div>

        <div>
          <h1 className="mt-10 md:mt-0 mb-5 font-bold text-red-800 text-lg">
            {t('registrationTitle')}
          </h1>
          <p className="text-lg">{t('registrationTitle')}</p>
          <ul className='mt-5 md:mt-0'>
            <li>
              <a href="" className=''>{t('registrationSteps1')}</a>
            </li>
            <li>
              <a href="">{t('registrationSteps2')}</a>
            </li>
            <li>
              <a href="">{t('registrationSteps3')}</a>
            </li>
            <li>
              <a href="">{t('registrationSteps4')}</a>
            </li>
          </ul>

          <h2 className="my-5 font-bold text-red-800 text-lg">
            {t('importantNotesTitle')}
          </h2>
          <ul>
            <li>
              <a href="">{t('importantNotes1')}</a>
            </li>
            <li>
              <a href="">{t('importantNotes2')}</a>
            </li>
          </ul>

          <div className="flex gap-3 mt-5">
            <button className="bg-red-800 p-3 rounded-xl text-white text-sm">
              {t('paymentBtn')}
            </button>
            <button className="bg-red-800 p-3 rounded-xl text-white text-sm">
              {' '}
              {t('registerBtn')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MembershipText
