import Link from 'next/link'
import React from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'

const BreadCrumb = ({ links }) => {
  return (
    <>
      <div className="my-4 w-3/4">
        <nav
          className="flex dark:bg-gray-800 px-5 py-3 dark:border-gray-700 rounded-lg text-gray-700"
          aria-label="Breadcrumb"
        >
          <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-2">
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="me-2.5 w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                <span className="ms-1 md:ms-2 font-medium text-gray-700 dark:text-gray-400 text-sm">
                  خانه
                </span>
              <MdKeyboardArrowLeft />
              </div>
            </li>
            {links.map((link) => {
              return (
                <li key={link.id} className="inline-flex items-center mr-[-1px]">
                  <Link
                    href={link.href}
                    className="inline-flex items-center font-medium text-gray-700 hover:text-blue-600 dark:hover:text-white dark:text-gray-400 text-sm"
                  >
                    {link.title}
                    {link.id !== links.length ? <MdKeyboardArrowLeft /> : null}
                  </Link>
                </li>
              )
            })}
          </ol>
        </nav>
      </div>
    </>
  )
}

export default BreadCrumb







