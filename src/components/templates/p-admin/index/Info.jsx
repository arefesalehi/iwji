import Image from 'next/image'
import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { GiChart } from 'react-icons/gi'
import InfoBox from './InfoBox'
import { GiGraduateCap } from 'react-icons/gi'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { SiCoursera } from 'react-icons/si'
import Link from 'next/link'

const Info = ({AdminUser, tickets , comments,registercourse, users}) => {
  return (
    <>
      <div className="flex m-auto rounded-xl w-[90%] h-[350px]">
        <div className="flex justify-center items-center bg-white rounded-xl basis-[85%]">
          <div className="flex-col bg-white rounded-xl basis-5/6">
            <p className="px-8 py-10 font-bold text-xl">
            سلام {AdminUser.name} عزیز، خوش آمدید!
            </p>
            <p className="px-8 font-bold">
              به پنل ادمین موسسه جوش و چسب ایرانیان خوش آمدید
            </p>
            <p className="px-8 py-5 text-gray-500">
              شما می‌توانید به راحتی به اطلاعات کاربران، دوره‌ها و فعالیت‌های موسسه دسترسی داشته باشید.
            </p>

            <Link href='/p-admin/users' className="bg-blue-500 mx-8 my-8 p-3 rounded-lg text-white text-sm">
              مشاهده کاربران
            </Link>
          </div>
          <div className="rounded-xl basis-3/5">
            <Image
              src="/images/gretting-thumb.png"
              width={400}
              height={500}
              alt="pic"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-5 rounded-xl basis-2/5">
          <InfoBox
            count={users.length}
            title="کاربران سایت"
            icon={<FaUsers />}
            chart={<GiChart className="bg-green-300 w-[40px] h-[40px]" />}
          />
          <InfoBox
            count={registercourse.length}
            title="کاربران دوره"
            icon={<SiCoursera />}
            chart={<GiChart className="bg-green-300 w-[40px] h-[40px]" />}
          />
          <InfoBox
            count={tickets.length}
            title=" تیکت ها"
            icon={<BsFillTicketDetailedFill />}
            chart={<GiChart className="bg-purple-500 w-[40px] h-[40px]" />}
          />
          <InfoBox
            count="155"
            title="  گواهینامه دریافت شده"
            icon={<GiGraduateCap />}
            chart={<GiChart className="bg-orange-600 w-[40px] h-[40px]" />}
          />
        </div>
      </div>
    </>
  )
}

export default Info
