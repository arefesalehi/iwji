import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import IIWmembershipTable from '@/components/templates/p-admin/IIWmembershipTable'
import React from 'react'
import iiwmembershipModel from '@/models/IIWMembership'
const page = async() => {
    const iiwmembership= await iiwmembershipModel.find({}).populate('courseId').populate('userId')
  return (
    <>

    <AdminPanelLayout>
        <BreadCrumb links={[
        
                  { id: 1, title: 'پنل ادمین', href: '/p-admin' },
                  { id: 2, title: ' تصاویر سایت  ', href: '/' },
                  { id: 3, title: ' نفرات ثبت نامی عضویت در IIW', href: '/p-admin/iiwmembership' },
        
                ]}/>
        <IIWmembershipTable iiwmembership={JSON.parse(JSON.stringify(iiwmembership))}/>


    </AdminPanelLayout>


    </>
  )
}

export default page