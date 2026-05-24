import Image from 'next/image'
import React from 'react'

const SingleService = ({ reverse, title, desc1, desc2, desc3 , img, desc4, desc5}) => {
  return (
    <>
      <div className="h-[600px] container">
        <div
          className={`flex h-[500px] singleComponent mt-10  ${
            reverse ? 'flex-row-reverse' : ''
          }`}
        >
          <div className={`p-2   basis-2/3 }`}>
            <div className="flex justify-around items-center pt-5 pb-5 border-red-800 border-b-4 font-bold text-3xl">
              <h1> {title}</h1>
            </div>
            <ul className="p-20 text-md text-justify">
              <li>
                <p className="leading-[30px]">{desc1}</p>
              </li>
              <li>
                <p className="pt-5 leading-[30px]">{desc2} </p>
              </li>
              <li>
                <p className="pt-5 leading-[30px]">{desc3} </p>
              </li>
                 <li>
                <p className="pt-5 leading-[30px]">{desc4} </p>
              </li>
               <li>
                <p className="pt-5 leading-[30px]">{desc5} </p>
              </li>
            </ul>
          </div>
          <div className={` basis-1/3 `}>
            <Image
              src={img}
              alt="pic"
              width={700}
              height={900}
              className="h-[500px]"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleService
