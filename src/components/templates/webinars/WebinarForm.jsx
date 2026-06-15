'use client'
import React from 'react'
import { MdPerson } from 'react-icons/md'
import { AiFillPhone } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import BreadCrumb from '@/components/modules/BreadCrumb'

const WebinarForm = () => {
  const { t, i18n } = useTranslation('webinar')
  return (
    <>
      <BreadCrumb
        title={t('breadcrumb')}
        img="/images/site/dom-fou-YRMWVcdyhmI-unsplash.jpg"
      />
      <div className="mb-20 pt-20 h-[900px] container">
        <div className="flex">
          <div className="w-full">
            <label
              for="input-group-1"
              className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"
            >
              {t('firstName')}
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 flex items-center ps-3.5 pointer-events-none start-0">
                <MdPerson className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 ps-10 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder={t('firstNamePH')}
              />
            </div>
          </div>

          <div
            className={` ${i18n.language === 'fa' ? 'pr-10' : 'pl-10'} w-full`}
          >
            <label
              for="input-group-1"
              className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"
            >
              {t('lastName')}
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 flex items-center ps-3.5 pointer-events-none start-0">
                <MdPerson className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 ps-10 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder={t('lastNamePH')}
              />
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="w-full">
            <label
              for="input-group-1"
              className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"
            >
              {t('phone')}
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 flex items-center ps-3.5 pointer-events-none start-0">
                <AiFillPhone className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="Number"
                id="input-group-1"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 ps-10 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="0912..."
              />
            </div>
          </div>

          <div
            className={` ${i18n.language === 'fa' ? 'pr-10' : 'pl-10'} w-full`}
          >
            <label
              for="input-group-1"
              className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"
            >
              {t('email')}
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 flex items-center ps-3.5 pointer-events-none start-0">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                id="input-group-1"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 ps-10 border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder="info@iwji.ir"
              />
            </div>
          </div>
        </div>

        <button className="bg-red-800 px-5 py-3 rounded-[10px] w-[10%] text-white">
          {t('registerBtn')}
        </button>

        <div className="bg-gray-100 mt-20 mb-20 rounded-[10px] w-full h-[400px]">
          <div className="flex flex-col justify-center items-center bg-green-600 rounded-[10px] h-[100px] text-white">
            <p>{t('successTitle')}</p>
            <p>{t('successDesc')}</p>
          </div>

          <div className="flex flex-col">
            <h1
              className={`mt-10 mb-5 ${
                i18n.language === 'fa' ? 'mr-3' : 'ml-3'
              } text-red-800 text-xl font-bold`}
            >
              {t('infoTitle')}{' '}
            </h1>
            <div className="pt-5 pb-3">
              <span
                className={`bg-gray-200 ${
                  i18n.language === 'fa' ? 'mr-3' : 'ml-3'
                } p-2 w-[100px] font-semibold text-sm`}
              >
                {t('fullName')}
              </span>{' '}
              <span>defgdstg</span>{' '}
            </div>
            <div className="pt-2 pb-3">
              <span
                className={`bg-gray-200 ${
                  i18n.language === 'fa' ? 'mr-3' : 'ml-3'
                } p-2 font-semibold text-sm`}
              >
                {' '}
                {t('phoneLabel')}
              </span>{' '}
              <span>defgdstg</span>
            </div>
            <div className="pt-2 pb-3">
              <span
                className={`bg-gray-200 ${
                  i18n.language === 'fa' ? 'mr-3' : 'ml-3'
                } p-2 font-semibold text-sm`}
              >
                {t('emailLabel')}
              </span>{' '}
              <span>defgdstg</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WebinarForm
