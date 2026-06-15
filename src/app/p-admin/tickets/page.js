import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import TicketTable from '@/components/templates/p-admin/TicketTable'
import React from 'react'
import ticketModel from '@/models/ticket'
import { authUser } from '@/utils/serverHelpers'
const page = async () => {

    const tickets = await ticketModel.find({}).populate('department').populate('user')
    const user = await authUser()

    return (
        <>
            <AdminPanelLayout>
                <BreadCrumb links={[

                    { id: 1, title: 'پنل ادمین', href: '/p-admin' },
                    { id: 2, title: 'تماس و پشتیبانی ', href: '/' },
                    { id: 3, title: ' تیکت ها', href: '/p-admin/tickets' },

                ]} />
                <TicketTable user={JSON.parse(JSON.stringify(user))} tickets={JSON.parse(JSON.stringify(tickets))} />
            </AdminPanelLayout>

        </>
    )
}

export default page