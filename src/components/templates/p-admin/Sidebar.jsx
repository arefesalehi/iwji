'use client'
import { FaHome } from 'react-icons/fa'
import { MdPermContactCalendar } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { SiSlides } from "react-icons/si";
import { FcGallery } from "react-icons/fc";
import { MdCardMembership } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { MdNetworkCheck } from 'react-icons/md'
import { TbCloudNetwork } from 'react-icons/tb'
import { PiShareNetworkDuotone } from 'react-icons/pi'
import { LiaNetworkWiredSolid } from 'react-icons/lia'
import { MdOutlineMenuOpen } from 'react-icons/md'
import { PiUsersFill } from "react-icons/pi";
import { FaComments } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { RiRegisteredFill } from "react-icons/ri";
import { FaStaylinked } from "react-icons/fa";
import { MdGrade } from "react-icons/md";

import { PiLinkSimpleFill } from "react-icons/pi";

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* sidebar container */}
      <div
        className={`bg-white    border-l-2 border-gray-200 text-sm h-full rtl duration-1000 transition-all  ease-in-out  ${
          isOpen ? 'w-[270px]' : 'w-[80px] '
        }`}
      >
        {/* close btn */}
        <div className="flex justify-end w-full">
          <MdOutlineMenuOpen
            onClick={() => setIsOpen((prev) => !prev)}
            className="m-2 w-[30px] h-[30px] text-gray-700"
          />
        </div>

      <div className=''>
          {/* logo picture */}
        <div className="flex justify-center items-center h-[100px]">
          {isOpen ? (
            <Image
              className={`h-[80px] w-[75%] transition-all duration-1000 ease-in-out  ${!isOpen && 'w-[100px] h-[100px]'}   `}
              src="/images/IWJI1.png"
              width={300}
              height={300}
              alt="pic"
            />
          ) : (
            <Image
              className={`h-[35px] w-[80%]  transition-all duration-1000 ease-in-out  `}
              src="/images/Capture20.PNG"
              width={300}
              height={300}
              alt="pic"
            />
          )}
        </div>

        {/* menues */}
        <div className="flex mt-5 text-sm">
          <ul className="w-full">
            <li className="flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <FaHome
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3   transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />
              <Link href='/p-admin'
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden 
                  ${
                    isOpen
                      ? 'opacity-100  max-w-[200px] ml-2'
                      : 'opacity-0  max-w-0 ml-0'
                  }`}
              >
               صفحه اصلی
              </Link>
            </li>

        

                <li className="group relative flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <SiCoursera
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3  transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />

              <a
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen
                    ? 'opacity-100  max-w-[200px] ml-2'
                    : 'opacity-0  max-w-0 ml-0'
                }`}
                href=""
              >
               کاربران و همکاری ها
              </a>

              {/* sub menues */}

              <ul
                className={`hidden z-10 group-hover:block text-sm top-0  
                  ${!isOpen ? 'right-[70px]' : 'right-[260px]'}  
                  absolute bg-[#3e80f8] p-3 rounded-[10px] w-[300px] text-white `}
              >
                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <RiRegisteredFill  className="mr-3 ml-3" />
                  <Link  href="/p-admin/users"> کاربران</Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <FaStaylinked className="mr-3 ml-3" />
                  <Link href="/p-admin/ourteam"> هم تیمی ها</Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <MdGrade className="mr-3 ml-3" />
                  <Link  href="/p-admin/cooperation">   همکاری ها</Link>
                </li>

        
              </ul>
            </li>


            
                <li className="group relative flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <SiCoursera
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3  transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />

              <a
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen
                    ? 'opacity-100  max-w-[200px] ml-2'
                    : 'opacity-0  max-w-0 ml-0'
                }`}
                href=""
              >
             کامنت ها و محتوا
              </a>

              {/* sub menues */}

              <ul
                className={`hidden z-10 group-hover:block text-sm top-0  
                  ${!isOpen ? 'right-[70px]' : 'right-[260px]'}  
                  absolute bg-[#3e80f8] p-3 rounded-[10px] w-[300px] text-white `}
              >
                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <RiRegisteredFill  className="mr-3 ml-3" />
                  <Link        href="/p-admin/comment"> کامنت ها</Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <FaStaylinked className="mr-3 ml-3" />
                  <Link  href="/p-admin/articles">   مقالات</Link>
                </li>

                   <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <FaStaylinked className="mr-3 ml-3" />
                  <Link  href="/p-admin/catalog">   کاتالوگ</Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <MdGrade className="mr-3 ml-3" />
                  <Link href="/p-admin/accardion">    سوالات متداول</Link>
                </li>

        
              </ul>
            </li>

            


            <li className="group relative flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <SiCoursera
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3  transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />

              <a
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen
                    ? 'opacity-100  max-w-[200px] ml-2'
                    : 'opacity-0  max-w-0 ml-0'
                }`}
                href=""
              >
                دوره
              </a>

              {/* sub menues */}

              <ul
                className={`hidden z-10 group-hover:block text-sm top-0  
                  ${!isOpen ? 'right-[70px]' : 'right-[260px]'}  
                  absolute bg-[#3e80f8] p-3 rounded-[10px] w-[300px] text-white `}
              >
                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <RiRegisteredFill  className="mr-3 ml-3" />
                  <Link href="/p-admin/courses"> ثبت نامی های دوره </Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <FaStaylinked className="mr-3 ml-3" />
                  <Link href="/p-admin/classlink">   ایجاد لینک برگزاری کلاس</Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <MdGrade className="mr-3 ml-3" />
                  <Link href="/p-admin/scores">  نمره دهی</Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <PiLinkSimpleFill className="mr-3 ml-3" />
                  <Link href="/p-admin/recordlink"> ارسال لینک ضبط شده کلاس</Link>
                </li>

                {/* <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <PiShareNetworkDuotone className="mr-3 ml-3" />
                  <a href="">   فایل های دوره </a>
                </li> */}

                   <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <PiShareNetworkDuotone className="mr-3 ml-3" />
                  <a href="/p-admin/courses/create">    ایجاد دوره جدید  </a>
                </li>

                 <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <PiShareNetworkDuotone className="mr-3 ml-3" />
                  <a href="/p-admin/coursecalendar">    ارسال تقویم آموزشی </a>
                </li>
                   {/* <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <PiShareNetworkDuotone className="mr-3 ml-3" />
                  <a href="">     اطلاعات هر دوره </a>
                </li> */}
              </ul>
            </li>


      



                 <li className="flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <SiSlides
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3  transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />

              <Link
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen
                    ? 'opacity-100  max-w-[200px] ml-2'
                    : 'opacity-0  max-w-0 ml-0'
                }`}
                href="/p-admin/webinar"
              >
              ایجاد وبینار
              </Link>
            </li>

        

                      <li className="group relative flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <SiCoursera
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3  transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />

              <a
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen
                    ? 'opacity-100  max-w-[200px] ml-2'
                    : 'opacity-0  max-w-0 ml-0'
                }`}
                href=""
              >
             تماس و پشتیبانی
              </a>

              {/* sub menues */}

              <ul
                className={`hidden z-10 group-hover:block text-sm top-0  
                  ${!isOpen ? 'right-[70px]' : 'right-[260px]'}  
                  absolute bg-[#3e80f8] p-3 rounded-[10px] w-[300px] text-white `}
              >
                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <RiRegisteredFill  className="mr-3 ml-3" />
                  <Link  href="/p-admin/contact"> تماس ها</Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <FaStaylinked className="mr-3 ml-3" />
                  <Link   href="/p-admin/tickets">   تیکت ها</Link>
                </li>

              </ul>
            </li>

           

             
                <li className="flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <AiOutlineTransaction
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3  transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />

              <a
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen
                    ? 'opacity-100  max-w-[200px] ml-2'
                    : 'opacity-0  max-w-0 ml-0'
                }`}
                href="/p-admin/transaction"
              >
               تراکنش های مالی
              </a>
            </li>
         



             <li className="group relative flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <SiCoursera
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3  transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />

              <a
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen
                    ? 'opacity-100  max-w-[200px] ml-2'
                    : 'opacity-0  max-w-0 ml-0'
                }`}
                href=""
              >
                تصاویر سایت
              </a>

              {/* sub menues */}

              <ul
                className={`hidden z-10 group-hover:block text-sm top-0  
                  ${!isOpen ? 'right-[70px]' : 'right-[260px]'}  
                  absolute bg-[#3e80f8] p-3 rounded-[10px] w-[300px] text-white `}
              >
                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <RiRegisteredFill  className="mr-3 ml-3" />
                  <Link  href="/p-admin/poster">    ایجاد اسلایدر جدید </Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <FaStaylinked className="mr-3 ml-3" />
                  <Link href="/p-admin/gallery">   گالری تصاویر</Link>
                </li>

          
              </ul>
            </li>




           



            
             <li className="group relative flex items-center hover:bg-[#3e80f8] p-3 hover:text-white">
              <SiCoursera
                className={`  ${
                  isOpen
                    ? 'mr-10 ml-3  transition-all duration-1000 ease-in-out '
                    : 'w-[20px] transition-all duration-1000 ease-in-out h-[20px]   ml-0 mr-4'
                } `}
              />

              <a
                className={`transition-all duration-1000 ease-in-out whitespace-nowrap overflow-hidden ${
                  isOpen
                    ? 'opacity-100  max-w-[200px] ml-2'
                    : 'opacity-0  max-w-0 ml-0'
                }`}
                href=""
              >
                عضویت ها
              </a>

              {/* sub menues */}

              <ul
                className={`hidden z-10 group-hover:block text-sm top-0  
                  ${!isOpen ? 'right-[70px]' : 'right-[260px]'}  
                  absolute bg-[#3e80f8] p-3 rounded-[10px] w-[300px] text-white `}
              >
                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <RiRegisteredFill  className="mr-3 ml-3" />
                  <Link      href="/p-admin/membership">  ایجاد گواهی عضویت در IIW</Link>
                </li>

                <li className="flex items-center hover:bg-blue-400 p-3 hover:rounded-[10px]">
                  <FaStaylinked className="mr-3 ml-3" />
                  <Link                 href="/p-admin/iiwmembership">   نفرات ثبت نامی عضویت در IIW</Link>
                </li>

          
              </ul>
            </li>
           
            
          </ul>
        </div>
      </div>
      </div>
    </>
  )
}

export default Sidebar
