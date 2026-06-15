import React from 'react'

const CourseModule = ({ type, title, text }) => {
  return (
    <>
      <div className="bg-white mt-5 p-2 rounded-[10px] w-[90%] h-auto">
        <h1 className="mb-2 font-semibold text-sm">
          {' '}
          <span className="font-bold text-red-800">{type}</span> {title}
        </h1>
        <p className="text-sm">{text}</p>
      </div>
    </>
  )
}

export default CourseModule
