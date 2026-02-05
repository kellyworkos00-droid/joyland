'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatDate, formatTime } from '@/lib/utils'
import type { Service } from '@/lib/db'

interface TimeSlot {
  time: string
  available: boolean
}

export default function BookPage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.serviceId as string

  const [service, setService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
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
    }

    // Fetch service details
    const fetchService = async () => {
      try {
        const res = await fetch('/api/services')
        const data = await res.json()
        const foundService = data.find((s: Service) => s.id === serviceId)
        setService(foundService)
      } catch (err) {
        setError('Failed to load service details')
      } finally {
        setLoading(false)
      }
    }

    fetchService()

    // Set default date to tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setSelectedDate(tomorrow.toISOString().split('T')[0])
  }, [serviceId, router])

  useEffect(() => {
    // Fetch available time slots when date changes
    if (selectedDate && service) {
      const fetchTimeSlots = async () => {
        try {
          const res = await fetch(
            `/api/availability?serviceId=${service.id}&date=${selectedDate}`
          )
          const data = await res.json()
          setTimeSlots(data.timeSlots)
        } catch (err) {
          console.error('Error fetching time slots:', err)
        }
      }

      fetchTimeSlots()
    }
  }, [selectedDate, service])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedTime) {
      setError('Please select a time slot')
      return
    }

    if (!user) {
      router.push('/login')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          serviceId: service?.id,
          date: selectedDate,
          time: selectedTime,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Booking failed')
        return
      }

      // Store appointment details for confirmation page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('lastAppointment', JSON.stringify(data.appointment))
      }

      router.push(`/confirmation/${data.appointment.id}`)
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Get min and max dates (next 30 days)
  const today = new Date()
  const minDate = new Date(today)
  minDate.setDate(minDate.getDate() + 1)
  const maxDate = new Date(today)
  maxDate.setDate(maxDate.getDate() + 30)

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-accent-cream flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin">
              <div className="w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full"></div>
            </div>
            <p className="mt-4 text-spa-700">Loading service...</p>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  if (!service) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen bg-accent-cream flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 text-lg">Service not found</p>
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Service Header */}
            <div className="bg-gradient-to-r from-accent-green to-accent-pink p-8 text-white">
              <h1 className="text-3xl font-serif font-bold mb-2">{service.name}</h1>
              <p className="opacity-90">{service.description}</p>
            </div>

            {/* Booking Form */}
            <div className="p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Info */}
                <div className="grid grid-cols-2 gap-4 bg-accent-cream p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-spa-700">Duration</p>
                    <p className="font-semibold text-spa-900">{service.duration} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-spa-700">Price</p>
                    <p className="font-semibold text-accent-green text-lg">${service.price}</p>
                  </div>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-semibold text-spa-900 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={minDate.toISOString().split('T')[0]}
                    max={maxDate.toISOString().split('T')[0]}
                    className="input-field"
                  />
                  <p className="text-xs text-spa-700 mt-2">
                    Selected: {formatDate(new Date(selectedDate))}
                  </p>
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-semibold text-spa-900 mb-3">
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-2 rounded-lg text-sm font-semibold transition-all ${
                          slot.available
                            ? selectedTime === slot.time
                              ? 'bg-accent-green text-white'
                              : 'bg-spa-200 text-spa-900 hover:bg-spa-300'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {formatTime(slot.time)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !selectedTime}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
                >
                  {submitting ? 'Confirming Booking...' : 'Confirm Booking'}
                </button>
              </form>

              <p className="text-center text-spa-700 text-sm mt-6">
                💡 Book now and receive a confirmation email with all details
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
