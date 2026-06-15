

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
