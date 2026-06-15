import Link from 'next/link'
import React from 'react'
import { IoLogoWhatsapp } from 'react-icons/io'

const Whatsapp = () => {
  return (
    <>
      <Link href="https://wa.me/9364130097">
        <IoLogoWhatsapp className="top-60 right-[-200px] absolute w-[130px] h-[130px] text-green-500" />
      </Link>
    </>
  )
}

export default Whatsapp
