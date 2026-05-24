import Link from 'next/link'
import React from 'react'

const CourseBox = ({ name, description, href, shortName }) => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg max-w-xs">
          <a href="#">
            <img
              className="rounded-t-lg w-full max-h-[300px]"
              src="/images/rob-lambert-9Q_pLLP_jmA-unsplash.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 font-bold text-gray-900 dark:text-white text-base tracking-tight">
                {name}
              </h5>
            </a>
            <p className="mb-5 font-normal text-gray-700 dark:text-gray-400 text-sm">
              {description}
            </p>
            <div className="flex justify-between">
              <Link
                href={`/courses/${href}/${shortName}`}
                className="inline-flex items-center bg-red-800 hover:bg-red-900 dark:bg-blue-600 dark:hover:bg-blue-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-white text-sm text-center"
              >
                اطلاعات دوره
            
              </Link>

               <Link
                href={`/user-account/myCourses/classinfo/${shortName}`}
                className="inline-flex items-center bg-red-800 hover:bg-red-900 dark:bg-blue-600 dark:hover:bg-blue-700 px-3 py-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium text-white text-sm text-center"
              >
                اطلاعات کلاس
               
              </Link>
            </div>
          </div>
        </div>
      </div>

       
    </>
  )
}

export default CourseBox
