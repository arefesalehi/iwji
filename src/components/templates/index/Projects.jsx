'use client'
import TitleContent from '@/components/templates/index/TitleContent'
import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import ImageBox from './ImageBox'
import { Autoplay, Pagination } from 'swiper/modules'
import { useTranslation } from 'react-i18next'

const Projects = ({ cooperation }) => {
  const {t}=useTranslation('coorporation')
  const items = Array.isArray(cooperation) ? cooperation.filter(Boolean) : []

  if (!items.length) return null

  return (
    <>
      <div className="relative w-full h-[500px]">
        <TitleContent title={t('coorporations')} />

        <div data-aos="fade-up" data-aos-duration="1000" className="flex justify-between container">
          <Swiper
            autoplay={{
              delay:2000
            }}
            loop={true}
            rewind={true}
            slidesPerView={1}
            spaceBetween={10}
            // pagination={{
            //   clickable: true,
            // }}
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
            modules={[Pagination , Autoplay]}
            className="mt-5 mySwiper"
          >
            {items.map((cooperate) => {
              return (
                <>
                  <SwiperSlide key={cooperate._id} >
                    <ImageBox   {...cooperate}/>
                  
                  </SwiperSlide>
                </>
              )
            })}
          </Swiper>
        </div>

      </div>
      <div className="right-[-700px] absolute flex justify-center items-center w-full overflow-hidden">
        <svg
          className="block z-100 relative w-full h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
        >
          <polygon fill="#ffff" points="0,0 100,0 50,100" />
        </svg>
      </div>
    </>
  )
}

export default Projects
