import { type NextRequest, NextResponse } from "next/server"

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : 'https://app.treksor.com/api/v1';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Make API call to your backend
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
