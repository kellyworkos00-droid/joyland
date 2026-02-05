'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatDate, formatTime } from '@/lib/utils'

interface UserAppointment {
  id: string
  serviceId: string
  date: string
  time: string
  status: string
}

export default function BookingsPage() {
  const router = useRouter()
  const [appointments, setAppointments] = useState<UserAppointment[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const userData = sessionStorage.getItem('user')
      if (!userData) {
        router.push('/login')
        return
      }
      setUser(JSON.parse(userData))

      // Fetch user's appointments
      const userObj = JSON.parse(userData)
      // In a real app, fetch from API
      // For now, show placeholder message
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-accent-cream flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full"></div>
            </div>
            <p className="mt-4 text-spa-700">Loading bookings...</p>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-accent-cream py-12">
        <div className="container-spa max-w-2xl">
          <h1 className="text-3xl font-serif font-bold text-spa-900 mb-2">My Bookings</h1>
          <p className="text-spa-700 mb-8">Manage your spa appointments</p>

          {appointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-2xl font-semibold text-spa-900 mb-2">No Bookings Yet</h2>
              <p className="text-spa-700 mb-6">You haven't booked any spa appointments yet.</p>
              <Link href="/services" className="btn-primary inline-block">
                Browse Services & Book Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-spa-900">Service #{appointment.serviceId}</h3>
                    <span className="badge capitalize">{appointment.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-spa-700">
                    <div>
                      📅 {formatDate(new Date(appointment.date))}
                    </div>
                    <div>
                      🕐 {formatTime(appointment.time)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
