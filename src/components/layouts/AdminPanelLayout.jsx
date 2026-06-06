import React from 'react'
import Sidebar from '../templates/p-admin/Sidebar'
import Topbar from '../templates/p-admin/Topbar'
import {  authUser } from '@/utils/serverHelpers'
import { redirect } from 'next/navigation'


const AdminPanelLayout =async ({ children }) => {
  const user = await authUser()

  if (user) {
      if (user.role !== 'ADMIN') {
        return redirect('/login-register')
      }
    } else {
      return redirect('/login-register')
    }
  
  return (
    <div className="bg-[#ecf2fe] h-auto">
      <div className="">
        <div className="flex w-full h-auto">
          <div className="">
            <Sidebar />
          </div>
          <div className="w-[100vw]">
            <div className="bg-[#ecf2fe] m-auto pb-100 rounded-[20px] w-full min-h-[1000px]">
              <Topbar admin={JSON.parse(JSON.stringify(user))} />
              {children}
            </div>


            
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanelLayout
