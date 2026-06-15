import React from 'react'
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import CommentTable from '@/components/templates/p-admin/CommentTable'
import commentModel from '@/models/comment'
import courseModel from '@/models/course'
import { authUser } from '@/utils/serverHelpers'


const page = async () => {

  const comments = await commentModel.find({})
    .populate({ path: "author" })
    .populate({ path: "course" })
    .lean()

  const user = await authUser()


  return (
    <AdminPanelLayout>
      <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
        { id: 2, title: 'کامنت ها و محتواها', href: '' },
        { id: 3, title: ' کامنت ها', href: '/p-admin/comment' },

      ]} />
      <CommentTable user={JSON.parse(JSON.stringify(user))} comments={JSON.parse(JSON.stringify(comments))} />
    </AdminPanelLayout>

  )
}

export default page