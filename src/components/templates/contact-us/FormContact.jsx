'use client'
import React, { useState } from 'react'
import { IoLocationSharp } from 'react-icons/io5'
import { AiFillPhone } from 'react-icons/ai'
import { IoTimeSharp } from 'react-icons/io5'
import { MdAttachEmail } from 'react-icons/md'
import BreadCrumb from '@/components/modules/BreadCrumb'
import Image from 'next/image'
import { FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import swal from 'sweetalert'
import Map from './Map'
import { useTranslation } from 'react-i18next'
const FormContact = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [body, setBody] = useState('')
  const { t } = useTranslation('contactus')

  const clickHandler = async (e) => {
    e.preventDefault()

    const newContact = {
      username,
      email,
      phone,
      body,
    }
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })

    console.log('res contact=>', res)
    if (res.ok) {
      swal({
        title: 'پیام شما با موفقیت ثبت شد',
        icon: 'success',
        buttons: 'ok',
      })
    }
  }

  return (
    <>
      <BreadCrumb title={t('breadcrumb')} />
      <div className="pb-20 h-auto container">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="flex flex-wrap justify-start lg:justify-evenly items-center gap-16 mt-10 lg:mt-0 w-full h-auto"
        >
          <div className="flex">
            <div className="flex justify-center items-center hover:bg-red-800 ml-2 rounded-[10px] w-[52px] h-[60px] text-red-800 hover:text-white transition-all duration-1000 ease-in-out">
              <IoLocationSharp className="w-[25px] h-[25px]" />
            </div>
            <div className="flex flex-col mt-3">
              <p className="text-sm">{t('contactInfolines1')}</p>
              <p className="text-sm"> {t('contactInfolines12')}</p>
            </div>
          </div>

          <div className="flex">
            <div className="flex justify-center items-center hover:bg-red-800 ml-2 rounded-[10px] w-[52px] h-[60px] text-red-800 hover:text-white transition-all duration-600 ease-in-out">
              <IoTimeSharp className="w-[25px] h-[25px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-2 font-bold text-md">
                {' '}
                {t('contactInfotitle2')}
              </p>
              <p className="text-sm">{t('contactInfolines2')}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-center items-center hover:bg-red-800 ml-2 rounded-[10px] w-[52px] h-[60px] text-red-800 hover:text-white transition-all duration-600 ease-in-out">
              <AiFillPhone className="w-[25px] h-[25px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-2 font-bold text-md">
                {' '}
                {t('contactInfotitle3')}
              </p>
              <p className="text-sm"> {t('contactInfolines3')}</p>
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-center items-center hover:bg-red-800 ml-2 rounded-[10px] w-[52px] h-[60px] text-red-800 hover:text-white transition-all duration-600 ease-in-out">
              <MdAttachEmail className="w-[25px] h-[25px]" />
            </div>
            <div className="flex flex-col">
              <p className="mb-2 font-bold text-md">{t('contactInfotitle4')}</p>
              <p className="text-sm">{t('contactInfolines4')}</p>
            </div>
          </div>
        </div>

        {/* start contact form */}
        <div className="flex bg-gray-200 mt-12 pb-5 rounded-[30px] w-full h-auto">
          {/* pic form */}
          <div className="invisible lg:visible flex justify-center items-center">
            <Image
              src="/images/pic aut tower.jpg"
              alt="tower"
              width={600}
              height={820}
              className="mr-3 rounded-[20px] w-0 lg:w-[450px] xl:w-[600px] lg:h-[800px]"
            />
          </div>

          {/*  form */}
          <div className="px-5 pt-20 lg:basis-1/2 basis-full">
            <h1 className="mb-10 font-bold text-2xl text-center lg:text-start">
              {t('title')}
            </h1>

            <div className="flex flex-col">
              <label htmlFor="" className="font-bold text-[14px]">
                {t('nameLabel')}
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="bg-white mt-3 pr-2 rounded-[10px] h-[40px]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="mt-5 font-bold text-[14px]">
                {t('emailLabel')}
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="bg-white mt-3 pr-2 rounded-[10px] h-[40px]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="mt-5 font-bold text-[14px]">
                {t('phoneLabel')}
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                className="bg-white mt-3 pr-2 rounded-[10px] h-[40px]"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="mt-5 font-bold text-[14px]">
                {t('messageLabel')}
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="bg-white mt-3 pr-2 rounded-[10px] h-[100px]"
              />
            </div>

            <button
              onClick={clickHandler}
              className="flex justify-center items-center bg-red-800 mt-10 p-3 rounded-[10px] w-full text-[14px] text-white"
            >
              <p> {t('submitBtn')}</p>
            </button>

            <h1 className="mt-16 font-bold text-lg">{t('socialTitle')}</h1>

            <div className="flex justify-between items-center mt-5 w-[250px]">
              <span className="flex justify-center items-center bg-gray-800 rounded-[10px] w-[50px] h-[50px] text-white hover:text-red-800">
                <FaInstagram className="w-[25px] h-[25px]" />
              </span>
              <span className="flex justify-center items-center bg-gray-800 rounded-[10px] w-[50px] h-[50px] text-white hover:text-red-800">
                <FaLinkedin className="w-[25px] h-[25px]" />
              </span>

              <span className="flex justify-center items-center bg-gray-800 rounded-[10px] w-[50px] h-[50px] text-white hover:text-red-800">
                <FaTelegram className="w-[25px] h-[25px]" />
              </span>
              <span className="flex justify-center items-center bg-gray-800 rounded-[10px] w-[50px] h-[50px] text-white hover:text-red-800">
                <FaWhatsapp className="w-[25px] h-[25px]" />
              </span>
            </div>
          </div>
        </div>

        {/* map */}
        <h1 className="mt-20 text-2xl">{t('mapTitle')}</h1>
        <div className="bg-yellow-200 mt-5 w-full h-[320px]">
          <Map />
        </div>
      </div>
    </>
  )
}

export default FormContact
