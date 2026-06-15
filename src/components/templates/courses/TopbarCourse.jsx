'use client'

import React, {  useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { IoMdInformationCircle } from 'react-icons/io'
import { BsCalendarDateFill } from 'react-icons/bs'
import { MdAccessTimeFilled } from 'react-icons/md'
import { AiFillEuroCircle } from 'react-icons/ai'
import Image from 'next/image'
import CourseInfo from './CourseInfo'
import CourseDetail from './CourseDetail'
import CourseSupport from './CourseSupport'
import CourseComment from './CourseComment'
import LeftSide from './LeftSide'
import { RiInfoCardLine } from 'react-icons/ri'
import { MdOutlineSupportAgent } from 'react-icons/md'
import { FaComments } from 'react-icons/fa'
import { TbListDetails } from 'react-icons/tb'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
// import courseModel from '@/models/course'


const TopbarCourse =({ course, user }) => {
  const [tab, setTab] = useState('courseInfo')
const {t , i18n}= useTranslation('topbarcourse')

   

  return (
    <>
 

      <div className="bg-gray-100">
        {/* box 1   course start */}
          
     

              <div  className="h-auto container">
                <div className="flex m-auto mb-48 pt-24 w-full h-[500px]">
                  <div className="invisible md:visible bg-blue-200 rounded-r-[10px] w-0 md:w-3/6 xl:w-4/6 h-[500px]">
                    <Swiper
                    autoplay={
                     { delay:2000}
                    }
                      pagination={{
                        dynamicBullets: true,
                      }}
                      modules={[Pagination , Autoplay]}
                      className="h-[500px] mySwiper"
                    >
                      <SwiperSlide>
                        {' '}
                        <Image
                          src="/images/Ginger-Autumn-Just-Living-Photo-Collage-Facebook-Cover-1024x443.webp"
                          width={1000}
                          height={1000}
                          alt='pic'
                          className="rounded-r-[10px] w-full h-[500px]"
                        />{' '}
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src="/images/site/dom-fou-YRMWVcdyhmI-unsplash.jpg"
                          width={1000}
                          height={1000}
                          className="w-full h-[500px]"
                            alt='pic'
                        />{' '}
                      </SwiperSlide>
                   
                    </Swiper>
                  </div>
                  <div className="bg-white rounded-l-[10px] w-full md:w-3/6 xl:w-2/6 h-[500px] lg:">
                    <div className="flex items-center m-auto border-gray-100 border-b-2 w-[80%] h-[80px]">
                      <IoMdInformationCircle className="w-[30px] h-[30px] text-red-900" />
                      <p className="mr-2 font-bold text-md text-red-800">
                        {' '}
                        اطلاعات {course?.name}
                      </p>
                    </div>
                    <div className="flex justify-between items-center m-auto border-gray-100 border-b-2 w-[80%] h-[80px]">
                      <span className="flex items-center">
                        <BsCalendarDateFill className="w-[30px] h-[30px] text-red-900" />
                        <p className={` ${i18n.language==='fa' ? "mr-2":"ml-2"} text-black text-sm`}>
                          {' '}
                          {t('startDate')}
                        </p>
                      </span>
                      <p className="text-sm">{course?.startTime} </p>
                    </div>

                    <div className="flex justify-between items-center m-auto border-gray-100 border-b-2 w-[80%] h-[80px]">
                      <span className="flex items-center">
                        <MdAccessTimeFilled className="w-[30px] h-[30px] text-red-900" />
                        <p className={` ${i18n.language==='fa' ? "mr-2":"ml-2"} text-black text-sm`}>{t('time')}</p>
                      </span>
                      <p className="text-sm">{course?.ScheduledTime}</p>
                    </div>

                    <div className="flex justify-between items-center m-auto border-gray-100 border-b-2 w-[80%] h-[80px]">
                      <span className="flex items-center">
                        <AiFillEuroCircle className="w-[30px] h-[30px] text-red-900" />
                        <p className={` ${i18n.language==='fa' ? "mr-2":"ml-2"} text-black text-sm`}>{t('price')} </p>
                      </span>
                      <p className="text-sm">{course?.price} یورو </p>
                    </div>

                    <div className="flex justify-between items-center m-auto border-gray-100 border-b-2 w-[80%] h-[80px]">
                      <span className="flex items-center">
                        <BsCalendarDateFill className="w-[30px] h-[30px] text-red-900" />
                        <p className={` ${i18n.language==='fa' ? "mr-2":"ml-2"} text-black text-sm`}>{t('eventFormat')}</p>
                      </span>
                      <p className="text-sm">{course?.EventFormat} </p>
                    </div>

                    <div className="flex justify-between items-center m-auto w-[80%] h-[80px]">
                      <Link
                        href="/courses/registerCourse"
                        className="bg-green-900 px-5 py-2 rounded-[10px] text-white text-sm"
                      >
                       {t('registerCourse')}
                      </Link>
                      <Link
                        href=""
                        className="bg-red-900 px-5 py-2 rounded-[10px] text-white text-sm"
                      >
                       {t('registerGuide')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
         
       

        {/* box 2   course info */}
     
        <div className="flex lg:flex-row flex-col justify-center items-center lg:items-start h-auto container">
          <div className="w-full sm:w-5/6 xl:w-4/6 text-sm">
            <div className="flex justify-center items-center bg-white p-10 rounded-[10px] w-full h-[150px] text-gray-800">
              <ul className="flex justify-center items-center">
                <li
                  className="flex flex-col justify-center items-center hover:bg-gray-100 p-5 rounded-[10px] hover:text-red-800"
                  onClick={() => setTab('courseInfo')}
                >
                  <RiInfoCardLine className="mb-2 w-[35px] h-[35px]" />
                  <span className='text-center' >{t('courseInfo')} </span>
                </li>

                <li
                  className="flex flex-col justify-center items-center hover:bg-gray-100 p-5 rounded-[10px] hover:text-red-800"
                  onClick={() => setTab('courseDetail')}
                >
                  <TbListDetails className="mb-2 w-[35px] h-[35px]" />
                  <span className='text-center' > {t('courseDetail')}</span>
                </li>

                <li
                  className="flex flex-col justify-center items-center hover:bg-gray-100 p-5 rounded-[10px] hover:text-red-800"
                  onClick={() => setTab('courseSupport')}
                >
                  <MdOutlineSupportAgent className="mb-2 w-[35px] h-[35px]" />
                  <span  className='text-center'>  {t('courseSupport')}</span>
                </li>

                <li
                  className="flex flex-col justify-center items-center hover:bg-gray-100 p-5 rounded-[10px] hover:text-red-800"
                  onClick={() => setTab('courseComment')}
                >
                  <FaComments className="mb-2 w-[35px] h-[35px]" />
                  <span className='text-center'>  {t('courseComment')}</span>
                </li>
              </ul>
            </div>

        

            {tab === 'courseInfo' && <CourseInfo course={course} />}

            {tab === 'courseDetail' && <CourseDetail course={course} />}

            {tab === 'courseSupport' && <CourseSupport  />}

            {tab === 'courseComment' && <CourseComment course={course} user={user} />}
          </div>

          <div className="flex lg:flex-row flex-col flex-wrap w-full lg:w-3/6 xl:w-2/6 lg:no-wrap">
           
            < LeftSide  {...course} />
         
          </div>
        </div>
      </div>
    </>
  )
}

export default TopbarCourse
