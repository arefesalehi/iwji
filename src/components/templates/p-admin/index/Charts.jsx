import React from 'react'
import MyPieCharts from './MyPieCharts'
import { BsFillTicketDetailedFill } from 'react-icons/bs'
import { FaCommentAlt } from 'react-icons/fa'
import MyLinechart from './MyLinechart'
import Link from 'next/link'

const Charts = ({ users, registercourse, iiwMembership, webinarUsers , tickets, comments}) => {

  
  // تیکت‌ها
  const totalTickets = tickets?.length || 0
  const answeredTickets = tickets?.filter(item => item.hasAnswer === true).length || 0

  // کامنت‌ها
  const totalComments = comments?.length || 0
  const answeredComments = comments?.filter(item => item.isAnswer === true).length || 0

  // کل (تیکت + کامنت)
  const totalItems = totalTickets + totalComments
  const totalAnswered = answeredTickets + answeredComments

  // درصد نهایی
  const totalPercentage = totalItems > 0 ? ((totalAnswered / totalItems) * 100).toFixed(1) : 0
  return (
    <>
      <div className="flex gap-5 m-auto mt-5 rounded-xl w-[90%] h-[430px] ga">
        <div className="bg-white rounded-xl basis-8/12">
          <MyLinechart  registercourse={registercourse} iiwMembership={iiwMembership}   />
        </div>
        <div className="bg-white rounded-xl basis-4/12">
          <p className="p-5 border-gray-200 border-b-2">
            نمایش تیکت ها و کامنت ها
          </p>

          <h1 className="mt-10 font-bold text-center">پاسخ داده شده ها</h1>
          <p className="mt-5 font-bold text-lg text-center">{totalPercentage}%</p>

          <div className="flex justify-between items-center bg-blue-200 m-auto mt-20 px-5 py-8 rounded-lg w-[85%] h-[30px]">
            <span className="flex justify-center items-center bg-blue-500 rounded w-[40px] h-[40px] text-white">
              {' '}
              <BsFillTicketDetailedFill />
            </span>
            <p className="text-blue-500 text-xl">{tickets.length||0}</p>
            <Link href='/p-admin/tickets' className="bg-white px-2 py-1 border-1 border-blue-500 rounded-xl text-sm">
              {tickets.some((item)=> item.hasAnswer === false ) ? "در حال پیشرفت":"تکمیل شده"}
            </Link>
          </div>

          <div className="flex justify-between items-center bg-green-200 m-auto mt-5 px-5 py-8 rounded-lg w-[85%] h-[30px]">
            <span className="flex justify-center items-center bg-blue-500 rounded w-[40px] h-[40px] text-white">
              <FaCommentAlt />
            </span>
            <p className="text-blue-500 text-xl">{comments.length||0}</p>
            <Link href='/p-admin/comment' className="bg-white px-2 py-1 border-1 border-green-400 rounded-xl text-sm">
              {comments.some((item)=> item.isAnswer === false ) ? "در حال پیشرفت":"تکمیل شده"}
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-xl basis-4/12">
          <p className="p-5 border-gray-200 border-b-2">نمایش کاربران</p>
          <MyPieCharts
          className=''
            users={users}
            registercourse={registercourse}
            iiwMembership={iiwMembership}
            webinarUsers={webinarUsers}
          />
        </div>
      </div>
    </>
  )
}

export default Charts
