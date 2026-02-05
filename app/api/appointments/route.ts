import { NextRequest, NextResponse } from 'next/server'
import { createAppointment, isTimeSlotAvailable, getServiceById, getUserByEmail } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, serviceId, date, time } = body

    if (!userId || !serviceId || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if service exists
    const service = getServiceById(serviceId)
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Check if time slot is available
    const bookingDate = new Date(date)
    if (!isTimeSlotAvailable(serviceId, bookingDate, time)) {
      return NextResponse.json(
        { error: 'Time slot is not available' },
        { status: 409 }
      )
    }

    // Create appointment
    const appointment = createAppointment(userId, serviceId, bookingDate, time)

    return NextResponse.json(
      {
        success: true,
        appointment: {
          id: appointment.id,
          userId: appointment.userId,
          serviceId: appointment.serviceId,
          date: appointment.date.toISOString().split('T')[0],
          time: appointment.time,
          status: appointment.status,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
