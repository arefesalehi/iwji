
import Image from 'next/image'
import React from 'react'
import galleryModel from '@/models/gallery'
import Educationalservice from '@/components/templates/services/Educationalservice';

const page = async () => {
  const gallery = await galleryModel.find({}).sort({ _id: -1 })
    .limit(6);
  return (
    <>
      <div className='w-full bg-red-200 h-[450px]'>
        <Image src='/images/White And Blue Modern Welding Services Banner.png' className='w-full h-[450px]' width={1000} height={400} alt='pic' />
      </div>

   <Educationalservice  gallery={JSON.parse(JSON.stringify(gallery))} />
  

    </>
  )
}

export default page