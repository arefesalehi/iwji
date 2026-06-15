'use client'
import React from 'react'
import { useState } from 'react'
const PishkhanCards = ({ title, color, count, icon, shadowcolor }) => {
  const [isHovered, setIsHovered] = useState(false)
  const shadowValue = isHovered ? 'none' : shadowcolor
  return (
    <>
      <div
        style={{ boxShadow: shadowValue }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex ${color} hover:scale-95 transition-transform duration-800 hover:translate-y-2 flex-col text-white justify-evenly   mt-5 px-5 rounded-[20px] w-[220px] h-[150px]`}
      >
        <div className="flex justify-between">
          <div>{count} </div>
          {icon}
        </div>
        <div> {title} </div>
      </div>
    </>
  )
}

export default PishkhanCards
