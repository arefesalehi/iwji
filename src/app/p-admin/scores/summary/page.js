import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import SummaryScore from '@/components/templates/p-admin/SummaryScore'
import React from 'react'

const page = () => {
  return (
    <>
    <AdminPanelLayout>
      <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
        { id: 2, title: '  دوره ', href: '' },
        { id: 3, title: ' نمره دهی', href: '/p-admin/scores' },
        { id: 4, title: '  لیست نمرات', href: '/p-admin/summary' },


      ]} />
      <SummaryScore/>
    </AdminPanelLayout>


    </>
  )
}

export default page
