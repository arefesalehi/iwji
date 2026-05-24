'use client'
import { t } from 'i18next'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
const SideComponent = ({ title }) => {
  const { t } = useTranslation('certificates')
  return (
    <>
      <div className="invisible md:visible flex flex-col items-center bg-gray-100 mt-20 pb-5 rounded-[10px] w-[90%] h-auto">
        <div
          className={`flex ${
            i18n.language === 'fa' ? 'pr-10' : 'pl-5'
          } items-center bg-red-800  rounded-t-[10px] w-full h-[50px] text-2xl`}
        >
          <p className="text-white"> {title}</p>
        </div>

        <div className="flex items-center bg-white hover:bg-red-800 mt-10 rounded-[5px] w-[90%] h-[50px] text-md hover:text-white">
          <span className="flex justify-center items-center">
            <Link
              href="educational-services"
              className={`${i18n.language === 'fa' ? 'mr-3' : 'ml-3'}`}
            >
              {t('certificatePage.educationalservice')}
            </Link>
            {i18n.language === 'fa' ? (
              <FaArrowLeftLong className="mr-5" />
            ) : (
              <FaArrowRightLong className="ml-5" />
            )}
          </span>
        </div>

        <div className="flex items-center bg-white hover:bg-red-800 mt-3 rounded-[5px] w-[90%] h-[50px] text-md hover:text-white">
          <span className="flex justify-center items-center">
            <Link
              href="technical-services"
              className={`${i18n.language === 'fa' ? 'mr-3' : 'ml-3'}`}
            >
              {' '}
              {t('certificatePage.technicalservice')}{' '}
            </Link>
            {i18n.language === 'fa' ? (
              <FaArrowLeftLong className="mr-5" />
            ) : (
              <FaArrowRightLong className="ml-5" />
            )}
          </span>
        </div>
        <div className="flex items-center bg-white hover:bg-red-800 mt-3 rounded-[5px] w-[90%] h-[50px] text-md hover:text-white">
          <span className="flex justify-center items-center">
            <Link
              href="consulting-services"
              className={`${i18n.language === 'fa' ? 'mr-3' : 'ml-3'}`}
            >
              {' '}
              {t('certificatePage.consultingservice')}
            </Link>
            {i18n.language === 'fa' ? (
              <FaArrowLeftLong className="mr-5" />
            ) : (
              <FaArrowRightLong className="ml-5" />
            )}
          </span>
        </div>
      </div>
    </>
  )
}

export default SideComponent
