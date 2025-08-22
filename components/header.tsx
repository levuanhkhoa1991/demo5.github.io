"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, ChevronDown, Heart, MapPin, Phone, User, LogOut, Settings, Package, Car } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import CartSidebar from "./cart-sidebar"
import LanguageSwitcher from "./language-switcher"
import SearchAutocomplete from "./search-autocomplete"

const megaMenuCategories = [
  {
    titleKey: "Vehicle Types",
    items: ["Sedans", "SUVs", "Hatchbacks", "Coupes", "Convertibles"],
  },
  {
    titleKey: "Popular Brands",
    items: ["Toyota", "Honda", "BMW", "Mercedes", "Audi"],
  },
  {
    titleKey: "Electric Vehicles",
    items: ["Tesla", "Nissan Leaf", "BMW i3", "Hyundai Kona", "Chevrolet Bolt"],
  },
  {
    titleKey: "Services",
    items: ["Financing", "Insurance", "Maintenance", "Trade-In", "Test Drive"],
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Bar */}
      <div className="bg-orange-500 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Free delivery within 50 miles</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>Sales: 1900-CARS</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/financing" className="animate-underline">
              Financing
            </Link>
            <Link href="/trade-in" className="animate-underline">
              Trade-In
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Car className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading text-orange-600">AutoHub</h1>
              <p className="text-xs text-muted-foreground">Premium Vehicles</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchAutocomplete />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex text-orange-600 hover:text-orange-700">
              <Heart className="w-5 h-5" />
              <span className="ml-1">Favorites</span>
            </Button>

            <LanguageSwitcher />

            <CartSidebar />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-orange-100 text-orange-600">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{t("nav.profile")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile Info
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="btn-diagonal bg-transparent border-orange-500 text-orange-600 hover:bg-orange-50"
                  asChild
                >
                  <Link href="/login">{t("nav.login")}</Link>
                </Button>
                <Button size="sm" className="btn-diagonal bg-orange-500 hover:bg-orange-600" asChild>
                  <Link href="/register">{t("nav.register")}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden transition-transform duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`transition-all duration-300 ${isMenuOpen ? "rotate-180 scale-110" : ""}`}>
                {isMenuOpen ? (
                  <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-8">
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Button variant="ghost" className="flex items-center gap-1 animate-underline text-orange-600">
                <Car className="w-4 h-4" />
                Vehicle Categories
                <ChevronDown className="w-4 h-4" />
              </Button>

              {/* Mega Menu */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 w-screen max-w-4xl bg-card border border-border rounded-lg shadow-lg mt-2 p-6 grid grid-cols-4 gap-6 animate-in slide-in-from-top-2 duration-500">
                  {megaMenuCategories.map((category, index) => (
                    <div key={index}>
                      <h3 className="font-semibold font-heading text-orange-600 mb-3">{category.titleKey}</h3>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              href={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                              className="text-sm text-muted-foreground hover:text-orange-600 animate-underline transition-colors"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/deals" className="animate-underline font-medium text-orange-600">
              Special Offers
            </Link>
            <Link href="/new-arrivals" className="animate-underline hover:text-orange-600">
              New Models
            </Link>
            <Link href="/bestsellers" className="animate-underline hover:text-orange-600">
              Popular Cars
            </Link>
            <Link href="/brands" className="animate-underline hover:text-orange-600">
              All Brands
            </Link>
            <Link href="/about" className="animate-underline hover:text-orange-600">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="animate-underline hover:text-orange-600">
              {t("nav.contact")}
            </Link>
          </div>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchAutocomplete />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-card border-t border-border transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {user ? (
            <div className="flex flex-col space-y-2 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email || user.phone}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="justify-start bg-transparent border-orange-500 text-orange-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t("nav.logout")}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-start bg-transparent border-orange-500 text-orange-600"
                asChild
              >
                <Link href="/login">{t("nav.login")}</Link>
              </Button>
              <Button size="sm" className="justify-start bg-orange-500 hover:bg-orange-600" asChild>
                <Link href="/register">{t("nav.register")}</Link>
              </Button>
            </div>
          )}

          <div className="border-t border-border pt-4 space-y-2">
            <Link href="/deals" className="block py-2 text-orange-600 font-medium">
              Special Offers
            </Link>
            <Link href="/new-arrivals" className="block py-2 hover:text-orange-600">
              New Models
            </Link>
            <Link href="/bestsellers" className="block py-2 hover:text-orange-600">
              Popular Cars
            </Link>
            <Link href="/brands" className="block py-2 hover:text-orange-600">
              All Brands
            </Link>
            <Link href="/about" className="block py-2 hover:text-orange-600">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="block py-2 hover:text-orange-600">
              {t("nav.contact")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
