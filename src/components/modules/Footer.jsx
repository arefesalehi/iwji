'use client'
import Image from 'next/image'
import React from 'react'
import { IoLogoInstagram, IoLogoLinkedin } from 'react-icons/io'
import { FaTelegramPlane } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'
import Whatsapp from '../templates/index/Whatsapp'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const Footer = () => {
  const { t } = useTranslation('footer')
  return (
    <div className="relative bg-red-500 w-full h-[900px] md:h-[400px]">
      <div
        className="relative bg-cover bg-center bg-fixed w-full h-[900px] md:h-[400px]"
        style={{
          backgroundImage:
            "url('/images/vecteezy_ai-generated-expert-worker-skillfully-welding-with-an-arc_37897833.jpeg')",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-br from-gray-500/40 to-gray-500/30"></div>
      <div className="absolute inset-0 flex flex-col justify-between pt-20 text-white container">
        <div className="flex md:flex-row flex-col justify-between md:text-sm lg:text-base">
          <div className="flex flex-col basis-1/4">
            <h1>
              <Image
                src="/images/Untitled-2-2-e1625120043428.png"
                width={200}
                height={100}
                alt="pic"
              />
            </h1>
            <p className="mt-5 text-md text-justify">{t('desc')}</p>
          </div>

          <div className="flex flex-col">
            <h1 className="mt-8 md:mt-0 font-bold text-red-800 text-xl">
              {' '}
              {t('usefulLinks')}{' '}
            </h1>

            <ul>
              <li className="mt-3">
                <Link href="/"> {t('home')}</Link>
              </li>
              <li className="mt-3">
                <Link href="/about-us"> {t('about')}</Link>
              </li>
              <li className="mt-3">
                <Link href="/services"> {t('services')}</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h1 className="mt-8 md:mt-0 font-bold text-red-800 text-xl">
              {t('quickAccess')}
            </h1>

            <ul>
              <li className="mt-3">
                <Link href="/courses/registerCourse"> {t('registerCourse')}</Link>
              </li>
              <li className="mt-3">
                <Link href="/webinars/webinar-signin"> {t('registerWebinar')} </Link>
              </li>
              <li className="mt-3">
                <Link href=""> {t('courses')} </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h1 className="mt-8 md:mt-0 font-bold text-red-800 text-xl">
              {t('contactUs')}
            </h1>

            <ul>
              <li className="mt-3">
                <Link href="/contact-us"> {t('address')}</Link>
              </li>
              <li className="mt-3">
                <Link href="/about-us/help"> {t('faq')}</Link>
              </li>
              <li className="mt-3">
                <Link href="/gallery"> {t('gallery')}</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-center md:justify-between items-center mb-10 md:mb-0 h-[100px] md:text-sm lg:text-base">
          <div className="mt-10 sm:mt-0 text-center">
            <p>
              {t('rights')}
              <span className="font-bold text-red-800"> IWJI </span>{' '}
              {t('rights2')}{' '}
            </p>
          </div>
          <div className="flex my-3 md:my-0">
            <IoLogoInstagram className="mx-2 w-[25px] h-[25px]" />
            <IoLogoLinkedin className="mx-2 w-[25px] h-[25px]" />
            <FaTelegramPlane className="mx-2 w-[25px] h-[25px]" />
            <FaWhatsapp className="mx-2 w-[25px] h-[25px]" />
          </div>
          <div>
            <p>
              {' '}
              {t('templateBy')}:{' '}
              <span className="text-red-800">{t('arefesalehi')}</span>
            </p>
          </div>
        </div>

        <Whatsapp />
      </div>
    </div>
  )
}

export default Footer
