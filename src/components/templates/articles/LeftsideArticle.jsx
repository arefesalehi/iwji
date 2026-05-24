'use client'
import React from 'react'
import SideArticleBox from '@/components/templates/articles/SideArticleBox'
import Sidepromote from '@/components/modules/Sidepromote'
import { useTranslation } from 'react-i18next'

const LeftsideArticle = () => {
    const {t} = useTranslation('article')
  return (
    <>

   <div className='invisible md:visible justify-center items-center basis-2/5'>
          <SideArticleBox title={t('related')} />
          <Sidepromote  />
        </div>
    </>
  )
}

export default LeftsideArticle