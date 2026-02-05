// In-memory database for demo purposes
// In production, replace with actual database (PostgreSQL, MySQL, etc.)

export interface User {
  id: string
  email: string
  password: string
  name: string
  phone: string
  createdAt: Date
}

export interface Service {
  id: string
  name: string
  description: string
  duration: number // in minutes
  price: number
  image?: string
}

export interface Appointment {
  id: string
  userId: string
  serviceId: string
  date: Date
  time: string
  status: 'confirmed' | 'cancelled' | 'completed'
  createdAt: Date
}

// Mock users
export const users: User[] = []

// Mock services
export const services: Service[] = [
  {
    id: '1',
    name: 'Swedish Massage',
    description: 'Relaxing full-body massage to relieve stress and tension',
    duration: 60,
    price: 89.99,
  },
  {
    id: '2',
    name: 'Deep Tissue Massage',
    description: 'Therapeutic massage targeting deep muscle knots',
    duration: 60,
    price: 99.99,
  },
  {
    id: '3',
    name: 'Facial Treatment',
    description: 'Rejuvenating facial with premium skincare products',
    duration: 45,
    price: 79.99,
  },
  {
    id: '4',
    name: 'Hot Stone Therapy',
    description: 'Luxurious massage using heated basalt stones',
    duration: 75,
    price: 119.99,
  },
  {
    id: '5',
    name: 'Aromatherapy Treatment',
    description: 'Healing session with essential oils and relaxation',
    duration: 50,
    price: 69.99,
  },
  {
    id: '6',
    name: 'Full Body Scrub',
    description: 'Exfoliating treatment for soft, glowing skin',
    duration: 45,
    price: 59.99,
  },
]

// Mock appointments
export const appointments: Appointment[] = []

// Helper functions
export function getUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email)
}

export function createUser(email: string, password: string, name: string, phone: string): User {
  const user: User = {
    id: Date.now().toString(),
    email,
    password, // In production, hash the password!
    name,
    phone,
    createdAt: new Date(),
  }
  users.push(user)
  return user
}

export function createAppointment(userId: string, serviceId: string, date: Date, time: string): Appointment {
  const appointment: Appointment = {
    id: Date.now().toString(),
    userId,
    serviceId,
    date,
    time,
    status: 'confirmed',
    createdAt: new Date(),
  }
  appointments.push(appointment)
  return appointment
}

export function getAppointmentsByUserId(userId: string): Appointment[] {
  return appointments.filter(a => a.userId === userId)
}

export function getAppointmentsByDate(date: Date): Appointment[] {
  return appointments.filter(a => 
    a.date.toDateString() === date.toDateString()
  )
}

export function isTimeSlotAvailable(serviceId: string, date: Date, time: string): boolean {
  return !appointments.some(a =>
    a.serviceId === serviceId &&
    a.date.toDateString() === date.toDateString() &&
    a.time === time &&
    a.status !== 'cancelled'
  )
}

export function cancelAppointment(appointmentId: string): boolean {
  const appointment = appointments.find(a => a.id === appointmentId)
  if (appointment) {
    appointment.status = 'cancelled'
    return true
  }
  return false
}

export function getServiceById(serviceId: string): Service | undefined {
  return services.find(s => s.id === serviceId)
}
