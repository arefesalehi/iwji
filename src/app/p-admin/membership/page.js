import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import Membership from '@/components/templates/p-admin/Membership'
import React from 'react'
import membershipModel from '@/models/membership'

const page =async () => {
  const memberships = await membershipModel.find({})
  return (
    <>

    <AdminPanelLayout>
        <BreadCrumb links={[
        
                  { id: 1, title: 'پنل ادمین', href: '/p-admin' },
                  { id: 2, title: '  عضویت ها  ', href: '/' },
                  { id: 3, title: '    ارسال گواهی عضویت جدید', href: '/p-admin/membership' },
        
                ]}/>
        <Membership  memberships={JSON.parse(JSON.stringify(memberships))}  />
    </AdminPanelLayout>


    </>
  )
}

export default page