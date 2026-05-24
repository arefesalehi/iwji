import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import Accardion from '@/components/templates/p-admin/Accardion'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import accardionModel from '@/models/accardion'
import React from 'react'

const page = async () => {
  const accardion = await accardionModel.find({})
  return (
    <>

      <AdminPanelLayout>
        <BreadCrumb links={[

          { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: 'کامنت ها و محتوا', href: '' },
          { id: 3, title: 'سوالات متداول', href: '/p-admin/accardion' },
        ]} />
        <Accardion items={JSON.parse(JSON.stringify(accardion))} />

      </AdminPanelLayout>


    </>
  )
}

export default page