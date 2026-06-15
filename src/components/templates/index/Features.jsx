'use client'
import React from 'react'
import TitleContent from './TitleContent'
import FeaturesBox from './FeaturesBox'
import { useTranslation } from 'react-i18next'

const Features = () => {
  const { t } = useTranslation('features')
  return (
    <>
      <div className="bg-gray-900 mt-7 pb-10 sm:pb-5 w-full h-auto">
        <TitleContent title={t('features')} />

        <FeaturesBox
          title={t('vision')}
          desc={t('visionDesc')}
          img="/images/suc-vision.webp"
        />
        <FeaturesBox
          reverse
          title={t('mission')}
          desc={t('missionDesc')}
          img="/images/finacial-success-chart-concept-on-virtual-screen-abstract-business-background-mission-business-concept-photo.jpg"
        />
        <FeaturesBox
          title={t('thoughtHorizon')}
          desc={t('thoughtHorizonDesc')}
          img="/images/vision.jpg"
        />
      </div>

      <div className="right-[-700px] absolute flex justify-center items-center w-full overflow-hidden">
        <svg
          className="block z-100 relative w-full h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
        >
          <polygon fill="oklch(21% .034 264.665)" points="0,0 100,0 50,100" />
        </svg>
      </div>
    </>
  )
}

export default Features
