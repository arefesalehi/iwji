import React from 'react'

const Pagination = () => {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a
              href="#"
              className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 ms-0 px-3 border border-e-0 border-gray-300 dark:border-gray-700 rounded-s-lg h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="z-10 flex justify-center items-center bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 px-3 border dark:border-gray-700 border-blue-300 h-8 text-blue-600 hover:text-blue-700 dark:text-white leading-tight"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 rounded-e-lg h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Pagination
