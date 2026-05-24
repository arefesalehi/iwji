'use client'
import { i18n, useTranslation } from 'next-i18next'
import Image from 'next/image'
import React from 'react'

const FeaturesBox = ({reverse , title , img , desc}) => {
  const {t , i18n} =useTranslation('features')
  return (
    <>

      <div data-aos="fade-up" data-aos-duration="1000" className='container'>
        <div className={`boxes  mt-10 relative h-[300px] ${reverse ? '  grid grid-cols-2 mb-[-42px] sm:mb-[90px] lg:mb-0':' mb-[-62px] sm:mb-[110px] lg:mb-0'}`}>
          <div className={`flex flex-start  ${i18n.language ==='fa' ? "mr-auto" :"ml-auto"}    h-[100px]   sm:h-[250px]  ${reverse ?"lg:w-[133%] w-[200%]" :"lg:w-[60%] w-full   "}`}>
            <Image src={img} width={800} height={250} alt='pic' className={`rounded-[20px] `} />
          </div>
          <div  className={`     ${reverse ? ` text-sm sm:text-base lg:w-[50%] w-full h-auto p-5 px-8 flex flex-col justify-center bg-white lg:top-[50px] sm:top-[270px] top-[120px] rounded-[10px] absolute ${i18n.language ==='fa'  ? "left-0" :"right-0 "}     `:"lg:w-[50%] w-full text-sm sm:text-base justify-center  px-8 bg-white flex flex-col h-auto p-5 absolute lg:top-[50px] sm:top-[270px] top-[120px]  rounded-[20px]"}`}>
            <h1 className='font-bold text-xl'>{title}</h1>
            <p className='mt-2 text-gray-400'>  {desc}</p>
          </div>

        </div>
      </div>



    </>
  )
}

export default FeaturesBox