import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import PishkhanCards from '@/components/templates/user-account/PishkhanCards'
import React from 'react'
import { SiCoursera } from "react-icons/si";
import { IoTicket } from "react-icons/io5";
import { MdOnlinePrediction } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { authUser } from '@/utils/serverHelpers';
import courseRegistrationModel from '@/models/courseRegisteration'
import ticketModel from '@/models/ticket'
import webinarRegistrationModel from '@/models/webinarRegistration'
import { redirect } from 'next/navigation';


const page = async () => {

    const user = await authUser()
    console.log('user account user==>', user);

    if (!user) {
        redirect('/login-register')
    }

    const courseRegisteration = await courseRegistrationModel.find({ userId: user._id })
    const webinarRegisteration = await webinarRegistrationModel.find({ userId: user._id })
    const tickets = await ticketModel.find({ user: user._id })



    return (
        <>
            <UserPanelLayout>
                <div className='mt-5 flex gap-3 px-10'>
                    <PishkhanCards
                        shadowcolor={`rgba(255, 255, 0, 0.5) 0px 54px 55px, 
                        rgba(255, 255, 0, 0.3) 0px -12px 30px, 
                        rgba(255, 255, 0, 0.3) 0px 4px 6px, 
                        rgba(255, 255, 0, 0.4) 0px 12px 13px, 
                        rgba(255, 255, 0, 0.2) 0px -3px 5px`}
                        title='دوره های من' color='bg-yellow-400'
                        count={courseRegisteration?.length}
                        icon={<SiCoursera className='w-[35px] h-[35px]' />}
                    />
                    <PishkhanCards
                        shadowcolor={`rgba(255, 165, 0, 0.5) 0px 54px 55px, 
                        rgba(255, 165, 0, 0.3) 0px -12px 30px, 
                        rgba(255, 165, 0, 0.3) 0px 4px 6px, 
                        rgba(255, 165, 0, 0.4) 0px 12px 13px, 
                        rgba(255, 165, 0, 0.2) 0px -3px 5px`}
                        title='تیکت ها'
                        color='bg-orange-400'
                        count={tickets?.length}
                        icon={<IoTicket className='w-[35px] h-[35px]'
                        />} />
                    <PishkhanCards
                        shadowcolor={`rgba(128, 0, 128, 0.5) 0px 54px 55px, 
                        rgba(128, 0, 128, 0.3) 0px -12px 30px, 
                        rgba(128, 0, 128, 0.3) 0px 4px 6px, 
                        rgba(128, 0, 128, 0.4) 0px 12px 13px, 
                        rgba(128, 0, 128, 0.2) 0px -3px 5px`}
                        title='وبینارهای من' color='bg-purple-500'
                        count={webinarRegisteration?.length}
                        icon={<MdOnlinePrediction className='w-[35px] h-[35px]'
                        />} />
                    <PishkhanCards
                        shadowcolor={`rgba(0, 122, 255, 0.5) 0px 54px 55px, 
                        rgba(0, 122, 255, 0.3) 0px -12px 30px, 
                        rgba(0, 122, 255, 0.3) 0px 4px 6px, 
                        rgba(0, 122, 255, 0.4) 0px 12px 13px, 
                        rgba(0, 122, 255, 0.2) 0px -3px 5px`}
                        title='کیف پول' color='bg-blue-400'
                        count='0'
                        icon={<FaWallet className='w-[35px] h-[35px]'
                        />} />
                </div>

                <div className='px-10 mt-20'>

                    <h1 className='mb-3'>سلام {user.name} نیستید ؟ <span >(خارج شوید)</span></h1>
                    <p>از طریق پیشخوان حساب کاربری‌تان، می‌توانید <span className='text-red-800'>دوره های اخیرتان</span> را مشاهده،  <span className='text-red-800'>صورتحساب‌تان</span> را مدیریت و <span className='text-red-800'>جزییات حساب کاربری و کلمه عبور</span> خود را ویرایش کنید.

                    </p>
                </div>

            </UserPanelLayout>

        </>
    )
}

export default page