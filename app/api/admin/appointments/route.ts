import { NextRequest, NextResponse } from 'next/server'
import { appointments, services, users } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const filterDate = searchParams.get('date')
    const filterService = searchParams.get('service')

    let filtered = [...appointments]

    if (userId) {
      filtered = filtered.filter(a => a.userId === userId)
    }

    if (filterDate) {
      const filterDateObj = new Date(filterDate)
      filtered = filtered.filter(a =>
        a.date.toDateString() === filterDateObj.toDateString()
      )
    }

    if (filterService) {
      filtered = filtered.filter(a => a.serviceId === filterService)
    }

    // Enrich with user and service details
    const enriched = filtered.map(appointment => {
      const user = users.find(u => u.id === appointment.userId)
      const service = services.find(s => s.id === appointment.serviceId)

      return {
        id: appointment.id,
        userName: user?.name || 'Unknown',
        userEmail: user?.email || 'Unknown',
        serviceName: service?.name || 'Unknown',
        date: appointment.date.toISOString().split('T')[0],
        time: appointment.time,
        status: appointment.status,
        price: service?.price || 0,
      }
    })

    return NextResponse.json(enriched, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
