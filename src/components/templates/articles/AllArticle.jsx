'use client'
import ArticleBox from '@/components/modules/ArticleBox'
import BreadCrumb from '@/components/modules/BreadCrumb'
import React, { useState } from 'react'
import Pagination from '@/components/modules/p-admin/Pagination'
import { useTranslation } from 'react-i18next'
const AllArticle = ({ articles }) => {
  const {t} =useTranslation('article')
   const [currentPage, setCurrentPage] = useState(1)
    const teamsPerPage = 6
    const indexOfLastArticle = currentPage * teamsPerPage
    const indexOfFirstArticle = indexOfLastArticle - teamsPerPage
    const currentarticle = articles.slice(
      indexOfFirstArticle,
      indexOfLastArticle,
    )
  return (
    <>
      <BreadCrumb title={t('articles')} />
      <div className="container">
        <div className="flex flex-wrap">
          {currentarticle.map((article) => {
            return <ArticleBox key={article._id} {...article} />
          })}
        </div>

        <div className="flex justify-center items-center m-20">
          <Pagination         currentPage={currentPage}
            totalItems={articles.length}
            itemsPerPage={6}
            onPageChange={setCurrentPage}
            label={t('articles')}  />
        </div>
      </div>
    </>
  )
}

export default AllArticle
