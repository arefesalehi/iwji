import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center mt-20'>

      <Image  src='/images/Capture40.PNG' width={1000} height={600} alt='department'  />

    </div>
  )
}

export default page