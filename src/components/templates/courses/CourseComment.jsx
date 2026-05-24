'use client'
import React from 'react'

import { FaStar } from 'react-icons/fa'
import CommentBox from './CommentBox'
import { BsFillPersonFill } from 'react-icons/bs'
import CourseCommentForm from './courseCommentForm'
import CourseCommentBox from './CourseCommentBox'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
const CourseComment = ({ course, user }) => {
  console.log('course man ==>', course)
  const {t}= useTranslation('commentform')
  return (
    <>
      <h1 className="flex mt-8">
        <div className="bg-white border-red-800 border-b-8 rounded-[10px] w-[40px] h-[15px]"></div>
        <p className={` ${i18n.language ==='fa' ? " mr-3":"ml-3 "} text-xl`}>{t('comments')}</p>
      </h1>

      <div className="bg-white [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] mt-10 mb-20 p-10 rounded-[20px] w-full h-auto text-md text-justify">
        <h1 className="mt-5 font-semibold text-red-800">
          {course.comments.length === 0 ? 'صفر' : course.comments.length}
          {t('comments')} {course.name}
        </h1>

        {course.comments
          .filter((c) => !c.mainCommentID)
          .map((comment) => {
            const replies = course.comments.filter(
              (r) => r.mainCommentID?.toString() === comment._id.toString(),
            )

            return (
              <div key={comment._id} className="flex mt-5 mb-5">
                <div className="flex justify-center items-center bg-gray-200 rounded-[50%] w-[50px] h-[50px]">
                  <BsFillPersonFill />
                </div>

                <CourseCommentBox
                  author={comment.author}
                  date={comment.createdAt}
                  body={comment.body}
                  score={comment.score}
                  replies={replies}
                />
              </div>
            )
          })}

        <CourseCommentForm user={user} course={course} />
      </div>
    </>
  )
}

export default CourseComment
