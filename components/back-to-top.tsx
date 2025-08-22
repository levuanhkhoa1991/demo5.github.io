"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-orange-500 hover:bg-orange-600 back-to-top"
      aria-label="Back to top"
    >
      <div className="relative double-arrow">
        <ChevronUp className="w-5 h-5 transition-transform duration-300 text-white group-hover:animate-bounce" />
        <ChevronUp
          className="w-5 h-5 absolute top-0 left-0 transition-transform duration-300 opacity-50 text-white group-hover:animate-bounce"
          style={{ animationDelay: "0.1s" }}
        />
      </div>
    </Button>
  )
}
