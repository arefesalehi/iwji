'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaStar } from 'react-icons/fa'
import swal from 'sweetalert'
const courseCommentForm = ({ course, user }) => {
  const { t } = useTranslation('commentform')
  const [CommentScore, setCommentScore] = useState('')
  const [body, setBody] = useState('')

  const clickHandler = async (e) => {
    e.preventDefault()

    if (!user) {
      swal({
        title: 'برای ثبت کامنت لطفاً ابتدا وارد حساب کاربری خود شوید',
        icon: 'warning',
        buttons: 'ok',
      })
      return
    }

    const res = await fetch('/api/comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body,
        author: user._id,
        mainCommentID: null,
        score: CommentScore,
        isAnswer: false,
        isAccept: false,
        course: course._id,
      }),
    })

    console.log('res comment=>', res)
    if (res.ok) {
      swal({
        title: 'کامنت با موفقیت ثبت شد',
        icon: 'success',
        buttons: 'ok',
      })
    }
  }

  return (
    <div>
      <div className="mt-20 w-full text-xl">
        <h1 className="text-base lg:text-lg">{t('commentForm.title')}</h1>
        <p className="mt-5 mb-5 text-gray-400 text-sm">
          {t('commentForm.emailNotice')}
        </p>

        <p className="flex mb-2 text-sm">
          <strong>{t('commentForm.score')}</strong>
          <FaStar
            className="text-gray-500 hover:text-yellow-500"
            onClick={() => setCommentScore(5)}
          />
          <FaStar
            className="text-gray-500 hover:text-yellow-500"
            onClick={() => setCommentScore(4)}
          />
          <FaStar
            className="text-gray-500 hover:text-yellow-500"
            onClick={() => setCommentScore(3)}
          />
          <FaStar
            className="text-gray-500 hover:text-yellow-500"
            onClick={() => setCommentScore(2)}
          />
          <FaStar
            className="text-gray-500 hover:text-yellow-500"
            onClick={() => setCommentScore(1)}
          />
        </p>
        <strong className="flex justify-start mb-2 text-sm">
          {t('commentForm.commentLabel')}
        </strong>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-3 pt-2 pr-2 border border-gray-400 rounded-[5px] outline-none w-full h-[100px]"
        ></textarea>

        <button
          onClick={clickHandler}
          type="submit"
          className="bg-[#02693a] mb-3 pt-2 pr-3 pb-2 pl-3 rounded-[5px] w-full h-[50px] text-white text-sm"
        >
          {t('commentForm.submit')}
        </button>
      </div>
    </div>
  )
}

export default courseCommentForm
