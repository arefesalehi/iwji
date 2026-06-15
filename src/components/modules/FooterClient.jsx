'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/modules/Footer'

export default function FooterClient() {
  const pathname = usePathname()

  const hideFooterOnPaths = ['/p-admin', '/p-admin/anything']

  if (hideFooterOnPaths.some((path) => pathname.startsWith(path))) return null

  return <Footer />
}
