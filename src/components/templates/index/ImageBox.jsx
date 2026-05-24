// 

import Image from 'next/image'
import React from 'react'

const 


ImageBox = ({ img, title }) => {
    return (
        <div className='group relative flex justify-center items-center bg-white h-[310px] overflow-hidden basis-1/4'>

            {/* عکس */}
            <Image
                src={img}
                width={260}
                height={610}
                className='inset-0 flex rounded-xl w-[260px] h-auto'
                alt='نمونه کار'
            />

            {/* باکس هاور شفاف روی عکس */}
            {/* <div className='top-7 left-4 absolute flex flex-col justify-center items-center bg-[rgba(255,255,255,0.2)] bg-opacity-70 opacity-0 group-hover:opacity-100 backdrop-blur-md rounded-[10px] w-[260px] h-[260px] transition-opacity duration-300'>
                <p className='mb-2 font-semibold text-black'>{title}</p>
                <button className='bg-white hover:bg-gray-200 px-4 py-1 rounded text-black transition'>
                    مشاهده جزییات
                </button>
            </div> */}
        </div>
    )
}

export default ImageBox
