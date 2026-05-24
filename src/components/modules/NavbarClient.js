'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/modules/Navbar'

export default function NavbarClient({ isLogin }) {
  const pathname = usePathname()

  // مسیرهایی که نمی‌خوای Navbar داشته باشند
  const hideNavbarOnPaths = ['/p-admin', '/p-admin/anything']

  const showNavbar = !hideNavbarOnPaths.some(path => pathname.startsWith(path))

  if (!showNavbar) return null

  return <Navbar isLogin={isLogin} wishes={[]} />
}
