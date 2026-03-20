"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Heart, Car } from "lucide-react"
import CarDetailModal, { type CarProduct } from "@/components/car-detail-modal"

interface FeaturedProduct {
  id: number
  name: string
  price: string
  originalPrice: string
  image: string
  rating: number
  reviews: number
  badge: string
  brand: string
  type: string
}

interface FeaturedProductsProps {
  products: FeaturedProduct[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<CarProduct | null>(null)

  const openModal = (product: FeaturedProduct) => {
    setSelectedProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      reviews: product.reviews,
      badge: product.badge,
      brand: product.brand,
      type: product.type,
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-animation gsap-fade-up pt-0"
            onClick={() => openModal(product)}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-secondary bg-black border border-white">
                  {product.badge}
                </Badge>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                </div>

                <Button className="w-full diagonal-hover" onClick={(e) => { e.stopPropagation(); openModal(product) }}>
                  <Car className="w-4 h-4 mr-2" />
                  Xem chi tiết
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CarDetailModal
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  )
}
