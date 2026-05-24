
import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import MembershipBox from '@/components/templates/user-account/MembershipBox'
import { authUser } from '@/utils/serverHelpers'
import iiwMembershipModel from '@/models/IIWMembership'
import React from 'react'

const page = async () => {

    const user = await authUser()

    const IIWRegister = await iiwMembershipModel.findOne({ userId: user._id })




    return (
        <>

            <UserPanelLayout>
                {
                    IIWRegister ? <MembershipBox /> : "ندارد"
                }


            </UserPanelLayout>


        </>
    )
}

export default page