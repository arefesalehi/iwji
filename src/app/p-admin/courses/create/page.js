import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import CreateCourse from '@/components/templates/p-admin/CreateCourse'
import React from 'react'
import categoryModel from '@/models/category'
import courseModel from '@/models/course'
const page =async () => {
    const categories = await categoryModel.find({})
      const allCourses = await courseModel.find({})
  return (
    <>

    <AdminPanelLayout>
        <BreadCrumb  links={[

          { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: '  دوره ', href: '' },
          { id: 3, title: '  ایجاد دوره جدید', href: '/p-admin/courses/create' },
        ]}/>
        <CreateCourse  allCourses={JSON.parse(JSON.stringify(allCourses))} categories={JSON.parse(JSON.stringify(categories))}/>
    </AdminPanelLayout>


    </>
  )
}

export default page