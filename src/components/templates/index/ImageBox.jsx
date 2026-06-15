
import Image from 'next/image'
import React from 'react'

const ImageBox = ({ img, title }) => {
  return (
    <div className="group relative flex justify-center items-center bg-white h-[310px] overflow-hidden basis-1/4">

      <Image
        src={img}
        width={260}
        height={610}
        className="inset-0 flex rounded-xl w-[260px] h-auto"
        alt="نمونه کار"
      />

    </div>
  )
}

export default ImageBox
