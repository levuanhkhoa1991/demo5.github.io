import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart, ArrowRight } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      image: "/placeholder.svg?height=300&width=300",
      description: "Leading the company with 15+ years of e-commerce experience.",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Design",
      image: "/placeholder.svg?height=300&width=300",
      description: "Creating beautiful and user-friendly shopping experiences.",
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "/placeholder.svg?height=300&width=300",
      description: "Building robust and scalable technology solutions.",
    },
    {
      name: "Emily Davis",
      role: "Marketing Director",
      image: "/placeholder.svg?height=300&width=300",
      description: "Connecting customers with products they love.",
    },
  ]

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer First",
      description: "We put our customers at the center of everything we do.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Quality Focus",
      description: "We never compromise on the quality of our products and services.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our business.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion",
      description: "We are passionate about creating amazing shopping experiences.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">About ShopHub</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're passionate about bringing you the best shopping experience with quality products, exceptional
              service, and innovative technology.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Our Story</h2>
                <p className="text-muted-foreground text-lg">
                  Founded in 2020, ShopHub started with a simple mission: to make online shopping accessible, enjoyable,
                  and trustworthy for everyone. What began as a small startup has grown into a leading e-commerce
                  platform serving thousands of customers worldwide.
                </p>
                <p className="text-muted-foreground text-lg">
                  We believe that shopping should be more than just a transaction – it should be an experience that
                  brings joy and satisfaction to our customers' lives.
                </p>
                <Button size="lg" className="diagonal-hover">
                  Learn More
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Our Story"
                  className="w-full h-auto rounded-lg shadow-2xl border-animation"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-animation hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      {value.icon}
                    </div>
                    <h3 className="font-semibold font-heading mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground text-lg">The amazing people behind ShopHub</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-animation hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold font-heading mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}
