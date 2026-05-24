




import Image from 'next/image'
import React from 'react'
import { FaQuoteLeft } from 'react-icons/fa'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { BsFillPersonFill } from 'react-icons/bs'
import { AiOutlineStar } from 'react-icons/ai'

const CummentBox = ({author, date, body, score }) => {
  return (
    <>
      <div className="flex flex-col items-center bg-gray-100 opacity-[80%] hover:opacity-[100%] backdrop-blur-md rounded-[20px] w-[95%] min-h-[380px]">
        {/* <FaQuoteLeft className='flex justify-start w-[60px] h-[60px] text-red-800' /> */}

        <div className="flex justify-center items-center w-full">
          <Image
            src="/images/kadf.jpg"
            width={150}
            height={150}
            alt="pic"
            className="flex bg-red-200 mt-5 rounded-[50%] w-[150px] h-[150px]"
          />
        </div>

        <h1 className="mt-5 font-bold text-lg"> {author?.name}</h1>
        <span className="flex mr-3">
               {new Array(score).fill(0).map((item, index) => {
                return (
                   <>
                    <FaStar key={index} className="text-yellow-400" />
                  </>
                 )
               })}

               {new Array(5 - score).fill(0).map((item, index) => {
                 return (
                   <>
                     <AiOutlineStar key={index} className="text-yellow-400" />
                   </>
                 )
               })}
             </span>
        {/* <p className="text-gray-400 text-md"> {author?.position}</p> */}
        <p className="p-10 text-center">{body}</p>
      </div>
    </>
  )
}

export default CummentBox
