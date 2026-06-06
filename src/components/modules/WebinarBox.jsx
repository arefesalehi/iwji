'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
const WebinarBox = ({webinar}) => {
        const { t} = useTranslation('webinarbox')
  if (!webinar) return null

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg w-[300px] max-w-sm">
        <a href="#">
          <img
            className="rounded-t-lg w-full h-[220px]"
            src={webinar.img || '/images/rob-lambert-9Q_pLLP_jmA-unsplash.jpg'}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 font-bold text-gray-900 dark:text-white text-base tracking-tight">
           {webinar.webinarName || ''}
            </h5>
             <p className='font-normal text-gray-700 text-xs'> {t('title')} </p>
          </a>
          <div className="flex justify-between mt-5 font-normal text-gray-700 dark:text-gray-400 text-xs b-3">
           
            <p className="font-semibold">{webinar.hour || ''}</p>
            <p className="font-semibold">{webinar.date ? new Date(webinar.date).toLocaleDateString('fa-ir') : ''}</p>
          </div>

          <div className="flex justify-between mt-5 pt-5 border-gray-200 border-t-2">
            <a
              href={webinar.link || '#'}
              className="inline-flex items-center px-3 py-2 border-2 border-green-600 rounded-3xl font-medium text-green-700 text-sm text-center"
            >
              {t('register')}
            </a>

            <a
              href="#"
              className="inline-flex items-center px-3 py-2 rounded-lg focus:outline-none font-bold text-green-700 text-sm text-center"
            >
              {webinar.price===0 ? t('free'):webinar.price}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebinarBox
