'use client'
import Login from '@/components/templates/login-register/Login'
import Register from '@/components/templates/login-register/Register'
import React, { useState } from 'react'
import { authType } from '@/utils/constant'

const page = () => {


    const [type, setType] = useState(authType.LOGIN)

    const ShowLoginForm = () => {
        setType(authType.LOGIN)
    }

    const ShowRegisterForm = () => {
        setType(authType.REGISTER)
    }


    return (
        <>

            {
                type === authType.LOGIN ?
                    (<Login ShowRegisterForm={ShowRegisterForm} />)
                    : (<Register ShowLoginForm={ShowLoginForm} />)
            }

        </>
    )
}

export default page