"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Zap } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

export interface CarProduct {
  id: string | number
  name: string
  price: string | number
  originalPrice?: string | number
  image: string
  rating: number
  reviews: number
  badge?: string
  brand?: string
  type?: string
  description?: string
}

interface CarDetailModalProps {
  product: CarProduct | null
  open: boolean
  onClose: () => void
}

function parsePrice(price: string | number): number {
  if (typeof price === "number") return price
  return Number(price.replace(/[^0-9.]/g, "")) || 0
}

function formatPrice(price: string | number): string {
  if (typeof price === "string") return price
  return price.toLocaleString() + "đ"
}

export default function CarDetailModal({ product, open, onClose }: CarDetailModalProps) {
  const { addItem, setIsOpen: setCartOpen } = useCart()
  const router = useRouter()

  if (!product) return null

  const numericPrice = parsePrice(product.price)
  const numericOriginal = product.originalPrice ? parsePrice(product.originalPrice) : undefined
  const savings = numericOriginal ? numericOriginal - numericPrice : 0

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: numericPrice,
      originalPrice: numericOriginal,
      image: product.image,
    })
    onClose()
    setCartOpen(true)
  }

  const handleBuyNow = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: numericPrice,
      originalPrice: numericOriginal,
      image: product.image,
    })
    onClose()
    router.push("/checkout")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl p-0 overflow-hidden"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>

        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-1/2 bg-gray-100">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-64 md:h-full object-cover"
              style={{ minHeight: 320 }}
            />
            {product.badge && (
              <Badge className="absolute top-3 left-3 bg-black text-white border-0">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="md:w-1/2 p-6 flex flex-col gap-4">
            {/* Header */}
            <div>
              <h2 className="text-xl font-bold font-heading leading-snug">{product.name}</h2>
              {(product.brand || product.type) && (
                <p className="text-muted-foreground text-sm mt-1">
                  {[product.brand, product.type].filter(Boolean).join(" • ")}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
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
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} đánh giá)
              </span>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-sm text-green-600 font-medium mt-1">
                  Tiết kiệm {savings.toLocaleString()}đ
                </p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                {product.description}
              </p>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-auto pt-2">
              <Button className="w-full diagonal-hover" onClick={handleAddToCart}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleBuyNow}
              >
                <Zap className="w-4 h-4 mr-2" />
                Mua ngay
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
