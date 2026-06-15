import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import TicketBox from '@/components/templates/user-account/TicketBox'
import TitleComponent from '@/components/templates/user-account/TitleComponent'
import { authUser } from '@/utils/serverHelpers'
import ticketModel from '@/models/ticket'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const user = await authUser()
    const tickets = await ticketModel.find({ user: user._id, isAnswer: false }).populate('department')
    console.log('tickets=>', tickets);

    return (
        <>
            <UserPanelLayout>

                <div className='flex justify-between items-center '>
                    <TitleComponent title='تیکت ها' />
                    <Link href='/user-account/tickets/create' className='ml-10 text-sm bg-green-800  p-2 text-white rounded-[10px]' > ایجاد تیکت جدید</Link>
                </div>

                <TicketBox tickets={JSON.parse(JSON.stringify(tickets))} />

            </UserPanelLayout>

        </>
    )
}

export default page