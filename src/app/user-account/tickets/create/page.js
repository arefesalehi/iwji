import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import TitleComponent from '@/components/templates/user-account/TitleComponent'
import React from 'react'
import Link from 'next/link'
import CreateTicket from '@/components/templates/user-account/CreateTicket'
import departmentModel from '@/models/department'
const page = async() => {

    const departments = await departmentModel.find({})
    return (
        <>
            <UserPanelLayout>
                <div className='flex justify-between items-center '>
                    <TitleComponent title='ثبت تیکت جدید' />
                    <Link href='/user-account/tickets' className='ml-10 text-sm bg-gray-200  p-2 text-black rounded-[10px]' > بازگشت</Link>
                </div>

                <CreateTicket departments={JSON.parse(JSON.stringify(departments))}/>
            </UserPanelLayout>

        </>
    )
}

export default page