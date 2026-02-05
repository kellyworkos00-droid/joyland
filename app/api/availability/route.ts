import { NextRequest, NextResponse } from 'next/server'
import { getServiceById, getAppointmentsByDate, isTimeSlotAvailable } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const serviceId = searchParams.get('serviceId')
    const date = searchParams.get('date')

    if (!serviceId || !date) {
      return NextResponse.json(
        { error: 'serviceId and date required' },
        { status: 400 }
      )
    }

    const service = getServiceById(serviceId)
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    const bookingDate = new Date(date)
    const bookedAppointments = getAppointmentsByDate(bookingDate).filter(
      a => a.serviceId === serviceId && a.status !== 'cancelled'
    )

    const bookedTimes = bookedAppointments.map(a => a.time)

    // Generate time slots from 9 AM to 6 PM
    const timeSlots = []
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        timeSlots.push({
          time,
          available: !bookedTimes.includes(time),
        })
      }
    }

    return NextResponse.json(
      {
        serviceId,
        date,
        service,
        timeSlots,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
