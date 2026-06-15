import React from 'react'
import Image from 'next/image'
import Rail from '@/components/templates/activities/Rail'

const page = () => {
    return (
        <>
            <div className='w-full bg-red-200 h-[450px]'>
                <Image src='/images/site/26834804-d3b1-4bb5-9944-e60eec8bb064_1280_733.jpg' className='w-full h-[450px]' width={1000} height={400} alt='pic' />
            </div>

            <Rail />

        </>
    )
}

export default page