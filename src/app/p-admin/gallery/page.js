import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import Gallery from '@/components/templates/p-admin/Gallery'
import React from 'react'
import galleryModel from '@/models/gallery'
import dynamic from 'next/dynamic'

const page = async() => {


  return (
    <>

    <AdminPanelLayout>
        <BreadCrumb  links={[

          { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: ' تصاویر سایت  ', href: '/' },
          { id: 3, title: '   گالری تصاویر', href: '/p-admin/gallery' },

        ]}/>
        <Gallery   />
    </AdminPanelLayout>


    </>
  )
}

export default page