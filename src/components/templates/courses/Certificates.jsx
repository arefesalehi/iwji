'use client'
import React from 'react'
import SideGallery from '@/components/modules/SideGallery'
import Sidepromote from '@/components/modules/Sidepromote'
import Image from 'next/image'
import BreadCrumb from '@/components/modules/BreadCrumb'
import { useTranslation } from 'react-i18next'
const Certificates = ({ gallery, lastMembership, membership }) => {
  const { t } = useTranslation('certificates')
  return (
    <>
      <BreadCrumb
        title={t('certificatePage.breadcrumb')}
        img="/images/site/گواهی.png"
      />
      <div className="flex h-auto container">
        <div className="justify-center items-center mt-10 w-0 md:basis-2/5 basis-0">
          {/* <SideComponent title={t('certificatePage.ourservice')} /> */}
          <Sidepromote />
          <SideGallery gallery={JSON.parse(JSON.stringify(membership))} />
        </div>

        <div className="basis-full md:basis-4/5">
          <div className="m-auto mt-20 w-full md:w-[80%] h-[900px]">
            <Image
              src={lastMembership.membershipImg}
              className="rounded-[30px] w-full h-[900px]"
              width={800}
              height={200}
              alt="pic"
            />
          </div>

          <h1 className="mt-10 font-bold text-3xl"> </h1>
          <p className="mt-10 text-justify leading-[30px]">
            {t('certificatePage.intro1')}
          </p>
          <div className="justify-center items-center bg-gray-200 mt-5 w-full h-[200px] fex"></div>

          <p className="mt-10 text-justify leading-[30px]">
            {t('certificatePage.intro2')}
          </p>

          <h1 className="mt-10 font-bold text-3xl">
            {' '}
            {t('certificatePage.sectionCertificates')}
          </h1>
          <p className="mt-10 mb-5 text-justify leading-[30px]">
            {t('certificatePage.sectionCertificatesDesc')}
          </p>
          <div className="flex md:flex-row flex-col h-auto">
            <div className="basis-3/5">
              <ul className="mb-20 text-justify">
                <li>{t('certificatePage.list.li1')}.</li>
                <li>{t('certificatePage.list.li2')}.</li>
                <li>{t('certificatePage.list.li3')}.</li>
                <li>{t('certificatePage.list.li4')}. </li>
                <li>{t('certificatePage.list.li5')}.</li>
                <li>{t('certificatePage.list.li6')}.</li>
                <li>{t('certificatePage.list.li7')}</li>
                <li> {t('certificatePage.list.li8')}.</li>
                <li>{t('certificatePage.list.li9')}.</li>
              </ul>
            </div>

            <div className="justify-center items-center basis-2/5">
              <div className="m-auto w-[80%] h-[300px]">
                <Image
                  src="/images/dvs-perszert-500x640.png"
                  className="rounded-[30px] w-full h-[300px]"
                  width={800}
                  height={200}
                  alt="pic"
                />
              </div>
            </div>
          </div>

          <h1 className="mt-10 font-bold text-3xl">
            {' '}
            {t('certificatePage.sectionHow')}
          </h1>

          <p className="mt-10 leading-[30px]">
            {t('certificatePage.sectionHowDesc')}
          </p>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="flex justify-center items-center bg-green-700 mb-10 px-5 py-2 rounded-lg text-white"
            >
              {t('certificatePage.validateButton')}
            </button>
          </div>

          <h1 className="mt-10 font-bold text-3xl">
            {' '}
            {t('certificatePage.sampleTitle')}{' '}
          </h1>
          <div className="justify-center items-center basis-full">
            <div className="flex justify-center items-center w-full h-[700px]">
              <Image
                src="/images/jafarikhorami.PNG"
                className="rounded-[30px] w-[450px] h-[600px]"
                width={800}
                height={200}
                alt="pic"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Certificates
