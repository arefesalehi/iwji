import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import React from 'react'
import TicketChat from '@/components/templates/user-account/TicketChat'
import { authUser } from '@/utils/serverHelpers'
import ticketModel from '@/models/ticket'

const page = async ({ params }) => {
    const { id } =await params
    const user = await authUser()
    const tickets = await ticketModel.find({  $or: [
      { _id: id },           
      { mainTicket: id }     
    ] }).populate('user').populate('mainTicket').populate('department')
    console.log('ticketssssss=>', tickets);

    return (
        <>
            <UserPanelLayout>

                <TicketChat tickets={JSON.parse(JSON.stringify(tickets))} />

            </UserPanelLayout>


        </>
    )
}

export default page