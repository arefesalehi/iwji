'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/modules/Navbar'
import Topbar from './Topbar'

export default function NavbarClient() {
  const pathname = usePathname()

  const hideNavbarOnPaths = ['/p-admin', '/p-admin/anything']

  const showNavbar = !hideNavbarOnPaths.some((path) =>
    pathname.startsWith(path),
  )

  if (!showNavbar) return null

  return <Topbar />
}
