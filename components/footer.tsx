"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold font-heading">S</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-orange-600">ShopHub</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Discover premium quality products at your fingertips - Your ultimate shopping destination!
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>123 Commerce Street, Downtown, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>info@shophub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold font-heading">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover-underline text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover-underline text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover-underline text-muted-foreground hover:text-foreground">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover-underline text-muted-foreground hover:text-foreground">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="hover-underline text-muted-foreground hover:text-foreground">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover-underline text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold font-heading">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fashion" className="hover-underline text-muted-foreground hover:text-foreground">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/electronics" className="hover-underline text-muted-foreground hover:text-foreground">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/home" className="hover-underline text-muted-foreground hover:text-foreground">
                  Home & Garden
                </Link>
              </li>
              <li>
                <Link href="/beauty" className="hover-underline text-muted-foreground hover:text-foreground">
                  Health & Beauty
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover-underline text-muted-foreground hover:text-foreground">
                  Sports & Outdoors
                </Link>
              </li>
              <li>
                <Link href="/books" className="hover-underline text-muted-foreground hover:text-foreground">
                  Books & Stationery
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold font-heading text-orange-800 mb-2">Subscribe for Special Offers</h4>
              <p className="text-sm text-orange-700 mb-3">Get exclusive deals and latest product updates!</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border-2 border-gradient-to-r from-orange-300 to-amber-300 focus:border-orange-500 bg-white"
                  style={{
                    borderImage: "linear-gradient(45deg, #fb923c, #fbbf24) 1",
                  }}
                />
                <Button size="sm" className="diagonal-hover bg-orange-500 hover:bg-orange-600 text-white">
                  Subscribe
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h5 className="font-medium text-sm">Follow Us</h5>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 bg-transparent hover:bg-orange-50 hover:border-orange-300"
                >
                  <Facebook className="w-4 h-4 text-orange-600" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 bg-transparent hover:bg-orange-50 hover:border-orange-300"
                >
                  <Instagram className="w-4 h-4 text-orange-600" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 bg-transparent hover:bg-orange-50 hover:border-orange-300"
                >
                  <Twitter className="w-4 h-4 text-orange-600" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 bg-transparent hover:bg-orange-50 hover:border-orange-300"
                >
                  <Youtube className="w-4 h-4 text-orange-600" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 ShopHub. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/terms" className="hover-underline text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover-underline text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover-underline text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
