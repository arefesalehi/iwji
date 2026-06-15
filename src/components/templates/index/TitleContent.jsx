import React from 'react'

const TitleContent = ({ title }) => {
  return (
    <>
      <div className="flex justify-center items-center pt-16 w-full">
        <div className="border border-red-800 border-b-2 border-solid w-[50px]"></div>
        <p className="mx-3 font-bold text-[25px] text-red-800">{title}</p>
        <div className="border border-red-800 border-b-2 border-solid w-[50px]"></div>
      </div>
    </>
  )
}

export default TitleContent
