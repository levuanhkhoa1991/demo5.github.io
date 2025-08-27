import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Truck, Headphones, ArrowRight, Heart, Car, Zap, Award } from "lucide-react"
import SwiperSlider from "@/components/swiper-slider"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Toyota Camry 2025",
      price: "$28,000",
      originalPrice: "$32,000",
      image: "/img/img1.png?height=300&width=300",
      rating: 4.8,
      reviews: 124,
      badge: "Best Seller",
      brand: "Toyota",
      type: "Sedan",
    },
    {
      id: 2,
      name: "BMW X5 2025",
      price: "$65,000",
      originalPrice: "$70,000",
      image: "/img/img2.png?height=300&width=300",
      rating: 4.9,
      reviews: 89,
      badge: "Luxury",
      brand: "BMW",
      type: "SUV",
    },
    {
      id: 3,
      name: "Tesla Model 3 2024",
      price: "$40,000",
      originalPrice: "$45,000",
      image: "/img/img3.png?height=300&width=300",
      rating: 4.7,
      reviews: 156,
      badge: "Electric",
      brand: "Tesla",
      type: "Electric",
    },
    {
      id: 4,
      name: "Ford Mustang 2024",
      price: "$35,000",
      originalPrice: "$40,000",
      image: "/img/img4.png?height=300&width=300",
      rating: 4.6,
      reviews: 203,
      badge: "Sports",
      brand: "Ford",
      type: "Sports",
    },
  ]

  const categories = [
    {
      name: "Sedans",
      image: "/img/logo1.png?height=200&width=200",
      count: "150+ models",
    },
    {
      name: "SUVs",
      image: "/img/logo2.png?height=200&width=200",
      count: "200+ models",
    },
    {
      name: "Sports Cars",
      image: "/img/logo3.png?height=200&width=200",
      count: "80+ models",
    },
    {
      name: "Electric",
      image: "/img/logo4.png?height=200&width=200",
      count: "120+ models",
    },
  ]

  const heroSlides = [
    {
      id: 1,
      title: "2024 Car Collection",
      image: "/img/img12.png?height=400&width=600",
      description: "Discover the latest models from top brands",
    },
    {
      id: 2,
      title: "Electric Vehicle Sale",
      image: "/img/img13.png?height=400&width=600",
      description: "Up to $10,000 off on selected electric vehicles",
    },
    {
      id: 3,
      title: "Luxury Car Experience",
      image: "/img/img14.png?height=400&width=600",
      description: "Premium vehicles for discerning drivers",
    },
    {
      id: 4,
      title: "Sports Car Performance",
      image: "/img/img15.png?height=400&width=600",
      description: "Unleash the power of performance",
    },
  ]

  const brandSlides = [
    {
      id: 1,
      title: "Toyota",
      image: "/img/logo1.png?height=200&width=200",
    },
    {
      id: 2,
      title: "BMW",
      image: "/img/logo2.png?height=200&width=200",
    },
    {
      id: 3,
      title: "Mercedes",
      image: "/img/logo3.png?height=200&width=200",
    },
    {
      id: 4,
      title: "Audi",
      image: "/img/logo4.png?height=200&width=200",
    },
    {
      id: 5,
      title: "Tesla",
      image: "/img/logo1.png?height=200&width=200",
    },
    {
      id: 6,
      title: "Ford",
      image: "/img/logo2.png?height=200&width=200",
    },
    {
      id: 7,
      title: "Honda",
      image: "/img/logo3.png?height=200&width=200",
    },
  ]

  const testimonialSlides = [
    {
      id: 1,
      title: "New Vehicles",
      image: "/img/img1.png?height=100&width=100",
      description: "The car exceeded my expectations. Great financing options and transparent pricing.",
    },
    {
      id: 2,
      title: "Quality Vehicles",
      image: "/img/img2.png?height=100&width=100",
      description: "The car exceeded my expectations. Great financing options and transparent pricing.",
    },
    {
      id: 3,
      title: "Excellent Service",
      image: "/img/img3.png?height=100&width=100",
      description: "From test drive to delivery, everything was smooth and professional.",
    },
    {
      id: 4,
      title: "Best Car Deals",
      image: "/img/img4.png?height=100&width=100",
      description: "Found amazing deals and saved thousands. Love my new car!",
    },
    {
      id: 5,
      title: "New Vehicles",
      image: "/img/img1.png?height=100&width=100",
      description: "The car exceeded my expectations. Great financing options and transparent pricing.",
    },
  ]

  const newArrivals = [
    {
      id: 1,
      title: "Honda Civic 2024",
      image: "/img/img5.png?height=300&width=300",
      price: "$25,000",
      badge: "New",
    },
    {
      id: 2,
      title: "Audi Q7 2024",
      image: "/img/img6.png?height=300&width=300",
      price: "$58,000",
      badge: "Luxury",
    },
    {
      id: 3,
      title: "Chevrolet Corvette 2025",
      image: "/img/img7.png?height=300&width=300",
      price: "$70,000",
      badge: "Sports",
    },
    {
      id: 4,
      title: "Mercedes C-Class 2025",
      image: "/img/img8.png?height=300&width=300",
      price: "$45,000",
      badge: "Premium",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section with Slider */}
        <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 gsap-fade-left">
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground leading-tight">
                  Find Your Dream
                  <span className="text-primary"> Car Today</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Premium vehicles from trusted brands. Quality guaranteed, financing available.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="diagonal-hover text-lg px-8">
                    Browse Cars
                    <Car className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 border border-black">
                    Schedule Test Drive
                  </Button>
                </div>
              </div>
              <div className="gsap-fade-right">
                <SwiperSlider
                  items={heroSlides}
                  slidesPerView={1}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center space-y-4 gsap-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold font-heading">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">Within 50 miles</p>
              </div>
              <div className="text-center space-y-4 gsap-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold font-heading">Certified Pre-Owned</h3>
                <p className="text-sm text-muted-foreground">Quality guaranteed</p>
              </div>
              <div className="text-center space-y-4 gsap-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold font-heading">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Expert assistance</p>
              </div>
              <div className="text-center space-y-4 gsap-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold font-heading">Easy Financing</h3>
                <p className="text-sm text-muted-foreground">Flexible payment plans</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 gsap-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Vehicle Categories</h2>
              <p className="text-muted-foreground text-lg">Explore our diverse range of vehicle types</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Card
                  key={index}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-animation gsap-fade-up"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold font-heading mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Slider */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 gsap-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Latest Models</h2>
              <p className="text-muted-foreground text-lg">Check out our newest vehicle arrivals</p>
            </div>

            <div className="gsap-fade-up">
              <SwiperSlider
                items={newArrivals}
                slidesPerView={4}
                autoplay={true}
                showNavigation={true}
                showPagination={true}
              />
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 gsap-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Featured Vehicles</h2>
              <p className="text-muted-foreground text-lg">Our most popular and best-selling cars</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
              {featuredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-animation gsap-fade-up pt-0"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-secondary bg-black border border-white">{product.badge}</Badge>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold font-heading line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.brand} • {product.type}
                      </p>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                      </div>

                      <Button className="w-full diagonal-hover">
                        <Car className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12 gsap-fade-up">
              <Button variant="outline" size="lg" className="diagonal-hover bg-transparent">
                <Link href="/products" className="underline-animation">
                  View All Vehicles
                </Link>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Brand Partners Slider */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 gsap-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Car Brands</h2>
              <p className="text-muted-foreground text-lg">Authorized dealer for premium automotive brands</p>
            </div>

            <div className="gsap-fade-up">
              <SwiperSlider
                items={brandSlides}
                slidesPerView={6}
                autoplay={true}
                showNavigation={false}
                showPagination={false}
              />
            </div>
          </div>
        </section>

        {/* Customer Testimonials Slider */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 gsap-fade-up">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">What Our Customers Say</h2>
              <p className="text-muted-foreground text-lg">Real reviews from satisfied car buyers</p>
            </div>

            <div className="gsap-fade-up">
              <SwiperSlider
                items={testimonialSlides}
                slidesPerView={5}
                autoplay={true}
                showNavigation={true}
                showPagination={true}
              />
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6 gsap-scale">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white">Subscribe for Car Deals</h2>
              <p className="text-white/90 text-lg">Get notified about new arrivals and exclusive automotive offers</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gradient-to-r from-orange-300 to-yellow-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white"
                  style={{
                    background:
                      "linear-gradient(white, white) padding-box, linear-gradient(45deg, #fb923c, #fbbf24) border-box",
                    border: "2px solid transparent",
                  }}
                />
                <Button
                  variant="secondary"
                  size="lg"
                  className="diagonal-hover bg-white text-orange-600 hover:bg-gray-100"
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
