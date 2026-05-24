import BreadCrumb from '@/components/modules/BreadCrumb'

import Image from 'next/image'
import React from 'react'

import Consultingservice from '@/components/templates/services/Consultingservice';

const page = () => {

    return (
        <>
            <div className='w-full bg-red-200 h-[450px]'>
                <Image src='/images/technical.png' className='w-full h-[450px]' width={1000} height={400} alt='pic' />
            </div>

            <Consultingservice />


        </>
    )
}

export default page