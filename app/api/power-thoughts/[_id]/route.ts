import { type NextRequest, NextResponse } from "next/server"

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : 'https://app.treksor.com/api/v1';

export async function DELETE(request: NextRequest, { params }: { params: { _id: any } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const response = await fetch(`${baseUrl}/power-thought/${params._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Failed to delete power thought" }, { status: response.status })
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
