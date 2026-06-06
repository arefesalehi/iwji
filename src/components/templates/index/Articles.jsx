'use client'
import React from 'react'
import TitleContent from './TitleContent'
import ArticleBox from '@/components/modules/ArticleBox'
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
const Articles = ({ articles }) => {
        const { t, i18n} = useTranslation('article')
  const items = Array.isArray(articles) ? articles.filter(Boolean) : []

  if (!items.length) return null

  return (
    <>
      <div className="bg-gray-300 pb-10 w-full h-auto">
        <TitleContent title={t('articles')} />
        <div className="flex flex-wrap justify-evenly items-center container">
          {items.map((article) => {
            return <ArticleBox key={article._id} {...article} />
          })}
        </div>

        <div className="flex justify-center items-center mt-10">
          <Link
            href="/articles"
            className="flex justify-center items-center bg-red-800 mt-5 px-8 py-2 rounded-[10px] text-white"
          >
           {t('viewAllPosts')} {i18n.language==='fa' ? <IoMdArrowDropleft />  : <IoMdArrowDropright /> }
          </Link>
        </div>
      </div>
      <div className="right-[-700px] absolute flex justify-center items-center w-full overflow-hidden">
        <svg
          className="block z-100 relative w-full h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
        >
          <polygon fill="oklch(87.2% .01 258.338)" points="0,0 100,0 50,100" />
        </svg>
      </div>
    </>
  )
}

export default Articles
