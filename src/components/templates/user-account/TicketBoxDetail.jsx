import React from 'react'

const TicketBoxDetail = ({ icon, title, desc, padding }) => {
  const bgColor = desc?.includes('بدون پاسخ')
    ? 'bg-red-200 text-red-800'
    : desc?.includes('پاسخ داده شده')
    ? 'bg-green-200 text-green-800'
    : ''
  return (
    <>
      <div className="flex items-center mr-2 pb-3">
        <span className="mr-2">{icon}</span>
        <span className="mr-2">{title}:</span>
        <span
          className={`mr-2   ${
            padding ? 'p-2 bg-gray-200 rounded-[10px] ' : ''
          } ${bgColor}`}
        >
          {desc}
        </span>
      </div>
    </>
  )
}

export default TicketBoxDetail
