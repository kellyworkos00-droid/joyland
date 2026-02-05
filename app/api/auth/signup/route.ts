import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/db'
import { isValidEmail, isValidPhone } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name, phone } = body

    // Validation
    if (!email || !password || !name || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone format' },
        { status: 400 }
      )
    }

    // Check if user exists
    if (getUserByEmail(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Create user
    const user = createUser(email, password, name, phone)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
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
