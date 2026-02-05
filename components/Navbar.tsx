'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-spa">
        <div className="flex justify-between items-center py-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-2xl font-serif font-bold text-spa-900">JOYLAND SPA</span>
            </div>
          </Link>

          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-accent-green transition-colors">
              Home
            </Link>
            <Link href="/services" className="hover:text-accent-green transition-colors">
              Services
            </Link>
            <Link href="/bookings" className="hover:text-accent-green transition-colors">
              My Bookings
            </Link>
          </div>

          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-spa-900 hover:text-accent-green transition-colors">
              Login
            </Link>
            <Link href="/signup" className="btn-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
