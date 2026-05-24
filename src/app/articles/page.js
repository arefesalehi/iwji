import ArticleBox from '@/components/modules/ArticleBox'

import Pagination from '@/components/modules/Pagination'
import React from 'react'

import articleModel from '@/models/article'
import AllArticle from '@/components/templates/articles/AllArticle'
const page =async () => {
    const articles = await articleModel.find({publish:true}).populate('creator')
    // console.log('articles==>', articles);
    
    return (
        <>
          


              <AllArticle  articles={JSON.parse(JSON.stringify(articles))}  />





        </>
    )
}

export default page