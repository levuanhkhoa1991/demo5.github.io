import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import Link from "next/link"
import SwiperSlider from "@/components/swiper-slider"
import GSAPAnimations from "@/components/gsap-animations"

export default function NotFound() {
  const helpfulLinks = [
    {
      id: 1,
      title: "Popular Products",
      image: "/placeholder.svg?height=200&width=300",
      description: "Check out our best-selling items",
    },
    {
      id: 2,
      title: "New Arrivals",
      image: "/placeholder.svg?height=200&width=300",
      description: "Latest products just added",
    },
    {
      id: 3,
      title: "Special Offers",
      image: "/placeholder.svg?height=200&width=300",
      description: "Don't miss our current deals",
    },
    {
      id: 4,
      title: "Customer Favorites",
      image: "/placeholder.svg?height=200&width=300",
      description: "Most loved by our customers",
    },
  ]

  const categories = [
    {
      id: 1,
      title: "Fashion",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: 2,
      title: "Electronics",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: 3,
      title: "Home & Garden",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: 4,
      title: "Sports",
      image: "/placeholder.svg?height=150&width=200",
    },
  ]

  const recentBlogs = [
    {
      id: 1,
      title: "Shopping Tips for 2024",
      image: "/placeholder.svg?height=150&width=200",
      description: "Learn how to shop smarter",
    },
    {
      id: 2,
      title: "Product Care Guide",
      image: "/placeholder.svg?height=150&width=200",
      description: "Keep your purchases in perfect condition",
    },
    {
      id: 3,
      title: "Seasonal Trends",
      image: "/placeholder.svg?height=150&width=200",
      description: "What's trending this season",
    },
    {
      id: 4,
      title: "Customer Stories",
      image: "/placeholder.svg?height=150&width=200",
      description: "Real experiences from our customers",
    },
  ]

  const quickActions = [
    {
      id: 1,
      title: "Track Your Order",
      image: "/placeholder.svg?height=100&width=150",
      description: "Check your order status",
    },
    {
      id: 2,
      title: "Return Policy",
      image: "/placeholder.svg?height=100&width=150",
      description: "Easy returns within 30 days",
    },
    {
      id: 3,
      title: "Customer Support",
      image: "/placeholder.svg?height=100&width=150",
      description: "Get help from our team",
    },
    {
      id: 4,
      title: "Store Locator",
      image: "/placeholder.svg?height=100&width=150",
      description: "Find stores near you",
    },
  ]

  return (
    <GSAPAnimations>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 py-20">
          <div className="container mx-auto px-4">
            {/* 404 Hero Section */}
            <div className="text-center mb-16">
              <div className="relative gsap-scale">
                <h1 className="text-9xl md:text-[12rem] font-bold font-heading text-primary/20 select-none">404</h1>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-4 border-primary/30 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="space-y-4 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Oops! Page Not Found</h2>
                <p className="text-xl text-muted-foreground max-w-md mx-auto">
                  The page you're looking for doesn't exist or has been moved to another location.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 gsap-fade-up">
                <Button asChild size="lg" className="diagonal-hover">
                  <Link href="/">
                    <Home className="mr-2 w-5 h-5" />
                    Back to Home
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg" className="diagonal-hover bg-transparent">
                  <Link href="/products">
                    <Search className="mr-2 w-5 h-5" />
                    Browse Products
                  </Link>
                </Button>
              </div>
            </div>

            {/* Helpful Links Slider */}
            <section className="mb-16">
              <div className="text-center mb-8 gsap-fade-up">
                <h3 className="text-2xl font-bold font-heading mb-2">You Might Be Looking For</h3>
                <p className="text-muted-foreground">Popular sections of our store</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={helpfulLinks}
                  slidesPerView={3}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </section>

            {/* Categories Slider */}
            <section className="mb-16 bg-card py-12 rounded-lg">
              <div className="text-center mb-8 gsap-fade-up">
                <h3 className="text-2xl font-bold font-heading mb-2">Shop by Category</h3>
                <p className="text-muted-foreground">Explore our product categories</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={categories}
                  slidesPerView={4}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </section>

            {/* Recent Blog Posts Slider */}
            <section className="mb-16">
              <div className="text-center mb-8 gsap-fade-up">
                <h3 className="text-2xl font-bold font-heading mb-2">Recent Blog Posts</h3>
                <p className="text-muted-foreground">Stay updated with our latest articles</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={recentBlogs}
                  slidesPerView={3}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </section>

            {/* Quick Actions Slider */}
            <section className="mb-16 bg-gradient-to-r from-primary/10 to-secondary/10 py-12 rounded-lg">
              <div className="text-center mb-8 gsap-fade-up">
                <h3 className="text-2xl font-bold font-heading mb-2">Quick Actions</h3>
                <p className="text-muted-foreground">Common tasks you might want to do</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={quickActions}
                  slidesPerView={4}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </section>

            {/* Quick Links */}
            <div className="pt-8 border-t border-border text-center gsap-fade-up">
              <p className="text-muted-foreground mb-4">Quick navigation:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/products" className="text-primary hover:underline underline-animation">
                  Products
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/about" className="text-primary hover:underline underline-animation">
                  About Us
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/contact" className="text-primary hover:underline underline-animation">
                  Contact
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/blog" className="text-primary hover:underline underline-animation">
                  Blog
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link href="/faq" className="text-primary hover:underline underline-animation">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </GSAPAnimations>
  )
}
