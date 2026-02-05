// Utility functions for the app
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(time: string): string {
  // Assuming time format is HH:MM
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function getAvailableTimeSlots(): string[] {
  const slots = []
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
      slots.push(time)
    }
  }
  return slots
}

export function getNextSevenDays(): Date[] {
  const dates = []
  const today = new Date()
  for (let i = 0; i < 7; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    dates.push(date)
  }
  return dates
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPhone(phone: string): boolean {
  return /^\d{10}$|^\d{3}[-.\s]?\d{3}[-.\s]?\d{4}$/.test(phone.replace(/\D/g, ''))
}

export async function setSessionStorage(key: string, value: any): Promise<void> {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value))
  }
}

export async function getSessionStorage(key: string): Promise<any> {
  if (typeof window !== 'undefined') {
    const value = sessionStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }
  return null
}

export function clearSessionStorage(key?: string): void {
  if (typeof window !== 'undefined') {
    if (key) {
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.clear()
    }
  }
}
