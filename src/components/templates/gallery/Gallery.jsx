'use client'

import React, { useState } from 'react'
import AllPic from './AllPic'
import CertificatePic from './CertificatePic'
import PracticalPic from './PracticalPic'
import OtherPic from './OtherPic'
import { useTranslation } from 'react-i18next'

const Gallery = () => {
  const { t } = useTranslation('gallery')
  const [tabs, setTabs] = useState('all')
  return (
    <>
      <div className="flex justify-center w-full container">
        <div className="flex justify-between mt-40 mb-10 border-red-600 border-b-4 w-[400px] h-[50px] text-xl cursor-pointer galleryName">
          <p onClick={() => setTabs('all')} className="hover:text-red-800">
            {t('all')}
          </p>
          <p
            onClick={() => setTabs('certificates')}
            className="hover:text-red-800"
          >
            {t('certificates')}
          </p>
          <p
            onClick={() => setTabs('practical')}
            className="hover:text-red-800"
          >
            {t('practical')}
          </p>
          <p onClick={() => setTabs('other')} className="hover:text-red-800">
            {t('other')}
          </p>
        </div>
      </div>
      <div className="mb-20 container">
        {tabs === 'all' && <AllPic />}
        {tabs === 'certificates' && <CertificatePic />}
        {tabs === 'practical' && <PracticalPic />}
        {tabs === 'other' && <OtherPic />}
      </div>
    </>
  )
}

export default Gallery
