'use client'
import React from 'react'
import TitleContent from './TitleContent'
import TeamBox from './TeamBox'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination, Autoplay } from 'swiper/modules'
import { useTranslation } from 'react-i18next'
import { i18n } from 'next-i18next'

const OurTeam = ({ ourTeam }) => {
  const { t } = useTranslation('ourteam')
  const items = Array.isArray(ourTeam) ? ourTeam.filter(Boolean) : []

  if (!items.length) return null

  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        className="w-full h-[600px]"
      >
        <TitleContent title={t('ourteam')} />

        <div className="flex justify-between container">
          <Swiper
            rewind={true}
            slidesPerView={1}
            spaceBetween={10}
            autoplay={{
              delay: 2000,
            }}
            loop={true}
            dir={i18n?.dir && i18n.dir() === 'rtl' ? 'rtl' : 'ltr'}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
              1400: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mt-5 mySwiper"
          >
            {items.map((team) => {
              return (
                <>
                  <SwiperSlide key={team._id}>
                    <TeamBox {...team} />
                  </SwiperSlide>
                </>
              )
            })}
          </Swiper>
        </div>
      </div>

      <div className="right-[-700px] absolute flex justify-center items-center w-full overflow-hidden leading-[0]">
        <svg
          className="block relative w-full h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
        >
          <polygon fill="oklch(21% .034 264.665)" points="0,100 100,100 50,0" />
        </svg>
      </div>
    </>
  )
}

export default OurTeam
