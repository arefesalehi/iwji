'use client'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CourseBox = ({course}) => {
  const {t} = useTranslation('coursebox')
  if (!course) return null

  return (
      <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg w-[300px] max-w-sm">
        <a href="#">
          <img
            className="rounded-t-lg w-full h-[220px]"
            src={course.img || '/images/rob-lambert-9Q_pLLP_jmA-unsplash.jpg'}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 font-bold text-gray-900 dark:text-white text-base tracking-tight">
            {course.name || ''}
            </h5>
          </a>
          <div className="flex justify-between mt-8 font-normal text-gray-700 dark:text-gray-400 text-xs b-3">
            <p> {t('dvs')}</p>
            <p className="font-semibold">{course.startTime || ''}  </p>
          </div>

          <div className="flex justify-between mt-5 pt-5 border-gray-200 border-t-2">
            <Link
              href="/courses/registerCourse"
              className="inline-flex items-center px-3 py-2 border-2 border-green-600 rounded-3xl font-medium text-green-700 text-sm text-center"
            >
             {t('register')}
            </Link>

            <a
              href="#"
              className="inline-flex items-center px-3 py-2 rounded-lg focus:outline-none font-bold text-green-700 text-sm text-center"
            >
              {course.price || ''}  {t('uro')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseBox
