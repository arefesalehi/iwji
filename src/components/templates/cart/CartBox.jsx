import React from 'react'
import { MdDelete } from "react-icons/md";

const CartBox = () => {
  return (
    <>
      <div className="flex justify-between items-center p-3 border-1 border-gray-200 rounded-lg w-[90%] h-[100px]">
        <span className='flex flex-col gap-3'>
         
          <h2 className='font-semibold'>دوره مهندسی بین المللی جوش</h2>
          <p className='text-gray-500'> مبلغ ریالی 100 یورو</p>
        </span>

        <span ><MdDelete className='w-[25px] h-[25px] text-red-800'/></span>
      </div>
    </>
  )
}

export default CartBox
