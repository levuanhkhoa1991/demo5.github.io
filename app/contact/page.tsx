import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import SwiperSlider from "@/components/swiper-slider"
import GSAPAnimations from "@/components/gsap-animations"

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Address",
      details: ["123 Business Street", "New York, NY 10001", "United States"],
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["info@shophub.com", "support@shophub.com"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat - Sun: 10:00 AM - 4:00 PM"],
    },
  ]

  const officeLocations = [
    {
      id: 1,
      title: "New York Office",
      image: "/placeholder.svg?height=200&width=300",
      description: "Our main headquarters in the heart of NYC",
    },
    {
      id: 2,
      title: "Los Angeles Branch",
      image: "/placeholder.svg?height=200&width=300",
      description: "West coast operations and customer service",
    },
    {
      id: 3,
      title: "Chicago Hub",
      image: "/placeholder.svg?height=200&width=300",
      description: "Midwest distribution and logistics center",
    },
    {
      id: 4,
      title: "Miami Office",
      image: "/placeholder.svg?height=200&width=300",
      description: "Southeast regional office and warehouse",
    },
  ]

  const supportTeam = [
    {
      id: 1,
      title: "Customer Service",
      image: "/placeholder.svg?height=150&width=200",
      description: "General inquiries and order support",
    },
    {
      id: 2,
      title: "Technical Support",
      image: "/placeholder.svg?height=150&width=200",
      description: "Product technical assistance",
    },
    {
      id: 3,
      title: "Sales Team",
      image: "/placeholder.svg?height=150&width=200",
      description: "Product recommendations and bulk orders",
    },
    {
      id: 4,
      title: "Returns Department",
      image: "/placeholder.svg?height=150&width=200",
      description: "Return and exchange processing",
    },
  ]

  const contactMethods = [
    {
      id: 1,
      title: "Live Chat",
      image: "/placeholder.svg?height=100&width=150",
      description: "Instant support available 24/7",
    },
    {
      id: 2,
      title: "Email Support",
      image: "/placeholder.svg?height=100&width=150",
      description: "Detailed responses within 24 hours",
    },
    {
      id: 3,
      title: "Phone Support",
      image: "/placeholder.svg?height=100&width=150",
      description: "Speak with our experts directly",
    },
    {
      id: 4,
      title: "Video Call",
      image: "/placeholder.svg?height=100&width=150",
      description: "Face-to-face consultation available",
    },
  ]

  const socialChannels = [
    {
      id: 1,
      title: "Facebook",
      image: "/placeholder.svg?height=100&width=150",
      description: "Follow us for updates and news",
    },
    {
      id: 2,
      title: "Instagram",
      image: "/placeholder.svg?height=100&width=150",
      description: "See our latest products and behind-the-scenes",
    },
    {
      id: 3,
      title: "Twitter",
      image: "/placeholder.svg?height=100&width=150",
      description: "Real-time updates and customer service",
    },
    {
      id: 4,
      title: "LinkedIn",
      image: "/placeholder.svg?height=100&width=150",
      description: "Professional updates and company news",
    },
  ]

  return (
    <GSAPAnimations>
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 gsap-fade-up">Contact Us</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto gsap-fade-up">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </section>

          {/* Office Locations Slider */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Locations</h2>
                <p className="text-muted-foreground text-lg">Visit us at any of our office locations</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={officeLocations}
                  slidesPerView={3}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </div>
          </section>

          {/* Contact Form & Info */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <Card className="border-animation gsap-fade-left">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold font-heading mb-6">Send us a Message</h2>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name</label>
                          <Input placeholder="John" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name</label>
                          <Input placeholder="Doe" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input type="email" placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input type="tel" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <Input placeholder="How can we help you?" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Message</label>
                        <Textarea placeholder="Tell us more about your inquiry..." rows={5} />
                      </div>
                      <Button size="lg" className="w-full diagonal-hover">
                        Send Message
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <div className="space-y-8 gsap-fade-right">
                  <div>
                    <h2 className="text-2xl font-bold font-heading mb-6">Get in Touch</h2>
                    <p className="text-muted-foreground text-lg mb-8">
                      Have questions about our products or services? We're here to help! Reach out to us through any of
                      the following channels.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <Card key={index} className="border-animation">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                              {info.icon}
                            </div>
                            <div>
                              <h3 className="font-semibold font-heading mb-2">{info.title}</h3>
                              {info.details.map((detail, idx) => (
                                <p key={idx} className="text-muted-foreground">
                                  {detail}
                                </p>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Support Team Slider */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Our Support Team</h2>
                <p className="text-muted-foreground text-lg">Specialized departments to help with your needs</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={supportTeam}
                  slidesPerView={4}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </div>
          </section>

          {/* Contact Methods Slider */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">How to Reach Us</h2>
                <p className="text-muted-foreground text-lg">Choose your preferred contact method</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={contactMethods}
                  slidesPerView={4}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </div>
          </section>

          {/* Enhanced Google Maps Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Find Us</h2>
                <p className="text-muted-foreground text-lg">Visit our main office in New York City</p>
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg border-animation gsap-scale">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959729807!5m2!1sen!2sus"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ShopHub Main Office Location"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Card className="text-center border-animation gsap-fade-up">
                  <CardContent className="p-6">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold font-heading mb-2">Main Office</h3>
                    <p className="text-sm text-muted-foreground">123 Business Street, New York, NY 10001</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-animation gsap-fade-up">
                  <CardContent className="p-6">
                    <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold font-heading mb-2">Call Us</h3>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  </CardContent>
                </Card>
                <Card className="text-center border-animation gsap-fade-up">
                  <CardContent className="p-6">
                    <Clock className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold font-heading mb-2">Office Hours</h3>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 9AM-6PM</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Social Media Slider */}
          <section className="py-16 bg-gradient-to-r from-primary to-secondary">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-white">Connect With Us</h2>
                <p className="text-white/90 text-lg">Follow us on social media for updates and news</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={socialChannels}
                  slidesPerView={4}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </GSAPAnimations>
  )
}
