import React from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import TicketBoxDetail from './TicketBoxDetail'
import { HiMiniDocumentText } from 'react-icons/hi2'
import { FaClipboardList } from 'react-icons/fa6'
import { IoTimeSharp } from 'react-icons/io5'
import { HiArrowPath } from 'react-icons/hi2'
import { FaCircle } from 'react-icons/fa'
import Link from 'next/link'

const TicketBox = ({ tickets }) => {
  return (
    <>
      {tickets.map((ticket) => {
        return (
          <>
            <div className="flex flex-col justify-between mx-10 mb-5 border-2 border-gray-200 rounded-[10px] h-[120px] text-sm">
              <div className="flex justify-between">
                <p className="flex items-center mr-5 pt-2">
                  <FaCircle className="w-[10px] h-[10px]" />{' '}
                  <p className="mr-2">{ticket.title}</p>
                </p>
              
                <Link
                    href={`/user-account/tickets/answer/${ticket._id}`}
                  className="flex items-center m-2 p-2 border-2 border-gray-200 rounded-[10px] text-xs"
                >
                  {' '}
                  مشاهده جزئیات <IoIosArrowRoundBack />
                </Link>
              </div>

              <div className="flex">
                <TicketBoxDetail
                  icon={<HiMiniDocumentText />}
                  title="شماره تیکت"
                  desc={ticket._id.slice(20, 24)}
                />
                <TicketBoxDetail
                  icon={<FaClipboardList />}
                  title=" دپارتمان"
                  desc={`${ticket.department.title}`}
                />
                <TicketBoxDetail
                  icon={<IoTimeSharp />}
                  title="زمان"
                  desc={`${new Date(ticket.createdAt).toLocaleDateString(
                    'FA-IR',
                  )}`}
                />
                <TicketBoxDetail
                  icon={<HiArrowPath />}
                  title=" وضعیت"
                  desc={`${ticket.hasAnswer ? 'پاسخ داده شده' : ' بدون پاسخ'} `}             
                  padding
                />
              </div>
            </div>
          </>
        )
      })}
    </>
  )
}

export default TicketBox
