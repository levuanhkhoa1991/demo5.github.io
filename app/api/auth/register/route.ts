import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, phone, password, confirmPassword } = body

    // Validate input
    if (!fullName || (!email && !phone) || !password || !confirmPassword) {
      return NextResponse.json({ error: "Vui lòng điền đầy đủ thông tin" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Mật khẩu xác nhận không khớp" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Mật khẩu phải có ít nhất 8 ký tự" }, { status: 400 })
    }

    // TODO: Check if user already exists
    // TODO: Hash password
    // TODO: Save to database

    // Mock user creation
    const newUser = {
      id: "new-user-" + Date.now(),
      name: fullName,
      email: email || null,
      phone: phone || null,
      createdAt: new Date().toISOString(),
    }

    // Generate mock JWT token
    const token = "mock-jwt-token-" + Date.now()

    return NextResponse.json({
      success: true,
      user: newUser,
      token,
      message: "Đăng ký thành công",
    })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
