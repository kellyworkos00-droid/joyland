'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ServiceCardProps {
  id: string
  name: string
  description: string
  duration: number
  price: number
}

export default function ServiceCard({ id, name, description, duration, price }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-white rounded-lg overflow-hidden card-shadow p-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-48 bg-gradient-to-br from-accent-green to-accent-pink rounded-lg mb-4 flex items-center justify-center">
        <span className="text-white text-6xl opacity-30">✨</span>
      </div>

      <h3 className="text-xl font-semibold text-spa-900 mb-2">{name}</h3>
      <p className="text-spa-700 text-sm mb-4">{description}</p>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          <span className="text-xs text-spa-600">⏱️ {duration} min</span>
          <span className="text-xs text-spa-600">💰 ${price}</span>
        </div>
      </div>

      <Link
        href={`/book/${id}`}
        className="btn-primary block text-center w-full"
      >
        Book Now
      </Link>
    </div>
  )
}
