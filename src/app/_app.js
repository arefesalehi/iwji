'use client'
import './i18n'  // اینجا i18n رو ایمپورت کن

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  )
}
