'use client'
import React from 'react'
import { MdOutlineMapsHomeWork } from 'react-icons/md'
import { SiLevelsdotfyi } from 'react-icons/si'
import { FaReadme } from 'react-icons/fa'
import { MdLanguage } from 'react-icons/md'
import { PiTimerFill } from 'react-icons/pi'
import { FaBook } from 'react-icons/fa'
import { SiSession } from 'react-icons/si'
import { IoTimeSharp } from 'react-icons/io5'
import { IoMdSave } from 'react-icons/io'
import { PiCertificateBold } from 'react-icons/pi'
import { BiSolidCategory } from 'react-icons/bi'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const LeftSide = ({
  level,
  courseType,
  prerequisite,
  courseDuration,
  NumberOfSessions,
  ClassDuration,
  certificate,
  totalHours,
  recordedCourse,
  language,
}) => {
  const { t , i18n} = useTranslation('leftside')
  return (
    <>
      {/*box 1 info course */}
      <div className="justify-center bg-white mx-5 pt-10 rounded-[10px] w-[95%] h-auto">
        <div className="flex justify-center items-center bg-gray-300 m-auto rounded-[10px] w-[80%] h-[50px]">
          <p className="text-gray-700 text-sm lg:text-base">4 {t('studentsCount')}</p>
        </div>

        <div className="py-3 text-xs lg:text-sm">
          <div className="flex items-center px-10 py-5">
            <span className="ml-2">
              <SiLevelsdotfyi />
            </span>
            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}>{t('level')}</span>
            <span> :{level}</span>
          </div>
          <div className="flex items-center px-10 py-3">
            <span className="ml-2">
              <FaReadme />
            </span>
            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}>{t('courseType')}</span>
            <span> :{courseType}</span>
          </div>

          <div className="flex items-center px-10 py-3">
            <span className="ml-2">
              <MdLanguage />
            </span>
            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}>{t('language')}</span>
            <span> :{language}</span>
          </div>

          <div className="flex items-center px-10 py-3">
            <span className="ml-2">
              <PiTimerFill />
            </span>
            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}>{t('courseDuration')}</span>
            <span> :{courseDuration} </span>
          </div>

          <div className="flex items-center px-10 py-3">
            <span className="ml-2">
              <FaBook />
            </span>
            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}> {t('prerequisite')}</span>
            <span> :{prerequisite}</span>
          </div>
          <div className="flex items-center px-10 py-3">
            <span className="ml-2">
              <SiSession />
            </span>

            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}>
              شامل {NumberOfSessions} جلسه {ClassDuration} ساعته کلاس انلاین
            </span>
          </div>

          <div className="flex items-center px-10 py-3">
            <span className="ml-2">
              <IoTimeSharp />
            </span>

            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}> آموزش توسط اساتید {totalHours} </span>
          </div>

          <div className="flex items-center px-10 py-3">
            <span className="ml-2">
              <IoMdSave />
            </span>

            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}>
              {' '}
              {recordedCourse === true ? 'شامل ضبط دوره' : 'عدم ضبط دوره'}{' '}
            </span>
          </div>

          <div className="flex items-center px-10 py-3">
            <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}>
              <PiCertificateBold />
            </span>

            <span>
              {' '}
              {certificate ? t('certificateTrue') : t('certificateFalse')}
            </span>
          </div>
        </div>
      </div>

      {/*box 2 all courses*/}

      <div className="justify-center bg-white mx-5 mt-10 pb-10 rounded-[10px] w-[95%] h-auto text-sm lg:text-base">
        <div className="flex items-center px-10 py-5">
          <span className="ml-2">
            <BiSolidCategory />
          </span>
          {/* <span className="ml-2 font-bold"> دسته :</span> */}
          <span  className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}> {t('newCourses')}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <Link
            href="/courses/international-courses/IWE"
            className="flex justify-center items-center bg-gray-100 rounded-[8px] w-[80%] h-[50px]"
          >
            {t('iwecourse')}
          </Link>
          <Link
            href="/courses/international-courses/IWS"
            className="flex justify-center items-center bg-gray-100 mt-5 rounded-[8px] w-[80%] h-[50px]"
          >
                 {t('iwscourse')}
          </Link>

          <Link
            href="/courses/international-courses/IWT"
            className="flex justify-center items-center bg-gray-100 mt-5 rounded-[8px] w-[80%] h-[50px]"
          >
                 {t('iwtcourse')}
          </Link>
        </div>
      </div>

      {/*box 3 catalogue*/}

      <div className="justify-center bg-white mx-5 mt-10 mb-20 pb-10 rounded-[10px] w-[95%] h-auto text-sm lg:text-base">
        <div className="flex items-center px-10 py-5">
          <span className="ml-2">
            <BiSolidCategory />
          </span>
          {/* <span className="ml-2 font-bold"> دسته :</span> */}
          <span className={`ml-2 ${i18n.language ==='fa' ? "" :"mr-2"} font-bold`}>{t('catalogue')}</span>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center bg-gray-100 w-[80%] h-[50px]">
           {t('downloadCatalogue')}
          </div>
        </div>
      </div>
    </>
  )
}

export default LeftSide
