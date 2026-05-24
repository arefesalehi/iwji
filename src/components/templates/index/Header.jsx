'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { useTranslation } from 'react-i18next'
import { i18n } from 'next-i18next'

import { Navigation, Autoplay } from 'swiper/modules'
import ResponsivePoster from '@/components/templates/index/ResponsivePoster'

const Header = ({ posters }) => {
    const { t} = useTranslation()
  return (
    <div className="relative bg-yellow-100 w-full h-[610px]">
      <Swiper

        navigation={true}
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        rewind={true}
        dir={i18n?.dir && i18n.dir() === 'rtl'? 'rtl' : 'ltr'}
        
        className="h-full"
      >
        {posters.map((poster) => (
          <SwiperSlide key={poster._id} className="h-full">
            <div className="relative w-full h-full">
              <ResponsivePoster poster={poster} className="absolute inset-0 rounded-lg w-full h-[610px] object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Header
