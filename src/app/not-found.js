import Image from 'next/image'
import React from 'react'

const notFound = () => {
  return (
    <div className='flex justify-center items-center'>

      <Image src='/images/—Pngtree—error 404 page not found_6501259.png' width={800} height={800} alt='pic' />
    </div>
  )
}

export default notFound