
'use client'
import React from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import DOMPurify from 'dompurify';
import { useTranslation } from 'react-i18next';
const ArticleBody = ({ article }) => {
    const {t} = useTranslation('article')
  return (
    <>
      <div className="ml-5 basis-full md:basis-4/5">
        <div className="mt-20 w-full h-[450px]">
          <Image
            src={article.img}
            className="rounded-[30px] w-full h-[450px]"
            width={800}
            height={200}
            alt="pic"
          />
          <div className="flex my-3 text-xs">
            <span className="flex ml-3">
              <FaStar />{' '}
              <p className="mr-1">
               {new Date(article.createdAt).toLocaleDateString('fa-IR')}

              </p>
            </span>
            <span className="flex ml-3">
              <FaStar /> <p className="mr-1">175 {t('views')} </p>
            </span>
            <span className="flex ml-3">
              <FaStar /> <p className="mr-1">5 {t('comments')}</p>
            </span>
          </div>
        </div>

        <h1 className="mt-20 font-bold text-3xl"> {article.title}</h1>
        <p className="mt-10 text-justify leading-[30px]">{article.description}</p>
         

        <div className="justify-center items-center bg-gray-200 mt-5 w-full h-[200px] fex"></div>
           <p   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.articlebody) }}  className="mt-10 text-justify leading-[30px]"></p>
      
      </div>
    </>
  )
}

export default ArticleBody
