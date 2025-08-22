import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { LanguageProvider } from "@/contexts/language-context"
import GSAPAnimations from "@/components/gsap-animations"
import BackToTop from "@/components/back-to-top" // Import BackToTop component
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "ShopHub - Discover the Heart of Shopping",
  description: "Quality Products at Your Fingertips - Premium E-commerce Experience",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-background text-foreground min-h-screen">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <GSAPAnimations>
                {children}
                <BackToTop />
              </GSAPAnimations>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
