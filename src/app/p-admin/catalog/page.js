import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import CatalogForm from '@/components/templates/p-admin/CatalogForm'
import React from 'react'

const page = () => {
  return (
    <>
    <AdminPanelLayout>
        <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
        { id: 2, title: 'کامنت ها و محتوا', href:'' },
        { id: 3, title: 'کاتالوگ', href: '/p-admin/catalog' },
 
      ]}/>
        <CatalogForm/>
    </AdminPanelLayout>


    </>
  )
}

export default page