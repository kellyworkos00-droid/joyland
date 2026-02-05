'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ServiceCard from '@/components/ServiceCard'
import type { Service } from '@/lib/db'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        const data = await res.json()
        setServices(data)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  return (
    <>
      <Navbar />

      <section className="py-16 bg-accent-cream min-h-screen">
        <div className="container-spa">
          <h1 className="section-title">Our Services</h1>
          <p className="section-subtitle">Discover our range of luxurious spa treatments</p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin">
                <div className="w-12 h-12 border-4 border-accent-green border-t-transparent rounded-full"></div>
              </div>
              <p className="mt-4 text-spa-700">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
