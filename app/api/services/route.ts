import { NextRequest, NextResponse } from 'next/server'
import { services } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(services, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
