import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import ContactTable from '@/components/templates/p-admin/ContactTable'
import contactModel from '@/models/contact'
import React from 'react'

const page = async () => {
  const contacts = await contactModel.find({})

  return (
    <>
      <AdminPanelLayout>
        <BreadCrumb links={[

          { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: 'تماس و پشتیبانی ', href: '/p-admin' },
          { id: 3, title: ' تماس ها', href: '/p-admin/contact' },

        ]} />
        <ContactTable contacts={JSON.parse(JSON.stringify(contacts))} />
      </AdminPanelLayout>


    </>
  )
}

export default page