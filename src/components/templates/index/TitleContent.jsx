import React from 'react'

const TitleContent = ({title}) => {
  return (
    <>

    <div className='w-full flex items-center justify-center pt-16'>
       <div className='w-[50px] border border-solid border-b-2 border-red-800 '></div>
        <p className='mx-3 text-[25px] text-red-800 font-bold'>{title}</p>
        <div className='w-[50px] border border-solid border-b-2 border-red-800'></div>
    </div>


    </>
  )
}

export default TitleContent