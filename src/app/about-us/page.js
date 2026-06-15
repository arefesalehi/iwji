import BreadCrumb from '@/components/modules/BreadCrumb'
import React from 'react'
import ourteamModel from '@/models/ourTeam'
import AboutUs from '@/components/templates/aboutus/AboutUs'


const page = async () => {
    const ourTeam = await ourteamModel.find({ username: 'ایرج ستاری فر' })


    return (
        <>
            <BreadCrumb title='درباره ما' />

            <AboutUs ourTeam={JSON.parse(JSON.stringify(ourTeam))} />

        </>
    )
}

export default page