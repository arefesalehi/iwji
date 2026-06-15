import React from 'react'

const InfoBox = ({ title, chart, icon, count }) => {
  return (
    <>
      <div className="bg-white rounded-xl w-[180px] h-[160px]">
        <div className="flex justify-between px-3 py-5">
          <span className="bg-blue-500 p-3 rounded-[50%] text-white">
            <span className="">{icon}</span>
          </span>
          <span>
            <div className="text-white">{chart}</div>
          </span>
        </div>
        <div className="p-3">
          <p className="font-bold">{count}+</p>
          <p className="text-gray-400 text-sm"> {title}</p>
        </div>
      </div>
    </>
  )
}

export default InfoBox
