import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import CooperationBox from '@/components/templates/p-admin/CooperationBox'
import React from 'react'
import cooperationModel from '@/models/cooperation'
const page =async () => {
    const cooperations = await cooperationModel.find({})
  return (
    <>
    <AdminPanelLayout>
        <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
        { id: 2, title: 'کاربران و همکاری ها', href: '' },
        { id: 3, title: '  همکاری ها  ', href: '/p-admin/cooperation' },
      ]}/>
        <CooperationBox cooperations={JSON.parse(JSON.stringify(cooperations))}/>
    </AdminPanelLayout>

    </>
  )
}

export default page