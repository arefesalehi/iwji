'use client'
import BreadCrumb from '@/components/modules/BreadCrumb'
import SingleService from '@/components/templates/services/SingleService'
import React from 'react'
import { useTranslation } from 'react-i18next'
const page = () => {
    const { t } = useTranslation('services')
    return (
        <>
            <BreadCrumb title={t('breadcrumb')} img='/images/fakurian-design-lOl78pdT9hc-unsplash.jpg' />
            <SingleService
                title={t('title1')}
                desc1={t('desc1')}
                desc2={t('desc2')}
                desc3={t('desc3')}
                img='/images/ChatGPT Image Jul 12, 2025, 11_41_29 AM.png'
            />
            <SingleService
                reverse
                title={t('title2')}
                desc1={t('desc4')}
                desc2={t('desc5')}
                desc3={t('desc6')}
                desc4={t('desc7')}
                img='/images/ChatGPT Image Jul 12, 2025, 11_41_29 AM.png'
            />

            <SingleService
                title={t('title3')}
                desc1={t('desc8')}
                desc2={t('desc9')}
                desc3={t('desc10')}
                img='/images/ChatGPT Image Jul 12, 2025, 11_41_29 AM.png'
            />


            <SingleService
                reverse
                title={t('title4')}
                desc1={t('desc11')}
                desc2={t('desc12')}
                desc3={t('desc13')}
                desc4={t('desc14')}
                desc5={t('desc15')}
                img='/images/ChatGPT Image Jul 12, 2025, 11_41_29 AM.png'
            />


        </>
    )
}

export default page