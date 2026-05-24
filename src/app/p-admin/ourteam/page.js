import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'

import React from 'react'
import ourTeamModel from '@/models/ourTeam'
import OurTeamBox from '@/components/templates/p-admin/OurTeamBox'
const page =async () => {
  const ourteams = await ourTeamModel.find({})

  return (
    <>


      <AdminPanelLayout>
        <BreadCrumb  links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
        { id: 2, title: 'کاربران و همکاری ها', href: '' },
        { id: 3, title: '  هم تیمی ها', href: '/p-admin/ourteam' },
      ]}/>
        <OurTeamBox ourteams={JSON.parse(JSON.stringify(ourteams))} />
      </AdminPanelLayout>

    </>
  )
}

export default page