'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
const SideGallery = ({ membership , gallery }) => {
    const { t, i18n } = useTranslation('certificates')
  return (
    <>
      <div className="invisible md:visible flex flex-col items-center bg-gray-100 mt-20 pb-5 rounded-[10px] w-[90%] h-auto">
        <div     className={`flex ${
            i18n.language === 'fa' ? 'pr-10' : 'pl-5'
          } items-center bg-red-800  rounded-t-[10px] w-full h-[50px] text-2xl`}>
          <p className="text-white text-lg">  {t('certificatePage.galleryTitle')}</p>
        </div>

        <div class="gap-4 grid grid-cols-2 md:grid-cols-3 mt-5">
          {gallery.map((img) => {
            return (
              <div className='px-2'>
                <img
                  class="rounded-lg max-w-full h-[60px] lg:h-[100px]"
                  src={img.membershipImg || img.src}
                  alt=""
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default SideGallery
