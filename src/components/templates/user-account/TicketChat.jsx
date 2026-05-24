// import React from 'react'
// import TitleComponent from '@/components/templates/user-account/TitleComponent'
// import Link from 'next/link'

// const TicketChat = ({ tickets }) => {
//   return (
//     <>
//       <div className="flex justify-between items-center border-gray-200 border-b-2">
//         <TitleComponent title="نمایش چت ها" />
//         <Link
//           href="/user-account/tickets"
//           className="bg-gray-200 ml-10 p-2 rounded-[10px] text-black text-sm"
//         >
//           {' '}
//           بازگشت
//         </Link>
//       </div>

//       <div className="px-10">
//         {tickets
//           .filter((t) => !t.isAnswer)
//           .map((ticket) => {
//             return (
//               <>
//                 {/*question box*/}
//                 <div className="flex mt-10 w-full question">
//                   <div className="bg-gray-100 border-1 border-gray-200 rounded-[10px] w-2/3 min-h-[80px]">
//                     <p className="p-2 text-sm">{ticket.body}</p>
//                   </div>
//                   <div className="w-1/3 min-h-[80px]"></div>
//                 </div>
//                 <span className="flex mt-2 text-xs">
//                   <p className="ml-2">{ticket.user.name}</p>
//                   <p>
//                     {new Date(ticket.createdAt).toLocaleDateString('fa-ir')}
//                   </p>
//                 </span>
//               </>
//             )
//           })}

//         {/*answer box*/}

      

//         <div className="flex mt-10 w-full answer">
//           <div className="w-1/3 min-h-[80px]"> </div>

//           <div className="bg-gray-600 border-1 border-gray-700 rounded-[10px] w-2/3 min-h-[80px]">
//             <p className="p-2 text-white text-sm">fsdf</p>
//           </div>
//         </div>
//         <span className="flex justify-end mt-2 text-xs">
//           <p className="ml-2">sdfsd</p>
//           <p>18/5/2022</p>
//         </span>
//       </div>
//     </>
//   )
// }

// export default TicketChat


import React from 'react'
import TitleComponent from '@/components/templates/user-account/TitleComponent'
import Link from 'next/link'

const TicketChat = ({ tickets }) => {
  return (
    <>
      <div className="flex justify-between items-center border-gray-200 border-b-2">
        <TitleComponent title="نمایش چت ها" />
        <Link
          href="/user-account/tickets"
          className="bg-gray-200 ml-10 p-2 rounded-[10px] text-black text-sm"
        >
          بازگشت
        </Link>
      </div>

      <div className="px-10">
        {tickets
          .filter((t) => !t.isAnswer) // فقط سوال‌ها
          .map((ticket) => {
            const replies = tickets.filter((r) => {
              const mainId =
                typeof r.mainTicket === 'object' ? r.mainTicket?._id : r.mainTicket
              return r.isAnswer && mainId?.toString() === ticket._id.toString()
            })

            return (
              <div key={ticket._id} className="mb-8">
                {/* سوال */}
                <div className="flex mt-10 w-full question">
                  <div className="bg-gray-100 border border-gray-200 rounded-[10px] w-2/3 min-h-[80px]">
                    <p className="p-2 text-sm">{ticket.body}</p>
                  </div>
                  <div className="w-1/3"></div>
                </div>
                <span className="flex mt-2 text-xs">
                  <p className="ml-2">{ticket.user?.name}</p>
                  <p>{new Date(ticket.createdAt).toLocaleDateString('fa-ir')}</p>
                </span>

                {/* جواب‌ها */}
                {replies.length > 0 ? (
                  replies.map((reply) => (
                    <div key={reply._id}>
                      <div className="flex mt-4 w-full answer">
                        <div className="w-1/3"></div>
                        <div className="bg-gray-600 p-2 border border-gray-700 rounded-[10px] w-2/3">
                          <p className="text-white text-sm">{reply.body}</p>
                        </div>
                      </div>
                      <span className="flex justify-end mt-2 text-xs">
                        <p className="ml-2">{reply.user?.name}</p>
                        <p>{new Date(reply.createdAt).toLocaleDateString('fa-ir')}</p>
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="mt-2 text-gray-400 text-xs">هنوز جوابی ثبت نشده</p>
                )}
              </div>
            )
          })}
      </div>
    </>
  )
}

export default TicketChat
