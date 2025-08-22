import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { provider, token } = body

    // TODO: Implement actual social authentication
    // This is a mock implementation

    if (!provider || !token) {
      return NextResponse.json({ error: "Missing provider or token" }, { status: 400 })
    }

    // Mock social login validation
    let mockUser

    switch (provider) {
      case "google":
        mockUser = {
          id: "google-user-" + Date.now(),
          name: "Google User",
          email: "googleuser@gmail.com",
          avatar: "https://lh3.googleusercontent.com/a/default-user",
          provider: "google",
        }
        break
      case "facebook":
        mockUser = {
          id: "facebook-user-" + Date.now(),
          name: "Facebook User",
          email: "facebookuser@facebook.com",
          avatar: "https://graph.facebook.com/me/picture",
          provider: "facebook",
        }
        break
      default:
        return NextResponse.json({ error: "Unsupported provider" }, { status: 400 })
    }

    // Generate mock JWT token
    const authToken = "mock-social-jwt-token-" + Date.now()

    return NextResponse.json({
      success: true,
      user: mockUser,
      token: authToken,
      message: `Đăng nhập với ${provider} thành công`,
    })
  } catch (error) {
    console.error("Social auth error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
