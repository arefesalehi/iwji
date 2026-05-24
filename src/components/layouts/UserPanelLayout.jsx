import React from 'react'
import SideBar from '../templates/user-account/SideBar'

const UserPanelLayout = ({ children }) => {
  return (
    <div className="bg-gray-100 h-auto">
      <div className="container">
        <div className="flex md:flex-row flex-col pb-20 w-full h-auto">
          <div className="w-full md:w-1/4">
            <SideBar />
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white m-auto mt-20 pb-20 rounded-[20px] w-[95%] h-auto text-sm lg:text-base">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPanelLayout
