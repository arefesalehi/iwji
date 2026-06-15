import Image from 'next/image'
import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'

const TeamBox = ({ img, username, position }) => {
  if (!img) return null

  return (
    <>
      <div className="flex flex-col items-center bg-gray-200 rounded-[20px] w-[280px] h-[450px]">
        <div className="bg-white mt-8 rounded-[20px] w-[220px] h-[200px]">
          <Image
            alt="pic"
            src={img}
            width={220}
            height={200}
            className="rounded-[0px] w-[220px] h-[200px]"
          />
        </div>
        <h1 className="mt-8 font-bold text-md">{username}</h1>
        <p className="mt-2 text-gray-400"> {position}</p>
        <div className="flex justify-between mt-5 w-[45%]">
          <FaInstagram className="w-[25px] h-[25px] text-red-800" />
          <FaLinkedin className="w-[25px] h-[25px] text-red-800" />
          <FaTwitter className="w-[25px] h-[25px] text-red-800" />
        </div>

        <button className="bg-gray-500 mt-5 px-18 py-2 rounded-[10px] text-white">
          مشاهده رزومه
        </button>
      </div>
    </>
  )
}

export default TeamBox
