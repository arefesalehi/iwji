'use client'
import { ArrowLeftIcon, ArrowRightIcon, HomeIcon } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'
import MainSectionBox from './MainSectionBox'
import { FaDatabase } from 'react-icons/fa6'
import { MdKeyboardArrowRight, MdOutlineSupportAgent } from 'react-icons/md'
import { IoDocuments } from 'react-icons/io5'
import { RiArticleFill } from 'react-icons/ri'
import { MdSource } from 'react-icons/md'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'


const MainSection = () => {
  const { t , i18n } = useTranslation('mainsection')
  return (
    <>
      <div className="bg-gray-100 w-full h-[1950px] md:h-[840px] lg:h-[730px]">
        <div className="relative h-[500px] container">
          <div className="top-[-100px] absolute flex flex-wrap justify-between w-full h-[250px] md:text-sm">
            <MainSectionBox
              title={t('accessResources')}
              desc={t('accessResourcesDesc')}
              img={<MdSource className="w-[35px] h-[35px]" />}
            />
            <MainSectionBox
              title={t('accessTechnology')}
              desc={t('accessTechnologyDesc')}
              img={<IoDocuments className="w-[35px] h-[35px]" />}
            />
            <MainSectionBox
              title={t('technicalSupport')}
              desc={t('technicalSupportDesc')}
              img={<MdOutlineSupportAgent className="w-[35px] h-[35px]" />}
            />
            <MainSectionBox
              title={t('accessDatabase')}
              desc={t('accessDatabaseDesc')}
              img={<FaDatabase className="w-[35px] h-[35px]" />}
            />
          </div>

          <div className="flex md:flex-row flex-col pt-[800px] md:pt-64 lg:pt-0 h-[2000px]">
            <div
              data-aos="fade-left"
              data-aos-duration="2000"
              className="flex flex-col pt-48 basis-1/2"
            >
              <h1 className="mb-5 font-bold text-red-800 md:text-xl lg:text-2xl">
                {t('aboutUs')}
              </h1>
              <p className={` ${i18n?.language === 'fa' ? "pl-5" :"pr-5"}  mb-8  md:text-sm lg:text-base text-justify`} >
             

                {t('aboutUsDesc')}
              </p>
              <Link
                href="/about-us"
                className="flex items-center bg-red-800 p-3 rounded-[10px] w-[180px] text-white md:text-sm lg:text-sm"
              >
                {t('readMore')}
                {i18n?.language === 'fa' ? (
                  <ArrowLeftIcon className="mr-2" />
                ) : (
                  <ArrowRightIcon className="ml-2" />
                )}
              </Link>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="mt-10 md:mt-50 rounded-[30px] w-full h-[370px] overflow-hidden basis-1/2"
            >
              <Image
                width={800}
                height={500}
                src="/images/rob-lambert-9Q_pLLP_jmA-unsplash.jpg"
                className="rounded-[30px]"
                alt="pic"
              />
            </div>

            <div className="right-[-560px] bottom-[-180px] absolute flex justify-center items-center w-full overflow-hidden leading-[0]">
              <svg
                className="block relative w-full h-[30px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 800 100"
                preserveAspectRatio="none"
              >
                <polygon
                  fill="oklch(96.7% .003 264.542)"
                  points="0,0 100,0 50,100"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainSection
