import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import EditArticle from '@/components/templates/p-admin/EditArticle'
import React from 'react'

const page = () => {
  return (
    <>

    <AdminPanelLayout>
      <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
        { id: 2, title: 'کامنت ها و محتوا', href:'' },
        { id: 3, title: 'مقالات', href: '/p-admin/articles' },
        { id: 4, title: 'ویرایش مقاله', href: '/p-admin/articles/edit' },
      ]}/>
      <EditArticle/>
    </AdminPanelLayout>


    </>
  )
}

export default page