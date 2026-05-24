import React from 'react'
import Image from 'next/image'
import Automotive from '@/components/templates/activities/Automotive'
const page = () => {
    return (
        <>
            <div className='w-full bg-red-200 h-[450px]'>
                <Image src='/images/site/inner-body-w_1583h_352mode_cropscale_both_20180211223733.798-w=1583h=352mode=cropscale=both.jpg' className='w-full h-[450px]' width={1000} height={400} alt='pic' />
            </div>

   <Automotive/>

        </>
    )
}

export default page