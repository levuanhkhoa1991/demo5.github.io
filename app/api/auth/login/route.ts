import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, password } = body

    // TODO: Implement actual authentication logic
    // This is a mock implementation

    // Validate input
    if ((!email && !phone) || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Mock user validation
    const mockUser = {
      id: "1",
      name: "Nguyễn Văn A",
      email: email || "user@example.com",
      phone: phone || "0123456789",
    }

    // Mock password validation
    if (password === "password123") {
      // Generate mock JWT token
      const token = "mock-jwt-token-" + Date.now()

      return NextResponse.json({
        success: true,
        user: mockUser,
        token,
        message: "Đăng nhập thành công",
      })
    } else {
      return NextResponse.json({ error: "Email/SĐT hoặc mật khẩu không đúng" }, { status: 401 })
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
