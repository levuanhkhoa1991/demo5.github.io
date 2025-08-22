"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Minus, ArrowRight } from "lucide-react"
import SwiperSlider from "@/components/swiper-slider"
import GSAPAnimations from "@/components/gsap-animations"
import { useState } from "react"

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'My Orders' section. You'll receive a tracking number via email once your order ships.",
    },
    {
      id: 2,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. Some restrictions apply to certain product categories.",
    },
    {
      id: 3,
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-7 business days. Express shipping is available for 1-2 business days. Free shipping is available on orders over $50.",
    },
    {
      id: 4,
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by destination. Additional customs fees may apply.",
    },
    {
      id: 5,
      question: "How can I contact customer service?",
      answer:
        "You can reach our customer service team via email at support@shophub.com, phone at +1 (555) 123-4567, or through our live chat feature available 24/7.",
    },
    {
      id: 6,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers.",
    },
  ]

  const popularTopics = [
    {
      id: 1,
      title: "Shipping & Delivery",
      image: "/placeholder.svg?height=200&width=300",
      description: "Everything about shipping times and delivery options",
    },
    {
      id: 2,
      title: "Returns & Exchanges",
      image: "/placeholder.svg?height=200&width=300",
      description: "How to return or exchange your purchases",
    },
    {
      id: 3,
      title: "Payment & Billing",
      image: "/placeholder.svg?height=200&width=300",
      description: "Payment methods and billing information",
    },
    {
      id: 4,
      title: "Account & Profile",
      image: "/placeholder.svg?height=200&width=300",
      description: "Managing your account and personal information",
    },
  ]

  const helpfulGuides = [
    {
      id: 1,
      title: "Size Guide",
      image: "/placeholder.svg?height=150&width=200",
      description: "Find your perfect fit",
    },
    {
      id: 2,
      title: "Care Instructions",
      image: "/placeholder.svg?height=150&width=200",
      description: "Keep your products in great condition",
    },
    {
      id: 3,
      title: "Product Registration",
      image: "/placeholder.svg?height=150&width=200",
      description: "Register your products for warranty",
    },
    {
      id: 4,
      title: "Troubleshooting",
      image: "/placeholder.svg?height=150&width=200",
      description: "Common issues and solutions",
    },
  ]

  const contactOptions = [
    {
      id: 1,
      title: "Live Chat",
      image: "/placeholder.svg?height=100&width=150",
      description: "Get instant help from our team",
    },
    {
      id: 2,
      title: "Email Support",
      image: "/placeholder.svg?height=100&width=150",
      description: "Send us a detailed message",
    },
    {
      id: 3,
      title: "Phone Support",
      image: "/placeholder.svg?height=100&width=150",
      description: "Speak directly with our experts",
    },
    {
      id: 4,
      title: "Help Center",
      image: "/placeholder.svg?height=100&width=150",
      description: "Browse our knowledge base",
    },
  ]

  const videoTutorials = [
    {
      id: 1,
      title: "How to Place an Order",
      image: "/placeholder.svg?height=150&width=200",
      description: "Step-by-step ordering guide",
    },
    {
      id: 2,
      title: "Account Setup",
      image: "/placeholder.svg?height=150&width=200",
      description: "Creating and managing your account",
    },
    {
      id: 3,
      title: "Using Filters",
      image: "/placeholder.svg?height=150&width=200",
      description: "Find products faster with filters",
    },
    {
      id: 4,
      title: "Mobile App Tour",
      image: "/placeholder.svg?height=150&width=200",
      description: "Navigate our mobile app like a pro",
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
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 gsap-fade-up">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto gsap-fade-up">
                Find answers to common questions about our products, services, and policies.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto mt-8 gsap-fade-up">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search for answers..." className="pl-10" />
              </div>
            </div>
          </section>

          {/* Popular Topics Slider */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Popular Topics</h2>
                <p className="text-muted-foreground text-lg">Most searched help topics</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={popularTopics}
                  slidesPerView={3}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </div>
          </section>

          {/* FAQ Accordion */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Common Questions</h2>
                <p className="text-muted-foreground text-lg">Quick answers to frequently asked questions</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="border-animation gsap-fade-up">
                    <CardContent className="p-0">
                      <button
                        onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="font-semibold font-heading">{faq.question}</h3>
                        {openFAQ === faq.id ? (
                          <Minus className="w-5 h-5 text-primary" />
                        ) : (
                          <Plus className="w-5 h-5 text-primary" />
                        )}
                      </button>
                      {openFAQ === faq.id && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Helpful Guides Slider */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Helpful Guides</h2>
                <p className="text-muted-foreground text-lg">Step-by-step guides and tutorials</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={helpfulGuides}
                  slidesPerView={4}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </div>
          </section>

          {/* Video Tutorials Slider */}
          <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Video Tutorials</h2>
                <p className="text-muted-foreground text-lg">Watch and learn with our video guides</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={videoTutorials}
                  slidesPerView={3}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>
            </div>
          </section>

          {/* Contact Options Slider */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Still Need Help?</h2>
                <p className="text-muted-foreground text-lg">Choose how you'd like to get in touch</p>
              </div>
              <div className="gsap-fade-up">
                <SwiperSlider
                  items={contactOptions}
                  slidesPerView={4}
                  autoplay={true}
                  showNavigation={true}
                  showPagination={true}
                />
              </div>

              <div className="text-center mt-12 gsap-fade-up">
                <Button size="lg" className="diagonal-hover">
                  Contact Support
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
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
