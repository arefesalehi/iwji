
import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import ClassInfo from '@/components/templates/user-account/ClassInfo'
import React from 'react'
import courseRegistrationModel from '@/models/courseRegisteration'


const page = async () => {
    const registerCourse = await courseRegistrationModel.find({})
        .populate('courseId')


    console.log('registerCourse==>', registerCourse);

    return (
        <>
            <UserPanelLayout>
                <div className="bg-white m-auto rounded-lg w-[90%]">

                    <ClassInfo registerCourse={JSON.parse(JSON.stringify(registerCourse))} />

                </div>
            </UserPanelLayout>

        </>
    )
}

export default page