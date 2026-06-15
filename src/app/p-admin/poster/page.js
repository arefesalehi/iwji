import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import PosterBox from '@/components/templates/p-admin/PosterBox'
import React from 'react'
import posterModel from '@/models/poster'

const page =async () => {
  
  const posters = await posterModel.find({})

  return (
    <>
      <AdminPanelLayout>
        <BreadCrumb  links={[
        
                  { id: 1, title: 'پنل ادمین', href: '/p-admin' },
                  { id: 2, title: ' تصاویر سایت  ', href: '/' },
                  { id: 3, title: '  ایجاد اسلایدر جدید', href: '/p-admin/poster' },
        
                ]}/>
        <PosterBox posters={JSON.parse(JSON.stringify(posters))} />
      </AdminPanelLayout>

    </>
  )
}

export default page