'use client'
import React from 'react'
import LeftSide from './LeftSide'
import Image from 'next/image'
import CourseModule from './CourseModule'
import { useTranslation } from 'react-i18next'
const CourseInfo = ({ course }) => {
  const { t, i18n } = useTranslation('courseinfo')
  return (
    <>
      <h1 className="flex mt-8">
        <div className="border-red-800 border-b-8 rounded-[10px] w-[40px] h-[15px]"></div>
        <p className={` ${i18n.language === 'fa' ? 'mr-3' : 'ml-3'} text-xl`}>
          {' '}
          {t('courseInfo')}
        </p>
      </h1>
      <div className="bg-white [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] mt-10 mb-20 p-10 rounded-[20px] w-full h-auto text-md text-justify">
        {course?.shortName === 'IWE' && (
          <>
            <h1 className="mt-5 mb-2 font-semibold text-gray-900 text-base lg:text-lg">
              🏗️{t('IWEtitle')}
            </h1>

            <p className="py-2">{'IWEdesc1'}</p>
            <p className="py-2">{t('IWEdesc2')}</p>

            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              📚 {t('IWEstructure')}
            </h1>
            <p className="py-2">{t('content')}</p>

            <div className="flex h-[200px]">
              <div className="mt-14 w-full basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('IWEpart1Title')}
                </p>
                <p
                  className={`pt-5  ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('IWEpart1Text')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-10 w-full h-[400px]">
                  <Image
                    src="/images/pic.png"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[200px]">
              <div className="mt-16 w-full basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('IWEpart2Title')}
                </p>
                <p
                  className={`pt-5 ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('IWEpart2Text')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-30 lg:mt-16 w-full h-[400px]">
                  <Image
                    src="/images/max-larochelle-KxJKPddlYOM-unsplash-1.jpg"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[200px]">
              <div className="mt-48 lg:mt-24 basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('IWEpart3Title')}
                </p>
                <p
                  className={`pt-5 ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('IWEpart3Text')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-48 lg:mt-20 w-full h-[400px]">
                  <Image
                    src="/images/pic.png"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center bg-gray-100 mt-[200px] lg:mt-24 pb-10 rounded-[20px] h-auto">
              <p className="mt-10 font-bold text-red-800">
                {' '}
                {t('IWEmodulesTitle')}{' '}
              </p>

              <CourseModule
                type={t('IWEmodule1type')}
                title={t('IWEmodule1title')}
                text={t('IWEmodule1text')}
              />

              <CourseModule
                type={t('IWEmodule2type')}
                title={t('IWEmodule2title')}
                text={t('IWEmodule2text')}
              />
              <CourseModule
                type={t('IWEmodule3type')}
                title={t('IWEmodule3title')}
                text={t('IWEmodule3text')}
              />

              <CourseModule
                type={t('IWEmodule4type')}
                title={t('IWEmodule4title')}
                text={t('IWEmodule4text')}
              />
            </div>
          </>
        )}

        {course?.shortName === 'IWS' && (
          <>
            <h1 className="mt-5 mb-2 font-semibold text-gray-900 text-base lg:text-lg">
              {t('iwsTitle')}
            </h1>

            <p className="py-2">{t('iwsDescription')}</p>

            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('courseStructureTitle')}
            </h1>
            <p className="py-2">{t('courseStructureDesc')}</p>

            <div className="flex h-[260px] md:h-[200px]">
              <div className="mt-14 w-full basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('section1Title')}
                </p>
                <p
                  className={`pt-5  ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('section1Desc')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-10 w-full h-[400px]">
                  <Image
                    src="/images/pic.png"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[200px]">
              <div className="mt-16 w-full basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('section2Title')}
                </p>
                <p
                  className={`pt-5  ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('section2Desc')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-16 w-full h-[400px]">
                  <Image
                    src="/images/max-larochelle-KxJKPddlYOM-unsplash-1.jpg"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[200px]">
              <div className="mt-24 w-full basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('section3Title')}
                </p>
                <p
                  className={`pt-5  ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('section3Desc')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-20 w-full h-[400px]">
                  <Image
                    src="/images/pic.png"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center bg-gray-100 mt-24 pb-10 rounded-[20px] h-auto">
              <p className="mt-10 font-bold text-red-800">
                {' '}
                {t('modulesTitle')}
              </p>

              <CourseModule
                type={t('module1Type')}
                title={t('module1Title')}
                text={t('module1Text')}
              />

              <CourseModule
                type={t('module2Type')}
                title={t('module2Title')}
                text={t('module2Text')}
              />
              <CourseModule
                type={t('module3Type')}
                title={t('module3Title')}
                text={t('module3Text')}
              />

              <CourseModule
                type={t('module4Type')}
                title={t('module4Title')}
                text={t('module4Text')}
              />
            </div>
          </>
        )}

        {course?.shortName === 'IWT' && (
          <>
            <h1 className="mt-5 mb-2 font-semibold text-gray-900 text-base lg:text-lg">
              {t('iwtTitle')}
            </h1>

            <p className="py-2">{t('iwtDescription')}</p>
            <ul>
              <li>- {t('field1')}</li>
              <li> - {t('field2')}</li>
              <li> - {t('field3')}</li>
              <li> - {t('field4')}</li>
              <li> - {t('field5')}</li>
              <li> - {t('field6')}</li>
            </ul>
            <p className="py-2">{t('iwtFieldsDesc')}</p>

            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('courseStructureTitle')}
            </h1>
            <p className="py-2">{t('courseStructureDesc')}</p>

            <div className="flex h-[260px] md:h-[200px]">
              <div className="mt-14 w-full basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('section1Title')}
                </p>
                <p
                  className={`pt-5  ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('section1Desc')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-10 w-full h-[400px]">
                  <Image
                    src="/images/pic.png"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[260px] md:h-[200px]">
              <div className="mt-16 w-full basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('section2Title')}
                </p>
                <p
                  className={`pt-5  ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('section2Desc')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-16 w-full h-[400px]">
                  <Image
                    src="/images/max-larochelle-KxJKPddlYOM-unsplash-1.jpg"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex h-[260px] md:h-[200px]">
              <div className="mt-24 w-full basis-full sm:basis-2/3">
                <p className="font-bold text-red-800 leading-[30px]">
                  {t('section3Title')}
                </p>
                <p
                  className={`pt-5  ${
                    i18n.language === 'fa' ? 'pl-5' : 'pr-5'
                  } text-justify leading-[30px]`}
                >
                  {t('section3Desc')}
                </p>
              </div>
              <div className="basis-0 sm:basis-1/3">
                <div className="mt-20 w-full h-[400px]">
                  <Image
                    src="/images/pic.png"
                    className="rounded-[30px] w-full h-[180px]"
                    width={800}
                    height={400}
                    alt="pic"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center bg-gray-100 mt-24 pb-10 rounded-[20px] h-auto">
              <p className="mt-10 font-bold text-red-800">
                {t('modulesTitle')}
              </p>

              <CourseModule
                type={t('module1Type')}
                title={t('module1Title')}
                text={t('module1Text')}
              />

              <CourseModule
                type={t('module2Type')}
                title={t('module2Title')}
                text={t('module2Text')}
              />
              <CourseModule
                type={t('module3Type')}
                title={t('module3Title')}
                text={t('module3Text')}
              />

              <CourseModule
                type={t('module4Type')}
                title={t('module4Title')}
                text={t('module4Text')}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CourseInfo
