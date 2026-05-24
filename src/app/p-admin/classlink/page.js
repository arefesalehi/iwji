import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import ClassLinkBox from '@/components/templates/p-admin/ClassLinkBox'
import React from 'react'
import courseRegisterationModel from '@/models/courseRegisteration'
import CourseModel from '@/models/course'
import UserModel from '@/models/user' // Import User model if needed

const page = async () => {
  // Populate user data when fetching registrations
  const courseRegisterations = await courseRegisterationModel.find({})
    .populate('userId', 'name email') // Add this populate
    .populate('courseId', 'name')
    .lean();

  const courses = await CourseModel.find({})

  const courseOptions = courses.map((course) => ({
    _id: course._id.toString(),
    title: course.name,
  }))

  return (
    <AdminPanelLayout>
      <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
        { id: 2, title: '  دوره ', href: '' },
        { id: 3, title: 'لینک کلاس', href: '/p-admin/classlink' },

      ]} />
      <ClassLinkBox
        courseOptions={JSON.parse(JSON.stringify(courseOptions))}
        courseRegisterations={JSON.parse(JSON.stringify(courseRegisterations))}
      />
    </AdminPanelLayout>
  )
}

export default page