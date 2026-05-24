import React from 'react'
import ClassInfoTable from './ClassInfoTable'
import TitleComponent from '@/components/templates/user-account/TitleComponent'
import RecordeAccardion from './RecordeAccardion'


const ClassInfo = ({ registerCourse }) => {
  return (
    <>
  
      <TitleComponent title="اطلاعات ورود به کلاس" />
      <ClassInfoTable registerCourse={registerCourse} />


      <TitleComponent title="  لینک ضبط کلاس ها " />
      <RecordeAccardion  registerCourse={registerCourse}/>
     

    </>
  )
}

export default ClassInfo
