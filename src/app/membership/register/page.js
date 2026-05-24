import MembershipForm from '@/components/templates/membership/MembershipForm'
import courseRegisteration from '@/models/courseRegisteration'
import { authUser } from '@/utils/serverHelpers'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const user = await authUser()
  const courseRegister = await courseRegisteration.findOne({userId:user._id})


  if (!user) {

    return (
      <>
        <div className='flex justify-center items-center h-[500px] font-bold text-xl '>   لطفا ابتدا <Link href='/login-register' className='text-red-800'>لاگین</Link> کنید </div>
      </>
    )
  }
  
  return (
    <>
   


      <MembershipForm  courseRegister={JSON.parse(JSON.stringify(courseRegister))}  user={JSON.parse(JSON.stringify(user))} />


    </>
  )
}

export default page