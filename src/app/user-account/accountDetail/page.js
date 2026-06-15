import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import AccountDetail from '@/components/templates/user-account/AccountDetail'
import TitleComponent from '@/components/templates/user-account/TitleComponent'
import { authUser } from '@/utils/serverHelpers'
import React from 'react'

const page = async () => {
  const user = await authUser()
  return (
    <>

      <UserPanelLayout>
        <TitleComponent title='جزئیات حساب' />
        <AccountDetail user={JSON.parse(JSON.stringify(user))} />
      </UserPanelLayout>


    </>
  )
}

export default page