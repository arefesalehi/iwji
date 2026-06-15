import React from 'react'
import Image from 'next/image'
import Energy from '@/components/templates/activities/Energy'


const page = () => {
    return (
        <>
            <div className='w-full bg-red-200 h-[450px]'>
                <Image src='/images/site/6b6804b9-c04e-40fa-8f72-0e28012d7120_1280_733.jpg' className='w-full h-[450px]' width={1000} height={400} alt='pic' />
            </div>

            <Energy />

        </>
    )
}

export default page