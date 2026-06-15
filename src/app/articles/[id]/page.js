
import React from 'react'
import ArticleBody from '@/components/templates/articles/ArticleBody'
import articleModel from '@/models/article'
import ConnectToDB from '@/configs/db'
import LeftsideArticle from '@/components/templates/articles/LeftsideArticle'


const page = async ({ params }) => {
  await ConnectToDB()
  const articleID = params.id
  const article = await articleModel.findOne({ _id: articleID })


  return (
    <>

      <div className='container  h-auto  md:flex  block  '>
        <ArticleBody article={JSON.parse(JSON.stringify(article))} />
        <LeftsideArticle />
      </div>


    </>
  )
}

export default page