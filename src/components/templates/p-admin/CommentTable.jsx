// 'use client'

// import { showswal } from '@/utils/helper'
// import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { AiOutlineStar } from 'react-icons/ai'
// import { FaStar } from 'react-icons/fa'
// import swal from 'sweetalert'

// const CommentTable = ({ comments , user }) => {
//   const [all, setAll] = useState(comments)

//   useEffect(() => {
//     getAll()
//   }, [])

//   const getAll = async () => {
//     const res = await fetch('/api/comment')
//     const data = await res.json()
//     setAll(data)
//   }
//   const router = useRouter()

//   const showComment = (body) => {
//     showswal(body, undefined, 'ok')
//   }

//   const deleteComment = (commentID) => {
//     swal({
//       title: 'ایا از حذف اطمینان دارید ؟',
//       icon: 'warning',
//       buttons: ['خیر', 'بله'],
//     }).then(async (result) => {
//       if (result) {
//         const res = await fetch(`/api/comment/${commentID}`, {
//           method: 'DELETE',
//         })
//         if (res.ok) {
//           swal({
//             title: 'کامنت با موفقیت حذف شد',
//             icon: 'success',
//             buttons: 'ok',
//           }).then(() => getAll())
//         }
//       }
//     })
//   }

//   const acceptComment = async (acceptID) => {
//     const res = await fetch('/api/comment/accept', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id: acceptID }),
//     })
//     if (res.ok) {
//       swal({
//         title: 'کامنت با موفقیت تایید شد',
//         icon: 'success',
//         buttons: 'ok',
//       }).then(() => {
//         // router.refresh()
//         getAll()
//       })
//     }
//   }

//   const rejectComment = async (rejectID) => {
//     const res = await fetch('/api/comment/reject', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ id: rejectID }),
//     })
//     if (res.ok) {
//       swal({
//         title: 'کامنت با موفقیت رد شد',
//         icon: 'success',
//         buttons: 'ok',
//       }).then(() => {
//         // router.refresh()
//         getAll()
//       })
//     }
//   }

// const replyComment = async (commentID, courseID) => {
//   swal({
//     title: "پاسخ به کامنت",
//     content: {
//       element: "input",
//       attributes: {
//         placeholder: "متن پاسخ خود را وارد کنید...",
//         type: "text",
//       },
//     },
//     buttons: ["انصراف", "ارسال"],
//   }).then(async (text) => {
//     if (!text) return // اگر کاربر چیزی ننویسه یا انصراف بده

//     const res = await fetch("/api/comment/reply", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         body: text,
//         author:user._id,
//         score: 5,
//         course: courseID,
//         mainCommentID: commentID,
//       }),
//     })

//     if (res.ok) {
//       swal({
//         title: "پاسخ با موفقیت ثبت شد",
//         icon: "success",
//         buttons: "باشه",
//       })
//     } else {
//       swal({
//         title: "خطا در ثبت پاسخ",
//         icon: "error",
//         buttons: "باشه",
//       })
//     }
//   })
// }

//   return (
//     <>
//       <div className="bg-white m-auto rounded-lg w-[90%]">
//         <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
//           <div className="flex md:flex-row flex-column flex-wrap justify-between items-center space-y-4 md:space-y-0 bg-white dark:bg-gray-900 px-5 py-10 pb-4">

//             <label htmlFor="table-search" className="sr-only">
//               Search
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 rtl:inset-r-0 flex items-center ps-3 pointer-events-none start-0">
//                 <svg
//                   className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//                   />
//                 </svg>
//               </div>
//               <input
//                 // value={inputValue}
//                 // onChange={(e) => setInputValue(e.target.value)}
//                 type="text"
//                 id="table-search-users"
//                 className="block bg-gray-50 dark:bg-gray-700 p-2 ps-10 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-80 text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
//                 placeholder="Search for users"
//               />
//             </div>
//           </div>

//           <table className="m-auto w-[98%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
//             <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
//               <tr>
//                 <th scope="col" className="px-6 py-3">
//                   ردیف
//                 </th>

//                 <th scope="col" className="px-6 py-3">
//                   نام و نام خانوادگی
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   دوره
//                 </th>

//                 <th scope="col" className="px-6 py-3">
//                   سوال/جواب
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   تاریخ ثبت
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   مشاهده
//                 </th>

//                 <th scope="col" className="px-6 py-3">
//                   حذف
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   تایید/رد
//                 </th>

//                 <th scope="col" className="px-6 py-3">
//                   پاسخ
//                 </th>

//               </tr>
//             </thead>
//             <tbody>
//               {all.map((comment, index) => {
//                 return (
//                   <tr
//                     key={comment._id}
//                     className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
//                   >
//                     <td className="px-6 py-4">{index + 1}</td>
//                     {/* {comment?.author?.name} */}
//                     <th
//                       scope="row"
//                       className="flex items-center px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap"
//                     >

//                       <div className="ps-3">
//                         <div className="font-semibold text-sm">
//                           {comment.author?.name}{' '}
//                         </div>
//                         <div className="flex font-normal text-gray-500">
//                           {new Array(comment?.score)
//                             .fill(0)
//                             .map((item, index) => {
//                               return (
//                                 <FaStar
//                                   key={index}
//                                   className="text-yellow-600"
//                                 />
//                               )
//                             })}
//                           {new Array(5 - comment?.score)
//                             .fill(0)
//                             .map((item, index) => {
//                               return (
//                                 <AiOutlineStar
//                                   key={index}
//                                   className="text-yellow-500"
//                                 />
//                               )
//                             })}
//                         </div>
//                       </div>
//                     </th>
//                     <td className="px-6 py-4">{comment?.course?.name}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center">
//                         {comment?.isAnswer === true ? 'جواب' : 'سوال'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <a
//                         href="#"
//                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                       >
//                         {new Date(
//                           comment?.createdAt.slice(0, 10),
//                         ).toLocaleDateString('fa-ir')}
//                       </a>
//                     </td>
//                     <td className="px-6 py-4">
//                       <a
//                         onClick={() => showComment(comment?.body)}
//                         href="#"
//                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                       >
//                         مشاهده
//                       </a>
//                     </td>

//                     <td
//                       onClick={() => deleteComment(comment._id)}
//                       className="px-6 py-4"
//                     >
//                       <a
//                         href="#"
//                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                       >
//                         حذف
//                       </a>
//                     </td>
//                     <td className="px-6 py-4">
//                       <a
//                         href="#"
//                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                       >
//                         {comment.isAccept === true ? (
//                           <button
//                             onClick={() => rejectComment(comment._id)}
//                             className="bg-green-900 px-3 py-1 rounded-lg text-white"
//                             type=""
//                           >
//                             تایید
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => acceptComment(comment._id)}
//                             className="bg-red-800 px-3 py-1 rounded-lg text-white"
//                             type=""
//                           >
//                             رد
//                           </button>
//                         )}
//                       </a>
//                     </td>
//                     <td className="px-6 py-4">
//                       <a
//                           onClick={() => replyComment(comment._id, comment.course?._id)}
//                         href="#"
//                         className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
//                       >
//                         پاسخ
//                       </a>
//                     </td>

//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>

//           <nav
//             className="flex md:flex-row flex-column flex-wrap justify-between items-center bg-white px-5 py-10 pt-4"
//             aria-label="Table navigation"
//           >
//             <span className="block md:inline mb-4 md:mb-0 w-full md:w-auto font-normal text-gray-500 dark:text-gray-400 text-sm">
//               Showing{' '}
//               <span className="font-semibold text-gray-900 dark:text-white">
//                 1-10
//               </span>{' '}
//               of{' '}
//               <span className="font-semibold text-gray-900 dark:text-white">
//                 1000
//               </span>
//             </span>
//             <ul className="inline-flex -space-x-px rtl:space-x-reverse h-8 text-sm">
//               <li>
//                 <a
//                   href="#"
//                   className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 ms-0 px-3 border border-gray-300 dark:border-gray-700 rounded-s-lg h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
//                 >
//                   Previous
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
//                 >
//                   1
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
//                 >
//                   2
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   aria-current="page"
//                   className="flex justify-center items-center bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-blue-600 hover:text-blue-700 dark:text-white"
//                 >
//                   3
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
//                 >
//                   4
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
//                 >
//                   5
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex justify-center items-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 border border-gray-300 dark:border-gray-700 rounded-e-lg h-8 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"
//                 >
//                   Next
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CommentTable

'use client'

import Pagination from '@/components/modules/p-admin/Pagination'
import { showswal } from '@/utils/helper'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { FaStar } from 'react-icons/fa'
import swal from 'sweetalert'

const CommentTable = ({ comments, user }) => {
  const [all, setAll] = useState(comments)

  const router = useRouter()

  const [currentPage, setCurrentPage] = useState(1)
  const mainComments = comments.filter((c) => !c.mainCommentID)

  const commentPerPage = 5
  const indexOfLastArticle = currentPage * commentPerPage
  const indexOfFirstArticle = indexOfLastArticle - commentPerPage
  const currentComment = mainComments.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  )


  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    const res = await fetch('/api/comment')
    const data = await res.json()
    setAll(data)
  }

  const showComment = (body) => {
    showswal(body, undefined, 'ok')
  }

  const deleteComment = async (commentID) => {
    swal({
      title: 'ایا از حذف اطمینان دارید ؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/comment/${commentID}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          swal({
            title: 'کامنت با موفقیت حذف شد',
            icon: 'success',
            buttons: 'ok',
          })
          getAll()
        }
      }
    })
  }

  const acceptComment = async (acceptID) => {
    const res = await fetch('/api/comment/accept', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: acceptID }),
    })
    if (res.ok) {
      swal({
        title: 'کامنت با موفقیت تایید شد',
        icon: 'success',
        buttons: 'ok',
      })
      getAll()
    }
  }

  const rejectComment = async (rejectID) => {
    const res = await fetch('/api/comment/reject', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: rejectID }),
    })
    if (res.ok) {
      swal({ title: 'کامنت با موفقیت رد شد', icon: 'success', buttons: 'ok' })
      getAll()
    }
  }

  const replyComment = async (commentID, courseID) => {
    swal({
      title: 'پاسخ به کامنت',
      content: {
        element: 'input',
        attributes: {
          placeholder: 'متن پاسخ خود را وارد کنید...',
          type: 'text',
        },
      },
      buttons: ['انصراف', 'ارسال'],
    }).then(async (text) => {
      if (!text) return
      const res = await fetch('/api/comment/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          body: text,
          author: user._id,
          score: 5,
          course: courseID,
          mainCommentID: commentID,
        }),
      })
      if (res.ok) {
        swal({
          title: 'پاسخ با موفقیت ثبت شد',
          icon: 'success',
          buttons: 'باشه',
        })
        getAll()
      } else {
        swal({ title: 'خطا در ثبت پاسخ', icon: 'error', buttons: 'باشه' })
      }
    })
  }

  return (
    <div className="bg-white m-auto py-20 rounded-lg w-[90%]">
      <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
        <table className="m-auto w-[98%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
          <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">ردیف</th>
              <th className="px-6 py-3">نام و نام خانوادگی</th>
              <th className="px-6 py-3">دوره</th>
              <th className="px-6 py-3">سوال/جواب</th>
              <th className="px-6 py-3">تاریخ ثبت</th>
              <th className="px-6 py-3">مشاهده</th>
              <th className="px-6 py-3">حذف</th>
              <th className="px-6 py-3">تایید/رد</th>
              <th className="px-6 py-3">پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {currentComment
              .filter((c) => !c.mainCommentID)
              .map((comment, index) => {
                const replies = all.filter(
                  (r) => r.mainCommentID?.toString() === comment._id.toString(),
                )
                return (
                  <React.Fragment key={comment._id}>
                    <tr className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-300 border-b">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{comment.author?.name}</td>
                      <td className="px-6 py-4">{comment.course?.name}</td>
                      <td className="px-6 py-4">
                        {comment.isAnswer ? 'جواب' : 'سوال'}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(comment.createdAt).toLocaleDateString(
                          'fa-IR',
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() => showComment(comment?.body)}
                          href="#"
                          className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-blue-700 text-sm"
                        >
                          مشاهده
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() => deleteComment(comment._id)}
                                                    className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"

                        >
                          حذف
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {comment.isAccept ? (
                          <button
                            onClick={() => rejectComment(comment._id)}
                            className="bg-green-900 px-3 py-1 rounded-lg text-white"
                          >
                            تایید
                          </button>
                        ) : (
                          <button
                            onClick={() => acceptComment(comment._id)}
                            className="bg-red-800 px-3 py-1 rounded-lg text-white"
                          >
                            رد
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <a
                          onClick={() =>
                            replyComment(comment._id, comment.course?._id)
                          }
                          className="bg-green-100 hover:bg-green-200 px-3 py-1 rounded text-green-700 text-sm"
                        >
                          پاسخ
                        </a>
                      </td>
                    </tr>
                    {replies.map((reply) => (
                      <tr
                        key={reply._id}
                        className="bg-green-50 dark:bg-gray-700 border-gray-300 border-b"
                        style={{ minHeight: '80px' }} // ارتفاع بیشتر
                      >
                        <td className="px-6 py-4">
                          {new Date(reply.createdAt).toLocaleDateString(
                            'fa-IR',
                          )}
                        </td>
                        {/* این ستون می‌تونه خالی بمونه */}
                        <td className="px-6 py-4">{reply.author?.name}</td>

                        {/* این td متن پاسخ است و ستون‌های خالی بعدش رو با colSpan ادغام می‌کنیم */}
                        <td className="px-6 py-4" colSpan={6}>
                          {reply.body}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            onClick={() => deleteComment(reply._id)}
                            className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                          >
                            حذف
                          </a>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                )
              })}
          </tbody>
        </table>
       <Pagination
             currentPage={currentPage}
            totalItems={mainComments.length}
            itemsPerPage={5}
            onPageChange={setCurrentPage}
            label="کامنت ها "
        />
      </div>
    </div>
  )
}

export default CommentTable
