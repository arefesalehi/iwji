import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import WebinarBox from '@/components/modules/WebinarBox'
import { authUser } from '@/utils/serverHelpers'
import TitleComponent from '@/components/templates/user-account/TitleComponent'
import webinarRegistrationModel from '@/models/webinarRegistration'
import React from 'react'

const page = async () => {
  const user = await authUser()
  console.log('user account user==>', user);
  const webinarRegisteration = await webinarRegistrationModel.find({ email: user.email })
  return (
    <>

      <UserPanelLayout>

        <TitleComponent title='وبینارهای من' />

        <div className='flex px-10 gap-5 flex-wrap'>
          {
            webinarRegisteration.map((webinar) => {
              return (
                <WebinarBox key={webinar._id}  {...webinar} />
              )
            })
          }





        </div>
      </UserPanelLayout>


    </>
  )
}

export default page