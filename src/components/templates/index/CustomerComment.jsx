

'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Keyboard, Scrollbar, Navigation, Pagination, Autoplay } from 'swiper/modules'
import CummentBox from './CummentBox'
import TitleContent from './TitleContent'
import CommentBox from '../courses/CommentBox'
import { useTranslation } from 'react-i18next'
import { i18n } from 'next-i18next'

const images = [
  '/images/—Pngtree—arc welding of a steel_15512817.png',
  '/images/pete-wright-n1RJ7pXgGTE-unsplash.jpg',
  '/images/mojtaba-mohammadi-J6Spg5kYkz0-unsplash.jpg',
]

const CustomerComment = ({ comments }) => {
  const [current, setCurrent] = useState(0)
          const { t} = useTranslation('customercomment')
  const items = Array.isArray(comments) ? comments.filter(Boolean) : []

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div  className="relative w-full h-[600px] overflow-hidden">
        <Image
          src={images[current]}
          fill
          alt="header background"
          className="object-cover transition-all duration-1000"
        />

        <div className="z-10 absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

        <div className="z-30 absolute inset-0 flex justify-center mt-16 h-[50px]">
          <h2 className="px-4 font-bold text-white text-3xl text-center">
           {t('testimonialsTitle')}
          </h2>
        </div>

        <div data-aos="fade-up" data-aos-duration="1000" className="z-20 absolute inset-0 flex justify-between items-center container">
          <Swiper
            slidesPerView={1}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{
              enabled: true,
            }}

            breakpoints={{
              769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }}
            scrollbar={true}
            // navigation={true}
            // pagination={{
            //     clickable: true,
            // }}
            autoplay={{
              delay:2000
            }}
               dir={i18n?.dir && i18n.dir() === 'rtl'? 'rtl' : 'ltr'}
            loop={true}
            modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]}
            className="flex-wrap justify-center mt-[80px] mySwiper"
          >
            {items.map((comment) => {
              return (
                <>
                  <SwiperSlide className='flex justify-center items-center' key={comment._id}>
                    <CommentBox  {...comment} />
                  </SwiperSlide>
                </>
              )
            })}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default CustomerComment
