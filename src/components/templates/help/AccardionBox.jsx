'use client'
import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const AccardionBox = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white [box-shadow:rgba(149,157,165,0.2)_0px_8px_24px] mb-3 rounded-xl w-full"
      >
        <div className="flex justify-between p-5">
          <p className="flex justify-center items-center">
            <MdOutlineKeyboardArrowDown />
            <p> {question}</p>
          </p>
          <div>
            {isOpen ? (
              <FaMinusCircle className="text-red-800" />
            ) : (
              <FaPlusCircle className="text-red-800" />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="bg-red-800 p-5 rounded-2xl text-white"> {answer}</div>
        )}
      </div>
    </>
  )
}

export default AccardionBox
