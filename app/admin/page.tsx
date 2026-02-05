'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { formatDate, formatTime } from '@/lib/utils'

interface AppointmentRecord {
  id: string
  userName: string
  userEmail: string
  serviceName: string
  date: string
  time: string
  status: 'confirmed' | 'cancelled' | 'completed'
  price: number
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filterDate, setFilterDate] = useState('')
  const [filterService, setFilterService] = useState('')

  useEffect(() => {
    fetchAppointments()
  }, [filterDate, filterService])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      let url = '/api/admin/appointments'
      const params = new URLSearchParams()

      if (filterDate) params.append('date', filterDate)
      if (filterService) params.append('service', filterService)

      if (params.toString()) {
        url += '?' + params.toString()
      }

      const res = await fetch(url)
      const data = await res.json()
      setAppointments(data)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const totalRevenue = appointments
    .filter(a => a.status === 'confirmed')
    .reduce((sum, a) => sum + a.price, 0)

  const stats = [
    { label: 'Total Bookings', value: appointments.length, color: 'bg-accent-green' },
    { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, color: 'bg-accent-green' },
    { label: 'Cancelled', value: appointments.filter(a => a.status === 'cancelled').length, color: 'bg-red-500' },
    { label: 'Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'bg-accent-pink' },
  ]

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-accent-cream py-12">
        <div className="container-spa">
          <h1 className="text-4xl font-serif font-bold text-spa-900 mb-2">Admin Dashboard</h1>
          <p className="text-spa-700 mb-8">Manage all spa appointments</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <p className="text-spa-700 text-sm mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold text-white ${stat.color} bg-opacity-20 p-2 rounded w-fit`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold text-spa-900 mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-spa-900 mb-2">Filter by Date</label>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-spa-900 mb-2">Filter by Service</label>
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Services</option>
                  <option value="1">Swedish Massage</option>
                  <option value="2">Deep Tissue Massage</option>
                  <option value="3">Facial Treatment</option>
                  <option value="4">Hot Stone Therapy</option>
                  <option value="5">Aromatherapy Treatment</option>
                  <option value="6">Full Body Scrub</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterDate('')
                    setFilterService('')
                  }}
                  className="btn-secondary w-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-spa-100 border-b border-spa-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-spa-900">Booking ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-spa-900">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-spa-900">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-spa-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-spa-900">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-spa-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-spa-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-spa-700">
                        <div className="inline-block animate-spin">
                          <div className="w-6 h-6 border-2 border-accent-green border-t-transparent rounded-full"></div>
                        </div>
                      </td>
                    </tr>
                  ) : appointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-spa-700">
                        No appointments found
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-spa-200 hover:bg-accent-cream transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-spa-900">#{appointment.id}</td>
                        <td className="px-6 py-4 text-sm text-spa-900">
                          <div className="font-semibold">{appointment.userName}</div>
                          <div className="text-xs text-spa-700">{appointment.userEmail}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-spa-900">{appointment.serviceName}</td>
                        <td className="px-6 py-4 text-sm text-spa-900">{formatDate(new Date(appointment.date))}</td>
                        <td className="px-6 py-4 text-sm text-spa-900">{formatTime(appointment.time)}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-accent-green">${appointment.price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              appointment.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : appointment.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
