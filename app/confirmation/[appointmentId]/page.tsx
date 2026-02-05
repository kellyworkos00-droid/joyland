'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatDate, formatTime } from '@/lib/utils'
import type { Appointment, Service, User } from '@/lib/db'

interface AppointmentDetails {
  appointment: Appointment & { serviceName?: string; price?: number }
  service?: Service
  user?: User
}

export default function ConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const appointmentId = params.appointmentId as string

  const [appointmentData, setAppointmentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get appointment data from session
    if (typeof window !== 'undefined') {
      const storedAppointment = sessionStorage.getItem('lastAppointment')
      if (storedAppointment) {
        setAppointmentData(JSON.parse(storedAppointment))
      } else {
        // Fallback - redirect if no appointment data
        router.push('/services')
      }
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
            <p className="mt-4 text-spa-700">Loading confirmation...</p>
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
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-accent-green to-accent-pink p-8 text-white text-center">
              <div className="text-6xl mb-4">✓</div>
              <h1 className="text-3xl font-serif font-bold mb-2">Booking Confirmed!</h1>
              <p className="opacity-90">Your spa appointment is confirmed. Check your email for details.</p>
            </div>

            {/* Confirmation Details */}
            <div className="p-8">
              <div className="bg-accent-cream p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-spa-900 mb-6">Appointment Details</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-spa-300">
                    <span className="text-spa-700">Confirmation Number</span>
                    <span className="font-mono font-semibold text-spa-900">#{appointmentData?.id || 'N/A'}</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-spa-300">
                    <span className="text-spa-700">Service</span>
                    <span className="font-semibold text-spa-900">{appointmentData?.serviceId ? 'Service #' + appointmentData.serviceId : 'N/A'}</span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-spa-300">
                    <span className="text-spa-700">Date</span>
                    <span className="font-semibold text-spa-900">
                      {appointmentData?.date ? formatDate(new Date(appointmentData.date)) : 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-spa-300">
                    <span className="text-spa-700">Time</span>
                    <span className="font-semibold text-spa-900">
                      {appointmentData?.time ? formatTime(appointmentData.time) : 'N/A'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <span className="text-spa-700 font-semibold">Status</span>
                    <span className="badge capitalize">{appointmentData?.status || 'confirmed'}</span>
                  </div>
                </div>
              </div>

              {/* Invoice */}
              <div className="border-2 border-spa-300 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-spa-900 mb-4">Invoice</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-spa-700">Service Fee</span>
                    <span className="text-spa-900">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-spa-700">Tax (10%)</span>
                    <span className="text-spa-900">$0.00</span>
                  </div>
                  <div className="border-t border-spa-300 pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-accent-green">$0.00</span>
                  </div>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-accent-pink bg-opacity-10 border-l-4 border-accent-pink p-4 rounded mb-8">
                <h4 className="font-semibold text-spa-900 mb-2">📋 Important Information</h4>
                <ul className="text-sm text-spa-700 space-y-1">
                  <li>• Please arrive 10 minutes early</li>
                  <li>• Cancellation must be done 24 hours in advance</li>
                  <li>• Bring a valid ID for verification</li>
                  <li>• Enjoy our spa facilities before your appointment</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/bookings" className="btn-primary block text-center flex-1">
                  View My Bookings
                </Link>
                <Link href="/services" className="btn-secondary block text-center flex-1">
                  Book Another Service
                </Link>
              </div>

              <p className="text-center text-spa-700 text-sm mt-6">
                Have questions? Contact us at info@joylandspa.com or call (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
