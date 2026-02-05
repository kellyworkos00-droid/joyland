import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JOYLAND SPA - Self-Booking System',
  description: 'Book your spa appointment online at JOYLAND SPA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
