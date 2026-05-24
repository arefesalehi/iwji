import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import Charts from '@/components/templates/p-admin/index/Charts'
import Info from '@/components/templates/p-admin/index/Info'
import Sidebar from '@/components/templates/p-admin/Sidebar'
import { authUser } from '@/utils/serverHelpers'
import React from 'react'
import userModel from '@/models/user'
import registercourseModel from '@/models/courseRegisteration'
import ticketModel from '@/models/ticket'
import commentModel from '@/models/comment'
import IIWMembership from '@/models/IIWMembership'
import webinarModel from '@/models/webinarRegistration'
const page = async () => {
  const AdminUser = await authUser()
  const users = await userModel.find({})
  const registercourse = await registercourseModel.find({})
  const tickets = await ticketModel.find({})
  const comments = await commentModel.find({})
  const iiwMembership = await IIWMembership.find({})
  const webinarUsers = await webinarModel.find({})

  return (
    <>

      <AdminPanelLayout>
        <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: 'پیشخوان', href: '' },
     

      ]}/>
        <Info
          AdminUser={JSON.parse(JSON.stringify(AdminUser))}
          users={JSON.parse(JSON.stringify(users))}
          registercourse={JSON.parse(JSON.stringify(registercourse))}
          tickets={JSON.parse(JSON.stringify(tickets))}
          comments={JSON.parse(JSON.stringify(comments))}
        />


        <Charts
          users={JSON.parse(JSON.stringify(users))}
          registercourse={JSON.parse(JSON.stringify(registercourse))}
          iiwMembership={JSON.parse(JSON.stringify(iiwMembership))}
          webinarUsers={JSON.parse(JSON.stringify(webinarUsers))}
          tickets={JSON.parse(JSON.stringify(tickets))}
          comments={JSON.parse(JSON.stringify(comments))}
        />


      </AdminPanelLayout>


    </>
  )
}

export default page

