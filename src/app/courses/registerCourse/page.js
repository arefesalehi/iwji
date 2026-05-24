import BreadCrumb from '@/components/modules/BreadCrumb'
import React from 'react'
import RegisterCourse from '@/components/templates/courses/RegisterCourse'
import courseModel from '@/models/course'
import { authUser } from '@/utils/serverHelpers'
import Link from 'next/link'

export default async function Page() {
  const courses = await courseModel.find({})
  const user = await authUser()



  return (
    <>
       <BreadCrumb title='ثبت نام دوره مهندسی بین المللی جوش' /> 
      <RegisterCourse 
        courses={JSON.parse(JSON.stringify(courses))}  
        user={JSON.parse(JSON.stringify(user))}  
      />
    </>
  )
}
