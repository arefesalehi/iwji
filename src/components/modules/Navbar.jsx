


'use client'

import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { MdKeyboardArrowDown } from 'react-icons/md'
import React, { useRef, useState, useEffect } from 'react'
import { IoMdPerson } from 'react-icons/io'
import { MdShoppingCartCheckout } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'
import { IoMenu } from 'react-icons/io5'
import { IoIosArrowForward } from 'react-icons/io'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import swal from 'sweetalert'
import { useRouter } from 'next/navigation'
import i18n from '@/i18n'
import { useTranslation } from 'react-i18next'

const Navbar = ({ isLogin }) => {

  const [langCode, setLangCode] = useState('fa')
  const [lng, setLng] = useState('زبان')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [iscourseOpen, setIsCourseOpen] = useState(false)
  const [isInsidecourseOpen, setIsInsideCourseOpen] = useState(false)
  const [isWebinarOpen, setIsWebinarOpen] = useState(false)
  const [isServiceOpen, setIsServiceOpen] = useState(false)
  const [isInsideServiceOpen, setIsInsideServiceOpen] = useState(false)
  const [isInsideActivityServiceOpen, setIsInsideActivityOpen] = useState(false)
  const [isMembershipOpen, setIsMembershipOpen] = useState(false)
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false)
  const [isLngOpen, setIsLngOpen] = useState(false)
  const [showLng, setShowLng] = useState(false)
  const menuRef = useRef(null)
  const router = useRouter()
  const { t, i18n: i18nextInstance } = useTranslation('navbar')

  // مقداردهی اولیه زبان از i18n و تنظیم نمایش
  // useEffect(() => {
  //   const current = (i18nextInstance && i18nextInstance.language) ? i18nextInstance.language : 'fa'
  //   const code = current.startsWith('en') ? 'en' : 'fa'
  //   setLangCode(code)
  //   setLng(code === 'fa' ? (t('persian') || 'فارسی') : (t('english') || 'English'))
  //   applyDirection(code)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

//   مقداردهی اولیه زبان
useEffect(() => {
  try {
    // اول از localStorage بخون
    const savedLang =
      typeof window !== 'undefined' ? localStorage.getItem('NEXT_LOCALE') : null

    // اگر نبود از i18n بخون، اگر نبود دیفالت fa
    const current = savedLang || i18nextInstance.language || 'fa'
    const code = current.startsWith('en') ? 'en' : 'fa'

    // تغییر زبان i18n
    i18nextInstance.changeLanguage(code)

    setLangCode(code)
    setLng(code === 'fa' ? (t('persian') || 'فارسی') : (t('english') || 'English'))
    applyDirection(code)
  } catch (err) {
    console.error('init lang error:', err)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])


 const applyDirection = (code) => {
    const dir = code === 'fa' ? 'rtl' : 'ltr'
    try {
      document.documentElement.lang = code
      document.documentElement.dir = dir
      // optional: بدنه هم کلاس اضافه کن تا در CSS از آن استفاده کنی
      document.body.classList.remove('rtl', 'ltr')
      document.body.classList.add(dir)
      // ذخیره انتخاب کاربر
      try { localStorage.setItem('NEXT_LOCALE', code) } catch (e) {}
      document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`
    } catch (err) {
      // در SSR یا حالت‌های خاص ممکن است خطا بیاید — نادیده گرفته می‌شود
    }
  }

  // تغییر زبان هنگام انتخاب کاربر
  const handleChangeLang = async (code) => {
    if (!code) return
    try {
      await i18n.changeLanguage(code)
      setLangCode(code)
 
      setLng(code === 'fa' ? (t('persian') || 'فارسی') : (t('english') || 'English'))

      applyDirection(code)
      setShowLng(false)
    } catch (err) {
      console.error('changeLanguage error', err)
    }
  }




  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeAllMenus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const logout = () => {
    swal({
      title: 'ایا از خروج اطمینان دارید ؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then(async (result) => {
      if (result) {
        const res = await fetch('/api/auth/signout', {
          method: 'POST',
        })
        if (res.status === 200) {
          swal({
            title: 'شما با موفقیت از اکانت خارج شدید',
            icon: 'success',
            buttons: 'ok',
          }).then(() => {
            router.replace('/')
            router.refresh()
          })
        }
      }
    })
  }

  const closeAllMenus = () => {
    setIsMenuOpen(false)
    setIsAboutUsOpen(false)
    setIsCourseOpen(false)
    setIsLngOpen(false)
    setIsMembershipOpen(false)
    setIsServiceOpen(false)
    setIsWebinarOpen(false)
    setIsInsideActivityOpen(false)
    setIsInsideCourseOpen(false)
    setIsInsideServiceOpen(false)
  }

  // اعمال جهت (dir) و lang روی document
 

  return (
    <>
      <div className="bg-red-800 w-full h-[65px] text-[15px] text-white">
        <div className={`flex justify-between items-center h-[65px] container`}>
          <div className="flex basis-3/4">
            {/* Mobile menu toggle */}
            <div
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden relative flex justify-center items-center bg-gray-200 p-2 rounded-lg text-red-800 text-xl"
            >
              <IoMenu className="w-[20px] h-[20px]" />
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <>
                <div className="z-40 fixed inset-0 bg-black/20 backdrop-blur-sm" />
                <div
                  ref={menuRef}
                  className="top-5 right-3 z-50 fixed bg-white opacity-100 rounded-xl w-[280px] h-[750px] scale-95 transition-all duration-300 ease-in-out delay-150 transform"
                >
                  <div className="mx-10 py-5 border-gray-200 border-b-2 text-gray-700">
                    {t('home')}
                  </div>
                  <div className="flex justify-between items-center mx-10 py-3 border-gray-200 border-b-2 text-gray-700">
                    <p>دوره های آموزشی</p>
                    <span
                      onClick={() => setIsCourseOpen(true)}
                      className="bg-gray-200 p-3 rounded-lg"
                    >
                      <ArrowLeftIcon />
                    </span>
                  </div>
                  <div className="flex justify-between items-center mx-10 py-3 border-gray-200 border-b-2 text-gray-700">
                    <p>وبینار</p>
                    <span
                      onClick={() => setIsWebinarOpen(true)}
                      className="bg-gray-200 p-3 rounded-lg"
                    >
                      <ArrowLeftIcon />
                    </span>
                  </div>
                  <div className="flex justify-between items-center mx-10 py-3 border-gray-200 border-b-2 text-gray-700">
                    <p>خدمات و پروژه ها</p>
                    <span
                      onClick={() => setIsServiceOpen(true)}
                      className="bg-gray-200 p-3 rounded-lg"
                    >
                      <ArrowLeftIcon />
                    </span>
                  </div>
                  <div className="flex justify-between items-center mx-10 py-3 border-gray-200 border-b-2 text-gray-700">
                    <p> عضویت</p>
                    <span
                      onClick={() => setIsMembershipOpen(true)}
                      className="bg-gray-200 p-3 rounded-lg"
                    >
                      <ArrowLeftIcon />
                    </span>
                  </div>
                  <div className="mx-10 py-5 border-gray-200 border-b-2 text-gray-700">
                    گالری
                  </div>
                  <div className="flex justify-between items-center mx-10 py-3 border-gray-200 border-b-2 text-gray-700">
                    <p> درباره ما</p>
                    <span
                      onClick={() => setIsAboutUsOpen(true)}
                      className="bg-gray-200 p-3 rounded-lg"
                    >
                      <ArrowLeftIcon />
                    </span>
                  </div>
                  <div className="flex justify-between items-center mx-10 py-3 border-gray-200 border-b-2 text-gray-700">
                    <p> زبان</p>
                    <span
                      onClick={() => setIsLngOpen(true)}
                      className="bg-gray-200 p-3 rounded-lg"
                    >
                      <ArrowLeftIcon />
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Desktop menu */}
            <ul className={` ${ i18n?.dir && i18n.dir() === 'rtl'? '2xl:text-base  text-sm' : 'ltr 2xl:text-sm text-xs'} hidden lg:flex justify-center items-center  `}>
              {/* Home */}
              <li className="px-3">
                <a href="/" className="hover:text-gray-300 transition-colors">
                  {t('home')}
                </a>
              </li>

              {/* Courses - Fixed structure */}
              <li className="group relative px-3">
                <span className="flex justify-center items-center hover:text-gray-300 transition-colors cursor-pointer">
                   {t('courses')} <MdKeyboardArrowDown className="mr-1" />
                </span>

                {/* Course submenu */}
                <div className="invisible group-hover:visible top-[35px] right-0 z-50 absolute bg-gray-400 opacity-0 group-hover:opacity-100 px-5 py-2 rounded-[10px] w-[240px] transition-all translate-y-2 group-hover:translate-y-0 duration-300 transform">
                  {/* International courses */}
                  <div className="group/sub relative py-2">
                    <span className="flex justify-between items-center text-sm cursor-pointer">
                     {t('internationalCourses')}
                      <MdKeyboardArrowLeft className="ml-1" />
                    </span>

                    {/* International submenu */}
                    <div className="invisible group-hover/sub:visible top-0 right-full z-50 absolute bg-gray-400 opacity-0 group-hover/sub:opacity-100 px-5 py-2 rounded-[10px] w-[300px] transition-all translate-x-2 group-hover/sub:translate-x-0 duration-300 transform">
                      <Link
                        href="/courses/international-courses/IWE"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                            {t('IWE')}
                      </Link>
                      <Link
                        href="/courses/international-courses/IWS"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                            {t('IWS')}
                      </Link>
                      <Link
                        href="/courses/international-courses/IWT"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                           {t('IWT')}
                      </Link>
                    </div>
                  </div>

                  <Link
                    href="/courses/local-courses"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px]"
                  >
                    {t('localCourses')}
                  </Link>
                  <Link
                    href="/courses/registerCourse"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                    {t('registerCourse')}
                  </Link>
                  <Link
                    href="/catalouge"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                    {t('catalogue')}
                  </Link>
                  <Link
                    href="/certificates"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                   { t('certificates')}
                  </Link>
                </div>
              </li>

              {/* Webinars */}
              <li className="group relative px-3">
                <span className="flex justify-center items-center hover:text-gray-300 transition-colors cursor-pointer">
                  {t('webinars')} <MdKeyboardArrowDown className="mr-1" />
                </span>
                <div className="invisible group-hover:visible top-[35px] right-0 z-50 absolute bg-gray-400 opacity-0 group-hover:opacity-100 px-5 py-2 rounded-[10px] w-[240px] transition-all translate-y-2 group-hover:translate-y-0 duration-300 transform">
                  <Link
                    href="/webinars/webinar-signin"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                    {t('webinarRegister')}
                  </Link>
                  <a
                    href="#"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                   {t('webinarArchive')}
                  </a>
                </div>
              </li>

              {/* certificates */}
              <li className="group relative px-3">
                <Link
                  href="/articles"
                  className="flex justify-center items-center hover:text-gray-300 transition-colors cursor-pointer"
                >
                  {t('articles')}
                </Link>
              </li>

              {/* Services */}
              <li className="group relative px-3">
                <span className="flex justify-center items-center hover:text-gray-300 transition-colors cursor-pointer">
                   {t('servicesProjects')}<MdKeyboardArrowDown className="mr-1" />
                </span>
                <div className="invisible group-hover:visible top-[35px] right-0 z-50 absolute bg-gray-400 opacity-0 group-hover:opacity-100 px-5 py-2 rounded-[10px] w-[240px] transition-all translate-y-2 group-hover:translate-y-0 duration-300 transform">
                  {/* Services submenu */}
                  <div className="group/sub relative py-2">
                    <span className="flex justify-between items-center text-sm cursor-pointer">
                      {t('services')} <MdKeyboardArrowLeft className="ml-1" />
                    </span>
                    <div className="invisible group-hover/sub:visible top-0 right-full z-50 absolute bg-gray-400 opacity-0 group-hover/sub:opacity-100 px-5 py-2 rounded-[10px] w-[300px] transition-all translate-x-2 group-hover/sub:translate-x-0 duration-300 transform">
                      <Link
                        href="/services/educational-services"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                      { t('educationalServices')}
                      </Link>
                      <Link
                        href="/services/technical-services"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                       {t('technicalServices')}
                      </Link>
                      <Link
                        href="/services/consulting-services"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                        {t('consultingServices')}
                      </Link>
                    </div>
                  </div>

                  {/* Activities submenu */}
                  <div className="group/sub relative py-2">
                    <span className="flex justify-between items-center text-sm cursor-pointer">
                        {t('industrialActivities')} <MdKeyboardArrowLeft className="ml-1" />
                    </span>
                    <div className="invisible group-hover/sub:visible top-0 right-full z-50 absolute bg-gray-400 opacity-0 group-hover/sub:opacity-100 px-5 py-2 rounded-[10px] w-[300px] transition-all translate-x-2 group-hover/sub:translate-x-0 duration-300 transform">
                      <Link
                        href="/activities/energy"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                        {t('energyIndustry')}
                      </Link>
                      <Link
                        href="/activities/automotive"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                       {t('automotiveIndustry')}
                      </Link>
                      <Link
                        href="/activities/rail"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                      >
                       {t('railVehicles')}
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* Membership */}
              <li className="group relative px-3">
                <span className="flex justify-center items-center hover:text-gray-300 transition-colors cursor-pointer">
                  {t('membership')} <MdKeyboardArrowDown className="mr-1" />
                </span>
                <div className="invisible group-hover:visible top-[35px] right-0 z-50 absolute bg-gray-400 opacity-0 group-hover:opacity-100 px-5 py-2 rounded-[10px] w-[240px] transition-all translate-y-2 group-hover:translate-y-0 duration-300 transform">
                  <a
                    href="/membership/register"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                    {t('register')}
                  </a>
                  <a
                    href="/membership"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                    {t('membershipBenefits')}
                  </a>
                </div>
              </li>

              {/* About Us */}
              <li className="group relative px-3">
                <span className="flex justify-center items-center hover:text-gray-300 transition-colors cursor-pointer">
                {t('aboutUs')}<MdKeyboardArrowDown className="mr-1" />
                </span>
                <div className="invisible group-hover:visible top-[35px] right-0 z-50 absolute bg-gray-400 opacity-0 group-hover:opacity-100 px-5 py-2 rounded-[10px] w-[240px] transition-all translate-y-2 group-hover:translate-y-0 duration-300 transform">
                  <Link
                    href="/about-us"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                   {t('companyIntro')}
                  </Link>
                  <Link
                    href="/contact-us"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                    {t('contactUs')}
                  </Link>
                  <a
                    href="/about-us/help"
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                  >
                    {t('faq')}
                  </a>

                  {/* Gallery */}

                  <Link
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                    href="/gallery"
                  >
                   {t('gallery')}
                  </Link>

                     <Link
                    className="block hover:bg-red-400 px-2 py-3 rounded-[10px] text-sm"
                    href="/department"
                  >
                   {t('department')}
                  </Link>
                </div>
              </li>

              {/* Language */}
              <li className="relative px-3">
                <div
                  className="flex justify-center items-center cursor-pointer"
                  onClick={() => setShowLng(!showLng)}
                >
                  {lng} <MdKeyboardArrowDown className="mr-1" />
                </div>

                {showLng && (
                  <div className="top-[35px] right-0 z-50 absolute bg-gray-400 shadow-lg px-5 py-2 rounded-[10px] w-[240px]">
                    <div
                      className="flex items-center hover:bg-red-400 px-2 py-3 rounded-[10px] cursor-pointer"
                      onClick={() => handleChangeLang('fa')}
                    >
                      <Image
                        width={28}
                        height={20}
                        src="/images/images.png"
                        alt="فارسی"
                        className="ml-2"
                      />
                      <p className="text-sm">{t('persian') || 'فارسی'}</p>
                    </div>
                    <div
                      className="flex items-center hover:bg-red-400 px-2 py-3 rounded-[10px] cursor-pointer"
                      onClick={() => handleChangeLang('en')}
                    >
                      <Image
                        width={28}
                        height={20}
                        src="/images/Flag_of_the_United_States_(DoS_ECA_Color_Standard).svg.png"
                        alt="English"
                        className="ml-2"
                      />
                      <p className="text-sm">{t('english') || 'English'}</p>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="flex justify-end text-sm xl:text-base basis-1/4">
            {/* User account */}
            <div className="group relative flex items-center">
              {!isLogin ? (
                <Link
                  href="/login-register"
                  className="flex items-center hover:text-gray-300 transition-colors"
                >
                  {t('loginRegister')}
                </Link>
              ) : (
                <>
                  <div className="sm:hidden">
                    <Link href="/account" className="text-xl">
                      <IoMdPerson />
                    </Link>
                  </div>
                  <div className="hidden sm:flex">
                    <Link
                      href="#"
                      className="flex items-center hover:text-gray-300 transition-colors"
                    >
                      {t('userAccount')}
                    </Link>
                    <div className="invisible group-hover:visible top-full right-0 z-50 absolute bg-gray-400 opacity-0 group-hover:opacity-100 mt-3 px-5 py-2 rounded-[10px] w-[200px] text-sm transition-all duration-300">
                      <Link
                        href="/user-account"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px]"
                      >
                       {t('dashboard')}
                      </Link>
                      <Link
                        href="/user-account/tickets"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px]"
                      >
                        {t('myTickets')}
                      </Link>
                      <Link
                        href="/user-account/myCourses"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px]"
                      >
                       { t('myCourses')}
                      </Link>
                      <Link
                        href="/user-account/accountDetail"
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px]"
                      >
                       {t('accountDetails')}
                      </Link>
                      <a
                        onClick={logout}
                        className="block hover:bg-red-400 px-2 py-3 rounded-[10px]"
                      >
                       {t('logout')}
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Shopping cart */}
            <div className="flex justify-center items-center mr-5 ml-3">
              <Link
                href="/cart"
                className="hover:text-gray-300 transition-colors"
              >
                <MdShoppingCartCheckout className="w-[20px] h-[20px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
