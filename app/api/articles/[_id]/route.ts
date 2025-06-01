import { type NextRequest, NextResponse } from "next/server"

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : 'http://31.97.13.169:8080/api/v1';

export async function GET(request: NextRequest, { params }: { params: { _id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    const response = await fetch(`${baseUrl}/article/${params._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: "Failed to fetch article" }, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { _id: string } }) {
  try {
    const formData = await request.formData()
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    const response = await fetch(`${baseUrl}/article/${params._id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: "Failed to update article" }, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { _id: any } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const response = await fetch(`${baseUrl}/article/${params._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to delete article" }, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
