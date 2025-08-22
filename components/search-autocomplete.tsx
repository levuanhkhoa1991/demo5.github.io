"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const carSuggestions = [
  { id: 1, name: "Toyota Camry 2024", brand: "Toyota", type: "Sedan", price: "$28,000" },
  { id: 2, name: "Honda Civic 2024", brand: "Honda", type: "Sedan", price: "$25,000" },
  { id: 3, name: "BMW X5 2024", brand: "BMW", type: "SUV", price: "$65,000" },
  { id: 4, name: "Mercedes C-Class 2024", brand: "Mercedes", type: "Sedan", price: "$45,000" },
  { id: 5, name: "Audi Q7 2024", brand: "Audi", type: "SUV", price: "$58,000" },
  { id: 6, name: "Ford Mustang 2024", brand: "Ford", type: "Sports", price: "$35,000" },
  { id: 7, name: "Chevrolet Corvette 2024", brand: "Chevrolet", type: "Sports", price: "$70,000" },
  { id: 8, name: "Tesla Model 3 2024", brand: "Tesla", type: "Electric", price: "$40,000" },
]

interface SearchAutocompleteProps {
  onSearch?: (query: string) => void
}

export default function SearchAutocomplete({ onSearch }: SearchAutocompleteProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof carSuggestions>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (query.length > 0) {
      const filtered = carSuggestions.filter(
        (car) =>
          car.name.toLowerCase().includes(query.toLowerCase()) ||
          car.brand.toLowerCase().includes(query.toLowerCase()) ||
          car.type.toLowerCase().includes(query.toLowerCase()),
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
      setSelectedIndex(-1)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery)
      setShowSuggestions(false)
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          const selected = suggestions[selectedIndex]
          setQuery(selected.name)
          handleSearch(selected.name)
        } else {
          handleSearch()
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSearch()
        }}
        className="flex"
      >
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search cars, brands, models..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setShowSuggestions(true)}
            className="pr-8 h-10 border-2 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-orange-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button type="submit" className="ml-2 h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-orange-200 rounded-lg shadow-lg max-h-80 overflow-y-auto"
        >
          {suggestions.map((car, index) => (
            <div
              key={car.id}
              className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-orange-50 ${
                index === selectedIndex ? "bg-orange-50" : ""
              }`}
              onClick={() => {
                setQuery(car.name)
                handleSearch(car.name)
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">{car.name}</div>
                  <div className="text-sm text-gray-500">
                    {car.brand} • {car.type}
                  </div>
                </div>
                <div className="text-orange-600 font-semibold">{car.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {showSuggestions && query && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-orange-200 rounded-lg shadow-lg p-4">
          <div className="text-gray-500 text-center">No cars found for "{query}"</div>
        </div>
      )}
    </div>
  )
}
