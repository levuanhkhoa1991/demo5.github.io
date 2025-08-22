"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, ShoppingCart, ArrowLeft, Plus, Minus, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviews: number
  badge?: string
  category: string
  description: string
  features: string[]
  specifications: { [key: string]: string }
  variants?: { name: string; options: string[] }[]
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({})
  const { addItem } = useCart()

  useEffect(() => {
    // Mock fetch product by ID
    const mockProduct: Product = {
      id: params.id as string,
      name: "Áo Sơ Mi Nam Cao Cấp",
      price: 299000,
      originalPrice: 399000,
      images: [
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
        "/placeholder.svg?height=500&width=500",
      ],
      rating: 4.8,
      reviews: 124,
      badge: "Bán chạy",
      category: "fashion",
      description:
        "Áo sơ mi nam chất liệu cotton cao cấp, thiết kế hiện đại phù hợp cho cả công sở và dạo phố. Sản phẩm được may từ chất liệu cotton 100% thoáng mát, thấm hút mồ hôi tốt.",
      features: [
        "Chất liệu cotton 100% cao cấp",
        "Thiết kế hiện đại, phù hợp nhiều dáng người",
        "Thoáng mát, thấm hút mồ hôi tốt",
        "Dễ dàng bảo quản và giặt ủi",
        "Màu sắc bền đẹp, không phai màu",
      ],
      specifications: {
        "Chất liệu": "Cotton 100%",
        "Xuất xứ": "Việt Nam",
        "Màu sắc": "Trắng, Xanh, Đen",
        Size: "S, M, L, XL, XXL",
        "Cách giặt": "Giặt máy ở nhiệt độ thường",
      },
      variants: [
        {
          name: "Màu sắc",
          options: ["Trắng", "Xanh Navy", "Đen"],
        },
        {
          name: "Kích thước",
          options: ["S", "M", "L", "XL", "XXL"],
        },
      ],
    }

    setProduct(mockProduct)
    setLoading(false)
  }, [params.id])

  const handleAddToCart = () => {
    if (!product) return

    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        variant: Object.entries(selectedVariants)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", "),
      },
      quantity,
    )
  }

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option,
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Đang tải sản phẩm...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Không tìm thấy sản phẩm</div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-muted-foreground hover:text-foreground hover-underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách sản phẩm
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border-animation">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.badge && <Badge className="mb-2 bg-secondary">{product.badge}</Badge>}
              <h1 className="text-3xl font-bold font-heading mb-2">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} đánh giá)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">{product.price.toLocaleString()}đ</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString()}đ
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-4">
                {product.variants.map((variant) => (
                  <div key={variant.name}>
                    <label className="text-sm font-medium mb-2 block">
                      {variant.name}:{" "}
                      {selectedVariants[variant.name] && (
                        <span className="text-primary">{selectedVariants[variant.name]}</span>
                      )}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <Button
                          key={option}
                          variant={selectedVariants[variant.name] === option ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVariantChange(variant.name, option)}
                          className="bg-transparent"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="text-sm font-medium mb-2 block">Số lượng</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">Còn lại: 50 sản phẩm</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 diagonal-hover" onClick={handleAddToCart}>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent">
                <Heart className="w-5 h-5 mr-2" />
                Yêu thích
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent">
                <Share2 className="w-5 h-5 mr-2" />
                Chia sẻ
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Miễn phí vận chuyển</p>
                  <p className="text-xs text-muted-foreground">Đơn từ 500k</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Bảo hành chính hãng</p>
                  <p className="text-xs text-muted-foreground">12 tháng</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Đổi trả dễ dàng</p>
                  <p className="text-xs text-muted-foreground">Trong 30 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Mô tả sản phẩm</TabsTrigger>
              <TabsTrigger value="specifications">Thông số kỹ thuật</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá ({product.reviews})</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold font-heading mb-4">Đặc điểm nổi bật</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Chức năng đánh giá sẽ được cập nhật sớm</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
