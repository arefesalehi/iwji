import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import Recipt from '@/components/templates/p-admin/Recipt'
import TransactionTable from '@/components/templates/p-admin/TransactionTable'
import React from 'react'
import courseregisterModel from '@/models/courseRegisteration'
import CourseModel from '@/models/course'
const page = async () => {
    const courseRegister = await courseregisterModel.find({})
        .populate('userId', 'name email')
        .populate('courseId', 'name')


    const courses = await CourseModel.find({})

    const courseOptions = courses.map((course) => ({
        _id: course._id.toString(),
        title: course.name,
    }))



    return (
        <>

            <AdminPanelLayout>
                <BreadCrumb links={[

                    { id: 1, title: 'پنل ادمین', href: '/p-admin' },
                    { id: 2, title: ' تراکنش ها', href: '/p-admin/transaction' },

                ]} />

                <TransactionTable courseRegister={JSON.parse(JSON.stringify(courseRegister))} />

            </AdminPanelLayout>


        </>
    )
}

export default page