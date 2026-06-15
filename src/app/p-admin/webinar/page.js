import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import WebinarBox from '@/components/templates/p-admin/WebinarBox'
import React from 'react'

const page = () => {
  return (
    <>
      <AdminPanelLayout>
        <BreadCrumb links={[

          { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: '  ایجاد وبینار ', href: '/p-admin/webinar' },

        ]} />
        <WebinarBox />
      </AdminPanelLayout>


    </>
  )
}

export default page