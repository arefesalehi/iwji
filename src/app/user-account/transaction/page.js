
import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import TitleComponent from '@/components/templates/user-account/TitleComponent'
import TransActionForm from '@/components/templates/user-account/TransActionForm'
import TransactionTable from '@/components/templates/user-account/TransactionTable'
import React from 'react'
import courseModel from '@/models/course'
import { authUser } from '@/utils/serverHelpers'

const Page = async () => {
  const user = await authUser()
  const courses = await courseModel.find({})

  return (
    <UserPanelLayout>
      <TitleComponent title='تراکنش ها' />
      <div className=''>
        <TransactionTable />
        <TransActionForm
          userId={user?._id?.toString() || ""}
          courses={JSON.parse(JSON.stringify(courses || []))}
        />
      </div>
    </UserPanelLayout>
  )
}

export default Page
