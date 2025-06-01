import { type NextRequest, NextResponse } from "next/server"

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : 'https://treksor.com/api/v1';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"

    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    const response = await fetch(`${baseUrl}/article?category=${category}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: "Failed to fetch articles" }, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    const response = await fetch(`${baseUrl}/article`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: "Failed to create article" }, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
